import { getProgram, programTopicIds, programs, topicCount, topicTitle } from '../../content/curriculum'
import { firstLesson } from '../../content/first-lesson'
import type { MasteryState } from '../../domain/mastery'
import { AskAIButton } from '../ai'
import { evidenceList, MASTERY_LABELS, progressFor, stateOf, type LearnerLoad } from '../learner'
import { href } from '../router'
import { EmptyState, MasteryBadge, PageHeader, Section } from '../ui'

function weakTopics(learner: LearnerLoad): string[] {
  if (learner.status !== 'ready') return []
  const failed = learner.state.evidence.filter((item) => !item.passed).map((item) => item.topicId)
  const review = Object.values(learner.state.progress)
    .filter((progress) => progress.state === 'needs-review')
    .map((progress) => progress.topicId)
  return Array.from(new Set([...review, ...failed])).slice(0, 2)
}

export function TodayScreen({ learner }: { learner: LearnerLoad }) {
  const topicId = firstLesson.topicId
  const progress = progressFor(learner, topicId)
  const state = stateOf(progress)
  const program = getProgram(firstLesson.programId)
  const weak = weakTopics(learner)
  const recent = evidenceList(learner).slice(-3).reverse()

  return (
    <>
      <PageHeader eyebrow="Today" title="Your next action" />
      <div className="today-grid">
        <section className="mission" aria-labelledby="mission-title">
          <span className="label">Current route · {program?.title ?? firstLesson.programId}</span>
          <h2 id="mission-title">{firstLesson.title}</h2>
          <p>{firstLesson.summary}</p>
          <p>
            <MasteryBadge state={state} />
          </p>
          <div className="actions">
            <a className="button primary" href={href({ name: 'topic', topicId })}>
              {state === 'not-started' ? 'Start lesson' : 'Continue lesson'}
            </a>
            <AskAIButton attachment={{ label: `Topic: ${firstLesson.title}`, topicId }}>Ask AI about this topic</AskAIButton>
          </div>
        </section>

        <Section title="Weak areas" label="Needs attention">
          {weak.length > 0 ? (
            <ul className="plain-list">
              {weak.map((id) => (
                <li key={id}>
                  <a href={href({ name: 'topic', topicId: id })}>{topicTitle(id)}</a>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="None recorded yet">Weak areas appear after assessed attempts reveal them.</EmptyState>
          )}
        </Section>

        <Section title="Recent evidence" label="Attempts">
          {recent.length > 0 ? (
            <ul className="plain-list">
              {recent.map((item) => (
                <li key={item.id}>
                  {topicTitle(item.topicId)} — {item.type}, {item.passed ? 'passed' : 'not passed'} (
                  {Math.round(item.score * 100)}%)
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="No evidence yet">
              Evidence is recorded when you complete practice and assessments, not when you open a lesson.
            </EmptyState>
          )}
        </Section>
      </div>
    </>
  )
}

export function PracticeScreen({ learner }: { learner: LearnerLoad }) {
  const weak = weakTopics(learner)
  return (
    <>
      <PageHeader
        eyebrow="Practice"
        title="Practice"
        lead="Deliberate practice and remediation. Practice types will include questions, code, debugging, reasoning and design tasks."
      />
      <Section title="Current exercise set" label={firstLesson.title}>
        <ul className="practice-list">
          {firstLesson.practice.map((item) => (
            <li key={item.id}>
              <span className="tag">{item.type}</span>
              <p>{item.prompt}</p>
            </li>
          ))}
        </ul>
        <a className="button secondary" href={href({ name: 'topic', topicId: firstLesson.topicId })}>
          Open in topic
        </a>
      </Section>
      <Section title="Remediation queue" label="Diagnose → remediate → reassess">
        {weak.length > 0 ? (
          <ul className="plain-list">
            {weak.map((id) => (
              <li key={id}>{topicTitle(id)}</li>
            ))}
          </ul>
        ) : (
          <EmptyState title="Nothing to remediate">
            Failed assessments route here for diagnosis and reassessment once the assessment engine (Gate 5) exists.
          </EmptyState>
        )}
      </Section>
    </>
  )
}

export function ProjectsScreen({ learner }: { learner: LearnerLoad }) {
  const mastered =
    learner.status === 'ready'
      ? Object.values(learner.state.progress).filter((progress) => progress.state === 'mastered').length
      : 0
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Projects"
        lead="Applied work that draws on mastered topics. Projects are evidence, not decoration."
      />
      <EmptyState title="No projects authored yet">
        Projects become available as their underlying topics are mastered. Topics mastered so far: {mastered}.
      </EmptyState>
    </>
  )
}

const STATE_ORDER: Array<MasteryState> = ['mastered', 'provisionally-mastered', 'practiced', 'learning', 'needs-review']

export function ProgressScreen({ learner }: { learner: LearnerLoad }) {
  const tracked = learner.status === 'ready' ? Object.values(learner.state.progress) : []
  const evidence = evidenceList(learner)
  const passed = evidence.filter((item) => item.passed).length

  return (
    <>
      <PageHeader
        eyebrow="Local learner state"
        title="Progress"
        lead="Mastery is measured by evidence. Nothing here counts lessons opened or time spent."
      />
      <Section title="Mastery states" label="Tracked topics">
        <dl className="state-grid">
          {STATE_ORDER.map((state) => (
            <div key={state}>
              <dt>{MASTERY_LABELS[state]}</dt>
              <dd>{tracked.filter((progress) => progress.state === state).length}</dd>
            </div>
          ))}
        </dl>
        {tracked.length === 0 && (
          <EmptyState title="No topics tracked yet">Topics appear here once you attempt practice or assessments.</EmptyState>
        )}
      </Section>

      <Section title="Route progress" label="By evidence">
        <div className="table-scroll">
          <table>
            <caption className="sr-only">Mastered topics per program</caption>
            <thead>
              <tr>
                <th scope="col">Program</th>
                <th scope="col">Mastered</th>
                <th scope="col">Topics</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program) => {
                const mastered = programTopicIds(program)
                  .filter((topicId) => stateOf(progressFor(learner, topicId)) === 'mastered').length
                return (
                  <tr key={program.id}>
                    <th scope="row">
                      <a href={href({ name: 'program', programId: program.id })}>{program.title}</a>
                    </th>
                    <td>{mastered}</td>
                    <td>{topicCount(program)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Evidence summary" label="Attempts">
        <p>
          Evidence records: <strong>{evidence.length}</strong> · passed: <strong>{passed}</strong> · not passed:{' '}
          <strong>{evidence.length - passed}</strong>
        </p>
        <p className="muted small">Stored on this device only. No cloud database is involved.</p>
      </Section>
    </>
  )
}
