import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { UnconfiguredAIProvider, type AIProvider } from '../ai/provider'
import { firstLesson } from '../content/first-lesson'
import type { LocalLearnerState } from '../storage/local-store'
import { App } from './App'

// Tell React this environment supports act().
;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
// jsdom does not implement scrolling; the shell resets scroll on navigation.
window.scrollTo = () => {}

const emptyState = (): Promise<LocalLearnerState> => Promise.resolve({ version: 1, progress: {}, evidence: [] })

let container: HTMLDivElement
let root: Root

async function render(props: { aiProvider?: AIProvider; loadState?: () => Promise<LocalLearnerState> } = {}) {
  await act(async () => {
    root.render(<App loadState={props.loadState ?? emptyState} aiProvider={props.aiProvider} />)
  })
}

async function navigate(hash: string) {
  await act(async () => {
    window.location.hash = hash
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  })
}

function heading(): string {
  return container.querySelector('h1')?.textContent ?? ''
}

function byText(selector: string, text: string): HTMLElement {
  const match = Array.from(container.querySelectorAll<HTMLElement>(selector)).find((element) =>
    element.textContent?.includes(text),
  )
  if (!match) throw new Error(`No ${selector} containing “${text}”`)
  return match
}

async function click(element: HTMLElement) {
  await act(async () => {
    element.click()
  })
}

beforeEach(() => {
  window.location.hash = ''
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
})

afterEach(async () => {
  await act(async () => root.unmount())
  container.remove()
})

describe('application shell', () => {
  it('renders landmarks, skip link and all primary navigation entries', async () => {
    await render()
    expect(container.querySelector('header')).not.toBeNull()
    expect(container.querySelector('main#main')).not.toBeNull()
    expect(container.querySelector('nav[aria-label="Primary"]')).not.toBeNull()
    expect(byText('a', 'Skip to content')).toBeTruthy()
    const labels = Array.from(container.querySelectorAll('.primary-nav a')).map((link) => link.textContent)
    expect(labels).toEqual([
      'Today',
      'Universal Core',
      'Programs',
      'Practice',
      'Projects',
      'Progress',
      'Resources',
      'Settings',
    ])
  })

  it.each([
    ['#/', 'Your next action'],
    ['#/core', 'Universal Technology Core'],
    ['#/programs', 'Programs'],
    ['#/programs/web-engineering', 'Web Engineering'],
    [`#/topic/${firstLesson.topicId}`, firstLesson.title],
    ['#/topic/problem-decomposition', 'Problem decomposition'],
    ['#/practice', 'Practice'],
    ['#/projects', 'Projects'],
    ['#/progress', 'Progress'],
    ['#/resources', 'Resources'],
    ['#/settings', 'Settings'],
    ['#/does-not-exist', 'Nothing here'],
    ['#/topic/not-a-real-topic', 'Nothing here'],
    ['#/programs/not-a-real-program', 'Nothing here'],
  ])('route %s renders “%s”', async (hash, title) => {
    await render()
    await navigate(hash)
    expect(heading()).toBe(title)
  })

  it('marks the active section with aria-current and moves focus to the page heading', async () => {
    await render()
    await navigate('#/progress')
    const current = container.querySelector('.primary-nav a[aria-current="page"]')
    expect(current?.textContent).toBe('Progress')
    expect(document.activeElement?.id).toBe('page-title')

    await navigate('#/topic/problem-decomposition')
    expect(container.querySelector('.primary-nav a[aria-current="page"]')?.textContent).toBe('Universal Core')
  })

  it('shows contextual breadcrumbs inside a route', async () => {
    await render()
    await navigate('#/topic/problem-decomposition')
    const crumbs = Array.from(container.querySelectorAll('.breadcrumbs li')).map((item) => item.textContent)
    expect(crumbs[0]).toBe('Programs')
    expect(crumbs[1]).toBe('Universal Technology Core')
    expect(crumbs.at(-1)).toBe('Problem decomposition')
  })

  it('renders one real curriculum path from Program to Lesson (Gate 2 acceptance)', async () => {
    await render()
    await navigate('#/programs/software-engineering')
    expect(heading()).toBe('Software Engineering')
    const phase = container.querySelector<HTMLElement>('#phase-engineering-practice')!.closest('section')!
    expect(phase.textContent).toContain('Phase 1 · Core')
    const domain = container.querySelector<HTMLElement>('#domain-engineering-practice-design-and-decomposition')!
    expect(domain.textContent).toBe('Design & Decomposition')
    const lessonLink = Array.from(domain.closest('section')!.querySelectorAll<HTMLAnchorElement>('a')).find(
      (link) => link.getAttribute('href') === `#/topic/${firstLesson.topicId}`,
    )!
    expect(lessonLink.textContent).toBe(firstLesson.title)

    await navigate(`#/topic/${firstLesson.topicId}`)
    const crumbs = Array.from(container.querySelectorAll('nav[aria-label="Breadcrumb"] li')).map((li) => li.textContent)
    expect(crumbs).toEqual(['Programs', 'Software Engineering', 'Engineering Practice', 'Design & Decomposition', firstLesson.title])
    expect(container.querySelector('.eyebrow')?.textContent).toBe('Software Engineering · Foundation')
    expect(byText('h2', 'Key concepts')).toBeTruthy()
    const prereqs = container.querySelector('[aria-label="Topic prerequisites"]')
    expect(Array.from(prereqs!.querySelectorAll('li')).map((li) => li.textContent)).toEqual(['Decomposition', 'Functions & scope'])
    expect(byText('.right-rail p', 'Phase requires').nextElementSibling?.textContent).toContain('Programming & Algorithms Foundation')
  })

  it('shows which programs a core phase feeds and which topics a core topic leads to', async () => {
    await render()
    await navigate('#/core')
    const systems = container.querySelector<HTMLElement>('#phase-systems-foundation')!.closest('section')!
    expect(systems.querySelector('.feeds')?.textContent).toContain('Computer Science')
    await navigate('#/topic/how-the-web-works')
    const leadsTo = Array.from(container.querySelectorAll('[aria-label="Topics that build on this"] li')).map((li) => li.textContent)
    expect(leadsTo).toEqual(expect.arrayContaining(['HTTP', 'HTTP basics', 'Browser runtime', 'URLs & routing']))
  })

  it('does not grant mastery or evidence from opening or reading a lesson', async () => {
    await render()
    await navigate(`#/topic/${firstLesson.topicId}`)
    expect(container.textContent).toContain('Not started')
    expect(container.textContent).toContain('Evidence recorded: 0')
    expect(container.textContent).not.toMatch(/mark (practice|complete)/i)
    await click(byText('[role="tab"]', 'Practice'))
    expect(container.textContent).toContain('Not started')
  })

  it('supports keyboard navigation between learning-mode tabs', async () => {
    await render()
    await navigate(`#/topic/${firstLesson.topicId}`)
    const readTab = byText('[role="tab"]', 'Read')
    await act(async () => {
      readTab.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
    })
    const selected = container.querySelector('[role="tab"][aria-selected="true"]')
    expect(selected?.textContent).toBe('Visualize')
    expect(document.activeElement).toBe(selected)
    expect(container.querySelector('[role="tabpanel"]')?.getAttribute('aria-labelledby')).toBe('tab-visualize')
    await act(async () => {
      selected!.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }))
    })
    expect(container.querySelector('[role="tab"][aria-selected="true"]')?.textContent).toBe('Assess')
  })
})

describe('contextual AI', () => {
  it('opens with section context, degrades gracefully when unconfigured, and closes on Escape', async () => {
    await render({ aiProvider: new UnconfiguredAIProvider() })
    await navigate(`#/topic/${firstLesson.topicId}`)

    const trigger = byText('button', 'Ask about this section')
    trigger.focus()
    await click(trigger)

    const panel = container.querySelector('#ai-panel')
    expect(panel).not.toBeNull()
    expect(panel?.textContent).toContain(`Section: ${firstLesson.sections[0].title}`)

    const textarea = panel!.querySelector('textarea')!
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')!.set!
      setter.call(textarea, 'Why split these functions?')
      textarea.dispatchEvent(new Event('input', { bubbles: true }))
    })
    await act(async () => {
      panel!.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    })
    expect(panel?.textContent).toContain('AI is unavailable.')
    expect(panel?.textContent).toContain('keep working')

    // The lesson is still fully usable.
    expect(heading()).toBe(firstLesson.title)

    await act(async () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await new Promise((resolve) => requestAnimationFrame(() => resolve(null)))
    })
    expect(container.querySelector('#ai-panel')).toBeNull()
    expect(document.activeElement).toBe(trigger)
  })

  it('renders AI output as plain text, never as HTML', async () => {
    const hostile: AIProvider = {
      testConnection: async () => true,
      explain: async () => ({ text: '<img src=x onerror=alert(1)>', assistanceLevel: 1 }),
      coach: async () => ({ text: '<img src=x onerror=alert(1)>', assistanceLevel: 1 }),
    }
    await render({ aiProvider: hostile })
    await click(byText('button', 'Assistant'))
    const panel = container.querySelector('#ai-panel')!
    const textarea = panel.querySelector('textarea')!
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')!.set!
      setter.call(textarea, 'hello')
      textarea.dispatchEvent(new Event('input', { bubbles: true }))
    })
    await act(async () => {
      panel.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    })
    expect(panel.querySelector('img')).toBeNull()
    expect(panel.querySelector('.ai-answer')?.textContent).toBe('<img src=x onerror=alert(1)>')
  })
})

describe('local state states', () => {
  it('shows a recoverable error when local state cannot be read and keeps navigation working', async () => {
    await render({ loadState: () => Promise.reject(new Error('blocked')) })
    expect(container.querySelector('[role="alert"]')?.textContent).toContain('could not be read')
    await navigate('#/core')
    expect(heading()).toBe('Universal Technology Core')
  })

  it('reflects stored evidence without inventing it', async () => {
    const stored: LocalLearnerState = {
      version: 1,
      progress: {
        'problem-decomposition': {
          topicId: 'problem-decomposition',
          state: 'needs-review',
          masteryScore: 0.4,
          evidenceIds: ['e1'],
          updatedAt: '2026-10-01T00:00:00.000Z',
        },
      },
      evidence: [
        {
          id: 'e1',
          topicId: 'problem-decomposition',
          type: 'assessment',
          score: 0.4,
          assistanceLevel: 0,
          passed: false,
          createdAt: '2026-10-01T00:00:00.000Z',
        },
      ],
    }
    await render({ loadState: () => Promise.resolve(stored) })
    expect(container.textContent).toContain('Weak areas')
    expect(byText('a', 'Problem decomposition')).toBeTruthy()
    expect(container.textContent).toContain('not passed (40%)')
  })

  it('reports the unconfigured AI provider honestly in Settings', async () => {
    await render()
    await navigate('#/settings')
    await click(byText('button', 'Test connection'))
    expect(container.textContent).toContain('No AI provider is connected')
  })
})

describe('resources', () => {
  it('filters the catalog and opens external links safely', async () => {
    await render()
    await navigate('#/resources')
    const links = Array.from(container.querySelectorAll<HTMLAnchorElement>('.resource a'))
    expect(links.length).toBeGreaterThan(0)
    for (const link of links) {
      expect(link.href.startsWith('https://')).toBe(true)
      expect(link.rel).toContain('noopener')
      expect(link.rel).toContain('noreferrer')
    }
    const input = container.querySelector<HTMLInputElement>('#resource-search')!
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!
      setter.call(input, 'zzz-no-match')
      input.dispatchEvent(new Event('input', { bubbles: true }))
    })
    expect(container.textContent).toContain('No matching references')
  })
})
