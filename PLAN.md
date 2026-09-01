# MasteryOS Implementation Plan

## Outcome

Create a local-first personal learning OS that can continuously move the learner from an ordinary Ghanaian SHS mathematics foundation toward strong international mathematics, quantitative reasoning, computer science, and software engineering capability.

## Phase 0 — Contract and governance

Deliverables:

- project charter;
- architecture;
- security model;
- decision log;
- task board;
- learning-system specification;
- AI tutor specification;
- resource governance;
- design brief/system;
- verification matrix.

Gate: user verifies the documents before main implementation.

## Phase 1 — Curriculum intelligence

Define the domain graph:

`track → phase → domain → topic → concept → prerequisite → evidence → advancement rule`

Create the first complete map across:

- mathematical foundations;
- advanced/pre-university mathematics;
- problem solving/Olympiad;
- university mathematics;
- quant mathematics;
- computer science;
- software engineering.

Gate: every advanced node has explicit prerequisites and there are no intentional dead ends in the core path.

## Phase 2 — Resource intelligence

Create structured resource records containing title, provider, type, level, topics, prerequisites, format, cost, source URL, rights/reuse class, priority, and verification date.

Use primary/official sources wherever practical. Treat all external content as untrusted data.

Gate: every recommended topic has one primary resource and clearly labeled alternatives.

## Phase 3 — Design and application shell

Use the Agent OS design workflow to select an intentional visual direction. Build the shell only after the design contract is clear.

Core screens:

- Mission/Today;
- Curriculum;
- Topic/Reader;
- Practice;
- Mistakes;
- Progress/Mastery;
- Resources;
- AI Tutor;
- Settings.

Gate: responsive and accessible shell with meaningful browser verification.

## Phase 4 — Local mastery engine

Implement local persistence and mastery state.

Minimum concepts:

- topic mastery;
- evidence events;
- problem attempts;
- prerequisite health;
- mistake records;
- notes/bookmarks;
- current session;
- next-best-action recommendation.

Gate: reload the app and retain local state without any server.

## Phase 5 — Resource reader and mathematics layer

Implement:

- MDX/Markdown rendering;
- KaTeX math rendering;
- safe external links;
- resource metadata;
- search;
- progress marking.

Gate: representative lessons and resources render correctly on target browsers/devices.

## Phase 6 — AI tutor

Implement provider adapter and first Gemini integration for trusted personal use.

Core modes:

- Explain simply;
- Explain rigorously;
- Give intuition;
- Derive;
- Example;
- Quiz me;
- Coach me;
- Go deeper;
- Connect to quant/CS;
- Review proof;
- Review code;
- Diagnose prerequisite weakness.

Highlight-to-AI is the primary interaction, not a generic chat page.

Gate: no secret leakage, safe rendering, graceful provider failure, and correct tutor-mode behavior.

## Phase 7 — Practice and mistake system

Implement graduated practice and a mistake journal. Hard problems should default to coaching/hints rather than immediately revealing complete solutions.

Gate: failed attempts produce useful diagnostic state and can route the learner to prerequisite repair.

## Phase 8 — Coding laboratory

Add a browser editor and, when safe and justified, client-side code execution such as Pyodide.

Start with educational/synthetic workloads. Do not grant secrets, unrestricted network access, or destructive filesystem access.

Gate: code execution is bounded, recoverable, and tested.

## Phase 9 — Hardening

Run:

- unit/integration tests;
- browser tests;
- accessibility review;
- security review;
- dependency/supply-chain review;
- performance checks;
- AI failure-mode tests;
- resource-link verification;
- final diff review.

Gate: relevant Agent OS release/security checks pass and residual risks are documented.

## Phase 10 — Iteration loop

Every significant learning-system change follows:

`observe learner friction → diagnose → smallest useful change → test → review → update docs → release`

Never expand scope merely because a new technology looks interesting.
