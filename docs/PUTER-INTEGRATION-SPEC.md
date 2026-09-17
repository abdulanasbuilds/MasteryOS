# MasteryOS Puter.js Integration Specification

## 1. Purpose

Puter.js is an optional connected-services layer for MasteryOS. It must never replace the local-first core.

Puter.js may provide:

- user authentication;
- optional per-user cloud persistence;
- optional AI access;
- optional peer-to-peer collaboration transport;
- future connected capabilities where explicitly approved.

Official current references:

- Puter.js documentation: https://docs.puter.com/
- Getting started: https://docs.puter.com/getting-started/
- Security and permissions: https://docs.puter.com/security/
- Auth: https://docs.puter.com/Auth/
- AI: https://docs.puter.com/AI/
- Key-value store: https://docs.puter.com/KV/
- Filesystem: https://docs.puter.com/FS/
- Peer: https://docs.puter.com/Peer/

The project must re-check current official Puter documentation before implementing or changing provider-specific behavior because API shapes, limits, model availability, and pricing/usage terms can change.

## 2. Core rule: Puter is an adapter, not the product

MasteryOS owns:

- curriculum;
- competency graph;
- prerequisite logic;
- lesson behavior;
- assessments;
- mastery decisions;
- remediation;
- learner-domain model;
- project model;
- AI tutoring policy;
- local learner record.

Puter owns only the connected capabilities explicitly delegated to its adapters.

Do not scatter direct `puter.*` calls throughout feature components. Use provider interfaces/adapters.

## 3. Three operating modes

### A. Offline/local mode

No Puter account is required.

The learner can:

- open locally authored/rights-cleared curriculum;
- practice and assess;
- record mastery locally;
- keep notes and projects locally;
- use local workbenches that do not require remote services;
- export/import supported local data.

AI, cloud synchronization, and remote collaboration may be unavailable in this mode. Their absence must not make the core unusable.

### B. Browser connected mode

A user may voluntarily connect a Puter account.

Puter authentication and cloud capabilities become opt-in enhancements. The user's Puter identity is the user's connected identity; MasteryOS must never pretend that connected data is stored in the developer's personal Puter account.

Puter documents that website applications can prompt the user to authenticate and that app-scoped storage is sandboxed per user/app. See the official security and auth documentation.

### C. Installed/local application mode

A packaged desktop application should preserve the same local-first behavior.

The user may remain completely local or connect Puter later for cross-device services.

## 4. Local storage remains authoritative for core behavior

Canonical local flow:

`domain state → LocalStore → IndexedDB/local runtime`

Optional connected flow:

`domain state → LocalStore → optional Puter adapter`

Puter data is a connected replica/backup/sync target for approved entities, not a hidden requirement for learning.

If Puter is unavailable, local state remains usable and must not be discarded.

## 5. Synchronization boundary

Only explicitly syncable entities may leave the device.

Default local-only or private:

- API credentials;
- private AI context/history unless the user enables syncing;
- raw assessment drafts when policy marks them private;
- private notes unless synced by choice;
- private mistakes/misconceptions unless synced by choice;
- private settings when unnecessary;
- secrets and tokens.

Potentially syncable by explicit user choice:

- progress;
- mastery evidence;
- notes;
- bookmarks;
- project state;
- review queue;
- non-sensitive preferences;
- exported learning artifacts.

Synchronization requires a versioned schema, conflict policy, retry behavior, corruption recovery, and an explicit user-visible control.

## 6. Puter AI adapter

The first connected AI implementation may use Puter.js AI through the provider-neutral `AIProvider` interface.

Conceptual flow:

`AIControlLayer → AIProvider → PuterAIAdapter → puter.ai`

The adapter must implement only the capabilities supported by the current internal interface, such as:

- explain;
- coach;
- hint escalation;
- diagnose;
- challenge generation;
- code review;
- reasoning/proof review;
- research assistance where appropriate.

The AI control layer remains responsible for:

- contextual prompt construction;
- assistance levels;
- learner-level adaptation;
- challenge-after-help;
- safe rendering;
- recording assistance metadata;
- preventing AI from changing authoritative mastery rules.

Puter model selection must be configurable rather than hard-coded throughout the UI.

## 7. Direct Gemini remains an optional alternative

Puter may expose Gemini or other providers through its AI layer, but MasteryOS must not assume that today's Puter model list is permanent.

A future direct Gemini adapter may be added behind the same `AIProvider` interface when there is a concrete reason, such as provider-specific functionality, latency, reliability, or controlled deployment.

Never rewrite the domain layer around Gemini or Puter.

## 8. Puter storage adapter

Puter KV is appropriate for small structured synchronized application state. Puter filesystem is appropriate for user-owned files and artifacts.

Use clear namespaces/keys and versioned payloads. Do not store the entire evolving learner database as one unbounded opaque object.

Recommended conceptual shape:

`PuterStorageAdapter → { kv, fs }`

The adapter must:

- namespace MasteryOS data clearly;
- validate retrieved data before applying it to local state;
- support version migration;
- handle quota/limit failures gracefully;
- never overwrite newer local state blindly;
- never store credentials in application data.

## 9. Puter authentication adapter

The core product must have a local/guest identity state that does not require Puter.

Connected mode may expose:

- Connect Puter;
- current connected user;
- switch account;
- disconnect/sign out;
- sync controls.

For browser sign-in, authentication must be triggered through an intentional user interaction when the current Puter API requires popup initiation.

Do not silently create or connect an account without clear user intent. If temporary Puter-user creation is ever enabled for onboarding, the UI must explain what is happening and provide a clear transition path to a permanent account.

## 10. Puter collaboration adapter

The preferred first collaboration implementation may use Puter Peer, which currently provides WebRTC data channels with built-in signaling and TURN relays.

Conceptual flow:

`CollaborationProvider → PuterPeerAdapter → puter.peer`

The local core remains independent.

A collaboration session may synchronize only room-scoped shared state such as:

- participant presence;
- shared lesson location;
- shared notes;
- whiteboard state;
- shared code/document state;
- room chat;
- explicitly shared files;
- explicitly shared session state.

Participant-private mastery history, mistakes, personal AI history, credentials, and private projects remain local unless explicitly shared.

## 11. Collaboration stages

Do not build all collaboration surfaces simultaneously.

Stage 1:

`Create room → Join room → Presence → Shared text/notes → Shared lesson position → Leave`

Stage 2:

- shared whiteboard;
- collaborative problem solving;
- pair programming;
- shared code editor.

Stage 3:

- voice;
- video;
- screen sharing;
- richer room moderation/permissions.

Each stage needs its own tests, security review, browser verification, and failure handling.

## 12. No hidden central database

Do not introduce a hosted database merely to make Puter collaboration easier.

A temporary/stateless signaling mechanism or Puter Peer infrastructure is acceptable for connection establishment, subject to current provider behavior and security review.

Persistent shared rooms, leaderboards, public profiles, moderation data, or community systems require a separate connected architecture decision.

## 13. User-pays and cost assumptions

Puter currently documents a User-Pays model in which users cover their own Puter cloud/AI usage. This is an implementation/economic assumption, not a permanent guarantee.

The application must:

- surface relevant usage limits/errors honestly;
- not promise unlimited free AI;
- avoid hard-coding pricing claims into core business logic;
- degrade gracefully if a capability becomes unavailable.

## 14. Security rules

- Never ship a shared developer Puter credential in the browser bundle.
- Never put Puter credentials in repository content.
- Treat peer messages and AI responses as untrusted data.
- Validate data before merging it into local domain state.
- Do not let a remote peer modify authoritative mastery records without local validation.
- Do not allow collaboration participants to execute privileged local actions.
- Keep code execution isolated from Puter/API credentials.
- Make every connected capability explicit and revocable.

## 15. Dependency rule

Install `@heyputer/puter.js` only when the approved implementation gate actually requires Puter code.

Before installation, inspect the current official documentation and review:

- browser support;
- package version;
- API shape;
- permissions;
- quotas/limits;
- licensing;
- security considerations;
- bundle/runtime cost.

Do not add SDKs merely because a future feature might use them.

## 16. Testing requirements

The Puter integration is not complete until tests cover at least:

- provider unavailable;
- authentication cancelled;
- disconnected/local mode;
- connected mode;
- read/write failures;
- malformed remote data;
- sync conflict/retry behavior;
- AI quota/provider failure;
- safe AI rendering;
- collaboration connect/disconnect;
- peer message validation;
- no credential leakage;
- local state surviving every connected-service failure.

## 17. Source hierarchy

For Puter-specific behavior:

1. current official Puter documentation;
2. official Puter repository/source;
3. project specifications;
4. implementation details.

A model answer, blog post, tutorial, cached snippet, or external example must not override current official provider documentation.
