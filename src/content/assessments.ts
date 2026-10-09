import type { Assessment } from '../domain/assessment'

/**
 * Assessment definitions referenced by authored lessons.
 *
 * Gate 2 defines only the contract (topic, threshold, independent-challenge
 * rule) so lesson references resolve. Items, scoring, diagnosis and
 * remediation belong to the practice/assessment engine (Gate 5).
 */
export const assessments: Assessment[] = [
  {
    id: 'ts-functions-decomposition-assessment-001',
    topicId: 'program-decomposition-typescript-functions',
    title: 'Program decomposition with TypeScript functions — mastery check',
    passThreshold: 0.8,
    independentChallengeRequired: true,
  },
]
