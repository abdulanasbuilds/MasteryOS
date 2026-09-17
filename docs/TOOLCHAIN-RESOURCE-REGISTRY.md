# MasteryOS Toolchain, Provider & Resource Registry

## Purpose

This registry separates three things that agents must never conflate:

1. application/runtime dependencies;
2. optional external providers/infrastructure adapters;
3. learning resources and the Agent OS capabilities used to build the product.

A listed item is not automatically approved for immediate installation. Agents must use the current implementation gate and the dependency/research rules in `AGENTS.md`.

## 1. Core application

Current runtime/toolchain:

- TypeScript;
- React;
- React DOM;
- Vite;
- Vitest;
- jsdom;
- browser IndexedDB through the local storage boundary.

Current project direction is React + TypeScript + Vite. Do not introduce server-side framework behavior merely because a framework supports it. TanStack libraries may be introduced when a specific capability justifies them.

## 2. Core learning/runtime candidates

Use only when the corresponding gate requires them:

- KaTeX or equivalent for mathematical notation;
- Markdown/MDX-compatible authored content pipeline;
- SVG/Canvas for educational visualization;
- CodeMirror or Monaco for serious in-browser code editing;
- browser-local runtimes such as WebAssembly/Pyodide when their security and performance characteristics fit the exercise;
- isolated workers/sandboxes for bounded code execution;
- client-side search/indexing when content volume justifies it.

## 3. Puter.js connected layer

Puter.js is the preferred first connected-service provider candidate.

Package:

`@heyputer/puter.js`

Official documentation:

- https://docs.puter.com/
- https://docs.puter.com/getting-started/
- https://docs.puter.com/security/
- https://docs.puter.com/Auth/
- https://docs.puter.com/AI/
- https://docs.puter.com/KV/
- https://docs.puter.com/FS/
- https://docs.puter.com/Peer/

Puter may be used through explicit adapters for:

- authentication;
- user-scoped cloud storage/KV/files;
- AI;
- peer-to-peer collaboration.

Puter must never become the authoritative implementation of MasteryOS learning logic.

See `docs/PUTER-INTEGRATION-SPEC.md` and `docs/COLLABORATION-SPEC.md`.

## 4. AI provider hierarchy

The product interface is `AIProvider`, not a vendor API.

Current preferred implementation order:

1. Puter AI adapter;
2. direct Gemini adapter only when a concrete provider-specific need exists;
3. other hosted provider adapters when justified;
4. local-model adapter where device/runtime constraints make it practical.

Provider APIs, models, limits and pricing must be verified from current official documentation before implementation.

## 5. Collaboration candidates

Preferred first transport candidate:

- Puter Peer, which currently provides WebRTC data channels with built-in signaling and TURN relays.

Future alternatives may include direct WebRTC or another transport behind `CollaborationProvider` if required.

Do not install a CRDT/synchronization library until a real collaborative document such as shared code, notes, or a whiteboard requires conflict-tolerant editing.

## 6. Learning-resource families

Recommended source families include:

- MIT OpenCourseWare;
- Harvard CS50;
- Khan Academy;
- 3Blue1Brown;
- Art of Problem Solving;
- UK Mathematics Trust;
- Project Euler;
- official university course materials;
- official language/framework documentation;
- official quantitative-finance firm educational material;
- reputable quantitative-finance education resources.

Resource metadata should include, when available:

- title;
- provider;
- canonical URL;
- content type;
- topic/domain;
- depth;
- prerequisites;
- target program(s);
- cost/access;
- format;
- recommendation status;
- rights/provenance class;
- last verified date;
- alternatives/replacements.

Do not mirror third-party books, courses, videos, problem banks, or repositories unless the project has explicit rights.

## 7. Agent OS capabilities

Agent OS governs how engineering work is performed. MasteryOS documents govern what is built.

Use relevant capabilities rather than loading everything:

- project context/intake;
- planning/specification;
- research/evidence verification;
- curriculum/content/domain modeling;
- architecture;
- design/interaction/accessibility;
- implementation;
- testing/browser testing;
- code review/grilling;
- debugging;
- security/prompt-injection defense;
- dependency/supply-chain review;
- performance;
- Git workflow;
- orchestration for genuinely multi-step work.

See `docs/AGENT-OS-ROUTING.md`.

## 8. Installation rule

Before adding a dependency:

- confirm the current gate requires it;
- confirm a native/simple approach is insufficient;
- inspect current official docs;
- check compatibility with the local-first browser target;
- inspect license and maintenance posture;
- assess security and bundle/runtime cost;
- add tests or verification appropriate to the capability.

After adding durable infrastructure, update this registry and the relevant architecture/specification document.

## 9. Prohibited hidden infrastructure

Agents must not silently introduce:

- hosted database;
- mandatory auth;
- mandatory cloud sync;
- mandatory AI provider;
- mandatory collaboration service;
- centralized learner telemetry;
- shared API credentials;
- unrestricted remote code execution;
- payment dependencies;
- public multi-user backend.

Each is a separate future scope with its own decision and security review.
