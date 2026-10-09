import { useSyncExternalStore } from 'react'

/**
 * Minimal hash router for the Gate 1 shell.
 *
 * Hash routing is used deliberately: it works for static/browser-local delivery
 * (including opening the built app from a local file server) without any
 * server-side rewrite rules, and it needs no routing dependency.
 * Route paths follow docs/FRONTEND-SHELL-SPEC.md.
 */
export type Route =
  | { name: 'today' }
  | { name: 'core' }
  | { name: 'programs' }
  | { name: 'program'; programId: string }
  | { name: 'topic'; topicId: string }
  | { name: 'practice' }
  | { name: 'projects' }
  | { name: 'progress' }
  | { name: 'resources' }
  | { name: 'settings' }
  | { name: 'not-found'; path: string }

const STATIC_ROUTES: Record<string, Route> = {
  '/': { name: 'today' },
  '/core': { name: 'core' },
  '/programs': { name: 'programs' },
  '/practice': { name: 'practice' },
  '/projects': { name: 'projects' },
  '/progress': { name: 'progress' },
  '/resources': { name: 'resources' },
  '/settings': { name: 'settings' },
}

/** Identifiers in content are kebab-case; anything else is rejected rather than rendered. */
const ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,119}$/

function safeDecode(segment: string): string | null {
  try {
    return decodeURIComponent(segment)
  } catch {
    return null
  }
}

export function parseRoute(hash: string): Route {
  const raw = hash.replace(/^#/, '')
  const path = (raw === '' ? '/' : raw).split(/[?#]/)[0].replace(/\/+$/, '') || '/'

  const staticRoute = STATIC_ROUTES[path]
  if (staticRoute) return staticRoute

  const segments = path.split('/').filter(Boolean)
  if (segments.length === 2) {
    const id = safeDecode(segments[1])
    if (id && ID_PATTERN.test(id)) {
      if (segments[0] === 'programs') return { name: 'program', programId: id }
      if (segments[0] === 'topic') return { name: 'topic', topicId: id }
    }
  }

  return { name: 'not-found', path }
}

export function routePath(route: Route): string {
  switch (route.name) {
    case 'today':
      return '/'
    case 'program':
      return `/programs/${encodeURIComponent(route.programId)}`
    case 'topic':
      return `/topic/${encodeURIComponent(route.topicId)}`
    case 'not-found':
      return route.path
    default:
      return `/${route.name}`
  }
}

export function href(route: Route): string {
  return `#${routePath(route)}`
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function getHash(): string {
  return window.location.hash
}

export function useRoute(): Route {
  const hash = useSyncExternalStore(subscribe, getHash, () => '')
  return parseRoute(hash)
}

/** Primary-navigation section a route belongs to, used for aria-current. */
export function sectionOf(route: Route): Route['name'] {
  if (route.name === 'program') return 'programs'
  if (route.name === 'topic') return 'programs'
  return route.name
}
