import { useEffect, useRef, useState } from 'react'
import { UnconfiguredAIProvider, type AIProvider } from '../ai/provider'
import { findTopicLocations, UNIVERSAL_CORE_ID } from '../content/curriculum'
import type { LocalLearnerState } from '../storage/local-store'
import { loadLearnerState } from '../storage/local-store'
import { AIPanel, AIProviderScope, useAI } from './ai'
import { useLearnerState, type LearnerLoad } from './learner'
import { href, routePath, sectionOf, useRoute, type Route } from './router'
import { CoreScreen, ProgramScreen, ProgramsScreen, TopicRoute } from './screens/curriculum-screens'
import { PracticeScreen, ProgressScreen, ProjectsScreen, TodayScreen } from './screens/learner-screens'
import { NotFoundScreen, ResourcesScreen, SettingsScreen } from './screens/system-screens'

const NAV_ITEMS: Array<{ route: Route; label: string }> = [
  { route: { name: 'today' }, label: 'Today' },
  { route: { name: 'core' }, label: 'Universal Core' },
  { route: { name: 'programs' }, label: 'Programs' },
  { route: { name: 'practice' }, label: 'Practice' },
  { route: { name: 'projects' }, label: 'Projects' },
  { route: { name: 'progress' }, label: 'Progress' },
  { route: { name: 'resources' }, label: 'Resources' },
  { route: { name: 'settings' }, label: 'Settings' },
]

function activeSection(route: Route): Route['name'] {
  if (route.name === 'topic') {
    const [first] = findTopicLocations(route.topicId)
    if (first?.program.id === UNIVERSAL_CORE_ID) return 'core'
  }
  if (route.name === 'program' && route.programId === UNIVERSAL_CORE_ID) return 'core'
  return sectionOf(route)
}

function PrimaryNav({ route, onNavigate }: { route: Route; onNavigate: () => void }) {
  const current = activeSection(route)
  return (
    <ul className="primary-nav">
      {NAV_ITEMS.map((item) => (
        <li key={item.label}>
          <a
            href={href(item.route)}
            aria-current={current === item.route.name ? 'page' : undefined}
            onClick={onNavigate}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

function AIToggle() {
  const { open, openPanel, closePanel } = useAI()
  return (
    <button
      type="button"
      className="ai-toggle"
      aria-expanded={open}
      aria-controls="ai-panel"
      onClick={() => (open ? closePanel() : openPanel())}
    >
      <span aria-hidden="true" className="ask-ai-mark">
        AI
      </span>
      <span className="ai-toggle-text">Assistant</span>
    </button>
  )
}

function Screen({ route, learner, provider }: { route: Route; learner: LearnerLoad; provider: AIProvider }) {
  switch (route.name) {
    case 'today':
      return <TodayScreen learner={learner} />
    case 'core':
      return <CoreScreen learner={learner} />
    case 'programs':
      return <ProgramsScreen learner={learner} />
    case 'program':
      return <ProgramScreen programId={route.programId} learner={learner} />
    case 'topic':
      return <TopicRoute key={route.topicId} topicId={route.topicId} learner={learner} />
    case 'practice':
      return <PracticeScreen learner={learner} />
    case 'projects':
      return <ProjectsScreen learner={learner} />
    case 'progress':
      return <ProgressScreen learner={learner} />
    case 'resources':
      return <ResourcesScreen />
    case 'settings':
      return <SettingsScreen learner={learner} provider={provider} />
    case 'not-found':
      return <NotFoundScreen what={`The page “${route.path}”`} />
  }
}

function StatusBanner({ learner }: { learner: LearnerLoad }) {
  if (learner.status === 'loading') {
    return (
      <p className="status-banner" role="status">
        Loading local learner state…
      </p>
    )
  }
  if (learner.status === 'error') {
    return (
      <p className="status-banner status-error" role="alert">
        Local learner state could not be read ({learner.message}). You can keep learning; progress will not be shown
        until storage is available.
      </p>
    )
  }
  return (
    <p className="status-banner status-quiet" role="status">
      Local mode — your learning state stays on this device.
    </p>
  )
}

function Shell({ provider, learner }: { provider: AIProvider; learner: LearnerLoad }) {
  const route = useRoute()
  const { open: aiOpen } = useAI()
  const [menuOpen, setMenuOpen] = useState(false)
  const path = routePath(route)
  const firstRender = useRef(true)

  // On route change: close the mobile menu, reset scroll, and move focus to the page heading
  // so screen-reader and keyboard users land on the new content.
  useEffect(() => {
    setMenuOpen(false)
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    window.scrollTo?.(0, 0)
    document.getElementById('page-title')?.focus()
  }, [path])

  useEffect(() => {
    if (!menuOpen) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <div className={`app-shell${aiOpen ? ' ai-open' : ''}`}>
      <a className="skip-link" href="#main" onClick={(event) => {
        event.preventDefault()
        document.getElementById('main')?.focus()
      }}>
        Skip to content
      </a>
      <header className="topbar">
        <a className="brand" href={href({ name: 'today' })} aria-label="MasteryOS — Today">
          <span className="brand-mark" aria-hidden="true">
            M
          </span>
          <span>MasteryOS</span>
        </a>
        <div className="topbar-actions">
          <AIToggle />
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((value) => !value)}
          >
            Menu
          </button>
        </div>
      </header>

      <div className="workspace">
        <nav id="primary-navigation" aria-label="Primary" className={`sidebar${menuOpen ? ' is-open' : ''}`}>
          <PrimaryNav route={route} onNavigate={() => setMenuOpen(false)} />
          <p className="sidebar-note small">Local-first · no account required</p>
        </nav>

        <main id="main" tabIndex={-1} className="page">
          <StatusBanner learner={learner} />
          <Screen route={route} learner={learner} provider={provider} />
        </main>

        <AIPanel provider={provider} />
      </div>
    </div>
  )
}

export interface AppProps {
  /** Injected for tests and future adapters; defaults to the unconfigured (offline) provider. */
  aiProvider?: AIProvider
  loadState?: () => Promise<LocalLearnerState>
}

const defaultProvider = new UnconfiguredAIProvider()

export function App({ aiProvider = defaultProvider, loadState = loadLearnerState }: AppProps) {
  const learner = useLearnerState(loadState)
  return (
    <AIProviderScope>
      <Shell provider={aiProvider} learner={learner} />
    </AIProviderScope>
  )
}
