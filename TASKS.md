# MasteryOS Tasks

## Current state — governance/scaffold/build readiness

- [x] Reconcile MasteryOS mission from narrow quantitative framing to broad technology mastery.
- [x] Define Universal Core → Programs → Routes → Depth model.
- [x] Define in-app learning as the primary classroom experience.
- [x] Define assessment, mastery evidence, remediation, and unlock behavior.
- [x] Define system-wide AI control layer and challenge-after-help behavior.
- [x] Define local-first, browser-capable, future-connectable architecture.
- [x] Define local learner-state boundary and future storage abstraction.
- [x] Define content provenance/rights governance.
- [x] Define coding/workbench security boundary.
- [x] Align Agent OS relationship and relevant skill routing.
- [x] Align design brief with the broad product model.
- [x] Research comparable products and document design/learning patterns.
- [x] Select Technical Learning Laboratory as the working visual direction.
- [x] Add `docs/BUILD-READINESS.md` as the agent handoff gate.
- [x] Add `docs/MASTER-BUILD-ORCHESTRATION.md` as the ordered execution contract.
- [x] Add `docs/AGENT-HANDOFF.md` as the zero-context agent entrypoint.
- [x] Add `docs/FRONTEND-SHELL-SPEC.md` as the implementation-ready frontend contract.
- [x] Select the initial frontend/build direction: React + TypeScript + Vite.
- [x] Select the first vertical-slice competency: TypeScript function decomposition.
- [x] Add Puter.js integration contract.
- [x] Add optional local/offline versus connected-mode rules.
- [x] Add optional peer-first collaboration contract.
- [x] Add connected-feature verification gates.
- [x] Add toolchain/provider/resource registry.
- [x] Add start-anywhere master agent prompt.
- [x] Research and synthesize Class Central, OSSU, ForrestKnight, and Scrimba source structures.
- [x] Add source coverage crosswalk and expanded curriculum seed graph.
- [x] Update project charter to reflect the actual executable scaffold state.
- [x] Tighten agent instructions around provider adapters, local-first behavior, rights, collaboration, and handoff.

## READY — next agent starts here

### Gate 1 — Application shell / frontend / UI

The next implementation agent must start here unless an actual repository inspection proves a blocking condition.

Read `docs/FRONTEND-SHELL-SPEC.md`, `AGENTS.md`, and the governing documents before editing code.

Status: **implemented and verified against `docs/FRONTEND-SHELL-SPEC.md` acceptance criteria (2026-10-08).** Evidence: `docs/verification/GATE-1-SHELL.md`.

- [x] Initial React + TypeScript + Vite scaffold created.
- [x] Fix pre-existing typecheck/build failure (`UnconfiguredAIProvider` method signatures).
- [x] Complete the React + TypeScript + Vite application shell (`src/app/App.tsx`).
- [x] Primary navigation and route/state structure — dependency-free hash router (`src/app/router.ts`) for all ten specified routes plus not-found.
- [x] Technical Learning Laboratory visual foundation — semantic tokens in `src/styles.css`.
- [x] Today/Mission surface (current route, next action, mastery state, weak areas, recent evidence — honest empty states).
- [x] Universal Core surface (phases, topics, “feeds” relationships derived from manifest prerequisites).
- [x] Programs and Program/route surfaces (from `content/curriculum/master-curriculum-manifest.json`).
- [x] Topic entry surface (Read / Visualise / Practice / Assess modes, mastery, prerequisites, contextual AI).
- [x] Practice / Projects / Progress / Resources / Settings entry surfaces.
- [x] Persistent but quiet contextual AI affordance (dockable side panel / mobile bottom sheet; works when AI unavailable).
- [x] Responsive desktop/laptop and mobile layouts (menu disclosure, bottom-sheet AI).
- [x] Accessibility and interaction states (landmarks, skip link, focus management, keyboard tabs, Escape handling, text+symbol status).
- [x] Automated tests (42 Vitest tests) and browser verification (81 Playwright checks, desktop + mobile).
- [x] Removed the old “Mark practice attempted” control, which granted a 25% mastery score for a click (violated mastery-over-completion).

Open Gate 1 follow-ups (non-blocking, recorded so they are not lost):

- [ ] Command palette (listed as a suggested component; not an acceptance criterion).
- [ ] Automated accessibility audit (e.g. axe) and manual screen-reader pass — not yet run.
- [ ] Owner visual review of the Technical Learning Laboratory direction.

Do not yet build the full mastery engine, backend, database, remote execution service, or full connected provider integration merely as a shortcut. Preserve clean adapter boundaries so later gates can connect without rewriting the core.

### Gate 2 — Content schema + first authored lesson  ← NEXT

Only after Gate 1 passes, implement the content schema and the first real interactive lesson for the vertical slice.

Known inputs discovered during Gate 1 (must be resolved here, not guessed in UI code):

- The authored lesson's topic id `program-decomposition-typescript-functions` does **not** appear in `content/curriculum/master-curriculum-manifest.json`. Gate 2 must place it in the curriculum graph (Program → Phase → Domain → Topic) so the app can render one real path from Program to Lesson.
- Manifest phase prerequisites use two forms: bare `phase-id` and program-qualified `program-id.phase-id`. The shell accepts both (`findPhase` in `src/content/curriculum.ts`); the schema should normalise to one.
- Manifest topics are ids only; the shell derives titles from ids. The schema should add authored titles, depth, and topic-level prerequisites.
- The manifest has no Domain level yet; breadcrumbs currently show Program → Phase → Topic.

### Gate 3 — Learning experience

Build one high-quality interactive lesson experience with the complete lesson loop and contextual AI activation points.

### Gate 4 — Local state and persistence

Implement durable local storage behind the repository abstraction and add import/export/backup behavior as specified.

### Gate 5 — Practice and assessment engine

Implement topic-appropriate evidence, assistance tracking, remediation and reassessment.

### Gate 6 — Mastery and unlocking

Implement the progression state machine and prerequisite-aware mastery decisions.

### Gate 7 — AI control layer + Puter adapter

Implement the provider-neutral AI layer and the first connected Puter AI adapter when the gate is reached.

Requirements:

- no shared developer credential in client code;
- user-initiated connection/authentication;
- AI can fail without breaking core learning;
- highlight-to-ask is a first-class interaction;
- assistance levels are recorded;
- substantial help can trigger an independent transfer challenge;
- current official Puter documentation is checked before provider-specific implementation.

### Gate 8 — Coding laboratory

Add the in-app code editor and safe bounded execution environment.

### Gate 9 — Technical workbenches

Add math/graph/DSA/system-design/debugging workbenches when they provide genuine learning value.

### Gate 10 — Progress, productivity, and gamification

Implement mastery dashboard, weak-area detection, review queue, next-best-action, focus tools and carefully constrained gamification.

### Gate 11 — Verification and hardening

Run unit, integration, browser, accessibility, security, dependency, performance, local persistence, curriculum and content-rights verification.

### Gate 12 — Optional connected architecture

Only after the local-first foundation is strong, implement optional connected capabilities:

- Puter authentication;
- optional cloud sync/backup;
- optional shared rooms;
- Puter Peer collaboration;
- shared notes/whiteboard/pair programming;
- optional voice/video/screen sharing;
- alternative providers/adapters where justified.

Use `docs/PUTER-INTEGRATION-SPEC.md`, `docs/COLLABORATION-SPEC.md`, and `docs/CONNECTED-VERIFICATION-SPEC.md`.

## MasteryOS first vertical slice

`Program/Topic → Interactive Lesson → Practice → Code Attempt → Assessment → AI Assistance → Follow-up Challenge → Mastery Evidence → Unlock → Local Progress`

Competency: **Program decomposition with TypeScript functions**.

## Future guarded capabilities

- Hosted database — requires explicit architecture/security decision.
- Authentication/accounts — optional connected feature; local mode remains account-free.
- Cloud synchronization — requires explicit sync/privacy design.
- Shared/community features — future connected layer.
- Server-side AI credential mediation — future connected layer.
- Remote code execution — requires isolated runtime design and security review.
- Unauthorized third-party content mirroring — prohibited.
- Production financial execution — out of scope.
- Permanent collaboration database — requires a separate explicit decision; not needed merely to support peer study.

## Build completion rule

Do not mark the application “built” merely because a page renders. Each gate must satisfy its intended learner behavior, automated verification, browser verification where applicable, relevant security/content checks, and final diff review.

## Documentation integrity rule

Whenever implementation changes a durable product behavior, update the relevant governing specification. Do not leave the repository describing an architecture or feature state that the code no longer represents.

## Historical initialization

- [x] Repository created and initial structure established.
- [x] Agent OS governing documents reviewed.
- [x] Documentation foundation created.
- [x] Curriculum/content/assessment/AI/design/verification specifications created.
- [x] Executable application scaffold created.
- [x] Puter/collaboration connected architecture contracts added.

## Next-action rule

Agents entering the repository at any time must start at the earliest incomplete approved gate after inspecting actual code, tests, Git state and current documentation. Do not skip ahead to visually attractive features merely because they are more interesting.

## Governance hardening — complete

- [x] Add `docs/AGENT-CONTRACT.md` as the binding operational contract for every agent.
- [x] Replace the master handoff prompt with a concise start-anywhere prompt.
- [x] Add `CLAUDE.md` repository adapter.
- [x] Add `.github/copilot-instructions.md` repository adapter.
- [x] Align agent handoff/readme/task documentation with the single contract.
- [x] Explicitly document restricted actions, stop conditions, dependency rules, verification, and truthful reporting.
- [x] Preserve the existing Gate 1 start point; governance hardening does not count product gates as complete.

**Important:** these items mean agent governance is implemented, not that the application itself is complete. Continue from the earliest incomplete product gate below.
