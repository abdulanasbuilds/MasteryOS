# MasteryOS Connected Features Verification Specification

## Purpose

This document defines the verification gates for optional connected functionality, especially Puter.js AI/auth/storage and collaboration.

Connected services are enhancements around the local-first core. A connected feature is not complete if it works only while the provider is available.

## 1. Local fallback invariant

For every connected feature, verify:

- the application starts without the provider;
- the core learner record remains available;
- lessons remain readable;
- assessments remain usable where their authored logic is local;
- existing local progress is not lost;
- provider errors do not corrupt local state;
- reconnecting does not overwrite newer local state blindly.

## 2. Puter authentication

Verify:

- local/guest mode needs no Puter account;
- Connect Puter requires intentional user action;
- popup/auth cancellation is handled;
- sign-out/disconnect leaves local data intact;
- switching accounts does not merge identities incorrectly;
- app/user scoped Puter permissions match the intended data boundary;
- no Puter token or credential is committed or exposed through application logs.

## 3. Puter storage/sync

Verify:

- local state remains authoritative for core behavior;
- only approved syncable records are transmitted;
- private records remain local unless explicitly enabled;
- remote data is schema-validated;
- version mismatches are handled;
- stale remote data cannot overwrite newer local data silently;
- network loss queues/reports sync failure safely;
- quota/size errors are recoverable;
- export/import remains usable without Puter.

## 4. Puter AI

Verify:

- provider can be unavailable without breaking learning;
- prompts contain only necessary context;
- selected text/equation/code is correctly scoped;
- AI mode and requested depth are respected;
- output is rendered safely;
- assistance level is recorded;
- substantial assistance can trigger a transfer challenge;
- hallucinated/uncertain responses are not treated as authoritative;
- provider errors, rate/usage limits, malformed responses, and timeouts are handled;
- private learner data is not sent unnecessarily.

## 5. Collaboration

Verify the stages separately.

### Stage 1

- host creates a room;
- participant joins;
- presence is updated;
- shared text/notes synchronize;
- lesson position synchronizes when enabled;
- participant can leave;
- local private state remains intact.

### Stage 2

- shared whiteboard synchronization;
- collaborative problem-solving state;
- pair programming;
- shared code/document state;
- reconnect/conflict behavior.

### Stage 3

- voice permissions;
- video permissions;
- screen-sharing permissions;
- denial/revocation behavior;
- graceful degradation when media fails.

## 6. Peer security

Verify:

- invite/room identifiers are not treated as sufficient authorization when stronger controls are required;
- peer messages are validated before application use;
- malformed/oversized messages are rejected;
- remote peers cannot modify privileged local state;
- peers cannot access local secrets;
- learner code never receives Puter credentials;
- shared AI context is explicit and visible;
- leaving a room invalidates the relevant local session state.

## 7. Open-source/publication checks

Before public release:

- search repository for secrets;
- confirm no private learner state is tracked;
- confirm no unlicensed third-party curriculum copies are present;
- confirm provider credentials are runtime-only;
- confirm generated/build artifacts do not contain secrets;
- review third-party dependencies and licenses;
- review public documentation for accidental private information.

## 8. Performance

Measure connected behavior on modest devices and networks.

Verify:

- local navigation does not wait on cloud requests;
- AI requests do not block unrelated UI;
- synchronization work does not make the learning UI unusable;
- large collaborative documents are bounded;
- code and visualization runtimes are lazy-loaded where practical.

## 9. Release condition

A connected feature is releasable only when:

- local fallback tests pass;
- connected happy paths pass;
- failure paths pass;
- security checks pass;
- browser verification passes;
- data-flow behavior is documented;
- provider-specific assumptions cite current official documentation;
- final diff is inspected;
- known provider limitations are recorded.
