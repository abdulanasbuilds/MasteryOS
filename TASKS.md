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
- [x] Automated tests (42 Vitest tests) and browser verification (82 Playwright checks, desktop + mobile).
- [x] Removed the old “Mark practice attempted” control, which granted a 25% mastery score for a click (violated mastery-over-completion).

Open Gate 1 follow-ups (non-blocking, recorded so they are not lost):

- [ ] Command palette (listed as a suggested component; not an acceptance criterion).
- [ ] Automated accessibility audit (e.g. axe) and manual screen-reader pass — not yet run.
- [ ] Owner visual review of the Technical Learning Laboratory direction.

Do not yet build the full mastery engine, backend, database, remote execution service, or full connected provider integration merely as a shortcut. Preserve clean adapter boundaries so later gates can connect without rewriting the core.

### Gate 2 — Content schema + first authored lesson

Status: **acceptance criterion met and verified (2026-10-09).** The criterion, from `docs/MASTER-BUILD-ORCHESTRATION.md`, is: "the application can render one real curriculum path from Program to Lesson". Evidence: `docs/verification/GATE-2-CURRICULUM-SCHEMA.md`. Decision: D-022.

The four schema issues found during Gate 1 are resolved:

- [x] The lesson topic `program-decomposition-typescript-functions` is placed at Software Engineering → Engineering Practice → Design & Decomposition, with depth `foundation` and a prerequisite on `decomposition`.
- [x] Phase prerequisites are normalized to `<program-id>.<phase-id>`; the validator rejects the bare form.
- [x] A topic registry provides authored titles for all topics (283 at D-022; 306 after D-023), plus optional summary, depth override and topic-level prerequisites.
- [x] A Domain level exists (81 domains); breadcrumbs show Programs → Program → Phase → Domain → Topic.

Required concepts (orchestration Gate 2):

- [x] Program, Phase, Domain, Topic: manifest v2 with types in `src/domain/curriculum.ts`.
- [x] Level/depth: required phase `depth`, optional topic override; placement depth is resolved per placement.
- [x] Lesson, Concept, Practice: the `Lesson` type in `src/domain/content.ts` adds concepts, version, status, `lastVerified` and `estimatedMinutes`.
- [x] Assessment: a definition contract exists, and lesson references must resolve (`src/content/assessments.ts`). Items, scoring and diagnosis remain Gate 5.
- [x] Prerequisite edges: phase and topic graphs, both acyclic, validated.
- [x] Content provenance: hostable rights classes only (`native-original`, `licensed` with a license, `provider-embedded`).
- [~] Route: only the recommended route is modeled, as list order (`recommendedRoute`). Strong-alternative and deep-dive routes (PROGRAMS.md) are not authored, and authoring them is a curriculum decision.
- [~] Project: the contract and validation exist; no project is authored.
- [x] Validator `src/content/validate-curriculum.ts` runs in the test suite, so invalid content fails CI-equivalent `npm test`.

Open Gate 2 follow-ups (non-blocking, recorded so they are not lost):

- [x] **Universal Core vs. `PROGRAMS.md` conflict: resolved by D-023.** The core now has 7 foundation phases and 53 topics covering every PROGRAMS.md family. The TypeScript lesson requires the core topic `functions-and-scope`. A conformance test guards this.
- [x] Program topics and phases link to the Universal Core (D-024): 44 topic edges and 7 phase edges, with reasons in `docs/CURRICULUM-CORE-LINKS.md`. Every core phase now feeds at least one program, and guard tests enforce it.
- [ ] Intra-program sequencing is undeclared. Examples: SE Architecture → Engineering Practice; ML Foundations → Mathematics University Core; CS Systems/Networking/Databases → CS Intro. Add these when Gate 6 unlock rules are designed, so the edges match how unlocking actually works.
- [ ] Decide how Computer Science Intro (Python/C foundations) relates to the core Programming Foundation: keep it as "second-language" practice (current edges) or merge the two.
- [x] Software Engineering → Engineering Practice requires `universal-core.programming-foundation` and `universal-core.developer-foundation` (D-023). The later SE phases still declare no prerequisites on Engineering Practice.
- [ ] Owner review of the D-022/D-023/D-024 domain groupings, phase depths, new core topic scopes and core-link edges, which were authored from topic semantics and not checked against source syllabi.
- [ ] Topic-level prerequisites exist only for the authored lesson topic; map more as lessons are authored. Prerequisites must be real dependencies (LEARNING-ARCHITECTURE §7).
- [ ] Remaining competency fields from LEARNING-ARCHITECTURE §6 (misconceptions, mastery criteria, transfer links, confidence/evidence) are not yet in the schema; add each one when a gate consumes it.
- [ ] Lesson content is still TypeScript data (`src/content/first-lesson.ts`), not `content/lessons/`; move it when a second lesson exists.

### Gate 3 — Learning experience  ← NEXT

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
