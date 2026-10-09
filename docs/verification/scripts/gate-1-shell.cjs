// Browser verification for the MasteryOS Gate 1 shell (kept outside the repo; no project dependency).
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')

const BASE = 'http://localhost:4173/'
const ROUTES = [
  ['#/', 'Your next action'],
  ['#/core', 'Universal Technology Core'],
  ['#/programs', 'Programs'],
  ['#/programs/computer-science', 'Computer Science'],
  ['#/topic/program-decomposition-typescript-functions', 'Program decomposition with TypeScript functions'],
  ['#/topic/dom', 'DOM'],
  ['#/practice', 'Practice'],
  ['#/projects', 'Projects'],
  ['#/progress', 'Progress'],
  ['#/resources', 'Resources'],
  ['#/settings', 'Settings'],
  ['#/missing', 'Nothing here'],
]
const results = []
const ok = (name, pass, detail = '') => results.push(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`)

;(async () => {
  const browser = await chromium.launch()
  for (const [label, viewport] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
    const context = await browser.newContext({ viewport, reducedMotion: 'reduce' })
    const page = await context.newPage()
    const errors = []
    const external = []
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    page.on('response', (r) => r.status() >= 400 && errors.push(`HTTP ${r.status()} ${r.url()}`))
    page.on('pageerror', (e) => errors.push(e.message))
    page.on('request', (r) => !r.url().startsWith(BASE) && !r.url().startsWith('data:') && external.push(r.url()))

    await page.goto(BASE)
    await page.waitForSelector('h1')
    ok(`${label}: local state loads from IndexedDB`, await page.locator('text=Local mode').count() > 0)

    for (const [hash, title] of ROUTES) {
      await page.goto(BASE + hash)
      const h1 = (await page.locator('h1').first().textContent())?.trim()
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      ok(`${label}: ${hash} renders`, h1 === title, `h1="${h1}"`)
      ok(`${label}: ${hash} no horizontal overflow`, overflow <= 0, `overflow=${overflow}px`)
    }

    // Keyboard: skip link is the first tab stop and moves focus to main.
    await page.goto(BASE + '#/')
    await page.reload()
    await page.waitForSelector('h1')
    await page.keyboard.press('Tab')
    const first = await page.evaluate(() => document.activeElement?.textContent)
    ok(`${label}: first Tab stop is skip link`, first === 'Skip to content', `got "${first}"`)
    await page.keyboard.press('Enter')
    ok(`${label}: skip link focuses main`, (await page.evaluate(() => document.activeElement?.id)) === 'main')
    const focusVisible = await page.evaluate(() => {
      const a = document.querySelector('.brand')
      a.focus()
      return getComputedStyle(a).outlineStyle
    })
    ok(`${label}: visible focus outline on keyboard focus`, focusVisible !== 'none', focusVisible)

    // Navigation via the primary nav (mobile uses the Menu disclosure).
    if (label === 'mobile') {
      ok('mobile: nav hidden until Menu opened', !(await page.locator('#primary-navigation').isVisible()))
      await page.getByRole('button', { name: 'Menu' }).click()
      ok('mobile: Menu opens nav', await page.locator('#primary-navigation').isVisible())
      await page.keyboard.press('Escape')
      ok('mobile: Escape closes menu', !(await page.locator('#primary-navigation').isVisible()))
      await page.getByRole('button', { name: 'Menu' }).click()
    }
    await page.locator('.primary-nav a', { hasText: 'Progress' }).click()
    await page.waitForFunction(() => document.querySelector('h1')?.textContent === 'Progress')
    ok(`${label}: nav click navigates + focuses heading`, (await page.evaluate(() => document.activeElement?.id)) === 'page-title')
    if (label === 'mobile') ok('mobile: nav closes after navigating', !(await page.locator('#primary-navigation').isVisible()))
    await page.screenshot({ path: `${process.env.SHOT_DIR || '/tmp'}/${label}-progress.png`, fullPage: false })

    // Topic: tabs via keyboard, contextual AI unavailable path, Escape returns focus.
    await page.goto(BASE + '#/topic/program-decomposition-typescript-functions')
    await page.getByRole('tab', { name: 'Read' }).focus()
    await page.keyboard.press('ArrowRight')
    ok(`${label}: arrow key moves tab selection`, (await page.getByRole('tab', { selected: true }).textContent()) === 'Visualize')
    await page.keyboard.press('Home')
    const trigger = page.getByRole('button', { name: 'Ask about this section' }).first()
    await trigger.focus()
    await page.keyboard.press('Enter')
    const panel = page.locator('#ai-panel')
    ok(`${label}: AI panel opens from section`, await panel.isVisible())
    ok(`${label}: AI panel has section context`, (await panel.textContent()).includes('Section: The mental model'))
    await page.fill('#ai-question', 'Why split these?')
    await page.getByRole('button', { name: 'Ask', exact: true }).click()
    await page.waitForSelector('text=AI is unavailable.')
    ok(`${label}: AI unavailable is recoverable`, (await panel.textContent()).includes('keep working'))
    const box = await panel.boundingBox()
    if (label === 'mobile') ok('mobile: AI is a bottom sheet', box && box.y > 200 && Math.round(box.width) === 390, JSON.stringify(box))
    else ok('desktop: AI docks as side panel', box && box.x > 1000, JSON.stringify(box))
    await page.screenshot({ path: `${process.env.SHOT_DIR || '/tmp'}/${label}-topic-ai.png`, fullPage: false })
    await page.keyboard.press('Escape')
    await page.waitForTimeout(50)
    ok(`${label}: Escape closes AI`, !(await panel.isVisible()))
    ok(`${label}: focus returns to trigger`, await trigger.evaluate((el) => el === document.activeElement))

    // Screens for visual review.
    for (const [hash, name] of [['#/', 'today'], ['#/core', 'core'], ['#/programs', 'programs'], ['#/resources', 'resources'], ['#/settings', 'settings']]) {
      await page.goto(BASE + hash)
      await page.waitForSelector('h1')
      await page.screenshot({ path: `${process.env.SHOT_DIR || '/tmp'}/${label}-${name}.png`, fullPage: false })
    }

    // Offline: after load, the shell keeps working with no network.
    await context.setOffline(true)
    await page.goto(BASE + '#/core').catch(() => {})
    await page.evaluate(() => { window.location.hash = '#/practice' })
    await page.waitForFunction(() => document.querySelector('h1')?.textContent === 'Practice')
    ok(`${label}: in-app navigation works offline after load`, true)
    await context.setOffline(false)

    ok(`${label}: no console/page errors`, errors.length === 0, errors.slice(0, 3).join(' | '))
    ok(`${label}: no external network requests`, external.length === 0, external.slice(0, 3).join(' | '))
    await context.close()
  }
  await browser.close()
  console.log(results.join('\n'))
  console.log(`\n${results.filter((r) => r.startsWith('PASS')).length}/${results.length} passed`)
})().catch((e) => { console.error(e); process.exit(1) })
