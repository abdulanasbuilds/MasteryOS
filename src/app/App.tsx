import { useEffect, useMemo, useState } from 'react'
import { firstLesson } from '../content/first-lesson'
import { canUnlockTopic, type TopicProgress } from '../domain/mastery'
import { loadLearnerState, saveLearnerState, type LocalLearnerState } from '../storage/local-store'
import { UnconfiguredAIProvider } from '../ai/provider'

const topicId = firstLesson.topicId
const aiProvider = new UnconfiguredAIProvider()

function initialProgress(): TopicProgress {
  return {
    topicId,
    state: 'learning',
    masteryScore: 0,
    evidenceIds: [],
    updatedAt: new Date().toISOString(),
  }
}

export function App() {
  const [view, setView] = useState<'mission' | 'lesson' | 'progress'>('mission')
  const [state, setState] = useState<LocalLearnerState>({ version: 1, progress: {}, evidence: [] })
  const [status, setStatus] = useState('Loading local learner state…')

  useEffect(() => {
    loadLearnerState().then((loaded) => {
      setState(loaded)
      setStatus('Ready — your learning state stays on this device.')
    })
  }, [])

  const progress = state.progress[topicId] ?? initialProgress()
  const unlocked = canUnlockTopic(progress)

  const objectiveCount = useMemo(() => firstLesson.objectives.length, [])

  function beginLesson() {
    setView('lesson')
    setState((current) => ({
      ...current,
      progress: {
        ...current.progress,
        [topicId]: current.progress[topicId] ?? initialProgress(),
      },
    }))
  }

  async function saveProgress(next: TopicProgress) {
    const nextState = {
      ...state,
      progress: { ...state.progress, [topicId]: next },
    }
    setState(nextState)
    await saveLearnerState(nextState)
    setStatus('Progress saved locally.')
  }

  async function markPractice() {
    const next: TopicProgress = {
      ...progress,
      state: 'practiced',
      masteryScore: Math.max(progress.masteryScore, 0.25),
      updatedAt: new Date().toISOString(),
    }
    await saveProgress(next)
  }

  async function runAI() {
    try {
      await aiProvider.coach({
        prompt: 'Help me understand how to decompose a programming problem into functions.',
        topicId,
      })
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'AI provider unavailable.')
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setView('mission')} aria-label="MasteryOS home">
          <span className="brand-mark">M</span>
          <span>MasteryOS</span>
        </button>
        <nav aria-label="Primary navigation">
          <button onClick={() => setView('mission')}>Mission</button>
          <button onClick={() => setView('lesson')}>Learn</button>
          <button onClick={() => setView('progress')}>Progress</button>
        </nav>
      </header>

      <main className="page">
        {view === 'mission' && (
          <section className="hero-grid">
            <div>
              <p className="eyebrow">PERSONAL TECHNOLOGY MASTERY</p>
              <h1>Build capability, not course-completion points.</h1>
              <p className="lead">
                MasteryOS is your local-first learning laboratory. Start with one real competency,
                prove it, and unlock what comes next.
              </p>
              <div className="actions">
                <button className="primary" onClick={beginLesson}>Continue mission</button>
                <button className="secondary" onClick={() => setView('progress')}>View progress</button>
              </div>
            </div>
            <aside className="mission-card">
              <span className="label">CURRENT MISSION</span>
              <h2>{firstLesson.title}</h2>
              <p>{firstLesson.summary}</p>
              <div className="mini-stats">
                <span>{objectiveCount} objectives</span>
                <span>{firstLesson.practice.length} practice tasks</span>
                <span>{progress.state}</span>
              </div>
            </aside>
          </section>
        )}

        {view === 'lesson' && (
          <section className="learning-layout">
            <article className="lesson">
              <p className="eyebrow">SOFTWARE ENGINEERING · FOUNDATION</p>
              <h1>{firstLesson.title}</h1>
              <p className="lead">{firstLesson.summary}</p>

              <section className="content-block">
                <h2>Objectives</h2>
                <ul>
                  {firstLesson.objectives.map((objective) => <li key={objective}>{objective}</li>)}
                </ul>
              </section>

              {firstLesson.sections.map((section) => (
                <section className="content-block" key={section.id}>
                  <h2>{section.title}</h2>
                  {section.kind === 'code' ? <pre><code>{section.body}</code></pre> : <p>{section.body}</p>}
                </section>
              ))}

              <section className="practice-block">
                <div>
                  <span className="label">PRACTICE</span>
                  <h2>Make the idea yours</h2>
                </div>
                {firstLesson.practice.map((item) => (
                  <div className="practice-item" key={item.id}>
                    <span>{item.type}</span>
                    <p>{item.prompt}</p>
                  </div>
                ))}
                <div className="actions">
                  <button className="primary" onClick={markPractice}>Mark practice attempted</button>
                  <button className="secondary" onClick={runAI}>Ask AI coach</button>
                </div>
              </section>
            </article>

            <aside className="right-rail">
              <div className="panel">
                <span className="label">MASTERY</span>
                <div className="progress-bar"><span style={{ width: `${Math.round(progress.masteryScore * 100)}%` }} /></div>
                <strong>{Math.round(progress.masteryScore * 100)}%</strong>
                <p>{unlocked ? 'Topic mastered and eligible to unlock.' : 'Complete the assessment and independent challenge to unlock.'}</p>
              </div>
              <div className="panel">
                <span className="label">AI</span>
                <p>Contextual assistance is wired as a provider boundary. A real provider can be connected without redesigning the lesson.</p>
              </div>
            </aside>
          </section>
        )}

        {view === 'progress' && (
          <section>
            <p className="eyebrow">LOCAL LEARNER STATE</p>
            <h1>Progress</h1>
            <div className="progress-card">
              <h2>{firstLesson.title}</h2>
              <p>State: <strong>{progress.state}</strong></p>
              <p>Mastery score: <strong>{Math.round(progress.masteryScore * 100)}%</strong></p>
              <p>Evidence recorded: <strong>{progress.evidenceIds.length}</strong></p>
              <p className="muted">No cloud database is required for this core flow.</p>
            </div>
          </section>
        )}

        <footer className="status" aria-live="polite">{status}</footer>
      </main>
    </div>
  )
}
