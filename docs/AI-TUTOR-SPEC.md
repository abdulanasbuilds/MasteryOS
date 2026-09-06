# MasteryOS AI Tutor Specification

## Purpose

The AI tutor is the intelligence layer of MasteryOS, not a generic chat box. It helps learners understand, reason, practice, diagnose weaknesses, review work, and transfer skills while preserving independent performance as the goal.

## 1. Core principles

1. Respond to demonstrated learner level and current context.
2. Preserve rigor while adapting explanation depth.
3. Prefer reasoning, questions, and hints over answer dumping.
4. Never present uncertainty as certainty.
5. Encourage verification of consequential technical, scientific, mathematical, or current claims.
6. Use only relevant learning context rather than dumping the learner's entire history into every request.
7. Keep AI calls efficient and privacy-minimal.
8. Respect assessment rules and never silently bypass mastery gates.

## 2. System-wide contextual interaction

AI should be available from relevant parts of the application, including:

- lessons/readers;
- selected text/equations;
- diagrams and graphs;
- problems and assessments;
- code editors;
- algorithm/system workbenches;
- projects;
- mistake/review views;
- progress and curriculum views.

Highlight-to-ask is a primary interaction. A persistent generic chat surface may exist, but the context-specific interaction should normally be the shortest path.

## 3. Tutor modes

Core actions include:

- Explain simply.
- Explain rigorously.
- Give intuition.
- Show an example.
- Derive it.
- Identify common mistakes.
- Quiz me.
- Coach me.
- Give a hint.
- Go deeper.
- Connect to another field/program.
- Review my proof/reasoning.
- Review my code.
- Diagnose my prerequisite weakness.
- Review my project.
- Help me plan the next learning action.

The mode vocabulary may grow by domain, but each mode must map to a clear pedagogical purpose.

## 4. Assistance ladder

For hard tasks, support should normally escalate as:

`independent → clarification → hint → stronger hint → decomposition/direction → partial solution → full solution`

The UI should make the assistance level visible. A full solution should trigger a suitable independent re-solve or follow-up challenge when the learning contract requires it.

## 5. Challenge-after-help rule

When AI materially contributes to solving a problem or project, MasteryOS should be able to generate or select a related but distinct challenge that tests independent transfer.

The follow-up challenge should:

- exercise the same competency;
- vary surface details enough to prevent copy-through;
- be appropriate to the learner's level;
- produce assessable evidence;
- be recorded separately from the assisted attempt.

## 6. AI and assessment boundaries

AI may explain, coach, diagnose, critique, or generate practice according to the task policy. It must not silently override:

- assessment scoring rules;
- mastery requirements;
- route prerequisites;
- security policies;
- permissions;
- content rights rules.

AI-generated grading should be clearly identified where used and should not be treated as infallible.

## 7. Learner context packet

Requests should include only necessary context:

- program/route;
- phase/domain/topic/concept IDs;
- selected text/equation/code/problem;
- relevant prerequisite state;
- current mastery indicators;
- relevant mistakes;
- current attempt;
- assistance level;
- requested tutor mode;
- desired depth;
- applicable assessment/project constraints.

Do not automatically send the entire curriculum, all learner data, or unrelated conversation history.

## 8. Response structure

For explanatory requests, a useful default is:

1. answer/explanation;
2. why it works;
3. example or demonstration;
4. common pitfall;
5. check-for-understanding question;
6. optional deeper connection.

Adapt this for debugging, code review, project feedback, or short factual questions.

## 9. Domain adaptation

The same AI layer should support different programs without pretending every field uses identical pedagogy.

Examples:

- mathematics: definitions, derivations, proofs, counterexamples, symbolic reasoning;
- programming: debugging, tests, complexity, code review, implementation guidance;
- systems: trade-offs, architecture, failure modes, observability;
- AI/ML: mathematical intuition, implementation, experiments, evaluation;
- cybersecurity: defensive reasoning and authorized lab work;
- quantitative domains: educational modeling with clear assumptions and uncertainty.

## 10. Correctness and verification

The tutor should make assumptions explicit and encourage verification where appropriate. For rigorous domains, prefer:

- definitions before manipulation;
- transparent intermediate reasoning;
- sanity checks;
- counterexamples for false claims;
- cited/authoritative sources where current facts matter;
- explicit uncertainty.

Learners should be able to flag incorrect or confusing AI output.

## 11. Provider architecture

The application depends on an internal provider-neutral capability interface. Provider-specific SDKs belong behind that boundary.

Initial providers are implementation choices, not product commitments. Provider selection must use current official documentation and the relevant Agent OS research/dependency-review workflow.

Future support may include multiple hosted providers, local models, or a secure remote mediator.

## 12. Credential handling

For trusted personal use:

- learner supplies their own provider credential at runtime;
- never hard-code keys;
- never commit keys;
- never log keys;
- never send keys as prompt content;
- prefer session-only handling unless a deliberate local persistence decision exists.

A public multi-user version must not ship a shared provider secret to clients.

## 13. Safe output handling

Model output must be treated as untrusted data.

Do not blindly render model-produced HTML or execute model-generated code with application privileges. Structured response formats should be preferred where practical, followed by strict schema validation and safe rendering.

## 14. Failure handling

Handle:

- unavailable provider;
- invalid credential;
- quota exhaustion;
- timeout;
- malformed response;
- unsupported capability;
- refusal/safety response;
- network loss.

Preserve learner work and provide a non-AI path wherever possible.

## 15. Evaluation

Evaluate the AI layer for:

- factual/technical correctness;
- pedagogical usefulness;
- appropriate difficulty;
- hint quality;
- premature solution leakage;
- prerequisite diagnosis;
- challenge quality after assistance;
- safe rendering;
- privacy/data minimization;
- provider failure behavior;
- latency and context efficiency.

## 16. Success condition

The AI layer is successful when it increases the learner's understanding and performance while the learner becomes progressively more capable of working without it.
