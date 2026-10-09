import { describe, expect, it } from 'vitest'
import { href, parseRoute, routePath, sectionOf, type Route } from './router'

describe('parseRoute', () => {
  it('maps every specified shell route', () => {
    expect(parseRoute('')).toEqual({ name: 'today' })
    expect(parseRoute('#/')).toEqual({ name: 'today' })
    expect(parseRoute('#/core')).toEqual({ name: 'core' })
    expect(parseRoute('#/programs')).toEqual({ name: 'programs' })
    expect(parseRoute('#/programs/computer-science')).toEqual({ name: 'program', programId: 'computer-science' })
    expect(parseRoute('#/topic/dom')).toEqual({ name: 'topic', topicId: 'dom' })
    expect(parseRoute('#/practice')).toEqual({ name: 'practice' })
    expect(parseRoute('#/projects')).toEqual({ name: 'projects' })
    expect(parseRoute('#/progress')).toEqual({ name: 'progress' })
    expect(parseRoute('#/resources')).toEqual({ name: 'resources' })
    expect(parseRoute('#/settings')).toEqual({ name: 'settings' })
  })

  it('tolerates trailing slashes and query strings', () => {
    expect(parseRoute('#/core/')).toEqual({ name: 'core' })
    expect(parseRoute('#/progress?x=1')).toEqual({ name: 'progress' })
  })

  it('rejects unknown paths and unsafe identifiers as not-found', () => {
    expect(parseRoute('#/nope').name).toBe('not-found')
    expect(parseRoute('#/topic/<script>').name).toBe('not-found')
    expect(parseRoute('#/topic/%E0%A4%A').name).toBe('not-found')
    expect(parseRoute('#/programs/a/b').name).toBe('not-found')
    expect(parseRoute('#/topic/UPPER').name).toBe('not-found')
  })
})

describe('href / routePath', () => {
  it('round-trips routes', () => {
    const routes: Route[] = [
      { name: 'today' },
      { name: 'core' },
      { name: 'program', programId: 'web-engineering' },
      { name: 'topic', topicId: 'problem-decomposition' },
      { name: 'settings' },
    ]
    for (const route of routes) expect(parseRoute(href(route))).toEqual(route)
    expect(routePath({ name: 'today' })).toBe('/')
  })

  it('assigns nested routes to their navigation section', () => {
    expect(sectionOf({ name: 'program', programId: 'x' })).toBe('programs')
    expect(sectionOf({ name: 'progress' })).toBe('progress')
  })
})
