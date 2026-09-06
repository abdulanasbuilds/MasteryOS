# MasteryOS Build-Readiness Contract

## Purpose

This document is the final handoff gate between specification work and main application implementation.

An implementation agent should be able to enter the repository, read the governing documents, understand the product contract, select the relevant Agent OS capabilities, and begin the first authorized implementation slice without relying on private chat history.

## Canonical reading order

1. `AGENTS.md`
2. `PROJECT.md`
3. `PROGRAMS.md`
4. `ARCHITECTURE.md`
5. `SECURITY.md`
6. `DECISIONS.md`
7. `PLAN.md`
8. `TASKS.md`
9. Design documents at the repository root.
10. Relevant detailed specifications under `docs/`.
11. Relevant Agent OS global rules and skills from `abdulanasbuilds/Agent-OS`.

## Product contract

The implementation must preserve these truths:

- MasteryOS is broad technology mastery, not a single-domain application.
- The curriculum has a Universal Core followed by programs and routes.
- Depth can progress from Foundation through Frontier where justified.
- Learning is primarily experienced inside MasteryOS through native or rights-cleared interactive experiences.
- Assessments produce evidence and progression is gated by mastery rules.
- AI is a contextual system-wide capability, not the sole learning mechanism.
- The core is local-first and can run without a hosted database or mandatory account.
- Browser delivery is supported.
- Future cloud/backend services are optional extensions around the core.
- Personal learner data and secrets remain outside source control.

## Implementation contract

Agents must:

- read the governing documents before meaningful work;
- identify the smallest coherent implementation slice;
- state assumptions that materially affect architecture or product behavior;
- use current primary documentation for unstable technical facts;
- select only the relevant Agent OS capabilities;
- preserve the local-first boundary unless an explicit decision supersedes it;
- keep content, domain logic, AI providers, storage, and future services behind clear boundaries;
- implement tests and verification with the feature;
- browser-test meaningful interactive UI;
- security-review trust-boundary changes;
- inspect the final diff;
- update durable documentation when behavior or architecture changes;
- never claim completion without evidence.

## First implementation gate

Before broad feature construction, establish a small end-to-end vertical slice:

`Program/Topic → Lesson → Practice → Assessment → AI assistance → Follow-up challenge → Mastery evidence → Unlock → Local progress`

The slice must be intentionally small but exercise the real core contracts.

## Do not infer

An agent must not silently assume:

- a hosted database is needed;
- authentication is needed;
- a particular AI provider is permanent;
- external courses can be copied into the repository;
- lesson completion equals mastery;
- AI-generated grading is infallible;
- arbitrary code execution is safe;
- public deployment is authorized;
- cloud sync is required;
- an existing framework is automatically the correct frontend architecture.

## Definition of ready

This repository is build-ready when:

- canonical documents agree on product identity;
- technical architecture and security boundaries are explicit;
- curriculum and mastery contracts are implementation-ready;
- design constraints are actionable;
- relevant verification expectations are clear;
- temporary/superseded source-of-truth documents are removed;
- the first implementation slice is defined;
- no unresolved issue requires private chat history to interpret the core product.

## Definition of implemented

A feature is not considered implemented merely because code compiles or a screen renders. It is implemented when its intended learner behavior works, relevant tests pass, important browser interactions have been verified, applicable security/rights constraints have been checked, and the result is consistent with this repository's governing contract.
