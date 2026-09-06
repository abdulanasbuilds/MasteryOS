export interface AIContext {
  prompt: string
  selectedText?: string
  topicId?: string
  assistanceLevel?: number
}

export interface AIResponse {
  text: string
  assistanceLevel: number
  followUpChallenge?: string
}

export interface AIProvider {
  testConnection(): Promise<boolean>
  explain(context: AIContext): Promise<AIResponse>
  coach(context: AIContext): Promise<AIResponse>
}

export class UnconfiguredAIProvider implements AIProvider {
  async testConnection(): Promise<boolean> {
    return false
  }

  async explain(): Promise<AIResponse> {
    throw new Error('AI provider is not configured. Complete provider setup before using AI assistance.')
  }

  async coach(): Promise<AIResponse> {
    throw new Error('AI provider is not configured. Complete provider setup before using AI assistance.')
  }
}
