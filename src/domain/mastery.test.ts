import { describe, expect, it } from 'vitest'
import { canUnlockTopic, isMasteryPassing, type TopicProgress } from './mastery'

describe('mastery rules', () => {
  const mastered: TopicProgress = {
    topicId: 'example',
    state: 'mastered',
    masteryScore: 0.9,
    evidenceIds: ['e1'],
    updatedAt: new Date().toISOString(),
  }

  it('passes at or above the threshold', () => {
    expect(isMasteryPassing(0.8)).toBe(true)
    expect(isMasteryPassing(0.79)).toBe(false)
  })

  it('unlocks only when mastery state and score both qualify', () => {
    expect(canUnlockTopic(mastered)).toBe(true)
    expect(canUnlockTopic({ ...mastered, masteryScore: 0.5 })).toBe(false)
    expect(canUnlockTopic({ ...mastered, state: 'practiced' })).toBe(false)
  })
})
