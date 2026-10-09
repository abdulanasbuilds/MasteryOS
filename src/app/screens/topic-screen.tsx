import { useRef, useState, type KeyboardEvent } from 'react'
import {
  findPhase,
  getLessonForTopic,
  getProgram,
  getTopic,
  topicPrerequisites,
  topicTitle,
  type TopicPlacement,
} from '../../content/curriculum'
import type { Lesson } from '../../domain/content'
import { AskAIButton } from '../ai'
import { progressFor, stateOf, type LearnerLoad } from '../learner'
import { href } from '../router'
import { ContextBreadcrumbs, depthLabel, EmptyState, MasteryBadge, PageHeader, ReservedSurface, type Crumb } from '../ui'

const MODES = [
  { id: 'read', label: 'Read' },
  { id: 'visualize', label: 'Visualize' },
  { id: 'practice', label: 'Practice' },
  { id: 'assess', label: 'Assess' },
] as const

type Mode = (typeof MODES)[number]['id']

function ModeTabs({ mode, onChange }: { mode: Mode; onChange: (mode: Mode) => void }) {
  const refs = useRef<Array<HTMLButtonElement | null>>([])

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index
    if (event.key === 'ArrowRight') next = (index + 1) % MODES.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + MODES.length) % MODES.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = MODES.length - 1
    else return
    event.preventDefault()
    onChange(MODES[next].id)
    refs.current[next]?.focus()
  }

  return (
    <div role="tablist" aria-label="Learning mode" className="mode-tabs">
      {MODES.map((item, index) => (
        <button
          key={item.id}
          ref={(element) => {
            refs.current[index] = element
          }}
          role="tab"
          type="button"
          id={`tab-${item.id}`}
          aria-selected={mode === item.id}
          aria-controls={`panel-${item.id}`}
          tabIndex={mode === item.id ? 0 : -1}
          onClick={() => onChange(item.id)}
          onKeyDown={(event) => onKeyDown(event, index)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

function LessonReader({ lesson }: { lesson: Lesson }) {
  return (
    <>
      <section className="content-block" aria-labelledby="objectives">
        <h2 id="objectives">Objectives</h2>
        <ul>
          {lesson.objectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
      </section>
      <section className="content-block" aria-labelledby="concepts">
        <h2 id="concepts">Key concepts</h2>
        <ul>
          {lesson.concepts.map((concept) => (
            <li key={concept.id}>{concept.name}</li>
          ))}
        </ul>
        <p className="muted small">
          Version {lesson.version} · {lesson.status} · {lesson.estimatedMinutes} min · original MasteryOS content
          {lesson.provenance.rightsClass !== 'native-original' && ` (${lesson.provenance.rightsClass})`}
        </p>
      </section>
      {lesson.sections.map((section) => (
        <section className="content-block" key={section.id} aria-labelledby={`sec-${section.id}`}>
          <div className="block-head">
            <h2 id={`sec-${section.id}`}>{section.title}</h2>
            <AskAIButton
              attachment={{
                label: `Section: ${section.title}`,
                topicId: lesson.topicId,
                selectedText: section.body,
              }}
            >
              Ask about this section
            </AskAIButton>
          </div>
          {section.kind === 'code' ? (
            <pre tabIndex={0} aria-label={`${section.title} code`}>
              <code>{section.body}</code>
            </pre>
          ) : (
            <p>{section.body}</p>
          )}
        </section>
      ))}
    </>
  )
}

function PracticePreview({ lesson }: { lesson: Lesson }) {
  return (
    <section className="practice-block" aria-labelledby="practice-heading">
      <span className="label">Practice</span>
      <h2 id="practice-heading">Make the idea yours</h2>
      {lesson.practice.map((item) => (
        <div className="practice-item" key={item.id}>
          <span className="tag">{item.type}</span>
          <p>{item.prompt}</p>
        </div>
      ))}
      <p className="muted small">
        Attempt submission, feedback and evidence recording arrive with the practice/assessment engine (Gate 5). Reading
        these prompts does not change your mastery state.
      </p>
    </section>
  )
}

export function TopicScreen({
  topicId,
  learner,
  locations,
}: {
  topicId: string
  learner: LearnerLoad
  locations: TopicPlacement[]
}) {
  const [mode, setMode] = useState<Mode>('read')
  const lesson = getLessonForTopic(topicId)
  const progress = progressFor(learner, topicId)
  const title = topicTitle(topicId)

  // A topic with an authored lesson is shown in the lesson's program; otherwise its first placement.
  const primary = (lesson && locations.find((location) => location.program.id === lesson.programId)) ?? locations[0]
  const others = locations.filter((location) => location !== primary)
  const lessonProgram = lesson ? getProgram(lesson.programId) : undefined
  const topic = getTopic(topicId)
  const topicPrereqs = topicPrerequisites(topicId)
  const crumbs: Crumb[] = [{ label: 'Programs', route: { name: 'programs' } }]
  if (primary) {
    crumbs.push({ label: primary.program.title, route: { name: 'program', programId: primary.program.id } })
    crumbs.push({ label: primary.phase.title })
    crumbs.push({ label: primary.domain.title })
  } else if (lessonProgram) {
    crumbs.push({ label: lessonProgram.title, route: { name: 'program', programId: lessonProgram.id } })
  }
  crumbs.push({ label: title })

  return (
    <div className="learning-layout">
      <article className="lesson">
        <ContextBreadcrumbs crumbs={crumbs} />
        <PageHeader
          eyebrow={primary ? `${primary.program.title} · ${depthLabel(lesson?.depth ?? primary.depth)}` : 'Topic'}
          title={title}
          lead={lesson?.summary ?? topic?.summary}
        />
        <ModeTabs mode={mode} onChange={setMode} />
        <div role="tabpanel" id={`panel-${mode}`} aria-labelledby={`tab-${mode}`} className="mode-panel">
          {mode === 'read' &&
            (lesson ? (
              <LessonReader lesson={lesson} />
            ) : (
              <EmptyState title="No lesson authored yet">
                This topic is part of the curriculum, but its native MasteryOS lesson has not been written. Authored
                lessons are added one competency at a time; the interactive runtime arrives with Gate 3.
              </EmptyState>
            ))}
          {mode === 'visualize' && (
            <ReservedSurface title="Visual / workbench mode" gate="Gate 3 & 9">
              Diagrams, interactive visualizations and technical workbenches attach here when they add learning value
              text cannot.
            </ReservedSurface>
          )}
          {mode === 'practice' &&
            (lesson ? (
              <PracticePreview lesson={lesson} />
            ) : (
              <EmptyState title="No practice yet">Practice is authored together with the lesson.</EmptyState>
            ))}
          {mode === 'assess' && (
            <ReservedSurface title="Assessment" gate="Gate 5">
              {lesson
                ? `Assessment ${lesson.assessmentId} will collect evidence here. Mastery requires passing it independently; opening or reading the lesson never counts.`
                : 'Assessment is authored together with the lesson.'}
            </ReservedSurface>
          )}
        </div>
      </article>

      <aside className="right-rail" aria-label="Topic status">
        <div className="panel">
          <span className="label">Mastery</span>
          <p>
            <MasteryBadge state={stateOf(progress)} />
          </p>
          <p className="small">
            Evidence recorded: <strong>{progress?.evidenceIds.length ?? 0}</strong>
          </p>
          <p className="muted small">Unlocking requires assessed evidence, not completion.</p>
        </div>
        <div className="panel">
          <span className="label">Prerequisites</span>
          {topicPrereqs.length > 0 && (
            <>
              <p className="small">Topics this builds on:</p>
              <ul className="plain-list" aria-label="Topic prerequisites">
                {topicPrereqs.map((prerequisite) => (
                  <li key={prerequisite.id}>
                    <a href={href({ name: 'topic', topicId: prerequisite.id })}>{prerequisite.title}</a>
                  </li>
                ))}
              </ul>
            </>
          )}
          {primary && primary.phase.prerequisites.length > 0 && <p className="small">Phase requires:</p>}
          {primary && primary.phase.prerequisites.length > 0 ? (
            <ul className="plain-list">
              {primary.phase.prerequisites.map((id) => {
                const location = findPhase(id)
                return (
                  <li key={id}>
                    {location ? (
                      <a href={href({ name: 'program', programId: location.program.id })}>
                        {location.phase.title}
                      </a>
                    ) : (
                      `${id} (not in manifest)`
                    )}
                  </li>
                )
              })}
            </ul>
          ) : (
            topicPrereqs.length === 0 && <p className="small">No prerequisites declared.</p>
          )}
          {others.length > 0 && (
            <p className="muted small">
              Also appears in:{' '}
              {others.map((location, index) => (
                <span key={`${location.program.id}-${location.phase.id}`}>
                  {index > 0 && ', '}
                  <a href={href({ name: 'program', programId: location.program.id })}>{location.program.title}</a>
                </span>
              ))}
            </p>
          )}
        </div>
        <div className="panel">
          <span className="label">AI</span>
          <p className="small">Optional. Ask about a specific section, or the topic as a whole.</p>
          <AskAIButton attachment={{ label: `Topic: ${title}`, topicId }}>Ask about this topic</AskAIButton>
        </div>
      </aside>
    </div>
  )
}
