# MasteryOS Tasks

## Current state — documentation/build-readiness

- [x] Reconcile MasteryOS mission from narrow quant framing to broad technology mastery.
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
- [x] Remove temporary/superseded review copies.
- [x] Run repository terminology/build-readiness checks.

## READY — next agent starts here

### Gate 1 — Application shell / frontend / UI

The next implementation agent must start here unless an actual repository inspection proves a blocking condition.

Read `docs/FRONTEND-SHELL-SPEC.md` and the governing documents before editing code.

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

Do not yet build the full mastery engine, backend, database, remote execution service, or full AI provider integration during this gate. Create clean boundaries so later phases can connect to the shell without rewriting it.

### Gate 2 — Content schema + first authored lesson

Only after Gate 1 passes, implement the content schema and the first real interactive lesson for the vertical slice.

### Gate 3 onward

Continue according to `docs/MASTER-BUILD-ORCHESTRATION.md` and this file's earliest incomplete implementation gate.

## MasteryOS first vertical slice

`Program/Topic → Interactive Lesson → Practice → Code Attempt → Assessment → AI Assistance → Follow-up Challenge → Mastery Evidence → Unlock → Local Progress`

Competency: **Program decomposition with TypeScript functions**.

## Future guarded capabilities

- Hosted database — requires explicit architecture/security decision.
- Authentication/accounts — requires explicit product/architecture decision.
- Cloud synchronization — requires explicit sync/privacy design.
- Shared/community features — future connected layer.
- Server-side AI credential mediation — future connected layer.
- Remote code execution — requires isolated runtime design and security review.
- Unauthorized third-party content mirroring — prohibited.
- Real-money financial execution — out of scope.

## Build completion rule

Do not mark the application “built” merely because a page renders. Each gate must satisfy its intended learner behavior, automated verification, browser verification where applicable, relevant security/content checks, and final diff review.

## Historical initialization

- [x] Repository created and initial structure established.
- [x] Agent OS governing documents reviewed.
- [x] Documentation foundation created.
- [x] Curriculum/content/assessment/AI/design/verification specifications created.
