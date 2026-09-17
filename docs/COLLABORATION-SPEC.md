# MasteryOS Collaboration Specification

## 1. Purpose

Collaboration is an optional connected capability layered around the local-first MasteryOS core.

The core learner experience must remain fully usable without collaboration, a hosted database, an account, or an always-on backend.

Collaboration exists to let learners study together from different devices and locations without turning MasteryOS into a cloud-dependent LMS.

## 2. Non-negotiable boundary

There are two different requirements:

- **Local-first learning:** can work with zero network connectivity.
- **Remote collaboration:** requires network communication between participants.

Remote collaboration therefore cannot be completely offline. It may, however, avoid a persistent central database and keep the authoritative learner state on each participant's device.

A future collaboration implementation must preserve this distinction.

## 3. Collaboration modes

### A. Offline/local mode

No collaboration services are required.

The learner can study, assess, maintain local notes and projects, and export/import study artifacts.

### B. Local-network / peer mode

When devices are reachable on the same network, collaboration may use peer-to-peer transport.

### C. Internet peer-to-peer mode

For participants on different networks, MasteryOS may use WebRTC for peer-to-peer data and media transport.

A lightweight signaling service is permitted solely to exchange connection-negotiation data. Signaling should not become a learner-data database or authoritative source of curriculum/progress state.

A TURN relay may be required for networks where direct peer connectivity is not possible. Any TURN service is an infrastructure adapter and must have explicit cost, privacy, retention, and failure behavior documented before use.

## 4. Collaboration features

The future collaboration layer may support:

- private study rooms;
- invite links or short room codes;
- participant presence;
- synchronized lesson position;
- shared notes;
- shared whiteboard;
- collaborative problem solving;
- pair programming;
- shared code editor;
- synchronized coding exercises;
- shared project workspace;
- text chat;
- voice communication;
- video communication;
- screen sharing;
- file/session artifact sharing;
- shared focus timers;
- collaborative quizzes or challenges;
- optional AI facilitator/co-tutor.

These are capabilities, not a requirement that every implementation ship all of them at once.

## 5. Learner state boundary

Participant-private learner state remains local by default.

Do not synchronize unless explicitly shared:

- private mastery history;
- private mistakes/misconceptions;
- private notes;
- personal AI history;
- private settings;
- credentials/API keys;
- private project history.

Room-scoped shared state may include:

- shared lesson location;
- shared whiteboard state;
- shared code/document state;
- room chat messages;
- explicit shared files;
- participant presence;
- shared assessment/session state where all participants consent.

A participant must be able to leave a room without losing their private local record.

## 6. No-database collaboration model

The preferred first collaboration architecture is ephemeral and peer-oriented:

`local core → collaboration adapter → signaling (temporary) → peer connection → shared session state`

The signaling service should be stateless or minimally stateful where practical.

There must be no requirement for a central database to store every learner's progress simply because collaboration exists.

If persistent shared rooms are introduced later, persistence must be an explicit connected-service feature with its own data model, privacy policy, authorization model, and migration strategy.

## 7. Shared-state synchronization

Different shared artifacts may use different synchronization strategies.

For ephemeral room metadata and presence, use explicit event/state messages.

For shared code, notes, and whiteboards, use a conflict-tolerant synchronization approach such as a CRDT or another well-reviewed operational model.

The selected library and protocol must be reviewed for browser compatibility, offline behavior, conflict resolution, memory growth, message size, security, persistence requirements, and licensing.

Do not add a synchronization library until a concrete collaborative artifact requires it.

## 8. Permissions

Collaboration must use explicit participant permissions.

Example roles may include Host, Participant, Presenter, Editor, and Viewer.

Capabilities such as microphone, camera, screen capture, code execution, file sharing, and AI-context sharing must require explicit local browser/device permission where applicable and explicit room-level consent where appropriate.

## 9. AI in collaboration

AI remains a contextual control layer.

An AI facilitator may explain a shared concept, generate a group exercise, mediate hints, summarize a shared discussion, identify unresolved misconceptions, provide a follow-up challenge, or assist pair programming.

AI must not silently receive participants' private learner records.

The AI context packet must identify whether information came from the current participant, the shared room, authored curriculum, or an external resource.

Shared AI sessions must make it clear what is being sent to the selected provider.

## 10. Security and privacy

Collaboration must be treated as a separate trust boundary.

Requirements include:

- do not expose API keys to peers;
- do not grant participant code execution access to the host machine;
- validate and sanitize shared content;
- limit message sizes and rates;
- prevent room identifiers from becoming authorization by themselves;
- support room-level authorization or capability tokens when needed;
- do not trust peer-supplied curriculum/mastery decisions;
- do not allow remote peers to execute privileged application actions;
- record only the minimum metadata required for the selected collaboration mode;
- provide a clear leave/end-room operation.

WebRTC transport is encrypted by the underlying protocol, but application-level privacy and authorization still need independent design and review.

## 11. Media and screen sharing

Voice, video, and screen sharing are optional collaboration surfaces.

They should not be prerequisites for the core collaborative learning experience.

A room should still be useful for text chat, shared problems, shared notes, pair coding, shared whiteboard, and synchronized study.

The application must degrade gracefully when media permissions are denied, unavailable, or unsupported.

## 12. Failure behavior

If collaboration services fail:

- the local application continues working;
- private learner state remains available;
- shared unsaved state is clearly identified;
- reconnect behavior is explicit;
- no failed connection should corrupt the local record;
- the learner can export local work where applicable.

## 13. Future cloud adapters

The collaboration layer may later add separate adapters for signaling, TURN/relay infrastructure, authenticated identity, persistent shared rooms, cloud synchronization, shared content/community services, and moderation/abuse controls.

These are optional extensions. Adding them requires product justification, architecture review, security review, data-flow analysis, and explicit verification.

## 14. Initial implementation recommendation

Do not implement video, screen sharing, persistent rooms, or a collaboration database during the local-first foundation build.

When collaboration becomes the next approved scope, start with the smallest useful slice:

`Create room → Join room → Presence → Shared text/notes → Shared lesson position → Leave room`

Then add pair programming/whiteboard synchronization.

Then add optional voice/video/screen-sharing adapters.

## 15. Acceptance criteria for a future collaboration gate

A collaboration slice is not complete until:

- two or more participants can connect through the intended transport;
- the core remains usable without collaboration;
- private learner state remains private;
- shared state synchronizes correctly and handles disconnect/reconnect;
- permissions are explicit;
- malicious/malformed peer messages are rejected safely;
- browser permission failures are handled;
- collaboration does not introduce a mandatory hosted database;
- tests cover synchronization and failure cases;
- meaningful browser verification is performed;
- security and dependency review are complete.
