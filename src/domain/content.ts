export type Depth = 'foundation' | 'core' | 'advanced' | 'specialist' | 'frontier'

export interface PracticeItem {
  id: string
  prompt: string
  type: 'question' | 'code' | 'project'
}

/** A named idea the lesson teaches; concepts are the unit misconceptions and evidence attach to later. */
export interface Concept {
  id: string
  name: string
}

/**
 * Rights classes from docs/RESOURCE-GOVERNANCE-UPDATED.md. Only these three may
 * be hosted inside a lesson; `reference`, `unknown-rights` and `rejected`
 * material can never be shipped as lesson content.
 */
export type HostedRightsClass = 'native-original' | 'licensed' | 'provider-embedded'

export interface ContentProvenance {
  rightsClass: HostedRightsClass
  author: string
  /** Source-catalog ids that informed (not supplied) this content. */
  informedBy?: string[]
  /** Required when rightsClass is `licensed`. */
  license?: string
}

export type ContentStatus = 'draft' | 'review' | 'published'

export interface LessonSection {
  id: string
  kind: 'text' | 'example' | 'code' | 'question'
  title: string
  body: string
}

export interface Lesson {
  id: string
  programId: string
  topicId: string
  title: string
  summary: string
  depth: Depth
  version: number
  status: ContentStatus
  lastVerified: string
  estimatedMinutes: number
  provenance: ContentProvenance
  objectives: string[]
  concepts: Concept[]
  sections: LessonSection[]
  practice: PracticeItem[]
  assessmentId: string
}

/**
 * Applied work that produces mastery evidence across one or more topics.
 * Gate 2 defines and validates the contract; no project is authored yet.
 */
export interface Project {
  id: string
  programId: string
  title: string
  summary: string
  depth: Depth
  /** Topics whose mastery the project draws on and provides evidence for. */
  topicIds: string[]
  /** Observable criteria a reviewer (never AI alone) checks before evidence counts. */
  evidenceCriteria: string[]
  provenance: ContentProvenance
}
