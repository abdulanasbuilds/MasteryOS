import type { Depth } from './content'

/**
 * Curriculum schema v2 — the version-controlled competency graph.
 *
 * Hierarchy: Program → Phase → Domain → Topic (→ Lesson, see content.ts).
 * Topics live in one registry and are *placed* into domains, so a shared
 * competency (e.g. discrete mathematics) is one node referenced by several
 * programs rather than duplicated.
 *
 * Reference rules (enforced by validateCurriculum):
 * - phase prerequisites are always program-qualified: `<program-id>.<phase-id>`;
 * - topic prerequisites are topic ids from the registry;
 * - both prerequisite graphs are acyclic;
 * - a placement's depth is `topic.depth` when set, otherwise its phase depth;
 * - list order is recommended route order.
 */
export const CURRICULUM_SCHEMA_VERSION = 2

export const DEPTHS: readonly Depth[] = ['foundation', 'core', 'advanced', 'specialist', 'frontier']

/** Qualified phase reference, e.g. `computer-science.algorithms-and-data-structures`. */
export type PhaseRef = `${string}.${string}`

export interface CurriculumTopic {
  id: string
  title: string
  summary?: string
  /** Overrides the phase depth for every placement of this topic. */
  depth?: Depth
  /** Topic ids this topic genuinely depends on. */
  prerequisites?: string[]
}

export interface CurriculumDomain {
  id: string
  title: string
  topics: string[]
}

export interface CurriculumPhase {
  id: string
  title: string
  depth: Depth
  prerequisites: PhaseRef[]
  pedagogy?: string
  domains: CurriculumDomain[]
}

export interface CurriculumProgram {
  id: string
  title: string
  phases: CurriculumPhase[]
}

export interface CurriculumManifest {
  schemaVersion: typeof CURRICULUM_SCHEMA_VERSION
  curriculumId: string
  lastVerified: string
  designRule?: string
  conventions?: Record<string, string>
  topics: CurriculumTopic[]
  programs: CurriculumProgram[]
}

/** Where a topic sits in the graph. A topic may have several placements. */
export interface TopicPlacement {
  program: CurriculumProgram
  phase: CurriculumPhase
  domain: CurriculumDomain
  depth: Depth
}

export const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
