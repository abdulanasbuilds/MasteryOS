# MasteryOS Project Charter

## 1. What is MasteryOS?

MasteryOS is a local-first technology mastery environment: a complete learning application in which a learner can study, practice, assess, build, and track mastery across technology disciplines from foundational competence through advanced and frontier-level capability.

It is not primarily a course marketplace, bookmark manager, link directory, or AI chat application. Its core job is to create a coherent path from what the learner knows now to what they must be able to understand, solve, build, explain, and transfer next.

The platform combines:

- a universal technology foundation;
- specialized programs and routes;
- prerequisite and competency relationships;
- interactive in-app learning materials;
- deliberate practice;
- assessments and mastery gates;
- projects and applied challenges;
- a local learner record;
- progress, productivity, and gamification systems;
- a cross-cutting AI control layer;
- programming and systems workbenches;
- advanced and frontier subject matter.

The target is competence, not course completion.

## 2. Who is it for?

Primary user: the owner/learner during the initial build and validation phase.

Long-term conceptual audience: any motivated learner who wants a coherent technology education that can progress from foundations to advanced specialization without being constrained by the boundaries of a single school, university, course platform, or resource provider.

The system must support uneven starting levels and must diagnose prerequisites rather than assuming a uniform background.

## 3. Problem

Technology learning is fragmented across courses, books, videos, documentation, coding platforms, problem sets, university curricula, communities, and AI tools. Fragmentation makes it difficult to know what to learn, in what order, how deeply to learn it, whether the learner can actually perform the skill, and what to do after failure.

MasteryOS solves this by turning learning into a connected system with explicit competencies, evidence, feedback, remediation, progression, and application.

## 4. Product principles

1. **Mastery over completion.** Seeing material is not evidence of competence.
2. **Universal foundation before specialization.** Core capabilities should transfer across technology fields.
3. **Program-specific routes.** After the universal core, each selected field receives its own structured route.
4. **Evidence before unlock.** Advancement is earned through appropriate evidence, not merely elapsed time or navigation.
5. **Learning inside the product.** The application should provide native learning experiences whenever rights and technical constraints permit, rather than making external sites the primary classroom.
6. **AI assists performance; it does not replace it.** Help should improve the learner's ability to solve the next problem independently.
7. **Local-first by default.** The core application should work without a hosted database or account system.
8. **Future-connectable.** Optional cloud/backend services may be added later through explicit adapters and architecture decisions without making them prerequisites for the core product.
9. **Source provenance and rights.** External content is referenced, licensed, embedded where permitted, or transformed only within applicable rights; MasteryOS must not become a copyright mirror.
10. **Advanced depth is intentional.** The curriculum should reach at least strong university level where relevant and continue into specialist and frontier material when evidence and maintainability justify it.

## 5. Universal Core

The Universal Core is the cross-program foundation that should remain broadly useful to technology learners. Its final contents are governed by `PROGRAMS.md` and `docs/CURRICULUM-MASTER-SPEC.md`.

Examples of capability families include:

- mathematical and quantitative reasoning;
- logic, abstraction, and problem solving;
- computational thinking;
- programming fundamentals;
- data and information literacy;
- computer and operating-system fundamentals;
- networking and internet fundamentals;
- version control and collaboration;
- testing, debugging, and verification;
- security fundamentals;
- software and systems thinking;
- research, source evaluation, and technical communication;
- responsible AI literacy and AI-assisted work.

The Universal Core must remain competency-based rather than becoming an unnecessarily long checklist.

## 6. Programs

After the Universal Core, the learner may choose one or more programs. Programs represent substantial fields rather than single courses.

Representative program families include:

- Software Engineering;
- Computer Science;
- Artificial Intelligence and Machine Learning;
- Data and Analytics;
- Systems and Infrastructure;
- Cybersecurity;
- Web and Application Engineering;
- Mobile and Client Engineering;
- Mathematics and Computational Mathematics;
- Quantitative Finance and Computational Finance;
- Developer Tools and Automation;
- Research and Frontier Computing.

The list is extensible. A program may contain multiple routes and cross-route prerequisites.

## 7. Depth model

MasteryOS uses progressive depth rather than a single academic ceiling:

`Foundation → Core → Advanced → Specialist → Frontier`

Not every topic needs every depth. A learner only advances as far as the program and target competency require.

University curricula are calibration points, not hard limits. Topics commonly absent from standard undergraduate programs may still belong in MasteryOS when they are valuable, sufficiently teachable, and supported by reliable evidence.

## 8. Learning and mastery loop

The canonical learner loop is:

`ORIENT → LEARN → VISUALIZE → PRACTICE → ATTEMPT → ASSESS → DIAGNOSE → REMEDIATE → REASSESS → APPLY → REFLECT → UNLOCK`

A learner should not be trapped by a failed assessment. Failure routes to targeted remediation, differentiated practice, and reassessment.

Where AI provides substantial assistance, the system records that assistance and may require stronger independent evidence before declaring mastery.

## 9. In-app learning

The primary learning experience should happen inside MasteryOS through native or rights-cleared experiences such as:

- interactive readers;
- textbook-like lessons;
- equations and derivations;
- diagrams and graphs;
- whiteboards and workbenches;
- interactive tables and visualizations;
- questions embedded in lessons;
- code editors and safe coding labs;
- system-design and debugging exercises;
- projects and practical tasks;
- assessments.

External resources remain valuable as references, enrichment, provenance, or permitted embeds. They are not assumed to be the learner's only interface to knowledge.

## 10. AI control layer

AI is a cross-cutting capability available throughout the application rather than a separate chat product.

Core interaction patterns include:

- contextual help on any page;
- highlight-to-ask on text, equations, diagrams, and code;
- explanation and re-explanation at different depths;
- Socratic coaching;
- hints and progressive assistance;
- prerequisite diagnosis;
- code review and debugging support;
- assessment feedback;
- project coaching;
- challenge generation after assistance;
- research assistance with source awareness;
- curriculum navigation and next-action guidance.

The AI layer must fail gracefully. Core learning, assessment, and local progress functions must not depend on AI being available.

## 11. Local-first and future connectivity

The core application is designed to be usable as a self-contained installation and as a browser application.

V1 does not require:

- hosted database;
- authentication service;
- cloud sync;
- payment provider;
- multi-user tenancy;
- centralized analytics.

Learner data is stored locally through an appropriate application storage layer. Future cloud services may provide optional synchronization, collaboration, protected AI mediation, or other capabilities through explicit architecture and security decisions.

Local-first is a product property, not merely a temporary infrastructure shortcut.

## 12. Open-source/publication boundary

Repository visibility is independent of learner-data visibility.

When the repository is public, it may contain application source, original project documentation, original curriculum content, test fixtures, and other shareable artifacts. It must not contain:

- API keys or secrets;
- private learner state;
- sensitive exports or backups;
- unlicensed third-party copyrighted material;
- credentials or private service configuration.

Until publication is deliberately approved, treat the repository as a future open-source codebase whose contents must be safe to publish, while keeping personal data outside version control.

## 13. Technical direction

Initial direction is intentionally provider- and framework-neutral.

Likely building blocks include:

- TypeScript;
- React or Next.js used in a genuinely local-first/static-capable way;
- a utility CSS system and accessible component primitives;
- Markdown/MDX and structured data for curriculum/content;
- KaTeX or equivalent mathematical rendering;
- a mature code editor component;
- IndexedDB or equivalent durable local storage;
- client-side search/indexing where useful;
- isolated browser or local runtimes for programming exercises where safe;
- an AI provider adapter with a first provider selected only after current documentation/dependency review.

No individual framework or provider is a permanent architectural commitment until implementation research and review support it.

## 14. Non-goals for the initial product

Do not make these prerequisites for the core learning environment:

- public multi-user SaaS;
- billing/subscriptions;
- social/community systems;
- mandatory accounts;
- mandatory cloud synchronization;
- centralized personal-data storage;
- unrestricted code execution;
- autonomous real-world actions;
- scraped or unlicensed content mirrors;
- production financial trading execution.

They may become optional future layers after explicit product, architecture, and security decisions.

## 15. Current state

MasteryOS is in documentation-first initialization. The main application has intentionally not been started until the project contract, architecture, security boundaries, curriculum model, assessment model, AI behavior, content rules, design direction, and verification gates are coherent.

## 16. Definition of build-ready

MasteryOS is build-ready when:

- canonical project documents agree on the same mission;
- universal core and program architecture are explicit;
- learner and content data models are defined sufficiently for implementation;
- mastery and assessment behavior are testable;
- AI behavior and trust boundaries are specified;
- local-first and future-connectivity boundaries are explicit;
- rights/provenance rules are explicit;
- design and accessibility constraints are actionable;
- testing and verification gates are explicit;
- no unresolved documentation contradiction changes the first implementation slice.

## 17. Success criteria

The system succeeds when a learner can use one environment to:

- determine the next worthwhile competency;
- learn it through an appropriate in-app experience;
- practice actively;
- prove understanding and performance;
- diagnose and repair weaknesses;
- use AI without becoming dependent on it;
- build increasingly difficult projects;
- maintain durable evidence of progress;
- move from foundational technology literacy into advanced specialization and eventually frontier work.

## 18. Governing documents

- `AGENTS.md` — project-specific operating rules.
- `PROGRAMS.md` — universal core and program structure.
- `ARCHITECTURE.md` — technical architecture and boundaries.
- `SECURITY.md` — security and trust model.
- `DECISIONS.md` — accepted architectural/product decisions.
- `PLAN.md` — implementation sequence and gates.
- `TASKS.md` — current work queue.
- `DESIGN-BRIEF.md`, `DESIGN-SYSTEM.md`, `DESIGN-REFERENCES.md`, `DESIGN-VARIANTS.md` — design contracts.
- `docs/CURRICULUM-MASTER-SPEC.md` — curriculum rules.
- `docs/CONTENT-MODEL.md` — content data model.
- `docs/EMBEDDED-LEARNING-SPEC.md` — in-app learning/content rights rules.
- `docs/ASSESSMENT-MASTERY-SPEC.md` — assessments and mastery gates.
- `docs/AI-CONTROL-LAYER-SPEC.md` — system-wide AI behavior.
- `docs/CODING-LAB-SPEC.md` — programming/systems workbench rules.
- `docs/PROGRESS-GAMIFICATION-SPEC.md` — progress and productivity behavior.
- `docs/VERIFICATION-MATRIX.md` — verification requirements.
- `docs/AGENT-OS-ROUTING.md` — mapping to relevant Agent OS capabilities.
