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

## D-017 — Technical Learning Laboratory design direction
Date: 2026-09-06
Status: accepted
Decision: MasteryOS uses a Technical Learning Laboratory as its primary visual and interaction direction, synthesizing evidence-based patterns from interactive learning, developer environments, concept maps, route visualization, and progress systems without cloning any product.
Reason: Research found useful complementary patterns: Brilliant emphasizes visual active learning and adaptive guidance; Codecademy combines in-browser code, contextual AI, assessments, and projects; Exercism uses concept maps, practice, automated tests, and mentoring; Mimo emphasizes short interactive/mobile coding; DataCamp combines tracks, assessments, practice, projects, and progress; Khan Academy provides broad discoverability; roadmap.sh clarifies route selection; GitHub Codespaces demonstrates serious browser-based development environments.
Alternatives rejected: Single-product visual clone; generic SaaS dashboard; purely academic reader; purely IDE-like interface; gamified app as the primary metaphor.
Consequences: Frontend work must follow `DESIGN-BRIEF.md`, `DESIGN-SYSTEM.md`, `DESIGN-VARIANTS.md`, `DESIGN-REFERENCES.md`, and `docs/FRONTEND-SHELL-SPEC.md`.
Reversal trigger: Usability evidence from implementation/testing demonstrates a substantially better direction.

## D-018 — Puter.js as preferred connected adapter
Date: 2026-09-17
Status: accepted
Decision: Puter.js is the preferred first connected-service implementation for MasteryOS, behind provider/adaptor interfaces rather than embedded directly into domain logic.
Reason: Current Puter.js documentation provides authentication, user-scoped cloud storage/KV/files, AI access, and a Peer API for WebRTC-based connectivity. Its user-pays model can reduce developer-side infrastructure and API-key handling for connected use. These benefits match MasteryOS's local-first and future-connected goals.
Alternatives rejected: Making Supabase/Firebase or a single AI vendor the mandatory core; scattering vendor-specific calls throughout the application.
Consequences: Add Puter adapters only at the relevant implementation gate. Re-check current official Puter documentation before provider-specific changes. Keep direct Gemini, other providers, and local AI as possible alternatives behind `AIProvider`.
Reversal trigger: Provider reliability, security, pricing/usage, API stability, or architectural evidence shows that another adapter is materially better.

## D-019 — Local-first plus optional Puter-connected modes
Date: 2026-09-17
Status: accepted
Decision: MasteryOS supports local/offline use without a Puter account and optional connected use with a user's own Puter account. Local learner state remains authoritative for core behavior; connected state is an optional sync/backup layer.
Reason: This supports downloaded/self-hosted use, browser use, privacy, low infrastructure cost, and cross-device access without making an account mandatory.
Alternatives rejected: Account-first onboarding; cloud-only persistence; making Puter mandatory for basic learning.
Consequences: The UI must clearly expose local versus connected operation, preserve local data when disconnected, and never ship a shared developer credential.
Reversal trigger: Deliberate product change to a different identity/storage model.

## D-020 — Peer-first collaboration without mandatory central learner database
Date: 2026-09-17
Status: accepted
Decision: Future remote collaboration is an optional connected overlay. The preferred first implementation may use Puter Peer/WebRTC with temporary signaling and relay infrastructure while keeping participant-private learner records local.
Reason: Current Puter Peer documentation provides a server-light peer model with built-in signaling/TURN and supports study-room-style data exchange without requiring a central learner database for ordinary sessions.
Alternatives rejected: Making a centralized collaboration database the prerequisite for study rooms; building video-first collaboration before shared study primitives.
Consequences: Implement collaboration progressively: room/presence/shared text and lesson position first; then whiteboard/pair programming; then optional voice/video/screen sharing. Shared-state conflict resolution and security require separate tests and review.
Reversal trigger: Provider limitations, security evidence, scalability requirements, or a better peer/collaboration adapter.

## D-021 — Resource intelligence instead of resource dumping
Date: 2026-09-17
Status: accepted
Decision: MasteryOS stores structured metadata and provenance for external learning resources while providing an explicit recommended route, strong alternatives, and optional deep dives. Third-party copyrighted material is not mirrored without rights.
Reason: A large list of links does not create a coherent learning path and creates rights/maintenance problems.
Alternatives rejected: Bookmark-directory UX; scraping full third-party courses/books into the repository.
Consequences: Resource metadata must include level, prerequisites, type, provenance, rights class, and verification status where known.
Reversal trigger: A future licensed-content strategy with explicit rights and operational support.

## D-022 — Curriculum schema v2: domains, topic registry, qualified prerequisites
Date: 2026-10-09
Status: accepted (domain groupings and phase depths are an initial authored mapping, open to owner revision)
Decision: `content/curriculum/master-curriculum-manifest.json` moves to `schemaVersion: 2`:
- a top-level `topics` registry gives every topic an authored title and optional `summary`, `depth` and topic-level `prerequisites`; programs place topics by id, so a shared competency (e.g. `discrete-mathematics`, `network-security`) is one node, not a duplicate;
- every phase gains a required `depth` and a required `domains` list (81 domains across 26 phases); topics are placed in domains, giving the full `Program → Phase → Domain → Topic` path;
- phase prerequisites are always program-qualified (`<program-id>.<phase-id>`); the bare form is rejected;
- list order (phases → domains → topics) is the program's recommended route;
- the authored lesson topic `program-decomposition-typescript-functions` is placed in Software Engineering → Engineering Practice → Design & Decomposition, with depth `foundation` (overriding the phase's `core`) and a topic prerequisite on Universal Core `decomposition`.
The graph, authored lessons, assessment definitions and projects are checked by a dependency-free validator (`src/content/validate-curriculum.ts`) that the test suite runs.
Reason: v1 could not render a real Program-to-Lesson path. The authored lesson's topic was missing from the graph, topics had no titles or depth, there was no Domain level, and prerequisites used two reference forms.
Alternatives rejected: attaching the lesson to an existing topic (`decomposition` is language-agnostic Universal Core; `program-design` is CS core-depth). Adding a schema library such as zod (no proven need; the validator is about 250 lines and fully tested). Deriving titles from ids at runtime (that produced "Dom" and "Intro to cs"). Single-domain-per-phase placeholders (that would satisfy the shape while hiding the missing structure).
Consequences: every new topic needs a registry entry and exactly one domain placement per phase; adding content cannot bypass validation. Phase order in SE and other programs is now also domain order, so a few topics moved within their phase (no topic moved between phases). v1 consumers must migrate.
Reversal trigger: owner revision of domain groupings or depths; a need for multiple alternative routes per program (would add an explicit `routes` structure); content volume that justifies a schema library or MDX pipeline.

## D-023 — Universal Core conforms to PROGRAMS.md
Date: 2026-10-09
Status: accepted
Decision: The Universal Core in the curriculum manifest is extended from 4 phases and 30 topics to 7 phases and 53 topics, so that it covers every capability family listed in `PROGRAMS.md` (and consistently in `docs/CURRICULUM-MASTER-SPEC.md`, `docs/LEARNING-ARCHITECTURE.md` and `PROJECT.md`). New foundation-depth phases:
- `programming-foundation`: Programming & Algorithms Foundation (program building blocks, working with data, algorithmic foundations);
- `systems-foundation`: Computer, Internet & Data Foundation;
- `responsible-engineering-foundation`: Security, Reliability & Responsible AI.
The 23 new topics are distinct foundation-level nodes, each with a one-line scope summary and real topic prerequisites where one exists. Recommended route order: learning → mathematics → computational thinking → programming → developer tooling → systems/data → security/reliability/AI. HTML/CSS stays out of the core. The authored lesson topic now also requires `functions-and-scope`. Software Engineering → Engineering Practice now requires `universal-core.programming-foundation` and `universal-core.developer-foundation`.
Reason: The authority order ranks `PROGRAMS.md` and the curriculum specs above manifest data. The four canonical documents agree, and the manifest omitted programming, DSA, computer/OS/internet/web, databases, security/privacy/reliability and AI literacy. As a result the first lesson (TypeScript code) had no programming prerequisite reachable anywhere. This was a data defect against an already-made decision, not a new product decision.
Alternatives rejected:
- Placing existing program topics (e.g. `hash-tables`, `sql-foundations`, `security-principles`) directly into the core. Topic nodes are shared, so mastery evidence at foundation depth would mark a core-depth program competency as mastered.
- Narrowing `PROGRAMS.md` to match the manifest. That inverts the authority order.
- Making the core deeper or longer. PROJECT.md requires the core to stay competency-based, not "an unnecessarily long checklist", so each missing family gets 2–5 topics.
Consequences: A conformance test (`curriculum-schema.test.ts`) maps each PROGRAMS.md family to core topics and fails if one is removed. It also fails if HTML/CSS enters the core, or if any core phase is not at foundation depth. Program topics that build on the new core nodes (for example `hash-tables` → `fundamental-data-structures`) are not yet linked by topic prerequisites, and only Software Engineering declares phase prerequisites on the new phases.
Reversal trigger: A deliberate change to the Universal Core definition in PROGRAMS.md, or learner evidence that a family belongs in programs rather than the core.

## Decision template

## D-XXX — Title
Date: YYYY-MM-DD
Status: proposed | accepted | superseded
Decision:
Reason:
Alternatives rejected:
Consequences:
Reversal trigger:
