import catalog from '../../content/references/source-catalog.json'

/**
 * Structured external references. These are data, not authority: listing a
 * resource never changes curriculum, assessment, or mastery rules.
 */
export interface ResourceEntry {
  id: string
  name: string
  url?: string
  repository?: string
  type: string
  tier?: number
  role: string[]
  license?: string
  rightsClass: string
  notes?: string
}

interface RawCatalog {
  lastVerified: string
  sources: Array<Partial<ResourceEntry> & { id: string; name: string }>
}

const raw = catalog as RawCatalog

export const resourceCatalogVerified = raw.lastVerified

export const resources: ResourceEntry[] = raw.sources.map((source) => ({
  id: source.id,
  name: source.name,
  url: source.url,
  repository: source.repository,
  type: source.type ?? 'reference',
  tier: source.tier,
  role: Array.isArray(source.role) ? source.role : [],
  license: source.license,
  rightsClass: source.rightsClass ?? 'unclassified',
  notes: source.notes,
}))

/**
 * Only absolute https URLs are rendered as links. Anything else (javascript:,
 * data:, http:, relative, malformed) is shown as plain text so catalog data
 * can never inject a dangerous navigation.
 */
export function safeExternalUrl(value: string | undefined): string | undefined {
  if (!value) return undefined
  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? url.toString() : undefined
  } catch {
    return undefined
  }
}

export function filterResources(entries: ResourceEntry[], query: string, rightsClass: string): ResourceEntry[] {
  const needle = query.trim().toLowerCase()
  return entries.filter((entry) => {
    if (rightsClass !== 'all' && entry.rightsClass !== rightsClass) return false
    if (!needle) return true
    const haystack = [entry.name, entry.type, entry.notes ?? '', ...entry.role].join(' ').toLowerCase()
    return haystack.includes(needle)
  })
}

export const rightsClasses = Array.from(new Set(resources.map((entry) => entry.rightsClass))).sort()
