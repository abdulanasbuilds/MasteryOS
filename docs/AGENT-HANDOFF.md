# MasteryOS Agent Handoff

## Purpose

This is the entry document for any coding agent—Manus, Jules, OpenCode, Freebuff, AI Studio, Codex-like tooling, or another capable repository agent.

The agent is not expected to know prior chat history. The repository is the source of truth.

## Primary handoff prompt

Read and follow `docs/MASTER-AGENT-PROMPT.md` as the universal start-anywhere execution prompt.

It is valid whether the agent is:

- starting the project;
- continuing an existing implementation;
- taking over midway;
- repairing a failed or partial feature;
- preparing a release.

## Start here

Read, in order:

1. `AGENTS.md`
2. `docs/MASTER-AGENT-PROMPT.md`
3. `docs/BUILD-READINESS.md`
4. `PROJECT.md`
5. `PROGRAMS.md`
6. `ARCHITECTURE.md`
7. `SECURITY.md`
8. `DECISIONS.md`
9. `PLAN.md`
10. `TASKS.md`
11. `DESIGN-BRIEF.md`
12. `DESIGN-SYSTEM.md`
13. `docs/PUTER-INTEGRATION-SPEC.md` when touching connected capabilities
14. `docs/COLLABORATION-SPEC.md` when touching collaboration
15. `docs/TOOLCHAIN-RESOURCE-REGISTRY.md` before adding a dependency/provider/resource
16. Relevant files under `docs/`
17. Applicable Agent OS global rules/skills from `abdulanasbuilds/Agent-OS`

## Operating instruction

Do not ask the owner to choose where to start when the repository already defines the next incomplete gate.

Determine the earliest incomplete build gate from `docs/MASTER-BUILD-ORCHESTRATION.md` and `TASKS.md`, then verify it against actual source code and tests.

Do not skip gates merely because a later feature is easier or more visually interesting.

Do not introduce backend, hosted database, authentication, cloud synchronization, payments, or multi-user architecture during local-first implementation unless an explicit accepted decision authorizes the connected feature.

## Architecture summary

MasteryOS is a local-first, browser-capable technology mastery environment.

Core:

`Content → Learning Engine → Assessment/Mastery → Local Learner State → Interactive Runtime`

Optional connected layer:

`Local Core → Provider/Service Adapter → Puter or another explicitly approved provider`

Current preferred connected provider candidate:

- Puter.js for optional authentication, user-scoped cloud storage/KV/files, AI, and peer collaboration.

Current preferred collaboration transport candidate:

- Puter Peer/WebRTC, subject to current provider documentation and security review.

The local core must remain useful without Puter or any other external service.

## Current starting point

The project is beyond documentation-only initialization. An executable React + TypeScript + Vite scaffold and first vertical slice exist.

Implemented scaffold pieces include:

- Mission/Learn/Progress application shell;
- one authored TypeScript lesson;
- basic mastery domain types/tests;
- local IndexedDB persistence;
- provider-neutral AI interface/stub;
- project/product/security/curriculum specifications;
- Puter integration contract;
- collaboration contract;
- connected verification contract;
- toolchain/resource registry;
- universal start-anywhere agent prompt.

The complete product is **not implemented**. Continue from the earliest incomplete gate.

## First vertical slice

`Program/Topic → Lesson → Practice → Assessment → AI assistance → Follow-up challenge → Mastery evidence → Unlock → Local progress`

Initial representative competency:

**TypeScript function decomposition**

This slice proves architecture; it is not the complete curriculum.

## Local-first requirements

Local mode must allow a learner to:

- learn;
- practice;
- assess;
- preserve progress;
- keep notes/mistakes;
- build local projects;
- use locally available workbenches;
- export/import supported state;

without requiring a hosted database, mandatory account, or mandatory AI provider.

Connected mode may optionally provide:

- account/identity through Puter;
- cross-device sync/backup;
- connected AI;
- study-room collaboration.

Connected data must never silently become the authoritative core record.

## Puter requirements

Use `docs/PUTER-INTEGRATION-SPEC.md`.

Do not scatter `puter.*` calls across the application. Use explicit adapters.

Never ship a shared developer credential in client code.

Do not claim Puter is offline infrastructure.

Re-check current official Puter documentation before using or changing provider-specific API behavior.

## Collaboration requirements

Use `docs/COLLABORATION-SPEC.md`.

The first collaboration stage is:

`Create room → Join room → Presence → Shared text/notes → Shared lesson position → Leave`

Later stages may add:

- whiteboard;
- collaborative problems;
- pair programming;
- shared code;
- voice;
- video;
- screen sharing.

Keep participant-private learner state local by default.

## Resource requirements

MasteryOS is not a bookmark directory.

For each important competency:

1. choose a recommended route;
2. provide strong alternatives;
3. provide optional deep dives;
4. record prerequisites, level, provenance, rights status and verification date where available.

Do not scrape or republish third-party protected material without permission.

## What the next implementation agent should do

### Step 1 — Inspect

Inspect:

- repository tree;
- current branch;
- working tree;
- recent commits;
- package manifest;
- tests;
- actual source implementation;
- installed/available tooling.

### Step 2 — Determine the earliest incomplete gate

Do not invent a new roadmap if `TASKS.md` and the governing documents already define the next gate.

### Step 3 — Plan the smallest coherent slice

Identify:

- learner outcome;
- affected domain model;
- affected files;
- dependencies;
- tests;
- browser verification;
- security/rights concerns;
- rollback/recovery concerns.

### Step 4 — Implement

Preserve existing architecture unless there is a documented contradiction. Do not add infrastructure merely for convenience.

### Step 5 — Verify

Run relevant tests, build/type checks, browser checks, accessibility checks, security checks, and content/resource checks.

For connected features, test provider failure and prove local fallback remains intact.

### Step 6 — Review

Use relevant Agent OS review/grilling capability. Inspect the final diff.

### Step 7 — Update project state

Update `TASKS.md`, relevant specification files, `CHANGELOG.md` where appropriate, and any handoff/state document needed for the next agent.

### Step 8 — Report

State exactly:

- changed;
- verified;
- not verified;
- remaining;
- risks.

Never claim completion without evidence.

## Definition of done for a meaningful feature

A feature is complete only when:

- learner behavior is present;
- the implementation matches the specification;
- local-first behavior remains intact;
- appropriate tests pass;
- browser behavior works where applicable;
- accessibility is considered;
- security/rights are reviewed;
- the diff has been inspected;
- durable documentation is current;
- remaining limitations are recorded.

## Important warning

Do not confuse:

- the existence of specifications with implementation;
- an interface/stub with a provider integration;
- a rendered page with completed learner behavior;
- resource links with a curriculum;
- AI-generated explanations with mastery;
- a working connected path with proof that offline mode still works.

The repository is the source of truth. Inspect it before making claims.
