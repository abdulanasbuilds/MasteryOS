# Gate 2 — Content & Curriculum Schema Verification Record

Date: 2026-10-09
Scope: `docs/MASTER-BUILD-ORCHESTRATION.md` Gate 2. The acceptance criterion is: "the application can render one real curriculum path from Program to Lesson". This record also covers the four schema issues logged in `TASKS.md` during Gate 1.
Decision: D-022.
Environment: Node.js 22.12.0, npm 10.9, Chromium (Playwright 1.59, headless), production build served by `vite preview` on port 4173.
Branch: `gate-2-curriculum-schema`, stacked on `gate-1-application-shell` (PR #1, unmerged at the time of writing).

## Baseline before the change (branch head `70c591c`)

These figures come from `docs/verification/GATE-1-SHELL.md` for the same commit. They were not re-run separately before the Gate 2 edits began.

| Check | Result |
|---|---|
| `npm run typecheck` | Pass |
| `npm test` | 42/42 passed |
| `npm run build` | Pass |
| Gate 1 browser script | 82/82 passed |

## After the change

| Check | Command | Result |
|---|---|---|
| Clean install | `npm ci` | OK, 0 vulnerabilities |
| Typecheck | `npm run typecheck` | Pass |
| Unit + integration | `npm test` | 63/63 passed (5 files; 21 new) |
| Production build | `npm run build` | Pass. JS 296.6 kB (89.6 kB gzip), up from 266.7 kB because the manifest now carries titles and domains |
| Dependency audit | `npm audit` | 0 vulnerabilities |
| Gate 2 browser checks | `docs/verification/scripts/gate-2-curriculum.cjs` | 28/28 passed |
| Gate 1 regression | `docs/verification/scripts/gate-1-shell.cjs` | 82/82 passed (see note) |

No dependencies were added; `package.json` is unchanged.

Gate 1 regression note: on the first re-run, 6 checks failed. All six were expectations of deliberately changed text, not behavior regressions:

- `#/topic/dom` now shows the authored title "DOM" instead of the id-derived "Dom";
- the lesson title now uses sentence case;
- the "Visualise" tab is now spelled "Visualize".

The expectations were updated, and the script was re-run green.

## Validator evidence

- The committed manifest, lessons and assessment definitions produce **0** errors (`curriculum-schema.test.ts`).
- The original v1 manifest (`git show 70c591c:content/curriculum/master-curriculum-manifest.json`) produces **91** errors, beginning with `schemaVersion: expected 2` and the missing `topics`, `depth` and `domains` fields.
- Each rule has a negative test that mutates a copy of the real manifest:
  - duplicate and non-kebab ids;
  - missing titles;
  - invalid depth;
  - bare and unknown phase prerequisites;
  - cross-program phase cycles;
  - unknown, self and cyclic topic prerequisites;
  - unregistered and unplaced topics;
  - duplicate placements and duplicate domain ids;
  - empty domains;
  - a lesson placed in the wrong program;
  - unhostable rights classes and a missing license;
  - dangling or wrong-topic assessment references;
  - project contract violations.

## Migration integrity

The v1 → v2 migration was a one-time script (not committed; the v1 file is preserved in git history). It asserted that each phase's set of topics is unchanged, apart from adding the lesson topic to `software-engineering.engineering-practice`. No topic moved between phases. Topic order within a phase now follows domain order.

## Browser checks (desktop 1366×900 and mobile 390×844)

The following passed on both viewports:

- `#/programs/software-engineering` shows the heading, "Phase 1 · Core", and 8 domains.
- There is no horizontal overflow on the program and topic pages.
- The topic link opens the lesson with breadcrumbs `Programs → Software Engineering → Engineering Practice → Design & Decomposition → Program decomposition with TypeScript functions`.
- The eyebrow reads "Software Engineering · Foundation".
- Key concepts are visible.
- The topic prerequisite link "Decomposition" navigates to `Programs → Universal Technology Core → Computational Thinking → Abstraction & Decomposition → Decomposition`.
- Focus moves to the page heading on navigation.
- `#/core` renders 10 domains.
- The shared topic `discrete-mathematics` shows "Also appears in".
- There are no console errors.

Screenshots were reviewed manually for layout, wrapping and overlap on the desktop program page and the full mobile topic page. No defects were found.

## Addendum — Universal Core conformance (D-023), same day

| Check | Result |
|---|---|
| Typecheck / build | Pass. JS 301.8 kB (91.1 kB gzip) |
| `npm test` | 78/78 passed. 15 new: 12 PROGRAMS.md family checks, no HTML/CSS in core, foundation depth, lesson programming prerequisite |
| Validator on extended manifest | 0 errors (306 topics; Universal Core 7 phases / 53 topics) |
| Gate 2 browser script (updated) | 34/34. Adds: lesson prerequisites `Decomposition`, `Functions & scope`; "Phase requires" lists Programming & Algorithms Foundation; core shows 7 phases and 19 domains; no overflow on the core page |
| Gate 1 regression | 82/82 |

Two existing assertions were updated because the lesson deliberately gained the `functions-and-scope` prerequisite. The full-page desktop screenshot of `#/core` was reviewed manually, and no layout defects were found. The page correctly reports that Computational Thinking and the two new systems and responsibility phases feed no program yet (see TASKS follow-ups).

## Addendum — Universal Core links into programs (D-024), same day

| Check | Result |
|---|---|
| Typecheck / build / `npm audit` | Pass / pass / 0 vulnerabilities |
| `npm test` | 90/90 passed. 12 new: 7 "core phase feeds a program" checks, every program links to the core, representative edges, no core → program edges, the depth-direction validator rule, and the UI's Feeds/Leads-to rendering |
| Validator | 0 errors with 44 topic edges and 7 phase edges, including the new depth-direction rule |
| Gate 2 browser script (updated) | 42/42. Adds: all 7 core phases show a fed program; `How the web works` lists its dependents; following "HTTP basics" shows the core prerequisite back-link; no overflow |
| Gate 1 regression | 82/82 |

The guard test "every specialized program links to the core" initially failed for Mathematics, which had no core link of any kind. This was a real gap, fixed with the Advanced Secondary → core Mathematical Foundation phase edge. The test was not weakened. The desktop screenshot of `#/topic/functions-and-scope` (prerequisites plus six "Leads to" links) was reviewed manually, and no layout defects were found.

## Re-running

```bash
npm ci && npm run typecheck && npm test && npm run build && npm audit
npx vite preview --port 4173 --strictPort &
PLAYWRIGHT_MODULE=/path/to/node_modules/playwright SHOT_DIR=/tmp \
  node docs/verification/scripts/gate-2-curriculum.cjs
PLAYWRIGHT_MODULE=/path/to/node_modules/playwright SHOT_DIR=/tmp \
  node docs/verification/scripts/gate-1-shell.cjs
```

Playwright is intentionally not a project dependency; adding it is a Gate 11 dependency review.

## Not verified

- No automated accessibility audit (axe) and no screen-reader pass were run.
- The domain groupings and phase depths were not checked against source syllabi or by the owner (see the `TASKS.md` follow-ups).
- Tests were not run in a real CI service; there is no CI configuration in the repository.
