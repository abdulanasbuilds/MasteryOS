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
2. **Programs and Routes** — specialized paths such as software engineering, computer science, AI/ML, data, systems, cybersecurity, mathematics, quantitative finance, and other technology fields.

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
- progress, productivity, and gamification;
- an AI control layer available throughout the environment;
- a local learner record that can work without a hosted database.

## In-app learning

The product should make learning happen inside MasteryOS whenever practical and rights allow. External sources can still be used as references, provenance, enrichment, or permitted embeds.

MasteryOS must not scrape or republish copyrighted third-party material without rights. See `docs/EMBEDDED-LEARNING-SPEC.md` and `docs/RESOURCE-GOVERNANCE.md`.

## AI philosophy

AI is a contextual assistant, tutor, examiner, reviewer, and coach—not an authority or replacement for learner effort.

AI should support highlight-to-ask interactions, explanation, Socratic coaching, hints, diagnosis, code review, project coaching, assessment feedback, research assistance, and follow-up challenges after substantial help.

See `docs/AI-CONTROL-LAYER-SPEC.md` and `docs/AI-TUTOR-SPEC.md`.

## Local-first architecture

The core application is designed to run as a self-contained application on a learner's machine and in a browser.

V1 requires no:

- hosted database;
- mandatory account system;
- authentication service;
- payments;
- cloud synchronization;
- multi-user backend.

Learner state is local. Future cloud/backend connectivity may be added as an optional layer through explicit architecture and security decisions rather than becoming a requirement of the core.

See `ARCHITECTURE.md` and `SECURITY.md`.

## Agent OS

MasteryOS follows the engineering governance of `abdulanasbuilds/Agent-OS`.

Agent OS governs how work is understood, planned, implemented, tested, reviewed, secured, and released. MasteryOS documents govern the product's domain behavior. Relevant Agent OS capabilities must be selected automatically for each task.

Before meaningful implementation, read `AGENTS.md` and the governing project documents.

## Project status

**Documentation and build-readiness phase.** The repository is being finalized as a self-contained implementation handoff before the main application code is introduced.

The application is intentionally not claimed as built until the relevant specifications, boundaries, verification gates, and first implementation slice are coherent.

## Governing documents

- `AGENTS.md` — operating rules for agents.
- `PROJECT.md` — product charter and scope.
- `PROGRAMS.md` — universal core and program structure.
- `ARCHITECTURE.md` — technical architecture.
- `SECURITY.md` — security model.
- `DECISIONS.md` — durable decisions.
- `PLAN.md` — implementation sequence and gates.
- `TASKS.md` — current work queue.
- `DESIGN-BRIEF.md` / `DESIGN-SYSTEM.md` / `DESIGN-REFERENCES.md` / `DESIGN-VARIANTS.md` — design contract.
- `docs/` — detailed curriculum, content, assessment, AI, coding, progress, and verification specifications.
