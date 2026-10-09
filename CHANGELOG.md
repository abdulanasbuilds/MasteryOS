# MasteryOS Changelog

All notable project-level changes are recorded here. Implementation changes should be added as the application evolves.

## 2026-10-08 — Gate 1 application shell

### Added

- Dependency-free hash router covering every route in `docs/FRONTEND-SHELL-SPEC.md` plus a not-found state.
- Application shell: skip link, sidebar primary navigation with `aria-current`, mobile menu disclosure, route-change focus management.
- Today, Universal Core, Programs, Program/route, Topic, Practice, Projects, Progress, Resources and Settings surfaces backed by the existing curriculum manifest, source catalog, authored lesson and local learner state — with honest empty/reserved states instead of placeholder metrics.
- Contextual AI panel (side panel on desktop, bottom sheet on mobile) behind the existing `AIProvider` boundary; provider failure is a recoverable state and AI output renders as plain text.
- Technical Learning Laboratory design tokens and responsive layouts.
- 40 new Vitest tests (42 total) and a recorded browser verification (`docs/verification/GATE-1-SHELL.md`).
- `package-lock.json` for deterministic installs.

### Fixed

- Pre-existing `tsc` failure that broke `npm run typecheck` and `npm run build` (`UnconfiguredAIProvider` signatures).

### Removed

- “Mark practice attempted” button, which raised mastery score to 25% from a single click, contradicting mastery-over-completion (D-004).

## 2026-09-06 — Pre-build foundation + executable scaffold

### Added

- Technology-wide MasteryOS project charter.
- Universal Core → Programs → Routes model.
- Local-first/browser-capable/future-connectable architecture contract.
- In-app learning and rights-aware content contract.
- Assessment/mastery/AI/workbench specifications.
- Build-readiness and zero-context agent handoff contracts.
- Ordered master build orchestration.
- First vertical-slice decision: TypeScript function decomposition.
- React + TypeScript + Vite application scaffold.
- Initial responsive application shell and Mission/Learn/Progress surfaces.
- Typed curriculum, mastery, assessment, local-storage, and AI-provider boundaries.
- First authored vertical-slice lesson and mastery-rule test.

### Changed

- Reframed MasteryOS from a primarily quant/mathematics system to a broad technology mastery environment.
- Strengthened local-first architecture so the core does not require a hosted database or account service.
- Clarified that future backend/cloud services are optional adapters around the local core.
- Expanded AI from a tutor feature into a system-wide contextual control layer.
- Expanded the in-app learning model beyond external resource links.
- Reconciled canonical Agent instructions, project charter, architecture, security, decisions, plan, tasks, learning architecture, AI tutor, and design brief.

### Removed

- Superseded temporary `PROJECT-UPDATED.md` and `TASKS-UPDATED.md` review copies.

### Current implementation state

The repository now contains an executable application foundation, but the complete MasteryOS product is not yet implemented. Gate 1 remains active; later mastery, assessment, AI integration, coding-runtime, and hardening gates require implementation and executable verification.
