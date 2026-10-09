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

export const AI_UNCONFIGURED_MESSAGE =
  'AI provider is not configured. Complete provider setup before using AI assistance.'

/**
 * Default provider: no AI is connected. Every capability fails with a clear,
 * recoverable error so the rest of the application keeps working.
 */
export class UnconfiguredAIProvider implements AIProvider {
  async testConnection(): Promise<boolean> {
    return false
  }

  async explain(_context: AIContext): Promise<AIResponse> {
    throw new Error(AI_UNCONFIGURED_MESSAGE)
  }

  async coach(_context: AIContext): Promise<AIResponse> {
    throw new Error(AI_UNCONFIGURED_MESSAGE)
  }
}
