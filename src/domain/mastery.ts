export type MasteryState =
  | 'unknown'
  | 'learning'
  | 'practiced'
  | 'provisionally-mastered'
  | 'mastered'
  | 'needs-review'

export type AssistanceLevel =
  | 0 // independent
  | 1 // clarification
  | 2 // small hint
  | 3 // directional hint
  | 4 // partial solution
  | 5 // full solution

export interface MasteryEvidence {
  id: string
  topicId: string
  type: 'practice' | 'assessment' | 'challenge' | 'project' | 'explanation'
  score: number
  assistanceLevel: AssistanceLevel
  passed: boolean
  createdAt: string
}

export interface TopicProgress {
  topicId: string
  state: MasteryState
  masteryScore: number
  evidenceIds: string[]
  updatedAt: string
}

export const INITIAL_MASTERY_SCORE = 0

export function isMasteryPassing(score: number, threshold = 0.8): boolean {
  return score >= threshold
}

export function canUnlockTopic(progress: TopicProgress, threshold = 0.8): boolean {
  return progress.state === 'mastered' && isMasteryPassing(progress.masteryScore, threshold)
}
