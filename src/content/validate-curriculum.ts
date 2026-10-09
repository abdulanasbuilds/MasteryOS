import type { Assessment } from '../domain/assessment'
import type { Lesson, Project } from '../domain/content'
import {
  CURRICULUM_SCHEMA_VERSION,
  DEPTHS,
  ID_PATTERN,
  type CurriculumManifest,
} from '../domain/curriculum'

/**
 * Dependency-free validator for curriculum schema v2 plus authored lessons and
 * assessment definitions. Input is treated as untrusted data: every field is
 * checked structurally before references are resolved.
 *
 * Returns path-addressed error strings; an empty list means the content graph
 * is valid. Run by the test suite so invalid content cannot be merged silently.
 */
export interface ValidationResult {
  errors: string[]
}

const HOSTED_RIGHTS = new Set(['native-original', 'licensed', 'provider-embedded'])
const STATUSES = new Set(['draft', 'review', 'published'])
const DATE = /^\d{4}-\d{2}-\d{2}$/

type Json = Record<string, unknown>
const isObject = (value: unknown): value is Json => typeof value === 'object' && value !== null && !Array.isArray(value)
const isString = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0
const isStringArray = (value: unknown): value is string[] => Array.isArray(value) && value.every(isString)

/** Returns the first cycle found in a directed graph, as a node path, or undefined. */
export function findCycle(edges: Map<string, string[]>): string[] | undefined {
  const state = new Map<string, 'visiting' | 'done'>()
  const stack: string[] = []

  function visit(node: string): string[] | undefined {
    const current = state.get(node)
    if (current === 'done') return undefined
    if (current === 'visiting') return [...stack.slice(stack.indexOf(node)), node]
    state.set(node, 'visiting')
    stack.push(node)
    for (const next of edges.get(node) ?? []) {
      const cycle = visit(next)
      if (cycle) return cycle
    }
    stack.pop()
    state.set(node, 'done')
    return undefined
  }

  for (const node of edges.keys()) {
    const cycle = visit(node)
    if (cycle) return cycle
  }
  return undefined
}

export function validateCurriculum(
  raw: unknown,
  lessons: Lesson[] = [],
  assessments: Assessment[] = [],
  projects: Project[] = [],
): ValidationResult {
  const errors: string[] = []
  const err = (path: string, message: string) => errors.push(`${path}: ${message}`)
  const checkId = (path: string, value: unknown): value is string => {
    if (!isString(value) || !ID_PATTERN.test(value)) {
      err(path, `invalid id ${JSON.stringify(value)} (expected kebab-case)`)
      return false
    }
    return true
  }

  if (!isObject(raw)) return { errors: ['manifest: not an object'] }
  if (raw.schemaVersion !== CURRICULUM_SCHEMA_VERSION) {
    err('schemaVersion', `expected ${CURRICULUM_SCHEMA_VERSION}, got ${JSON.stringify(raw.schemaVersion)}`)
  }
  if (!isString(raw.curriculumId)) err('curriculumId', 'required')
  if (!isString(raw.lastVerified) || !DATE.test(raw.lastVerified)) err('lastVerified', 'expected YYYY-MM-DD')

  // ---- topic registry ----------------------------------------------------
  const topicIds = new Set<string>()
  const topicPrereqs = new Map<string, string[]>()
  const topicDepthOverride = new Map<string, unknown>()
  if (!Array.isArray(raw.topics)) {
    err('topics', 'expected an array')
  } else {
    raw.topics.forEach((topic, index) => {
      const path = `topics[${index}]`
      if (!isObject(topic)) return err(path, 'not an object')
      if (!checkId(`${path}.id`, topic.id)) return
      if (topicIds.has(topic.id)) err(`${path}.id`, `duplicate topic id "${topic.id}"`)
      topicIds.add(topic.id)
      if (!isString(topic.title)) err(`${path}.title`, `topic "${topic.id}" needs a title`)
      if (topic.depth !== undefined && !DEPTHS.includes(topic.depth as never)) {
        err(`${path}.depth`, `invalid depth ${JSON.stringify(topic.depth)}`)
      } else if (topic.depth !== undefined) {
        topicDepthOverride.set(topic.id, topic.depth)
      }
      if (topic.prerequisites !== undefined) {
        if (!isStringArray(topic.prerequisites)) err(`${path}.prerequisites`, 'expected an array of topic ids')
        else topicPrereqs.set(topic.id, topic.prerequisites)
      }
    })
  }
  for (const [topicId, prerequisites] of topicPrereqs) {
    for (const prerequisite of prerequisites) {
      if (prerequisite === topicId) err(`topics.${topicId}.prerequisites`, 'a topic cannot require itself')
      else if (!topicIds.has(prerequisite)) err(`topics.${topicId}.prerequisites`, `unknown topic "${prerequisite}"`)
    }
  }
  const topicCycle = findCycle(topicPrereqs)
  if (topicCycle) err('topics', `prerequisite cycle: ${topicCycle.join(' → ')}`)

  // ---- programs / phases / domains ---------------------------------------
  const phaseRefs = new Set<string>()
  const phasePrereqs = new Map<string, string[]>()
  const placed = new Map<string, Array<{ programId: string }>>()
  const placementDepths = new Map<string, number[]>()
  const programIds = new Set<string>()

  if (!Array.isArray(raw.programs) || raw.programs.length === 0) {
    err('programs', 'expected a non-empty array')
  } else {
    raw.programs.forEach((program, pIndex) => {
      const pPath = `programs[${pIndex}]`
      if (!isObject(program)) return err(pPath, 'not an object')
      if (!checkId(`${pPath}.id`, program.id)) return
      if (programIds.has(program.id)) err(`${pPath}.id`, `duplicate program id "${program.id}"`)
      const programId: string = program.id
      programIds.add(programId)
      if (!isString(program.title)) err(`${pPath}.title`, 'required')
      if (!Array.isArray(program.phases) || program.phases.length === 0) return err(`${pPath}.phases`, 'expected a non-empty array')

      const phaseIds = new Set<string>()
      program.phases.forEach((phase, phIndex) => {
        const phPath = `${pPath}.phases[${phIndex}]`
        if (!isObject(phase)) return err(phPath, 'not an object')
        if (!checkId(`${phPath}.id`, phase.id)) return
        if (phaseIds.has(phase.id)) err(`${phPath}.id`, `duplicate phase id "${phase.id}" in ${program.id}`)
        phaseIds.add(phase.id)
        const ref = `${program.id}.${phase.id}`
        phaseRefs.add(ref)
        if (!isString(phase.title)) err(`${phPath}.title`, 'required')
        if (!DEPTHS.includes(phase.depth as never)) err(`${phPath}.depth`, `invalid depth ${JSON.stringify(phase.depth)}`)
        if (!isStringArray(phase.prerequisites)) {
          err(`${phPath}.prerequisites`, 'expected an array (use [] when none)')
        } else {
          phasePrereqs.set(ref, phase.prerequisites)
        }
        if (!Array.isArray(phase.domains) || phase.domains.length === 0) return err(`${phPath}.domains`, 'expected a non-empty array')

        const domainIds = new Set<string>()
        const phaseTopics = new Set<string>()
        phase.domains.forEach((domain, dIndex) => {
          const dPath = `${phPath}.domains[${dIndex}]`
          if (!isObject(domain)) return err(dPath, 'not an object')
          if (!checkId(`${dPath}.id`, domain.id)) return
          if (domainIds.has(domain.id)) err(`${dPath}.id`, `duplicate domain id "${domain.id}" in ${ref}`)
          domainIds.add(domain.id)
          if (!isString(domain.title)) err(`${dPath}.title`, 'required')
          if (!isStringArray(domain.topics) || domain.topics.length === 0) return err(`${dPath}.topics`, 'expected a non-empty array of topic ids')
          for (const topicId of domain.topics) {
            if (!topicIds.has(topicId)) err(`${dPath}.topics`, `"${topicId}" is not in the topics registry`)
            if (phaseTopics.has(topicId)) err(`${dPath}.topics`, `"${topicId}" is placed twice in ${ref}`)
            phaseTopics.add(topicId)
            placed.set(topicId, [...(placed.get(topicId) ?? []), { programId }])
            const topicDepth = topicDepthOverride.get(topicId) ?? phase.depth
            placementDepths.set(topicId, [...(placementDepths.get(topicId) ?? []), DEPTHS.indexOf(topicDepth as never)])
          }
        })
      })
    })
  }

  for (const [ref, prerequisites] of phasePrereqs) {
    for (const prerequisite of prerequisites) {
      if (!/^[a-z0-9-]+\.[a-z0-9-]+$/.test(prerequisite)) {
        err(`${ref}.prerequisites`, `"${prerequisite}" must be program-qualified (<program-id>.<phase-id>)`)
      } else if (prerequisite === ref) {
        err(`${ref}.prerequisites`, 'a phase cannot require itself')
      } else if (!phaseRefs.has(prerequisite)) {
        err(`${ref}.prerequisites`, `unknown phase "${prerequisite}"`)
      }
    }
  }
  const phaseCycle = findCycle(phasePrereqs)
  if (phaseCycle) err('programs', `phase prerequisite cycle: ${phaseCycle.join(' → ')}`)

  for (const topicId of topicIds) {
    if (!placed.has(topicId)) err(`topics.${topicId}`, 'registered but not placed in any domain')
  }

  // An edge must not point "uphill": a topic's shallowest placement may not be
  // shallower than its prerequisite's shallowest placement.
  for (const [topicId, prerequisites] of topicPrereqs) {
    const own = Math.min(...(placementDepths.get(topicId) ?? [Infinity]))
    for (const prerequisite of prerequisites) {
      const required = Math.min(...(placementDepths.get(prerequisite) ?? [-Infinity]))
      if (required > own) {
        err(
          `topics.${topicId}.prerequisites`,
          `"${prerequisite}" (${DEPTHS[required]}) is deeper than "${topicId}" (${DEPTHS[own]})`,
        )
      }
    }
  }

  // ---- authored lessons ---------------------------------------------------
  const assessmentIds = new Map(assessments.map((assessment) => [assessment.id, assessment]))
  const lessonIds = new Set<string>()
  for (const lesson of lessons) {
    const path = `lessons.${lesson.id}`
    if (!ID_PATTERN.test(lesson.id)) err(`${path}.id`, 'invalid id')
    if (lessonIds.has(lesson.id)) err(`${path}.id`, 'duplicate lesson id')
    lessonIds.add(lesson.id)
    if (!topicIds.has(lesson.topicId)) {
      err(`${path}.topicId`, `"${lesson.topicId}" is not in the topics registry`)
    } else if (!(placed.get(lesson.topicId) ?? []).some((placement) => placement.programId === lesson.programId)) {
      err(`${path}.programId`, `topic "${lesson.topicId}" is not placed in program "${lesson.programId}"`)
    }
    if (!DEPTHS.includes(lesson.depth)) err(`${path}.depth`, 'invalid depth')
    if (!STATUSES.has(lesson.status)) err(`${path}.status`, 'invalid status')
    if (!Number.isInteger(lesson.version) || lesson.version < 1) err(`${path}.version`, 'expected a positive integer')
    if (!DATE.test(lesson.lastVerified)) err(`${path}.lastVerified`, 'expected YYYY-MM-DD')
    if (!HOSTED_RIGHTS.has(lesson.provenance?.rightsClass)) {
      err(`${path}.provenance.rightsClass`, `"${lesson.provenance?.rightsClass}" content cannot be hosted in a lesson`)
    }
    if (lesson.provenance?.rightsClass === 'licensed' && !isString(lesson.provenance.license)) {
      err(`${path}.provenance.license`, 'licensed content must name its license')
    }
    if (!isString(lesson.provenance?.author)) err(`${path}.provenance.author`, 'required')
    if (lesson.objectives.length === 0) err(`${path}.objectives`, 'at least one objective required')
    if (lesson.concepts.length === 0) err(`${path}.concepts`, 'at least one concept required')
    const conceptIds = new Set<string>()
    for (const concept of lesson.concepts) {
      if (!ID_PATTERN.test(concept.id)) err(`${path}.concepts`, `invalid concept id "${concept.id}"`)
      if (conceptIds.has(concept.id)) err(`${path}.concepts`, `duplicate concept id "${concept.id}"`)
      conceptIds.add(concept.id)
    }
    const sectionIds = new Set<string>()
    for (const section of lesson.sections) {
      if (sectionIds.has(section.id)) err(`${path}.sections`, `duplicate section id "${section.id}"`)
      sectionIds.add(section.id)
    }
    const assessment = assessmentIds.get(lesson.assessmentId)
    if (!assessment) err(`${path}.assessmentId`, `assessment "${lesson.assessmentId}" is not defined`)
    else if (assessment.topicId !== lesson.topicId) err(`${path}.assessmentId`, 'assessment belongs to a different topic')
  }

  for (const assessment of assessments) {
    const path = `assessments.${assessment.id}`
    if (!topicIds.has(assessment.topicId)) err(`${path}.topicId`, `"${assessment.topicId}" is not in the topics registry`)
    if (!(assessment.passThreshold > 0 && assessment.passThreshold <= 1)) err(`${path}.passThreshold`, 'expected (0, 1]')
  }

  const projectIds = new Set<string>()
  for (const project of projects) {
    const path = `projects.${project.id}`
    if (!ID_PATTERN.test(project.id)) err(`${path}.id`, 'invalid id')
    if (projectIds.has(project.id)) err(`${path}.id`, 'duplicate project id')
    projectIds.add(project.id)
    if (!programIds.has(project.programId)) err(`${path}.programId`, `unknown program "${project.programId}"`)
    if (!DEPTHS.includes(project.depth)) err(`${path}.depth`, 'invalid depth')
    if (project.topicIds.length === 0) err(`${path}.topicIds`, 'a project must draw on at least one topic')
    for (const topicId of project.topicIds) {
      if (!topicIds.has(topicId)) err(`${path}.topicIds`, `"${topicId}" is not in the topics registry`)
    }
    if (project.evidenceCriteria.length === 0) err(`${path}.evidenceCriteria`, 'at least one evidence criterion required')
    if (!HOSTED_RIGHTS.has(project.provenance?.rightsClass)) {
      err(`${path}.provenance.rightsClass`, `"${project.provenance?.rightsClass}" content cannot be hosted`)
    }
  }

  return { errors }
}

/** Narrowing helper for callers that have already validated the manifest. */
export function asManifest(raw: unknown): CurriculumManifest {
  return raw as CurriculumManifest
}
