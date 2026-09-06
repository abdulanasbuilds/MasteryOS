export type Depth = 'foundation' | 'core' | 'advanced' | 'specialist' | 'frontier'

export interface PracticeItem {
  id: string
  prompt: string
  type: 'question' | 'code' | 'project'
}

export interface Lesson {
  id: string
  programId: string
  topicId: string
  title: string
  summary: string
  depth: Depth
  objectives: string[]
  sections: Array<{
    id: string
    kind: 'text' | 'example' | 'code' | 'question'
    title: string
    body: string
  }>
  practice: PracticeItem[]
  assessmentId: string
}
