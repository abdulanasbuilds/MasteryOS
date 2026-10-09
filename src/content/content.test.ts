import { describe, expect, it } from 'vitest'
import {
  findPhase,
  findTopicLocations,
  getLessonForTopic,
  programs,
  programsFedByCorePhase,
  specialisedPrograms,
  topicExists,
  topicTitle,
  universalCore,
  UNIVERSAL_CORE_ID,
} from './curriculum'
import { firstLesson } from './first-lesson'
import { filterResources, resources, safeExternalUrl } from './resources'

describe('curriculum read model', () => {
  it('loads the Universal Core and specialised programs from the manifest', () => {
    expect(universalCore?.id).toBe(UNIVERSAL_CORE_ID)
    expect(universalCore?.phases.length).toBeGreaterThan(0)
    expect(specialisedPrograms.every((program) => program.id !== UNIVERSAL_CORE_ID)).toBe(true)
    expect(programs.length).toBe(specialisedPrograms.length + 1)
  })

  it('has unique program ids', () => {
    const ids = programs.map((program) => program.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('resolves every phase prerequisite to a phase in the manifest', () => {
    for (const program of programs) {
      for (const phase of program.phases) {
        for (const prerequisite of phase.prerequisites) {
          expect(findPhase(prerequisite), `${program.id}/${phase.id} → ${prerequisite}`).toBeDefined()
        }
      }
    }
  })

  it('shows the Universal Core feeding at least one program', () => {
    const fed = universalCore!.phases.flatMap((phase) => programsFedByCorePhase(phase.id))
    expect(fed.length).toBeGreaterThan(0)
  })

  it('finds topics and reads authored titles from the registry', () => {
    expect(findTopicLocations('problem-decomposition')[0]?.program.id).toBe(UNIVERSAL_CORE_ID)
    expect(topicTitle('problem-decomposition')).toBe('Problem decomposition')
    expect(topicExists('not-a-topic')).toBe(false)
  })

  it('exposes the authored lesson by topic id', () => {
    expect(getLessonForTopic(firstLesson.topicId)).toBe(firstLesson)
    expect(topicExists(firstLesson.topicId)).toBe(true)
    expect(topicTitle(firstLesson.topicId)).toBe(firstLesson.title)
  })
})

describe('resources', () => {
  it('only renders absolute https URLs as links', () => {
    expect(safeExternalUrl('https://ocw.mit.edu/')).toBe('https://ocw.mit.edu/')
    expect(safeExternalUrl('javascript:alert(1)')).toBeUndefined()
    expect(safeExternalUrl('data:text/html,hi')).toBeUndefined()
    expect(safeExternalUrl('http://example.com')).toBeUndefined()
    expect(safeExternalUrl('/relative')).toBeUndefined()
    expect(safeExternalUrl(undefined)).toBeUndefined()
  })

  it('preserves rights class on every catalog entry', () => {
    expect(resources.length).toBeGreaterThan(0)
    for (const entry of resources) expect(entry.rightsClass).not.toBe('unclassified')
  })

  it('filters by query and rights class', () => {
    expect(filterResources(resources, '', 'all')).toHaveLength(resources.length)
    expect(filterResources(resources, 'zzz-no-match', 'all')).toHaveLength(0)
    const referenceOnly = filterResources(resources, '', 'reference-only')
    expect(referenceOnly.every((entry) => entry.rightsClass === 'reference-only')).toBe(true)
    expect(filterResources(resources, 'operating-systems', 'all').some((entry) => entry.id === 'ostep')).toBe(true)
  })
})

describe('phase references', () => {
  it('resolves only program-qualified phase references (schema v2)', () => {
    expect(findPhase('universal-core.learning-foundations')?.program.id).toBe(UNIVERSAL_CORE_ID)
    expect(findPhase('learning-foundations')).toBeUndefined()
    expect(findPhase('a.b.c')).toBeUndefined()
    expect(findPhase('computer-science.algorithms-and-data-structures')?.program.id).toBe('computer-science')
    expect(findPhase('computer-science.learning-foundations')).toBeUndefined()
    expect(findPhase('nope')).toBeUndefined()
  })
})
