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
