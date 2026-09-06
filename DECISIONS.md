# MasteryOS Decision Log

Durable decisions only. New entries use the format below. Decisions govern the product until explicitly superseded.

## D-001 — Personal-first, locally runnable
Date: 2026-09-01
Status: accepted
Decision: MasteryOS is developed and validated as a personal learning application first and must be capable of running locally without a required cloud account or backend.
Reason: The core learning problem can be solved without centralized infrastructure; local operation reduces cost, dependency, privacy exposure, and complexity.
Alternatives rejected: SaaS-first architecture; backend-first architecture.
Consequences: Core features must not depend on remote user services.
Reversal trigger: A concrete future requirement establishes a service that cannot reasonably be local or optional.

## D-002 — Broad technology mastery scope
Date: 2026-09-06
Status: accepted
Decision: MasteryOS is a broad technology mastery environment, not a primarily quantitative-finance or mathematics product.
Reason: The intended system spans technology foundations, software engineering, computer science, AI, programming, systems, and specialized/advanced fields. Quantitative finance is one possible program among many.
Alternatives rejected: Narrowing the product identity to quant, mathematics, or a single technology discipline.
Consequences: Curriculum, navigation, content modeling, and design must support multiple program families and cross-program transfer.
Reversal trigger: A deliberate product charter change.

## D-003 — Universal core then programs
Date: 2026-09-06
Status: accepted
Decision: The curriculum has a broadly transferable Universal Core followed by selected programs/routes.
Reason: Some capabilities should be common across technology fields while specialization requires domain-specific progression.
Alternatives rejected: One giant undifferentiated curriculum; separate programs with no shared foundation.
Consequences: The curriculum graph and learner routing must support both shared prerequisites and specialization.
Reversal trigger: Evidence that a different competency architecture serves learners materially better.

## D-004 — Mastery over completion
Date: 2026-09-01
Status: accepted
Decision: Advancement is based on demonstrated competency evidence rather than lesson/resource completion.
Reason: Reading, watching, or clicking complete does not establish independent capability.
Alternatives rejected: Course-checklist progression.
Consequences: Assessments, evidence records, remediation, and mastery gates are core infrastructure.
Reversal trigger: None planned.

## D-005 — In-app learning first
Date: 2026-09-06
Status: accepted
Decision: MasteryOS should provide the primary learning experience inside the application through native or rights-cleared interactive content wherever practical.
Reason: The product should be a learning environment, not mainly a collection of links to other platforms.
Alternatives rejected: External-resource directory as the primary UX.
Consequences: The platform needs readers, interactive blocks, workbenches, assessments, and project experiences.
Reversal trigger: Specific content categories where in-app delivery is technically or legally impractical.

## D-006 — Rights-aware content model
Date: 2026-09-06
Status: accepted
Decision: MasteryOS may use original, public-domain, licensed/permissioned, or appropriately permitted embedded material; it must not scrape or republish third-party copyrighted content without rights.
Reason: Built-in learning must remain legally and operationally sustainable.
Alternatives rejected: Scraping courses/books/videos into the product.
Consequences: Content provenance and rights class are part of content governance.
Reversal trigger: None; rights compliance is permanent.

## D-007 — Local learner state
Date: 2026-09-01
Status: accepted
Decision: Learner progress, attempts, mastery evidence, notes, mistakes, and related state are local by default.
Reason: The core product does not require centralized storage and should minimize infrastructure and privacy exposure.
Alternatives rejected: Hosted database as the default source of truth.
Consequences: Import/export and future synchronization need explicit design.
Reversal trigger: A deliberate connected-service architecture decision.

## D-008 — Optional future connectivity
Date: 2026-09-06
Status: accepted
Decision: Future backend/cloud services must connect as optional adapters around the local core rather than replacing it silently.
Reason: The application should remain locally useful while leaving room for sync, accounts, collaboration, remote execution, and secure AI mediation later.
Alternatives rejected: Designing a mandatory cloud backend now.
Consequences: Storage, AI, and service boundaries require abstraction points.
Reversal trigger: A future product version deliberately changes the core runtime contract.

## D-009 — Provider-agnostic AI
Date: 2026-09-01
Status: accepted
Decision: AI features use a provider abstraction; a provider such as Gemini is an implementation, not the product architecture.
Reason: Provider capabilities, prices, limits, and availability change.
Alternatives rejected: Vendor-specific calls throughout the application.
Consequences: Slight adapter complexity; easier replacement and future local-model support.
Reversal trigger: A deliberate single-provider product commitment.

## D-010 — AI as control layer, not authority
Date: 2026-09-06
Status: accepted
Decision: AI is available contextually throughout MasteryOS, but curriculum rules, authored assessments, security policies, and product permissions outrank model output.
Reason: AI is useful across learning workflows but can be inaccurate, manipulative through prompt injection, or overly helpful in ways that weaken mastery.
Alternatives rejected: Generic standalone chatbot; AI-controlled unrestricted actions.
Consequences: Context packets, tutor modes, safety boundaries, and independent evidence requirements are mandatory.
Reversal trigger: None planned.

## D-011 — Coach before full solution
Date: 2026-09-01
Status: accepted
Decision: For difficult problems, AI should prefer progressively stronger guidance before revealing a complete answer, subject to learner request and context.
Reason: The goal is independent problem-solving ability.
Alternatives rejected: Instant answers to every task.
Consequences: AI assistance level must be represented in interactions and may affect mastery evidence.
Reversal trigger: Accessibility or instructional exceptions documented in the relevant specification.

## D-012 — Challenge after substantial AI help
Date: 2026-09-06
Status: accepted
Decision: When AI materially helps with a difficult task, MasteryOS should be able to issue a follow-up challenge that tests independent transfer.
Reason: Understanding a generated solution is weaker evidence than solving a related task independently.
Alternatives rejected: Treating assisted completion as equivalent to independent mastery.
Consequences: Assessment engine and AI control layer must interoperate.
Reversal trigger: Learning-evidence research shows a better general mechanism.

## D-013 — Code execution is isolated
Date: 2026-09-06
Status: accepted
Decision: The coding laboratory is a separate security boundary with bounded execution and no application secrets.
Reason: Arbitrary learner code cannot be treated as trusted application code.
Alternatives rejected: Unrestricted execution inside the application process.
Consequences: Some runtimes may require browser isolation or future remote sandbox infrastructure.
Reversal trigger: A safer runtime contract becomes available.

## D-014 — Documentation before main application
Date: 2026-09-01
Status: accepted
Decision: Establish the product contract, architecture, security boundaries, curriculum model, assessment model, AI behavior, content rules, design constraints, and verification gates before the main application build.
Reason: The breadth of MasteryOS makes premature UI-first development highly prone to structural rework.
Alternatives rejected: Building a dashboard first and documenting afterward.
Consequences: The repository is documentation-first during initialization.
Reversal trigger: None for the main build.

## D-015 — Public repository safety
Date: 2026-09-01
Status: accepted
Decision: The repository must remain safe to publish/open-source even while personal learner data and secrets remain private.
Reason: Source visibility and learner-data visibility are separate concerns.
Alternatives rejected: Committing personal state/configuration into the codebase.
Consequences: Private data stays outside Git; original shareable content is preferred.
Reversal trigger: Deliberate repository policy change.

## D-016 — Explicit architecture changes
Date: 2026-09-06
Status: accepted
Decision: Introducing a mandatory backend, database, authentication system, sync layer, remote execution service, or shared AI credential requires a new decision and security review.
Reason: These changes materially alter trust boundaries and operational costs.
Alternatives rejected: Incremental infrastructure creep hidden inside feature work.
Consequences: Future connected features must provide justification, data flow, threat model, and migration/recovery considerations.
Reversal trigger: None.

## Decision template

## D-XXX — Title
Date: YYYY-MM-DD
Status: proposed | accepted | superseded
Decision:
Reason:
Alternatives rejected:
Consequences:
Reversal trigger:
