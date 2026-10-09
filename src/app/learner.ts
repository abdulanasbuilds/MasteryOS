import { useEffect, useState } from 'react'
import type { MasteryState, TopicProgress } from '../domain/mastery'
import { loadLearnerState, type LocalLearnerState } from '../storage/local-store'

/**
 * Read-only access to local learner state for the shell.
 *
 * Gate 1 only displays state; writing evidence/progress belongs to the
 * assessment and mastery gates (5/6). Nothing here grants mastery.
 */
export type LearnerLoad =
  | { status: 'loading' }
  | { status: 'ready'; state: LocalLearnerState }
  | { status: 'error'; message: string }

export function useLearnerState(load: () => Promise<LocalLearnerState> = loadLearnerState): LearnerLoad {
  const [result, setResult] = useState<LearnerLoad>({ status: 'loading' })

  useEffect(() => {
    let active = true
    load()
      .then((state) => {
        if (active) setResult({ status: 'ready', state })
      })
      .catch((error: unknown) => {
        if (active) {
          setResult({
            status: 'error',
            message: error instanceof Error ? error.message : 'Local learner state could not be read.',
          })
        }
      })
    return () => {
      active = false
    }
  }, [load])

  return result
}

export function progressFor(learner: LearnerLoad, topicId: string): TopicProgress | undefined {
  return learner.status === 'ready' ? learner.state.progress[topicId] : undefined
}

export function evidenceList(learner: LearnerLoad) {
  return learner.status === 'ready' ? learner.state.evidence : []
}

/** Text labels (never colour alone) for each mastery state. */
export const MASTERY_LABELS: Record<MasteryState | 'not-started', string> = {
  'not-started': 'Not started',
  unknown: 'Unknown',
  learning: 'Learning',
  practiced: 'Practised',
  'provisionally-mastered': 'Provisionally mastered',
  mastered: 'Mastered',
  'needs-review': 'Needs review',
}

export function stateOf(progress: TopicProgress | undefined): MasteryState | 'not-started' {
  return progress?.state ?? 'not-started'
}
