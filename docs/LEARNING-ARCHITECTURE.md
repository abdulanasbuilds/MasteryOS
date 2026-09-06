# MasteryOS Learning Architecture

## Purpose

This document defines how MasteryOS represents learning across technology disciplines. It governs the curriculum graph, prerequisite relationships, learning sequence, practice, evidence, mastery, remediation, and next-action recommendations.

## 1. Learning hierarchy

The canonical hierarchy is:

`Program → Phase → Domain → Topic → Lesson → Concept → Example → Practice → Assessment → Project`

Supporting relationships connect:

- prerequisites;
- competencies;
- evidence;
- misconceptions;
- resources;
- mastery state;
- cross-program transfer.

A resource supports learning. It is not itself proof of mastery.

## 2. Universal Core

The Universal Core contains transferable capabilities that technology learners commonly need, with depth determined by the eventual route.

Representative areas:

- learning/reasoning/problem decomposition;
- mathematics and discrete reasoning;
- computer and internet fundamentals;
- programming and computational thinking;
- data structures and algorithms;
- command line, Git, debugging, and testing;
- software/system fundamentals;
- databases and data modeling;
- networking and operating-system fundamentals;
- security, privacy, reliability;
- AI literacy and evaluation;
- research and technical communication.

The Universal Core is a competency foundation, not an obligation to study every topic to maximum depth.

## 3. Program model

After the Universal Core, the learner can select specialized programs and routes.

Representative programs include software engineering, computer science, AI/ML, data, systems, cybersecurity, networking, web/mobile engineering, mathematics, quantitative finance, developer tools, and research/advanced computing.

Programs may share prerequisites and transfer evidence through the global competency graph.

## 4. Depth model

`FOUNDATION → CORE → ADVANCED → SPECIALIST → FRONTIER`

Depth is competency-specific. Frontier content is included only when its value, evidence, and maintenance burden justify it.

## 5. Learner progression

A typical competency follows:

`Orient → Explain → Visualize → Worked Example → Guided Practice → Independent Practice → Assessment → Application → Reflection → Gate`

Failure does not create a dead end. It routes the learner to diagnosis and targeted remediation.

## 6. Concept/competency model

Every meaningful competency should have:

```text
stable_id
name
programs/routes
depth
summary
learning_objectives
prerequisites
concepts/vocabulary
examples
interactive_blocks
practice_ids
assessment_ids
project_ids
mastery_criteria
misconceptions
transfer_links
resource_references
provenance/rights
confidence/evidence
version/review metadata
```

## 7. Prerequisite graph rules

- A prerequisite represents a real dependency, not mere thematic similarity.
- Avoid unnecessary chains that block reasonable alternative learning paths.
- Advanced competencies expose their required prerequisites.
- Cross-program dependencies are allowed.
- Cycles are prohibited in the prerequisite relation unless represented as a separate mutual-reinforcement relationship.
- A resource view, video completion, or AI explanation does not itself prove prerequisite mastery.

## 8. Mastery dimensions

Depending on domain, evidence may represent:

- conceptual understanding;
- procedural/computational fluency;
- problem solving and transfer;
- proof/reasoning;
- implementation ability;
- systems/design judgment;
- communication/explanation;
- retention and spaced recall.

A learner can be strong in one dimension and weak in another.

## 9. Evidence model

Potential evidence types include:

- guided practice;
- independent practice;
- unfamiliar problem;
- timed challenge;
- derivation/proof;
- coding task;
- debugging task;
- system-design task;
- project;
- self/expert explanation;
- spaced re-test;
- AI-assisted work with recorded assistance level.

Evidence weighting must be defined by the relevant assessment contract rather than globally assuming all attempts are equivalent.

## 10. Mastery states

A concept may move through:

`unknown → learning → practiced → provisionally-mastered → mastered → needs-review`

Mastery is not permanent. Retention evidence and later transfer performance may trigger review.

## 11. Assistance ladder

For difficult problems:

`0 independent → 1 clarification → 2 small hint → 3 directional hint → 4 decomposition/partial solution → 5 full solution`

The exact labels can be rendered differently by the UI, but the underlying assistance level must remain representable.

## 12. Mastery gate

A gate should require evidence appropriate to the competency. A generic percentage or lesson-completion rule is insufficient for high-value prerequisites.

Example:

```text
Advance only when:
- required concepts are understood;
- independent evidence reaches the configured threshold;
- transfer/unfamiliar evidence is adequate where relevant;
- critical prerequisites are healthy;
- any required reassessment is passed.
```

The assessment specification is authoritative for exact scoring and unlock behavior.

## 13. Recommendation engine

The next-best-action engine may consider:

- current program/route goal;
- prerequisite health;
- mastery deficits;
- recent mistakes;
- retention risk;
- learner time/budget;
- resource availability;
- recent AI assistance;
- project deadlines or milestones.

It should present a small set of high-value next actions with explanations rather than an overwhelming task dump.

## 14. Resource strategy

Each competency should have one recommended primary learning route where possible, with alternatives labeled by purpose:

- intuition-first;
- rigorous/formal;
- practice-heavy;
- implementation-first;
- project-first;
- visual;
- reference.

External resources remain supporting sources. Core teaching should be renderable inside MasteryOS when content rights and technical constraints permit.

## 15. Cross-route transfer

The system should make reusable competencies visible, for example:

- discrete mathematics → algorithms/security;
- linear algebra → graphics/ML/scientific computing;
- probability → ML/data/quant;
- operating systems → systems/cloud/security;
- networking → distributed systems/cloud;
- compilers → programming languages/tooling;
- testing → reliable software/AI systems;
- optimization → ML/operations/quantitative computing.

## 16. Curriculum integrity

A topic enters the curriculum only when:

- its competency outcome is clear;
- its graph position is defensible;
- its scope is bounded;
- teaching material can be authored or legally sourced;
- assessment can distinguish exposure from performance;
- ongoing maintenance is feasible.

## 17. Versioning

Major changes to competency relationships, unlock rules, or program structure must be recorded in durable project artifacts and appropriate changelog/decision entries.
