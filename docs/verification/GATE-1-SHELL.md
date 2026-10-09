# Gate 1 — Application Shell Verification Record

Date: 2026-10-08
Scope: `docs/FRONTEND-SHELL-SPEC.md` acceptance criteria.
Environment: Node.js 22.12.0, npm 10.9, Chromium (Playwright 1.59, headless), production build served by `vite preview`.

## Baseline before the change

| Check | Result |
|---|---|
| `npm install` | OK on Node 22.12 (fails on Node 20 — below the declared `engines` floor) |
| `npm run typecheck` | **FAILED** — `src/app/App.tsx(70,30): TS2554` (`UnconfiguredAIProvider.coach()` declared with no parameters) |
| `npm test` | 2/2 passed |
| `npm run build` | **FAILED** — same TS2554 error |

## After the change

| Check | Command | Result |
|---|---|---|
| Clean install | `npm ci` | OK, 0 vulnerabilities |
| Typecheck | `npm run typecheck` | Pass |
| Unit + integration | `npm test` | 42/42 passed (4 files) |
| Production build | `npm run build` | Pass — JS 266.7 kB (82.9 kB gzip), CSS 14.2 kB (3.6 kB gzip) |
| Dependency audit | `npm audit` | 0 vulnerabilities |
| Browser verification | Playwright script (outside repo) against `vite preview` | 82/82 checks passed |

No dependencies were added. The browser script used a Playwright install outside the repository; adding Playwright as a project dev-dependency is deferred to Gate 11 and requires a dependency review.

## Browser checks (desktop 1440×900 and mobile 390×844, reduced motion)

Run at both viewports unless noted:

- Local learner state loads from real IndexedDB (status banner shows local mode).
- All 12 routes render the expected `<h1>`: `#/`, `#/core`, `#/programs`, `#/programs/computer-science`, `#/topic/program-decomposition-typescript-functions`, `#/topic/dom`, `#/practice`, `#/projects`, `#/progress`, `#/resources`, `#/settings`, unknown path (not-found).
- No horizontal overflow on any route.
- First Tab stop is “Skip to content”; activating it focuses `<main>`.
- Visible focus outline on keyboard focus.
- Primary-nav click navigates and moves focus to the page heading.
- Mobile only: nav hidden until Menu is opened, Escape closes the menu, and the nav closes after navigating.
- Topic learning-mode tabs respond to arrow keys and Home.
- Contextual AI opens from a lesson section with that section attached; asking with no provider shows a recoverable “AI is unavailable” notice and the lesson stays usable.
- AI panel docks as a right-hand side panel on desktop and becomes a full-width bottom sheet on mobile.
- Escape closes the AI panel and focus returns to the trigger that opened it.
- In-app navigation continues working with the network offline after first load.
- No console errors, page errors or HTTP ≥400 responses.
- No requests to any origin other than the local app (no fonts, analytics or CDNs).

Screenshots of Today, Universal Core, Programs, Topic + AI, Progress, Resources and Settings were reviewed at both viewports. Defects found and fixed during review: Menu button visible on desktop (CSS order), the mobile AI toggle had no accessible name, focus rings on programmatically focused headings, and repeated “Not yet authored” tags crowding topic lists.

## Automated test coverage (Vitest + jsdom, no new dependencies)

- `src/app/router.test.ts` — route parsing, unsafe/unknown ids → not-found, href round-trip.
- `src/content/content.test.ts` — manifest read model, unique ids, every phase prerequisite resolves, Universal Core feeds programs, https-only resource links, rights class preserved, filtering.
- `src/app/App.test.tsx` — landmarks/skip link/nav, every route, `aria-current` and focus management, breadcrumbs, **opening/reading a lesson grants no mastery or evidence**, keyboard tabs, AI unavailable path + Escape + focus return, **AI output rendered as text, not HTML**, storage-read failure is recoverable, stored evidence is reflected without invention, Settings AI test, safe external links.
- `src/domain/mastery.test.ts` — existing mastery threshold rules.

## Colour contrast (computed WCAG 2.x ratios for token pairs)

Text on background 16.3:1 · muted on background/surface/sunken 6.1 / 6.4 / 5.7:1 · lesson body 9.0:1 · code 15.4:1 · success 5.6:1 · info 6.6:1 · warning 5.3:1 · error 5.9:1 · focus ring vs background 5.5:1. All text pairs meet AA (4.5:1). Neutral grouping borders (2.2:1) are decorative and never the only carrier of meaning.

## Security / rights review

- No secrets, tokens, credentials or learner data in the diff.
- No backend, database, auth, analytics, sync or network calls added; the app makes no third-party requests.
- External resource URLs are rendered as links only when absolute `https:`; links use `rel="noopener noreferrer"`.
- AI output is rendered as plain text; provider access stays behind `AIProvider`; no `puter.*` or vendor calls.
- No third-party content copied; the UI renders only the existing original lesson, manifest structure and catalog metadata.

## Not verified

- Automated accessibility audit (axe or similar) and a manual screen-reader pass.
- Browsers other than Chromium (Firefox, Safari/WebKit).
- Touch-gesture behaviour on physical devices.
