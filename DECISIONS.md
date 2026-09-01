# MasteryOS Decision Log

Durable decisions only. New entries should use the format below.

## D-001 — Personal-use first
Date: 2026-09-01
Status: accepted
Decision: MasteryOS is a personal learning system first, not a SaaS product.
Reason: The immediate value is improving the learner's own mathematical and computational capability. Productization would introduce major complexity before the learning workflow is proven.
Alternatives rejected: Multi-user SaaS from day one.
Consequences: No accounts, multi-tenancy, billing, social features, or cloud sync in v1.
Reversal trigger: A separate product decision establishes a validated external-user need.

## D-002 — Local-first v1
Date: 2026-09-01
Status: accepted
Decision: V1 stores learner state locally and does not require a backend.
Reason: Personal use does not require a server, and local-first minimizes cost, infrastructure, auth, and synchronization complexity.
Alternatives rejected: Supabase/Firebase backend from the start.
Consequences: Cross-device sync and centralized recovery are unavailable initially.
Reversal trigger: Real user requirements require sync or shared services.

## D-003 — No hosted database/authentication in v1
Date: 2026-09-01
Status: accepted
Decision: Do not introduce a hosted database or authentication provider without an explicit architecture decision.
Reason: There is one learner and no server-side identity requirement.
Alternatives rejected: Adding Supabase/Firebase by default because common app templates use them.
Consequences: IndexedDB/localStorage are the persistence layer.
Reversal trigger: Multi-user or cross-device requirements become real.

## D-004 — Provider-agnostic AI
Date: 2026-09-01
Status: accepted
Decision: AI access is behind a small provider abstraction; Gemini is the first provider, not the architecture itself.
Reason: Free-tier availability and model capabilities can change, and provider lock-in is unnecessary.
Alternatives rejected: Direct Gemini calls throughout the UI.
Consequences: Slight abstraction overhead; easier future provider replacement.
Reversal trigger: A single provider becomes a deliberate long-term constraint.

## D-005 — BYOK for personal AI prototype
Date: 2026-09-01
Status: accepted
Decision: Personal/trusted use may use a runtime-provided AI key rather than a shared application secret.
Reason: There is no backend in v1 and the user controls the device and provider account.
Alternatives rejected: Hard-coded key; public shared key.
Consequences: The user bears provider-key exposure risk on the device; public multi-user deployment is not supported by this pattern.
Reversal trigger: Public distribution or multi-user use.

## D-006 — External resources are linked, not mirrored
Date: 2026-09-01
Status: accepted
Decision: MasteryOS curates and maps external resources but does not copy copyrighted books, courses, videos, or proprietary content without permission.
Reason: Preserve source integrity, legality, maintainability, and provenance.
Alternatives rejected: Building a scraped content mirror.
Consequences: The learner depends on external availability; resource health must be monitored.
Reversal trigger: Specific content is explicitly licensed or owned.

## D-007 — Mastery over completion
Date: 2026-09-01
Status: accepted
Decision: Progress is based on demonstrated mastery, not simply completing lessons.
Reason: The target domains require transfer, reasoning, and problem-solving ability.
Alternatives rejected: Course checklist only.
Consequences: Mastery state needs multiple evidence signals.
Reversal trigger: None currently planned.

## D-008 — Coach before answer
Date: 2026-09-01
Status: accepted
Decision: Hard-problem assistance should prefer hints/Socratic coaching before revealing complete solutions unless the learner explicitly requests the solution.
Reason: The system exists to build independent reasoning rather than dependence on AI.
Alternatives rejected: Immediate answer generation for every problem.
Consequences: AI UX needs explicit tutor modes and solution disclosure rules.
Reversal trigger: Accessibility or learning-context exception is explicitly justified.

## D-009 — Documentation before application code
Date: 2026-09-01
Status: accepted
Decision: Establish project context, architecture, security, decisions, plan, tasks, and learning-system specifications before implementing the main application.
Reason: MasteryOS has broad scope and needs strong boundaries to avoid feature sprawl.
Alternatives rejected: Coding a dashboard first and documenting afterward.
Consequences: Initial implementation begins after user verification of the documentation contract.
Reversal trigger: None; this is an operating principle.

## D-010 — AI output is advisory
Date: 2026-09-01
Status: accepted
Decision: AI-generated mathematical, programming, educational, or quantitative explanations are treated as assistance that can require verification.
Reason: Model errors can teach misconceptions and the target domains reward rigor.
Alternatives rejected: Treating the model as an authoritative source.
Consequences: Tutor prompts should encourage derivation, checking, source grounding where needed, and uncertainty disclosure.
Reversal trigger: None.

## D-011 — Public repository safety boundary
Date: 2026-09-01
Status: accepted
Decision: The public GitHub repository contains only shareable project artifacts and source; private learner state, API keys, and sensitive exports remain outside version control.
Reason: The repository is public and therefore must be treated as a publication boundary.
Alternatives rejected: Storing personal notes/state directly in tracked files by default.
Consequences: Local-only state needs explicit backup/import mechanisms later.
Reversal trigger: Repository visibility changes or a deliberate publication policy is established.

## Decision template

## D-XXX — Title
Date: YYYY-MM-DD
Status: proposed | accepted | superseded
Decision:
Reason:
Alternatives rejected:
Consequences:
Reversal trigger:
