import { describe, expect, it } from 'vitest'
import rawManifest from '../../content/curriculum/master-curriculum-manifest.json'
import type { Assessment } from '../domain/assessment'
import type { Lesson } from '../domain/content'
import { assessments } from './assessments'
import {
  curriculumIssues,
  curriculumMeta,
  getTopic,
  programsFedByCorePhase,
  findTopicLocations,
  lessons,
  phaseTopicIds,
  programs,
  topicPrerequisites,
  topicTitle,
} from './curriculum'
import { firstLesson } from './first-lesson'
import { findCycle, validateCurriculum } from './validate-curriculum'

type Mutable = {
  schemaVersion: number
  topics: Array<Record<string, unknown>>
  programs: Array<{
    id: string
    phases: Array<{ id: string; depth: string; prerequisites: string[]; domains: Array<{ id: string; topics: string[] }> }>
  }>
}

/** Deep copy of the real manifest that a test may corrupt. */
const clone = (): Mutable => JSON.parse(JSON.stringify(rawManifest)) as Mutable
const validate = (manifest: unknown, ls: Lesson[] = lessons, as: Assessment[] = assessments) =>
  validateCurriculum(manifest, ls, as).errors
const phase = (m: Mutable, programId: string, phaseId: string) =>
  m.programs.find((p) => p.id === programId)!.phases.find((ph) => ph.id === phaseId)!
const topic = (m: Mutable, id: string) => m.topics.find((t) => t.id === id)!

describe('curriculum schema v2 — the committed content', () => {
  it('validates with zero errors (manifest + lessons + assessments)', () => {
    expect(curriculumIssues).toEqual([])
    expect(curriculumMeta.schemaVersion).toBe(2)
  })

  it('gives every topic an authored title, not an id', () => {
    for (const program of programs) {
      for (const p of program.phases) {
        for (const id of phaseTopicIds(p)) expect(topicTitle(id), id).not.toBe(id)
      }
    }
  })

  it('places the authored lesson on a real Program → Phase → Domain → Topic path', () => {
    const placement = findTopicLocations(firstLesson.topicId).find((l) => l.program.id === firstLesson.programId)
    expect(placement?.program.title).toBe('Software Engineering')
    expect(placement?.phase.id).toBe('engineering-practice')
    expect(placement?.domain.id).toBe('design-and-decomposition')
    expect(placement?.depth).toBe('foundation')
    expect(topicPrerequisites(firstLesson.topicId).map((t) => t.id)).toEqual(['decomposition', 'functions-and-scope'])
  })

  it('shares one topic node across programs instead of duplicating it', () => {
    const programsWithDiscreteMath = findTopicLocations('discrete-mathematics').map((l) => l.program.id)
    expect(programsWithDiscreteMath).toEqual(['computer-science', 'mathematics-computational-mathematics'])
  })
})

describe('Universal Core conforms to PROGRAMS.md (D-023)', () => {
  const core = programs.find((p) => p.id === 'universal-core')!
  const coreTopics = new Set(core.phases.flatMap(phaseTopicIds))

  // Each capability family PROGRAMS.md requires, and the core topics that cover it.
  const families: Record<string, string[]> = {
    'learning and problem-solving fundamentals': ['problem-decomposition', 'learning-how-to-learn'],
    'mathematical and logical reasoning': ['algebra-repair', 'mathematical-logic-foundations'],
    'computer literacy and digital systems': ['how-computers-work', 'data-representation'],
    'programming fundamentals': ['values-and-types', 'control-flow', 'functions-and-scope'],
    'data structures and algorithms fundamentals': ['fundamental-data-structures', 'searching-and-sorting-basics'],
    'software development fundamentals': ['reading-and-tracing-code', 'testing-fundamentals'],
    'Git and collaborative development fundamentals': ['git-fundamentals', 'github-workflow'],
    'command line, networking, internet, and web fundamentals': ['shell-and-command-line', 'how-the-internet-works', 'how-the-web-works'],
    'databases and data fundamentals': ['database-fundamentals', 'data-literacy'],
    'testing, debugging, security, and reliability fundamentals': ['debugging-fundamentals', 'security-fundamentals', 'reliability-fundamentals'],
    'technical communication, documentation, and developer tooling': ['technical-writing', 'documentation-and-readmes', 'development-environments'],
    'AI literacy and responsible AI use': ['ai-literacy', 'responsible-ai-use'],
  }

  it.each(Object.entries(families))('covers "%s"', (_family, topicIds) => {
    for (const id of topicIds) expect(coreTopics.has(id), id).toBe(true)
  })

  it('keeps HTML/CSS out of the Universal Core (PROGRAMS.md)', () => {
    for (const id of ['semantic-html', 'css-selectors', 'box-model']) expect(coreTopics.has(id), id).toBe(false)
  })

  it('keeps every Universal Core phase at foundation depth', () => {
    expect(core.phases.every((p) => p.depth === 'foundation')).toBe(true)
  })

  it('gives the TypeScript lesson a programming prerequisite inside the core', () => {
    const prereqs = topicPrerequisites(firstLesson.topicId).map((t) => t.id)
    expect(prereqs.some((id) => coreTopics.has(id) && id === 'functions-and-scope')).toBe(true)
  })
})

describe('Universal Core is linked into the programs (D-024)', () => {
  const core = programs.find((p) => p.id === 'universal-core')!
  const coreTopics = new Set(core.phases.flatMap(phaseTopicIds))

  it.each(core.phases.map((p) => [p.id]))('core phase %s feeds at least one program', (phaseId) => {
    expect(programsFedByCorePhase(phaseId).length).toBeGreaterThan(0)
  })

  it('links every specialized program to the core at topic or phase level', () => {
    for (const program of programs.filter((p) => p.id !== 'universal-core')) {
      const topicLevel = program.phases
        .flatMap(phaseTopicIds)
        .some((id) => (getTopic(id)?.prerequisites ?? []).some((pre) => coreTopics.has(pre)))
      const phaseLevel = program.phases.some((p) => p.prerequisites.some((ref) => ref.startsWith('universal-core.')))
      expect(topicLevel || phaseLevel, program.id).toBe(true)
    }
  })

  it('links representative program topics to their core foundation', () => {
    const edges: Array<[string, string]> = [
      ['hash-tables', 'fundamental-data-structures'],
      ['sql-foundations', 'database-fundamentals'],
      ['http-basics', 'how-the-web-works'],
      ['security-principles', 'security-fundamentals'],
      ['llm-fundamentals', 'ai-literacy'],
      ['processes-and-threads', 'operating-system-basics'],
    ]
    for (const [dependent, prerequisite] of edges) {
      expect(getTopic(dependent)?.prerequisites, dependent).toContain(prerequisite)
    }
  })

  it('never makes a core topic depend on a program topic', () => {
    for (const id of coreTopics) {
      for (const pre of getTopic(id)?.prerequisites ?? []) expect(coreTopics.has(pre), `${id} → ${pre}`).toBe(true)
    }
  })
})

describe('curriculum validator rejects invalid graphs', () => {
  const expectError = (errors: string[], fragment: string) =>
    expect(errors.some((e) => e.includes(fragment)), `${fragment}\n${errors.join('\n')}`).toBe(true)

  it('rejects non-objects and the old schema version', () => {
    expect(validate(null)).toEqual(['manifest: not an object'])
    const m = clone()
    m.schemaVersion = 1
    expectError(validate(m), 'schemaVersion: expected 2')
  })

  it('rejects duplicate topic ids and missing titles', () => {
    const m = clone()
    m.topics.push({ id: 'decomposition', title: '' })
    const errors = validate(m)
    expectError(errors, 'duplicate topic id "decomposition"')
    expectError(errors, 'needs a title')
  })

  it('rejects non-kebab ids', () => {
    const m = clone()
    m.topics[0].id = 'Problem_Decomposition'
    expectError(validate(m), 'invalid id "Problem_Decomposition"')
  })

  it('rejects invalid depth values on phases and topics', () => {
    const m = clone()
    phase(m, 'universal-core', 'learning-foundations').depth = 'expert'
    topic(m, 'abstraction').depth = 'beginner'
    const errors = validate(m)
    expectError(errors, 'invalid depth "expert"')
    expectError(errors, 'invalid depth "beginner"')
  })

  it('rejects bare (unqualified) and unknown phase prerequisites', () => {
    const m = clone()
    phase(m, 'web-engineering', 'web-platform').prerequisites = ['web-foundations', 'computer-science.nope']
    const errors = validate(m)
    expectError(errors, '"web-foundations" must be program-qualified')
    expectError(errors, 'unknown phase "computer-science.nope"')
  })

  it('rejects phase prerequisite cycles, including across programs', () => {
    const m = clone()
    phase(m, 'universal-core', 'learning-foundations').prerequisites = ['web-engineering.web-foundations']
    expectError(validate(m), 'phase prerequisite cycle')
  })

  it('rejects unknown, self and cyclic topic prerequisites', () => {
    const m = clone()
    topic(m, 'decomposition').prerequisites = ['program-decomposition-typescript-functions']
    topic(m, 'abstraction').prerequisites = ['abstraction', 'not-a-topic']
    const errors = validate(m)
    expectError(errors, 'prerequisite cycle')
    expectError(errors, 'a topic cannot require itself')
    expectError(errors, 'unknown topic "not-a-topic"')
  })

  it('rejects topics placed in a domain but missing from the registry, and registered topics never placed', () => {
    const m = clone()
    phase(m, 'universal-core', 'learning-foundations').domains[0].topics.push('ghost-topic')
    m.topics.push({ id: 'orphan-topic', title: 'Orphan topic' })
    const errors = validate(m)
    expectError(errors, '"ghost-topic" is not in the topics registry')
    expectError(errors, 'topics.orphan-topic: registered but not placed')
  })

  it('rejects a topic placed twice in one phase and duplicate domain ids', () => {
    const m = clone()
    const p = phase(m, 'universal-core', 'learning-foundations')
    p.domains[1].topics.push(p.domains[0].topics[0])
    p.domains[1].id = p.domains[0].id
    const errors = validate(m)
    expectError(errors, 'is placed twice in universal-core.learning-foundations')
    expectError(errors, 'duplicate domain id')
  })

  it('rejects a prerequisite deeper than the topic that requires it', () => {
    const m = clone()
    topic(m, 'control-flow').prerequisites = ['variables-and-state', 'hash-tables']
    expectError(validate(m), '"hash-tables" (core) is deeper than "control-flow" (foundation)')
  })

  it('rejects a phase with no domains', () => {
    const m = clone()
    phase(m, 'universal-core', 'learning-foundations').domains = []
    expectError(validate(m), 'domains: expected a non-empty array')
  })

  it('rejects a lesson whose topic is not placed in its program', () => {
    expectError(validate(clone(), [{ ...firstLesson, programId: 'computer-science' }]), 'is not placed in program "computer-science"')
  })

  it('rejects a lesson with unhostable rights, missing license or a dangling assessment', () => {
    const reference = { ...firstLesson, provenance: { rightsClass: 'reference' as never, author: 'x' } }
    expectError(validate(clone(), [reference]), 'cannot be hosted in a lesson')
    const licensed = { ...firstLesson, provenance: { rightsClass: 'licensed' as const, author: 'x' } }
    expectError(validate(clone(), [licensed]), 'licensed content must name its license')
    expectError(validate(clone(), [firstLesson], []), 'is not defined')
  })

  it('rejects an assessment that belongs to a different topic', () => {
    const wrong = assessments.map((a) => ({ ...a, topicId: 'decomposition' }))
    expectError(validate(clone(), [firstLesson], wrong), 'assessment belongs to a different topic')
  })
})

describe('project contract', () => {
  const project = {
    id: 'checkout-calculator',
    programId: 'software-engineering',
    title: 'Checkout calculator',
    summary: 'Decompose a checkout flow into tested functions.',
    depth: 'foundation' as const,
    topicIds: [firstLesson.topicId],
    evidenceCriteria: ['Each function has one responsibility and its own test.'],
    provenance: { rightsClass: 'native-original' as const, author: 'MasteryOS' },
  }
  const run = (p: typeof project) => validateCurriculum(clone(), lessons, assessments, [p]).errors

  it('accepts a well-formed project', () => {
    expect(run(project)).toEqual([])
  })

  it('rejects unknown programs/topics, empty evidence criteria and duplicate ids', () => {
    const errors = run({ ...project, programId: 'nope', topicIds: ['ghost'], evidenceCriteria: [] })
    expect(errors.some((e) => e.includes('unknown program "nope"'))).toBe(true)
    expect(errors.some((e) => e.includes('"ghost" is not in the topics registry'))).toBe(true)
    expect(errors.some((e) => e.includes('at least one evidence criterion'))).toBe(true)
    expect(validateCurriculum(clone(), lessons, assessments, [project, project]).errors).toContain(
      'projects.checkout-calculator.id: duplicate project id',
    )
  })
})

describe('findCycle', () => {
  it('returns the cycle path, or undefined for a DAG', () => {
    expect(findCycle(new Map([['a', ['b']], ['b', ['c']], ['c', []]]))).toBeUndefined()
    expect(findCycle(new Map([['a', ['b']], ['b', ['c']], ['c', ['a']]]))).toEqual(['a', 'b', 'c', 'a'])
  })
})
