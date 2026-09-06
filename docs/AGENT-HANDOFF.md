# MasteryOS Agent Handoff

## Purpose

This is the entry document for any coding agent—Manus, Jules, OpenCode, Freebuff, AI Studio, Codex-like tooling, or another capable repository agent.

The agent is not expected to know prior chat history. The repository is the source of truth.

## Start here

Read, in order:

1. `AGENTS.md`
2. `docs/BUILD-READINESS.md`
3. `PROJECT.md`
4. `PROGRAMS.md`
5. `ARCHITECTURE.md`
6. `SECURITY.md`
7. `DECISIONS.md`
8. `PLAN.md`
9. `TASKS.md`
10. `DESIGN-BRIEF.md`
11. `DESIGN-SYSTEM.md`
12. Relevant files under `docs/`.
13. Applicable Agent OS global rules/skills from `abdulanasbuilds/Agent-OS`.

## Operating instruction

Do not ask the owner to choose where to start when the repository already defines the next incomplete gate.

Determine the earliest incomplete build gate from `docs/MASTER-BUILD-ORCHESTRATION.md` and `TASKS.md`.

Do not skip gates merely because a later feature is easier or more visually interesting.

Do not introduce backend, hosted database, authentication, cloud synchronization, payments, or multi-user architecture during the local-first foundation unless the repository contains an explicit accepted decision authorizing that change.

## Current starting point

The project is documentation-complete for the initial build contract and has not yet implemented the main application.

Begin with the first authorized vertical slice from `docs/MASTER-BUILD-ORCHESTRATION.md`:

`Program/Topic → Lesson → Practice → Assessment → AI assistance → Follow-up challenge → Mastery evidence → Unlock → Local progress`

Initial representative competency:

**TypeScript function decomposition**

The representative slice is a proof of architecture, not the complete curriculum.

## What the first agent should do

### Step 1 — Inspect

Inspect repository contents, current branch, available tooling, and any existing source files. Preserve useful existing work.

### Step 2 — Plan

Write a concise implementation plan in the task tracking mechanism or durable documentation if needed. Identify files, boundaries, tests, and acceptance criteria.

### Step 3 — Bootstrap only what is required

Create the approved browser application foundation using React + TypeScript + Vite unless fresh evidence shows a documented alternative is materially better. Do not add infrastructure just because a framework supports it.

### Step 4 — Implement the domain slice

Implement the smallest real domain primitives for curriculum, lessons, practice, assessment, mastery evidence, unlocking, and local progress.

### Step 5 — Implement the learning UI

Build the representative lesson, practice, assessment, and mastery flow using the design contract.

### Step 6 — Implement local persistence

Use IndexedDB through an internal persistence/repository abstraction. Domain logic must not be tightly coupled to storage APIs.

### Step 7 — Add bounded AI integration when the slice is ready

Use the provider-neutral AI adapter. AI must remain advisory and contextual. Record assistance level. Do not let AI directly decide authoritative unlock state.

### Step 8 — Verify

Run tests, build checks, relevant browser verification, accessibility checks, and security review. Inspect the diff.

### Step 9 — Update state

Update `TASKS.md`, relevant specs, and `CHANGELOG.md` so another agent can continue from the exact current state.

## Definition of done for the first slice

A learner can:

1. Open MasteryOS locally in a browser.
2. Enter a program/topic.
3. Read an interactive lesson about TypeScript function decomposition.
4. Complete practice.
5. Attempt a real assessment.
6. Use contextual AI assistance when stuck.
7. Receive or trigger a follow-up challenge when assistance materially reduces independence.
8. Submit the challenge.
9. Receive a mastery decision based on explicit evidence.
10. Unlock the next gated node when criteria are satisfied.
11. Reload the browser and retain local progress without a server.

The agent must provide evidence for each completed item.

## What comes after

After the first slice is verified, continue through the ordered gates in `docs/MASTER-BUILD-ORCHESTRATION.md`, expanding the platform one coherent subsystem at a time.

Never interpret this handoff as permission to implement every listed future feature in one pass.
