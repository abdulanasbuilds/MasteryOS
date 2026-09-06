import type { MasteryEvidence, TopicProgress } from '../domain/mastery'

const STORAGE_VERSION = 1
const DB_NAME = 'masteryos'
const STORE_NAME = 'state'
const STATE_KEY = 'learner-state'

export interface LocalLearnerState {
  version: number
  progress: Record<string, TopicProgress>
  evidence: MasteryEvidence[]
}

const EMPTY_STATE: LocalLearnerState = {
  version: STORAGE_VERSION,
  progress: {},
  evidence: [],
}

export async function loadLearnerState(): Promise<LocalLearnerState> {
  if (!('indexedDB' in globalThis)) return EMPTY_STATE

  return new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, STORAGE_VERSION)
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME)
    }
    request.onerror = () => resolve(EMPTY_STATE)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(STORE_NAME, 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const read = store.get(STATE_KEY)
      read.onerror = () => resolve(EMPTY_STATE)
      read.onsuccess = () => resolve(read.result ?? EMPTY_STATE)
    }
  })
}

export async function saveLearnerState(state: LocalLearnerState): Promise<void> {
  if (!('indexedDB' in globalThis)) return

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, STORAGE_VERSION)
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME)
    }
    request.onerror = () => reject(request.error ?? new Error('Unable to open local database'))
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(STORE_NAME, 'readwrite')
      transaction.objectStore(STORE_NAME).put(state, STATE_KEY)
      transaction.oncomplete = () => resolve()
      transaction.onerror = () => reject(transaction.error ?? new Error('Unable to save local state'))
    }
  })
}
