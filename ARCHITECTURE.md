# MasteryOS Architecture

## 1. Architectural intent

MasteryOS is a **local-first, browser-capable, optionally connected learning application**.

The core product must be usable as a self-contained application on the learner's machine. A browser deployment is also a supported delivery mode. Backend, cloud, and centralized services are optional extensions, not prerequisites for the core learning experience.

The architecture therefore separates:

```text
MasteryOS Core
  ├─ Content and curriculum
  ├─ Learning runtime
  ├─ Assessment/mastery engine
  ├─ Progress/productivity state
  ├─ AI control layer
  ├─ Interactive workbenches
  └─ Local persistence

Optional Connected Services
  ├─ AI mediation/providers
  ├─ Cloud sync
  ├─ Accounts/identity
  ├─ Shared content
  ├─ Remote execution
  └─ Collaboration/services
```

A future connected version should attach through explicit adapters rather than turning the local core into a thin client.

## 2. Core boundaries

The application is divided conceptually into these bounded areas:

1. **Content system** — curriculum, lessons, examples, practice, assessments, projects, provenance.
2. **Learning engine** — sequencing, prerequisites, recommendations, lesson state.
3. **Assessment/mastery engine** — attempts, scoring, evidence, remediation, unlock rules.
4. **Learner state** — progress, mistakes, notes, sessions, preferences, local history.
5. **Interactive runtime** — readers, visualizations, whiteboards, coding/system workbenches.
6. **AI control layer** — contextual assistance and provider abstraction.
7. **Presentation layer** — responsive accessible UI.
8. **Integration adapters** — optional providers/services whose failure must not corrupt the core.

Domain logic should remain independent from provider-specific SDKs and future cloud services.

## 3. Frontend/application shell

Likely implementation: TypeScript with React or a similarly mature browser UI architecture. Next.js may be used if static/local-first behavior remains straightforward and justified.

Responsibilities include:

- home/today view;
- universal core and program navigation;
- route and prerequisite visualization;
- topic/lesson reader;
- interactive learning blocks;
- practice and assessment interfaces;
- coding/system workbenches;
- progress and mastery views;
- productivity/focus tools;
- contextual AI controls;
- settings, storage, import/export, and provider configuration.

Do not adopt a framework feature merely because it exists. Architectural decisions follow evidence and current dependency review.

## 4. Content architecture

Content is version-controlled separately from learner state.

Conceptual structure:

`Program → Phase → Domain → Topic → Lesson → Concept → Example → Practice → Assessment → Project`

Suggested repository areas:

- `content/programs/`;
- `content/curriculum/`;
- `content/lessons/`;
- `content/problems/`;
- `content/assessments/`;
- `content/projects/`;
- `content/references/`;
- `content/research/`.

Structured data may use JSON/YAML where relationships or machine validation require it. Human-facing teaching material should remain readable and versionable.

## 5. Embedded learning runtime

The application must support interactive content blocks such as:

- text;
- equations;
- code;
- images;
- diagrams;
- graphs;
- tables;
- interactive visualizations;
- questions;
- worked examples;
- collapsible derivations;
- whiteboards/workbenches;
- video/audio where rights and runtime permit;
- runnable exercises where safe.

The renderer must distinguish trusted authored content from imported/untrusted content and sanitize or constrain the latter.

## 6. Local persistence

Learner state should use durable local storage appropriate to the runtime, with IndexedDB as the default browser storage mechanism where supported.

Persistable local state may include:

- mastery evidence;
- attempts and assessment results;
- prerequisite health;
- mistakes and misconceptions;
- notes/bookmarks;
- study sessions;
- progress and streaks;
- productivity history;
- local project state;
- settings;
- optional AI interaction metadata.

Small UI preferences may use localStorage. Sensitive provider credentials should not be persisted by default.

Provide explicit export/import or backup mechanisms later rather than silently turning learner data into a server dependency.

## 7. Storage abstraction

Do not scatter direct IndexedDB calls throughout feature code.

Use a small internal persistence interface so the same domain model can later support:

`LocalStore → Optional SyncStore / RemoteStore`

The local store remains authoritative in offline/local-first mode. A future synchronization design must explicitly define conflict resolution, identity, encryption/privacy, migration, and authorization before adoption.

## 8. Backend and cloud boundary

No backend is required for v1.

Future services may be introduced for concrete needs such as:

- multi-device synchronization;
- authenticated accounts;
- shared/community features;
- protected server-side AI credentials;
- large remote execution;
- centralized content management;
- optional telemetry/analytics with explicit privacy rules.

Each service must be an opt-in adapter with documented data flow and failure behavior. Adding one requires an architecture and security decision; it must never happen merely to simplify implementation.

## 9. Database strategy

There is **no hosted database requirement in the core product**.

Local data is persisted on the learner's device through the chosen local storage layer. This minimizes cost, latency, privacy exposure, and infrastructure dependency.

A future server database is an optional synchronization/service implementation, not the definition of MasteryOS's data model.

## 10. AI control layer

All AI features depend on an internal provider-agnostic interface.

Conceptual interface:

```text
AIProvider
  configure()
  testConnection()
  explain(context)
  coach(context)
  generateChallenge(context)
  reviewAssessment(context)
  reviewCode(context)
  diagnose(context)
  researchAssist(context)
```

The UI should depend on capabilities rather than vendor-specific APIs.

The AI control layer assembles compact, relevant context such as:

- selected text/code/equation;
- current lesson/topic;
- competency IDs;
- prerequisite status;
- known mistakes;
- task/assessment metadata;
- requested AI mode;
- relevant product constraints.

Never send the entire learner record or content corpus when less data is sufficient.

## 11. AI availability model

AI is an enhancement, not a hard dependency of the learning engine.

Without AI, the learner must still be able to:

- open lessons;
- read/visualize content;
- solve practice;
- take assessments;
- receive deterministic feedback where authored;
- record progress;
- advance according to mastery rules.

AI failure should surface clear recoverable errors rather than blocking the application.

## 12. Coding and execution architecture

Code execution is an isolated capability.

Possible runtimes include browser-local execution or a future isolated remote runtime. The implementation must choose the strongest practical sandbox for the language and exercise.

Default restrictions:

- no application secrets;
- no privileged filesystem access;
- no unrestricted network access;
- bounded CPU/memory/time;
- synthetic/local datasets for exercises;
- explicit reset/recovery behavior.

Execution results become assessment evidence only according to the assessment specification.

## 13. Data flow

### Learning

`content → learner interaction → attempt/state → assessment → evidence → diagnosis/remediation → mastery decision → next recommendation`

### AI

`context selection → AI mode → provider adapter → model/provider → structured response → learner action → optional evidence/metadata`

### Optional connected service

`local core → adapter → remote service → validated response → local domain model`

Remote services never become invisible sources of truth.

## 14. Navigation/state model

Separate:

- persistent domain state;
- current learning session;
- temporary UI state;
- content/render state;
- AI request state;
- integration state.

Avoid premature global-state complexity. Introduce a state management library only when cross-feature coordination demonstrates a need.

## 15. Accessibility and device model

The core UI should be responsive and usable on modest devices. Keyboard navigation, readable typography, accessible forms, semantic landmarks, focus management, reduced-motion consideration, and non-color-only status communication are required design concerns.

Interactive workbenches must have meaningful non-pointer interaction paths where technically practical.

## 16. Deployment modes

MasteryOS should support three conceptual modes:

### A. Local application

Self-contained application/runtime on the learner's machine with local data.

### B. Browser-local deployment

Static/browser-delivered application where the core still runs locally in the browser.

### C. Connected deployment

The same core plus explicitly enabled external services.

The connected mode must not retroactively make A or B invalid.

## 17. Scaling and performance

V1 is single-learner and optimized for:

- moderate content size;
- fast local navigation;
- efficient client-side search;
- incremental content loading;
- bounded local state;
- responsive interactive lessons.

Do not build large distributed infrastructure before an actual requirement appears.

## 18. Architecture evolution policy

Any proposed change that introduces a server, hosted database, auth, sync, remote execution, shared service, or mandatory external provider requires:

1. product justification;
2. architecture decision;
3. security review;
4. data-flow review;
5. migration/rollback consideration;
6. explicit verification criteria.

See `DECISIONS.md`.
