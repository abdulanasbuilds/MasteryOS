import rawManifest from '../../content/curriculum/master-curriculum-manifest.json'
import type { Lesson } from '../domain/content'
import type {
  CurriculumDomain,
  CurriculumManifest,
  CurriculumPhase,
  CurriculumProgram,
  CurriculumTopic,
  TopicPlacement,
} from '../domain/curriculum'
import { assessments } from './assessments'
import { firstLesson } from './first-lesson'
import { asManifest, validateCurriculum } from './validate-curriculum'

/**
 * Read model over curriculum schema v2 (see src/domain/curriculum.ts).
 *
 * The manifest is validated when this module loads. The test suite asserts the
 * result is empty, so an invalid graph cannot be merged; at runtime any issues
 * are exposed via `curriculumIssues` rather than crashing the learner's shell.
 */
export type { CurriculumDomain, CurriculumPhase, CurriculumProgram, CurriculumTopic, TopicPlacement }

export const UNIVERSAL_CORE_ID = 'universal-core'

/** Authored, rendered lessons. Only one exists today. */
export const lessons: Lesson[] = [firstLesson]

export const curriculumIssues: string[] = validateCurriculum(rawManifest, lessons, assessments).errors

const manifest: CurriculumManifest = asManifest(rawManifest)

export const programs: CurriculumProgram[] = manifest.programs

export const curriculumMeta = {
  curriculumId: manifest.curriculumId,
  lastVerified: manifest.lastVerified,
  schemaVersion: manifest.schemaVersion,
}

const topicsById = new Map<string, CurriculumTopic>(manifest.topics.map((topic) => [topic.id, topic]))

export function getTopic(topicId: string): CurriculumTopic | undefined {
  return topicsById.get(topicId)
}

export function getLessonForTopic(topicId: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.topicId === topicId)
}

export function getProgram(programId: string): CurriculumProgram | undefined {
  return programs.find((program) => program.id === programId)
}

export const universalCore = getProgram(UNIVERSAL_CORE_ID)

/** Specialised programs (everything except the Universal Core). */
export const specialisedPrograms = programs.filter((program) => program.id !== UNIVERSAL_CORE_ID)

/**
 * The program's recommended route (PROGRAMS.md: "the recommended route remains
 * explicit"). Schema v2 encodes it as list order: phases → domains → topics.
 * Strong-alternative and deep-dive routes are not authored yet.
 */
export function recommendedRoute(program: CurriculumProgram): CurriculumPhase[] {
  return program.phases
}

/** Topic ids of a phase in route order (domain by domain). */
export function phaseTopicIds(phase: CurriculumPhase): string[] {
  return phase.domains.flatMap((domain) => domain.topics)
}

export function programTopicIds(program: CurriculumProgram): string[] {
  return program.phases.flatMap(phaseTopicIds)
}

export function topicCount(program: CurriculumProgram): number {
  return programTopicIds(program).length
}

/** Every placement of a topic (topics may be shared across programs). */
export function findTopicLocations(topicId: string): TopicPlacement[] {
  const topic = getTopic(topicId)
  const placements: TopicPlacement[] = []
  for (const program of programs) {
    for (const phase of program.phases) {
      for (const domain of phase.domains) {
        if (domain.topics.includes(topicId)) {
          placements.push({ program, phase, domain, depth: topic?.depth ?? phase.depth })
        }
      }
    }
  }
  return placements
}

/** Resolve a program-qualified phase reference (`<program-id>.<phase-id>`). */
export function findPhase(reference: string): { program: CurriculumProgram; phase: CurriculumPhase } | undefined {
  const [programId, phaseId, ...rest] = reference.split('.')
  if (!programId || !phaseId || rest.length > 0) return undefined
  const program = getProgram(programId)
  const phase = program?.phases.find((candidate) => candidate.id === phaseId)
  return program && phase ? { program, phase } : undefined
}

/** Programs whose phases declare a prerequisite on the given Universal Core phase. */
export function programsFedByCorePhase(phaseId: string): CurriculumProgram[] {
  const reference = `${UNIVERSAL_CORE_ID}.${phaseId}`
  return specialisedPrograms.filter((program) =>
    program.phases.some((phase) => phase.prerequisites.includes(reference as `${string}.${string}`)),
  )
}

/** Authored topic title from the registry; falls back to the raw id for unknown ids. */
export function topicTitle(topicId: string): string {
  return getTopic(topicId)?.title ?? topicId
}

/** Topics that the given topic directly depends on, resolved from the registry. */
export function topicPrerequisites(topicId: string): CurriculumTopic[] {
  return (getTopic(topicId)?.prerequisites ?? [])
    .map((id) => getTopic(id))
    .filter((topic): topic is CurriculumTopic => Boolean(topic))
}

export function topicExists(topicId: string): boolean {
  return topicsById.has(topicId)
}
