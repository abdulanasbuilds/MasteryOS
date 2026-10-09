import {
  findPhase,
  findTopicLocations,
  getLessonForTopic,
  getProgram,
  phaseTopicIds,
  programTopicIds,
  programsFedByCorePhase,
  recommendedRoute,
  specialisedPrograms,
  topicCount,
  topicExists,
  topicTitle,
  universalCore,
  type CurriculumPhase,
  type CurriculumProgram,
} from '../../content/curriculum'
import { firstLesson } from '../../content/first-lesson'
import { progressFor, stateOf, type LearnerLoad } from '../learner'
import { href } from '../router'
import { ContextBreadcrumbs, depthLabel, EmptyState, MasteryBadge, PageHeader } from '../ui'
import { NotFoundScreen } from './system-screens'
import { TopicScreen } from './topic-screen'

function PhasePrerequisites({ phase }: { phase: CurriculumPhase }) {
  if (phase.prerequisites.length === 0) {
    return <p className="prereq muted">No phase prerequisites declared.</p>
  }
  return (
    <p className="prereq">
      <span className="label">Requires</span>{' '}
      {phase.prerequisites.map((id, index) => {
        const location = findPhase(id)
        return (
          <span key={id}>
            {index > 0 && ', '}
            {location ? (
              <a href={href({ name: 'program', programId: location.program.id })}>{location.phase.title}</a>
            ) : (
              <span>{id} (not in manifest)</span>
            )}
          </span>
        )
      })}
    </p>
  )
}

function TopicList({ topics, learner }: { topics: string[]; learner: LearnerLoad }) {
  return (
    <ol className="topic-list">
      {topics.map((topicId) => {
        const authored = Boolean(getLessonForTopic(topicId))
        return (
          <li key={topicId}>
            <a href={href({ name: 'topic', topicId })}>{topicTitle(topicId)}</a>
            <span className="topic-meta">
              <MasteryBadge state={stateOf(progressFor(learner, topicId))} />
              {authored && <span className="tag tag-strong">Lesson available</span>}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

/** A phase's domains, each with its ordered topic list. */
function DomainList({ phase, learner }: { phase: CurriculumPhase; learner: LearnerLoad }) {
  return (
    <div className="domain-list">
      {phase.domains.map((domain) => (
        <section key={domain.id} className="domain" aria-labelledby={`domain-${phase.id}-${domain.id}`}>
          <h3 id={`domain-${phase.id}-${domain.id}`}>{domain.title}</h3>
          <TopicList topics={domain.topics} learner={learner} />
        </section>
      ))}
    </div>
  )
}

function masteredCount(program: CurriculumProgram, learner: LearnerLoad): number {
  return programTopicIds(program)
    .filter((topicId) => stateOf(progressFor(learner, topicId)) === 'mastered').length
}

export function CoreScreen({ learner }: { learner: LearnerLoad }) {
  if (!universalCore) {
    return (
      <EmptyState title="Universal Core missing">
        The curriculum manifest does not define a universal-core program.
      </EmptyState>
    )
  }
  const firstPhase = universalCore.phases[0]
  const firstTopic = firstPhase ? phaseTopicIds(firstPhase)[0] : undefined

  return (
    <>
      <PageHeader
        eyebrow="Shared foundations"
        title={universalCore.title}
        lead="Transferable foundations that feed the specialized programs. Status reflects recorded evidence only; native lessons are authored progressively."
      />
      {firstTopic && (
        <p className="callout">
          <span className="label">First in sequence</span>{' '}
          <a href={href({ name: 'topic', topicId: firstTopic })}>{topicTitle(firstTopic)}</a> in {firstPhase.title}
        </p>
      )}
      <div className="phase-grid">
        {universalCore.phases.map((phase, index) => {
          const fed = programsFedByCorePhase(phase.id)
          return (
            <section key={phase.id} className="phase" aria-labelledby={`phase-${phase.id}`}>
              <span className="label">Phase {index + 1}</span>
              <h2 id={`phase-${phase.id}`}>{phase.title}</h2>
              <p className="feeds">
                <span className="label">Feeds</span>{' '}
                {fed.length > 0 ? fed.map((program) => program.title).join(', ') : 'No program declares this phase as a prerequisite yet.'}
              </p>
              <DomainList phase={phase} learner={learner} />
            </section>
          )
        })}
      </div>
    </>
  )
}

export function ProgramsScreen({ learner }: { learner: LearnerLoad }) {
  const activeProgramId = firstLesson.programId
  return (
    <>
      <PageHeader
        eyebrow="Programs & routes"
        title="Programs"
        lead="Specialized routes built on the Universal Core. One recommended route is active; you do not need to choose among all of them to begin."
      />
      <ul className="program-grid" aria-label="Programs">
        {specialisedPrograms.map((program) => {
          const active = program.id === activeProgramId
          const total = topicCount(program)
          return (
            <li key={program.id} className={`program-card${active ? ' is-active' : ''}`}>
              {active && <span className="tag tag-strong">Current route</span>}
              <h2>
                <a href={href({ name: 'program', programId: program.id })}>{program.title}</a>
              </h2>
              <p className="muted">
                {program.phases.length} phases · {total} topics · {masteredCount(program, learner)} mastered by evidence
              </p>
              <ol className="phase-strip" aria-label={`${program.title} phases`}>
                {program.phases.map((phase) => (
                  <li key={phase.id}>{phase.title}</li>
                ))}
              </ol>
            </li>
          )
        })}
      </ul>
      <p className="muted small">
        Depth runs Foundation → Core → Advanced → Specialist → Frontier. Each phase declares a depth; individual topics
        may override it.
      </p>
    </>
  )
}

export function ProgramScreen({ programId, learner }: { programId: string; learner: LearnerLoad }) {
  const program = getProgram(programId)
  if (!program) return <NotFoundScreen what={`Program “${programId}”`} />

  const authoredHere = getLessonForTopic(firstLesson.topicId)?.programId === program.id
  return (
    <>
      <ContextBreadcrumbs crumbs={[{ label: 'Programs', route: { name: 'programs' } }, { label: program.title }]} />
      <PageHeader
        eyebrow={program.id === 'universal-core' ? 'Shared foundations' : 'Program route'}
        title={program.title}
        lead={`${program.phases.length} phases · ${topicCount(program)} topics · ${masteredCount(program, learner)} mastered by evidence. Progress counts assessed evidence, not viewed lessons.`}
      />
      {authoredHere && (
        <p className="callout">
          <span className="label">Authored lesson in this program</span>{' '}
          <a href={href({ name: 'topic', topicId: firstLesson.topicId })}>{firstLesson.title}</a>
        </p>
      )}
      {recommendedRoute(program).map((phase, index) => (
        <section key={phase.id} className="phase phase-wide" aria-labelledby={`phase-${phase.id}`}>
          <span className="label">
            Phase {index + 1} · {depthLabel(phase.depth)}
          </span>
          <h2 id={`phase-${phase.id}`}>{phase.title}</h2>
          <PhasePrerequisites phase={phase} />
          {phase.pedagogy && (
            <p className="muted small">
              <span className="label">Pedagogy</span> {phase.pedagogy}
            </p>
          )}
          <DomainList phase={phase} learner={learner} />
        </section>
      ))}
      <p className="muted small">
        Unlocking between phases is enforced by the mastery engine (Gate 6). Until then no phase is shown as locked or
        unlocked.
      </p>
    </>
  )
}

export function TopicRoute({ topicId, learner }: { topicId: string; learner: LearnerLoad }) {
  if (!topicExists(topicId)) return <NotFoundScreen what={`Topic “${topicId}”`} />
  return <TopicScreen topicId={topicId} learner={learner} locations={findTopicLocations(topicId)} />
}
