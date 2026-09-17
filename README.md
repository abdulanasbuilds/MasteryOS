# MasteryOS

**A local-first technology mastery environment for learning, practicing, proving, and applying technology skills from foundations to advanced and frontier levels.**

MasteryOS is designed to replace fragmented learning with one coherent environment. The learner should be able to study concepts, work through interactive material, solve problems, write and test code, receive AI guidance, take assessments, complete projects, track evidence of mastery, and know what to do next.

## Mission

Build genuine capability rather than maximize course completion.

The canonical learning loop is:

`ORIENT → LEARN → VISUALIZE → PRACTICE → ATTEMPT → ASSESS → DIAGNOSE → REMEDIATE → REASSESS → APPLY → REFLECT → UNLOCK`

## Product model

MasteryOS has two major curriculum layers:

1. **Universal Core** — broadly transferable technology foundations.
2. **Programs and Routes** — specialized paths such as software engineering, computer science, AI/ML, data, systems, cybersecurity, mathematics, quantitative/computational finance, and other technology fields.

Depth progresses as appropriate:

`Foundation → Core → Advanced → Specialist → Frontier`

See `PROGRAMS.md` and `docs/CURRICULUM-MASTER-SPEC.md`.

## What makes it different

MasteryOS is not primarily a course marketplace, resource dump, or generic AI chat application. It combines:

- competency and prerequisite modeling;
- native interactive learning experiences;
- mathematics, diagrams, graphs, tables, and whiteboard/workbench experiences;
- problem solving and deliberate practice;
- assessments and evidence-based mastery gates;
- project-based application;
- in-app coding and systems laboratories where safe;
- mistake diagnosis and remediation;
- progress, productivity, and carefully bounded gamification;
- an AI control layer available throughout the environment;
- a local learner record that can work without a hosted database;
- optional connected services and peer collaboration without making them mandatory.

## Local-first modes

### Local/offline

A learner can use the core without an account, hosted database, cloud sync, or network connection for the capabilities that can operate locally.

### Connected

A learner may optionally connect services such as Puter.js for authentication, user-scoped cloud storage, AI, and peer collaboration.

Local state remains the authoritative core record; connected services are adapters/replicas rather than hidden requirements.

See `docs/PUTER-INTEGRATION-SPEC.md` and `docs/COLLABORATION-SPEC.md`.

## In-app learning

The product should make learning happen inside MasteryOS whenever practical and rights allow. External sources can still be used as references, provenance, enrichment, or permitted embeds.

MasteryOS must not scrape or republish copyrighted third-party material without rights. See `docs/EMBEDDED-LEARNING-SPEC.md` and `docs/RESOURCE-GOVERNANCE.md`.

## AI philosophy

AI is a contextual assistant, tutor, examiner, reviewer, and coach—not an authority or replacement for learner effort.

AI should support highlight-to-ask interactions, explanation, Socratic coaching, hints, diagnosis, code review, project coaching, assessment feedback, research assistance, and follow-up challenges after substantial help.

The first connected provider candidate is Puter.js, but the product remains provider-agnostic. See `docs/AI-CONTROL-LAYER-SPEC.md`, `docs/AI-TUTOR-SPEC.md`, and `docs/PUTER-INTEGRATION-SPEC.md`.

## Collaboration

Collaboration is an optional connected overlay. It should allow people in different locations to learn together while keeping participant-private learner state local by default.

The intended progression is:

`Room → Presence → Shared text/notes → Shared lesson position → Shared whiteboard/pair programming → optional voice/video/screen sharing`

The preferred first transport candidate is Puter Peer/WebRTC, subject to current provider review.

See `docs/COLLABORATION-SPEC.md`.

## Agent OS

MasteryOS follows the engineering governance of `abdulanasbuilds/Agent-OS`.

Agent OS governs how work is understood, planned, implemented, tested, reviewed, secured, and released. MasteryOS documents govern the product's domain behavior. Relevant Agent OS capabilities must be selected automatically for each task.

See `docs/AGENT-OS-ROUTING.md`.

## Start here for coding agents

Use `docs/MASTER-AGENT-PROMPT.md` as the reusable start-anywhere handoff prompt. It is designed for agents beginning the project or taking over midway through an implementation.

The agent must still read `AGENTS.md` and the canonical project documents and inspect the actual repository before editing.

## Toolchain and resources

See `docs/TOOLCHAIN-RESOURCE-REGISTRY.md` for:

- application dependencies;
- optional providers/adapters;
- Puter.js integration candidates;
- collaboration technology candidates;
- learning-resource families;
- Agent OS capability routing;
- dependency installation rules.

## Current implementation status

The repository contains an executable React + TypeScript + Vite scaffold and a first vertical slice.

Implemented scaffold pieces include:

- Mission/Learn/Progress application shell;
- one authored TypeScript learning lesson;
- basic mastery-domain types/tests;
- local IndexedDB persistence;
- provider-neutral AI interface/stub;
- detailed curriculum, assessment, AI, security, design, and verification documentation;
- Puter integration contract;
- collaboration contract;
- connected-feature verification contract;
- start-anywhere agent prompt and tightened agent instructions.

The complete learning environment is **not finished**. Agents must start at the earliest incomplete gate in `TASKS.md` rather than assuming later features exist.

## Build discipline

Do not add:

- hosted databases;
- mandatory accounts;
- mandatory cloud sync;
- shared provider credentials;
- unrestricted code execution;
- permanent collaboration databases;
- payment infrastructure;
- unlicensed third-party content mirrors;

without the explicit architecture/security/product process defined in the canonical documents.

Do not claim a feature is complete without appropriate tests and verification.

## Governing documents

- `AGENTS.md` — operating rules for agents.
- `PROJECT.md` — product charter and current scope/state.
- `PROGRAMS.md` — universal core and program structure.
- `ARCHITECTURE.md` — technical architecture.
- `SECURITY.md` — security model.
- `DECISIONS.md` — durable product/architecture decisions.
- `PLAN.md` — implementation sequence and gates.
- `TASKS.md` — current work queue.
- `docs/MASTER-AGENT-PROMPT.md` — start-anywhere agent prompt.
- `docs/PUTER-INTEGRATION-SPEC.md` — Puter connected-service contract.
- `docs/COLLABORATION-SPEC.md` — collaboration contract.
- `docs/CONNECTED-VERIFICATION-SPEC.md` — connected-feature verification.
- `docs/TOOLCHAIN-RESOURCE-REGISTRY.md` — tools, providers, resources, and installation rules.
- `DESIGN-BRIEF.md` / `DESIGN-SYSTEM.md` / `DESIGN-REFERENCES.md` / `DESIGN-VARIANTS.md` — design contract.
- `docs/AI-CONTROL-LAYER-SPEC.md` / `docs/AI-TUTOR-SPEC.md` — AI behavior.
- `docs/CODING-LAB-SPEC.md` — programming/system workbench rules.
- `docs/ASSESSMENT-MASTERY-SPEC.md` — mastery/evidence behavior.
- `docs/VERIFICATION-MATRIX.md` — verification requirements.
