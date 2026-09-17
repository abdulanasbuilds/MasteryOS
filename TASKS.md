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
- [x] Update project charter to reflect the actual executable scaffold state.
- [x] Tighten agent instructions around provider adapters, local-first behavior, rights, collaboration, and handoff.

## READY — next agent starts here

### Gate 1 — Application shell / frontend / UI

The next implementation agent must start here unless an actual repository inspection proves a blocking condition.

Read `docs/FRONTEND-SHELL-SPEC.md`, `AGENTS.md`, and the governing documents before editing code.

Current progress:

- [x] Initial React + TypeScript + Vite scaffold created.
- [x] Initial application entrypoint created.
- [x] Initial responsive visual foundation created.
- [x] Initial Mission, Learn, and Progress surfaces created.

Remaining Gate 1 work:

1. Complete the React + TypeScript + Vite application shell.
2. Complete primary navigation and route/state structure.
3. Complete the Technical Learning Laboratory visual foundation.
4. Complete Today/Mission surface.
5. Complete Universal Core surface.
6. Complete Programs/route surface.
7. Complete Topic entry surface.
8. Complete Practice / Projects / Progress / Resources / Settings entry surfaces.
9. Complete persistent but quiet contextual AI affordance.
10. Complete responsive desktop/laptop and mobile layouts.
11. Complete accessibility and interaction states.
12. Add automated tests and browser verification for the shell.

Do not yet build the full mastery engine, backend, database, remote execution service, or full connected provider integration merely as a shortcut. Preserve clean adapter boundaries so later gates can connect without rewriting the core.

### Gate 2 — Content schema + first authored lesson

Only after Gate 1 passes, implement the content schema and the first real interactive lesson for the vertical slice.

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
