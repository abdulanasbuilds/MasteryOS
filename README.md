# MasteryOS

**A personal mastery operating system for Mathematics × Quantitative Finance × Computer Science × Software Engineering.**

MasteryOS exists to turn a fragmented collection of courses, textbooks, videos, problem sets, documentation, and AI tools into one deliberate learning system.

## Mission

Start from a Ghanaian SHS-level foundation and progress toward internationally strong mathematics and computing ability without treating WASSCE, any single textbook, or any single course as the ceiling.

The system is built around:

`Diagnose → Learn → Practice → Assess → Detect weakness → Repair prerequisites → Re-test → Advance`

## What makes it different

MasteryOS is not a course marketplace and not a link dump.

It combines:

- a prerequisite/knowledge graph;
- curated external resources with provenance;
- mastery evidence rather than completion checkboxes;
- problem-solving practice;
- a mistake journal;
- AI tutoring and Socratic coaching;
- mathematics rendering and visual learning;
- programming/CS practice;
- a long-term quant + CS/SWE progression.

## Current scope

V1 is personal-use, local-first, and does not require:

- a backend;
- a hosted database;
- authentication;
- payments;
- multi-user accounts;
- cloud synchronization.

Learner state is stored locally. AI uses a provider adapter with Gemini as the initial personal-use provider.

## Core tracks

1. Mathematical foundations
2. Advanced mathematics
3. Mathematical problem solving
4. University mathematics
5. Quantitative finance
6. Computer science
7. Software engineering

See `PROJECT.md` and `docs/LEARNING-ARCHITECTURE.md` for the curriculum model.

## AI tutor philosophy

AI is a coach, not a replacement for thinking.

For difficult problems, the default behavior is to guide the learner with questions and hints before exposing a complete solution. The tutor can also explain concepts simply, rigorously, visually, through derivations, with examples, or in relation to quant/CS.

See `docs/AI-TUTOR-SPEC.md`.

## External resources

MasteryOS may link to excellent external sources such as MIT OpenCourseWare, Khan Academy, UKMT, AoPS, 3Blue1Brown, CS50, Project Euler, Jane Street education material, and other verified sources.

External resources are not copied into this repository unless rights allow it. See `docs/RESOURCE-GOVERNANCE.md`.

## Working on the project

Before meaningful implementation:

1. Read `AGENTS.md`.
2. Read `PROJECT.md`, `ARCHITECTURE.md`, `SECURITY.md`, `DECISIONS.md`, `TASKS.md`, and `PLAN.md`.
3. Read the relevant `docs/` specification.
4. Apply the corresponding Agent OS skills.
5. Make the smallest useful change.
6. Run relevant tests and browser verification.
7. Inspect the final diff.

## Agent OS relationship

MasteryOS follows the reusable governance defined by the `abdulanasbuilds/Agent-OS` repository. Agent OS supplies the project lifecycle, planning, research, design, engineering, security, testing, Git, and orchestration disciplines. MasteryOS adds project-specific learning and AI-tutor rules.

## Project status

Documentation-first initialization. Main application implementation starts after the owner verifies the foundational documents.