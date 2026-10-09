import { useState } from 'react'
import type { AIProvider } from '../../ai/provider'
import { curriculumMeta } from '../../content/curriculum'
import {
  filterResources,
  resourceCatalogVerified,
  resources,
  rightsClasses,
  safeExternalUrl,
} from '../../content/resources'
import type { LearnerLoad } from '../learner'
import { href } from '../router'
import { EmptyState, PageHeader, ReservedSurface, Section } from '../ui'

export function ResourcesScreen() {
  const [query, setQuery] = useState('')
  const [rights, setRights] = useState('all')
  const visible = filterResources(resources, query, rights)

  return (
    <>
      <PageHeader
        eyebrow="References"
        title="Resources"
        lead="Structured external references with provenance and rights class. They inform the curriculum; they are not MasteryOS authority and their content is not copied."
      />
      <form className="filters" role="search" onSubmit={(event) => event.preventDefault()}>
        <div className="field">
          <label htmlFor="resource-search">Search</label>
          <input
            id="resource-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. systems, math, algorithms"
          />
        </div>
        <div className="field">
          <label htmlFor="resource-rights">Rights class</label>
          <select id="resource-rights" value={rights} onChange={(event) => setRights(event.target.value)}>
            <option value="all">All</option>
            {rightsClasses.map((rightsClass) => (
              <option key={rightsClass} value={rightsClass}>
                {rightsClass}
              </option>
            ))}
          </select>
        </div>
      </form>
      <p className="muted small" aria-live="polite">
        {visible.length} of {resources.length} references · catalog last verified {resourceCatalogVerified}
      </p>
      {visible.length === 0 ? (
        <EmptyState title="No matching references">Try a broader search or another rights class.</EmptyState>
      ) : (
        <ul className="resource-list">
          {visible.map((entry) => {
            const url = safeExternalUrl(entry.url)
            return (
              <li key={entry.id} className="resource">
                <div className="resource-head">
                  <h2>
                    {url ? (
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {entry.name}
                        <span className="sr-only"> (external, opens in a new tab)</span>
                      </a>
                    ) : (
                      entry.name
                    )}
                  </h2>
                  <span className="tag">{entry.rightsClass}</span>
                </div>
                <p className="small">
                  {entry.type}
                  {entry.tier !== undefined && ` · tier ${entry.tier}`}
                  {entry.license && ` · ${entry.license}`}
                </p>
                {entry.role.length > 0 && <p className="muted small">Role: {entry.role.join(', ')}</p>}
                {entry.notes && <p className="small">{entry.notes}</p>}
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}

export function SettingsScreen({ learner, provider }: { learner: LearnerLoad; provider: AIProvider }) {
  const [aiCheck, setAICheck] = useState<'idle' | 'checking' | 'connected' | 'unavailable'>('idle')
  const hasIndexedDB = typeof globalThis.indexedDB !== 'undefined'

  async function testAI() {
    setAICheck('checking')
    try {
      setAICheck((await provider.testConnection()) ? 'connected' : 'unavailable')
    } catch {
      setAICheck('unavailable')
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Local settings"
        title="Settings"
        lead="MasteryOS runs locally. No account is required, and nothing leaves this device unless you enable a connected feature."
      />
      <Section title="Mode" label="Local-first">
        <p>
          <strong>Local / offline mode.</strong> Learner state is stored in this browser
          {hasIndexedDB ? ' (IndexedDB).' : '. IndexedDB is not available here, so state cannot persist in this session.'}
        </p>
        <p className="small">
          Learner state: {learner.status === 'ready' ? 'loaded' : learner.status === 'loading' ? 'loading…' : 'could not be read'}
          {' · '}Curriculum: {curriculumMeta.curriculumId} (verified {curriculumMeta.lastVerified})
        </p>
      </Section>

      <Section title="AI provider" label="Optional">
        <p>
          Status:{' '}
          <strong>
            {aiCheck === 'connected'
              ? 'Connected'
              : aiCheck === 'unavailable'
                ? 'Not configured'
                : aiCheck === 'checking'
                  ? 'Checking…'
                  : 'Not configured'}
          </strong>
        </p>
        <button type="button" className="secondary" onClick={testAI} disabled={aiCheck === 'checking'}>
          Test connection
        </button>
        <p className="muted small" aria-live="polite">
          {aiCheck === 'unavailable' &&
            'No AI provider is connected. Every core learning feature works without one. Provider configuration arrives with Gate 7.'}
        </p>
      </Section>

      <Section title="Data" label="Your learner record">
        <ReservedSurface title="Export, import and reset" gate="Gate 4">
          Backup, restore and safe reset of local learner state are implemented with the persistence gate, including a
          recovery path before any destructive action.
        </ReservedSurface>
      </Section>

      <Section title="Accessibility" label="Preferences">
        <p className="small">Motion follows your operating system’s reduced-motion setting.</p>
      </Section>
    </>
  )
}

export function NotFoundScreen({ what = 'This page' }: { what?: string }) {
  return (
    <>
      <PageHeader eyebrow="Not found" title="Nothing here" />
      <EmptyState title={`${what} does not exist.`}>
        Go back to <a href={href({ name: 'today' })}>Today</a> or browse <a href={href({ name: 'programs' })}>Programs</a>.
      </EmptyState>
    </>
  )
}
