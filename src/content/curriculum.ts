import manifest from '../../content/curriculum/master-curriculum-manifest.json'
import type { Lesson } from '../domain/content'
import { firstLesson } from './first-lesson'

/**
 * Read-only view of the version-controlled curriculum manifest for the shell.
 *
 * This is intentionally thin: Gate 2 owns the full typed content/curriculum
 * schema (Program → Phase → Domain → Topic → Lesson …). The shell only needs
 * program/phase/topic structure and phase-level prerequisites, which the
 * manifest already provides.
 */
export interface CurriculumPhase {
  id: string
  title: string
  topics: string[]
  prerequisites: string[]
  pedagogy?: string
}

export interface CurriculumProgram {
  id: string
  title: string
  phases: CurriculumPhase[]
}

export const UNIVERSAL_CORE_ID = 'universal-core'

interface RawPhase {
  id: string
  title: string
  topics?: string[]
  prerequisites?: string[]
  pedagogy?: string
}

interface RawProgram {
  id: string
  title: string
  phases?: RawPhase[]
}

const rawPrograms = (manifest as { programs: RawProgram[] }).programs

export const programs: CurriculumProgram[] = rawPrograms.map((program) => ({
  id: program.id,
  title: program.title,
  phases: (program.phases ?? []).map((phase) => ({
    id: phase.id,
    title: phase.title,
    topics: phase.topics ?? [],
    prerequisites: phase.prerequisites ?? [],
    pedagogy: phase.pedagogy,
  })),
}))

export const curriculumMeta = {
  curriculumId: (manifest as { curriculumId: string }).curriculumId,
  lastVerified: (manifest as { lastVerified: string }).lastVerified,
}

/** Authored, rendered lessons keyed by topic id. Only one exists today. */
const lessons: Lesson[] = [firstLesson]

export function getLessonForTopic(topicId: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.topicId === topicId)
}

export function getProgram(programId: string): CurriculumProgram | undefined {
  return programs.find((program) => program.id === programId)
}

export const universalCore = getProgram(UNIVERSAL_CORE_ID)

/** Specialised programs (everything except the Universal Core). */
export const specialisedPrograms = programs.filter((program) => program.id !== UNIVERSAL_CORE_ID)

export function topicCount(program: CurriculumProgram): number {
  return program.phases.reduce((total, phase) => total + phase.topics.length, 0)
}

export interface TopicLocation {
  program: CurriculumProgram
  phase: CurriculumPhase
}

/** Every place a topic id appears in the manifest (topics may be shared). */
export function findTopicLocations(topicId: string): TopicLocation[] {
  const locations: TopicLocation[] = []
  for (const program of programs) {
    for (const phase of program.phases) {
      if (phase.topics.includes(topicId)) locations.push({ program, phase })
    }
  }
  return locations
}

/**
 * Resolve a phase prerequisite reference to its program/phase.
 *
 * The manifest currently uses two reference forms: a bare phase id
 * (`learning-foundations`) and a program-qualified id
 * (`computer-science.algorithms-and-data-structures`). Both are accepted here;
 * normalising to one form belongs to the Gate 2 content schema.
 */
export function findPhase(reference: string): TopicLocation | undefined {
  const dot = reference.indexOf('.')
  if (dot > 0) {
    const program = getProgram(reference.slice(0, dot))
    const phase = program?.phases.find((candidate) => candidate.id === reference.slice(dot + 1))
    return program && phase ? { program, phase } : undefined
  }
  for (const program of programs) {
    const phase = program.phases.find((candidate) => candidate.id === reference)
    if (phase) return { program, phase }
  }
  return undefined
}

/** Programs whose phases declare a prerequisite on the given Universal Core phase. */
export function programsFedByCorePhase(phaseId: string): CurriculumProgram[] {
  return specialisedPrograms.filter((program) =>
    program.phases.some((phase) =>
      phase.prerequisites.some((reference) => {
        const location = findPhase(reference)
        return location?.program.id === UNIVERSAL_CORE_ID && location.phase.id === phaseId
      }),
    ),
  )
}

/** Manifest topics are ids only; derive a readable title until Gate 2 adds authored titles. */
export function topicTitle(topicId: string): string {
  const lesson = getLessonForTopic(topicId)
  if (lesson) return lesson.title
  const words = topicId.split('-').filter(Boolean)
  if (words.length === 0) return topicId
  const [first, ...rest] = words
  return [first.charAt(0).toUpperCase() + first.slice(1), ...rest].join(' ')
}

export function topicExists(topicId: string): boolean {
  return Boolean(getLessonForTopic(topicId)) || findTopicLocations(topicId).length > 0
}
