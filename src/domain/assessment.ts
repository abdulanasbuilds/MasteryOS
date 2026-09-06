import type { MasteryEvidence } from './mastery'

export interface Assessment {
  id: string
  topicId: string
  title: string
  passThreshold: number
  independentChallengeRequired: boolean
}

export interface AssessmentResult {
  assessmentId: string
  topicId: string
  score: number
  passed: boolean
  assistanceLevel: number
}

export function resultToEvidence(result: AssessmentResult): MasteryEvidence {
  return {
    id: `assessment-${result.assessmentId}-${Date.now()}`,
    topicId: result.topicId,
    type: 'assessment',
    score: result.score,
    assistanceLevel: Math.max(0, Math.min(5, result.assistanceLevel)) as 0 | 1 | 2 | 3 | 4 | 5,
    passed: result.passed,
    createdAt: new Date().toISOString(),
  }
}
