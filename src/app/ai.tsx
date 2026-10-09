import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react'
import type { AIProvider, AIResponse } from '../ai/provider'

/**
 * Contextual AI affordance for the shell.
 *
 * The panel is a quiet, dockable surface (side panel on wide screens, bottom
 * sheet on narrow screens). Learning objects open it with a compact context
 * packet; there is no full-screen chatbot. All provider access goes through
 * the provider-neutral AIProvider boundary, and provider failure is shown as
 * a recoverable state that never blocks the rest of the application.
 *
 * Gate 7 owns assistance-level recording, hint escalation and transfer
 * challenges. Nothing here writes learner evidence or grants mastery.
 */
export interface AIAttachment {
  /** Human-readable description of what is attached, e.g. "Section: The mental model". */
  label: string
  topicId?: string
  selectedText?: string
}

type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'unavailable'; message: string }
  | { status: 'answered'; response: AIResponse }

interface AIControls {
  open: boolean
  attachment?: AIAttachment
  openPanel: (attachment?: AIAttachment) => void
  closePanel: () => void
}

const AIContextValue = createContext<AIControls | null>(null)

export function useAI(): AIControls {
  const value = useContext(AIContextValue)
  if (!value) throw new Error('useAI must be used inside <AIProviderScope>')
  return value
}

export function AIProviderScope({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [attachment, setAttachment] = useState<AIAttachment | undefined>()
  const returnFocus = useRef<HTMLElement | null>(null)

  const openPanel = useCallback((next?: AIAttachment) => {
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setAttachment(next)
    setOpen(true)
  }, [])

  const closePanel = useCallback(() => {
    setOpen(false)
    const target = returnFocus.current
    returnFocus.current = null
    // Return focus to whatever opened the panel (keyboard users must not be stranded).
    if (target && document.contains(target)) requestAnimationFrame(() => target.focus())
  }, [])

  const value = useMemo(() => ({ open, attachment, openPanel, closePanel }), [open, attachment, openPanel, closePanel])
  return <AIContextValue.Provider value={value}>{children}</AIContextValue.Provider>
}

/** Small contextual trigger attached to a learning object. */
export function AskAIButton({ attachment, children }: { attachment: AIAttachment; children?: ReactNode }) {
  const { openPanel, open } = useAI()
  return (
    <button
      type="button"
      className="ask-ai"
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls="ai-panel"
      onClick={() => openPanel(attachment)}
    >
      <span aria-hidden="true" className="ask-ai-mark">AI</span>
      {children ?? 'Ask about this'}
    </button>
  )
}

export function AIPanel({ provider }: { provider: AIProvider }) {
  const { open, attachment, closePanel } = useAI()
  const [question, setQuestion] = useState('')
  const [request, setRequest] = useState<RequestState>({ status: 'idle' })
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!open) return
    setRequest({ status: 'idle' })
    headingRef.current?.focus()
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') closePanel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, attachment, closePanel])

  if (!open) return null

  async function ask(event: FormEvent) {
    event.preventDefault()
    if (!question.trim()) return
    setRequest({ status: 'loading' })
    try {
      const response = await provider.coach({
        prompt: question.trim(),
        topicId: attachment?.topicId,
        selectedText: attachment?.selectedText,
      })
      setRequest({ status: 'answered', response })
    } catch (error) {
      setRequest({
        status: 'unavailable',
        message: error instanceof Error ? error.message : 'AI assistance is unavailable.',
      })
    }
  }

  return (
    <aside id="ai-panel" className="ai-panel" role="dialog" aria-modal="false" aria-labelledby="ai-panel-title">
      <div className="ai-panel-head">
        <div>
          <span className="label">Contextual AI</span>
          <h2 id="ai-panel-title" ref={headingRef} tabIndex={-1}>
            Assistant
          </h2>
        </div>
        <button type="button" className="icon-button" onClick={closePanel} aria-label="Close AI assistant">
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <p className="ai-context">
        <span className="label">Attached context</span>
        <span>{attachment?.label ?? 'Nothing attached — open the assistant from a lesson section to attach it.'}</span>
      </p>

      <form onSubmit={ask} className="ai-form">
        <label htmlFor="ai-question">Your question</label>
        <textarea
          id="ai-question"
          rows={3}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="What part is unclear?"
        />
        <button type="submit" className="primary" disabled={request.status === 'loading' || !question.trim()}>
          {request.status === 'loading' ? 'Asking…' : 'Ask'}
        </button>
      </form>

      <div aria-live="polite" className="ai-result">
        {request.status === 'unavailable' && (
          <div className="notice notice-warning" role="status">
            <strong>AI is unavailable.</strong> {request.message} Lessons, practice and progress keep working
            without it. Provider setup arrives with the AI control layer (Gate 7).
          </div>
        )}
        {request.status === 'answered' && (
          // Model output is untrusted: rendered as plain text, never as HTML.
          <p className="ai-answer">{request.response.text}</p>
        )}
      </div>

      <p className="muted small">
        AI coaches; it never grants mastery. Help received may require an independent follow-up challenge.
      </p>
    </aside>
  )
}
