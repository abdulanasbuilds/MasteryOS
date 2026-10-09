const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const BASE = 'http://localhost:4173/'
const results = []
const check = (name, ok, detail = '') => results.push(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ' — ' + detail : ''}`)

;(async () => {
  const browser = await chromium.launch()
  for (const [label, viewport] of [['desktop', { width: 1366, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
    const page = await browser.newPage({ viewport })
    const errors = []
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    page.on('pageerror', (e) => errors.push(e.message))

    await page.goto(BASE + '#/programs/software-engineering')
    await page.waitForSelector('h1')
    check(`${label} program heading`, (await page.textContent('h1')) === 'Software Engineering')
    check(`${label} phase depth label`, (await page.textContent('#phase-engineering-practice >> xpath=..')).includes('Phase 1 · Core'))
    const domainCount = await page.locator('.domain').count()
    check(`${label} SE domains rendered`, domainCount === 8, `${domainCount}`)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    check(`${label} program no horizontal overflow`, overflow <= 0, `${overflow}px`)
    await page.screenshot({ path: `${process.env.SHOT_DIR || '/tmp'}/g2-${label}-program.png`, fullPage: false })

    await page.click('a[href="#/topic/program-decomposition-typescript-functions"]')
    await page.waitForSelector('nav[aria-label="Breadcrumb"]')
    const crumbs = await page.$$eval('nav[aria-label="Breadcrumb"] li', (els) => els.map((e) => e.textContent.trim()))
    check(`${label} breadcrumbs P→Ph→D→T`, JSON.stringify(crumbs) === JSON.stringify(['Programs', 'Software Engineering', 'Engineering Practice', 'Design & Decomposition', 'Program decomposition with TypeScript functions']), crumbs.join(' > '))
    check(`${label} eyebrow depth`, (await page.textContent('.eyebrow')) === 'Software Engineering · Foundation')
    check(`${label} concepts visible`, await page.locator('h2#concepts').isVisible())
    const prereqTexts = await page.$$eval('[aria-label="Topic prerequisites"] li', (els) => els.map((e) => e.textContent.trim()))
    check(`${label} topic prereq links`, prereqTexts.join('|') === 'Decomposition|Functions & scope', prereqTexts.join('|'))
    check(`${label} phase requires core programming`, (await page.textContent('.right-rail')).includes('Programming & Algorithms Foundation'))
    const focused = await page.evaluate(() => document.activeElement?.id)
    check(`${label} focus moved to heading`, focused === 'page-title', focused)
    const overflow2 = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    check(`${label} topic no horizontal overflow`, overflow2 <= 0, `${overflow2}px`)
    await page.screenshot({ path: `${process.env.SHOT_DIR || '/tmp'}/g2-${label}-topic.png`, fullPage: true })

    await page.click('[aria-label="Topic prerequisites"] a >> nth=0')
    await page.waitForFunction(() => document.querySelector('h1')?.textContent === 'Decomposition')
    const c2 = await page.$$eval('nav[aria-label="Breadcrumb"] li', (els) => els.map((e) => e.textContent.trim()))
    check(`${label} prereq navigates to core topic`, c2.join('>') === 'Programs>Universal Technology Core>Computational Thinking>Abstraction & Decomposition>Decomposition', c2.join(' > '))

    await page.goto(BASE + '#/core')
    await page.waitForSelector('.domain')
    const coreDomains = await page.locator('.domain').count()
    check(`${label} core domains`, coreDomains === 19, `${coreDomains}`)
    check(`${label} core has 7 phases`, (await page.locator('.phase').count()) === 7)
    const coreOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    check(`${label} core no horizontal overflow`, coreOverflow <= 0, `${coreOverflow}px`)
    await page.screenshot({ path: `${process.env.SHOT_DIR || '/tmp'}/g2-${label}-core.png`, fullPage: true })

    await page.goto(BASE + '#/topic/discrete-mathematics')
    await page.waitForSelector('h1')
    check(`${label} shared topic shows other program`, (await page.textContent('.right-rail')).includes('Also appears in'))

    check(`${label} no console errors`, errors.length === 0, errors.join(' | '))
    await page.close()
  }
  await browser.close()
  console.log(results.join('\n'))
  console.log(`${results.filter((r) => r.startsWith('PASS')).length}/${results.length} passed`)
})()
