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
- [x] Remove temporary/superseded review copies.
- [x] Add `docs/BUILD-READINESS.md` as the agent handoff gate.
- [x] Add `docs/MASTER-BUILD-ORCHESTRATION.md` as the ordered execution contract.
- [x] Add `docs/AGENT-HANDOFF.md` as the zero-context agent entrypoint.
- [x] Select the initial frontend/build direction: React + TypeScript + Vite.
- [x] Select the first vertical-slice competency: TypeScript function decomposition.
- [x] Run a repository terminology check for the major old product framing.

## READY — first implementation slice

The first slice is:

`Program/Topic → Interactive Lesson → Practice → Code Attempt → Assessment → AI Assistance → Follow-up Challenge → Mastery Evidence → Unlock → Local Progress`

Competency: **Program decomposition with TypeScript functions**.

Required slice artifacts:

- [ ] one authored interactive lesson;
- [ ] one visual/interactive explanation where useful;
- [ ] guided and independent practice;
- [ ] one coding task;
- [ ] one deterministic assessment contract;
- [ ] AI contextual assistance path;
- [ ] assistance-level tracking;
- [ ] follow-up independent challenge;
- [ ] mastery/unlock rule;
- [ ] local persistence;
- [ ] browser verification and automated tests.

## Implementation sequence

1. Repository/application scaffold.
2. Content schema and first lesson content.
3. Learning reader/runtime.
4. Local storage abstraction and learner state.
5. Practice/assessment engine.
6. Mastery/unlock logic.
7. Progress view.
8. Contextual AI adapter/UI.
9. Follow-up challenge flow.
10. Coding workspace.
11. End-to-end verification.

## Agent rule

An implementation agent must begin at the earliest incomplete item in this file and follow `docs/MASTER-BUILD-ORCHESTRATION.md`. It must not ask the owner to invent the build order when the repository already specifies it.

An agent may choose implementation details, but it must not silently change product scope, add mandatory infrastructure, or skip verification gates.

## Guarded future capabilities

- Hosted database — requires explicit architecture/security decision.
- Authentication/accounts — requires explicit product/architecture decision.
- Cloud synchronization — requires explicit sync/privacy design.
- Shared/community features — future connected layer.
- Server-side AI credential mediation — future connected layer.
- Remote code execution — requires isolated runtime design and security review.
- Unauthorized third-party content mirroring — prohibited.
- Real-money financial execution — out of scope.

## Build completion rule

Do not mark the application “built” merely because a page renders. The relevant vertical slice must work end-to-end, persist locally, pass its tests, survive browser verification, respect security/content rules, and match the governing documents.

## Historical initialization

- [x] Repository created and initial structure established.
- [x] Agent OS governing documents reviewed.
- [x] Documentation foundation created.
- [x] Curriculum/content/assessment/AI/design/verification specifications created.
