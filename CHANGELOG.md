# MasteryOS Changelog

All notable project-level changes are recorded here. Implementation changes should be added as the application evolves.

## 2026-10-09 — Gate 2 content and curriculum schema

### Added

- Curriculum schema v2 (D-022): topic registry with authored titles for all 283 topics; required phase depth; a Domain level (81 domains); program-qualified phase prerequisites; topic-level prerequisites; explicit recommended route by list order.
- Typed content model in `src/domain/curriculum.ts` and `src/domain/content.ts` covering lesson concepts, version, status, last-verified date, estimated effort, provenance/rights class, and a `Project` contract.
- Dependency-free validator `src/content/validate-curriculum.ts`. It checks ids, uniqueness, depth values, reference resolution, prerequisite cycles (phase and topic graphs), unplaced topics, lesson placement, hostable rights classes, license presence, and assessment and project references.
- Assessment definition for the first lesson (`src/content/assessments.ts`); items arrive in Gate 5.
- UI: program and Universal Core pages group topics by domain and show phase depth. Topic pages show the full breadcrumb (Programs → Program → Phase → Domain → Topic), the depth, the key concepts, the lesson version/status, and linked topic prerequisites.
- 21 new tests (63 total). Browser verification scripts committed under `docs/verification/scripts/`.

### Changed

- The authored lesson topic `program-decomposition-typescript-functions` is now in the graph: Software Engineering → Engineering Practice → Design & Decomposition.
- The lesson title now uses sentence case to match the topic registry convention.
- UI spelling is standardized to American English ("Visualize", "Practiced").

### Removed

- Runtime title derivation from ids and support for bare phase-prerequisite references.

### Fixed (same day) — Universal Core conformance (D-023)

- The Universal Core now covers every family `PROGRAMS.md` requires. Three foundation phases were added (Programming & Algorithms; Computer, Internet & Data; Security, Reliability & Responsible AI), with 23 new topics, giving 7 phases and 53 topics in the core.
- The authored lesson topic requires `functions-and-scope`. Software Engineering → Engineering Practice requires the core programming and developer-tooling phases.
- A conformance test guards the PROGRAMS.md families, keeps HTML/CSS out of the core, and enforces foundation depth. Tests: 78 in total.
- UI copy: "specialized" spelling.

### Added (same day) — Universal Core links into programs (D-024)

- 44 topic-level and 7 phase-level prerequisite edges from program content to the Universal Core. Each one is listed with its reason in `docs/CURRICULUM-CORE-LINKS.md`.
- Validator rule: no prerequisite may be deeper than the topic that requires it.
- The Universal Core "Feeds" label counts topic-level dependencies. Topic pages list "Leads to" reverse edges.
- Guard tests: every core phase feeds a program, and every program links to the core. Tests: 90 in total.


### Final curriculum graph snapshot after D-024

- 306 registered topics across 7 program nodes (including the Universal Core).
- 32 phases and 90 domains; every registered topic is placed at least once.
- 62 topic-level prerequisite edges and 13 phase-level prerequisite edges.
- Structural review found no dangling topic or phase prerequisites and no unplaced topics. These checks are not a substitute for owner review of the curriculum mapping, which remains open in `TASKS.md` before Gate 6 defines unlock behavior.

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

The repository now contains the application shell (Gate 1) and the v2 curriculum graph/validator (Gate 2), each with a verification record. The complete MasteryOS product is not yet implemented. **Gate 3 — interactive learning experience — is next.** Practice/assessment, mastery/unlocking, the AI control layer, coding runtime, workbenches, progress, and connected capabilities remain future gates.
