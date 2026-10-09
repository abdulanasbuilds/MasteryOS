import type { Depth } from '../domain/content'
import type { ReactNode } from 'react'
import type { MasteryState } from '../domain/mastery'
import { MASTERY_LABELS } from './learner'
import { href, type Route } from './router'

/** Status is communicated by text + symbol, never by colour alone. */
const MASTERY_SYMBOLS: Record<MasteryState | 'not-started', string> = {
  'not-started': '○',
  unknown: '?',
  learning: '◔',
  practiced: '◑',
  'provisionally-mastered': '◕',
  mastered: '●',
  'needs-review': '!',
}

export function MasteryBadge({ state }: { state: MasteryState | 'not-started' }) {
  return (
    <span className={`mastery-badge mastery-${state}`}>
      <span aria-hidden="true">{MASTERY_SYMBOLS[state]}</span> {MASTERY_LABELS[state]}
    </span>
  )
}

export interface Crumb {
  label: string
  route?: Route
}

export function ContextBreadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1
          return (
            <li key={`${crumb.label}-${index}`}>
              {crumb.route && !last ? (
                <a href={href(crumb.route)}>{crumb.label}</a>
              ) : (
                <span aria-current={last ? 'page' : undefined}>{crumb.label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: ReactNode }) {
  return (
    <header className="page-header">
      <p className="eyebrow">{eyebrow}</p>
      <h1 id="page-title" tabIndex={-1}>
        {title}
      </h1>
      {lead && <p className="lead">{lead}</p>}
    </header>
  )
}

export function EmptyState({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="empty-state">
      <strong>{title}</strong>
      <p>{children}</p>
    </div>
  )
}

/** Honest marker for a surface whose behaviour belongs to a later gate. */
export function ReservedSurface({ title, gate, children }: { title: string; gate: string; children: ReactNode }) {
  return (
    <div className="reserved">
      <span className="label">Reserved · {gate}</span>
      <strong>{title}</strong>
      <p>{children}</p>
    </div>
  )
}

export function Section({ title, label, children }: { title: string; label?: string; children: ReactNode }) {
  const id = `section-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  return (
    <section className="surface" aria-labelledby={id}>
      {label && <span className="label">{label}</span>}
      <h2 id={id}>{title}</h2>
      {children}
    </section>
  )
}

const DEPTH_LABELS: Record<Depth, string> = {
  foundation: 'Foundation',
  core: 'Core',
  advanced: 'Advanced',
  specialist: 'Specialist',
  frontier: 'Frontier',
}

export function depthLabel(depth: Depth): string {
  return DEPTH_LABELS[depth]
}
