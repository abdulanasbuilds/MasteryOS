# MasteryOS Learning Architecture

## Purpose

This document defines how MasteryOS represents learning. It is the core domain model for the curriculum, prerequisite graph, mastery engine, practice system, and recommendation engine.

## 1. Learning hierarchy

The primary hierarchy is:

`Track → Phase → Domain → Topic → Concept → Practice → Evidence → Mastery`

A resource supports a concept; a problem generates evidence; evidence updates mastery; mastery and prerequisite health determine the next recommended action.

## 2. Core tracks

### Track A — Mathematical foundations

Goal: eliminate gaps from basic arithmetic through strong secondary algebra, functions, trigonometry, and geometry.

### Track B — Advanced/pre-university mathematics

Goal: reach the breadth and depth associated with strong international advanced-secondary pathways.

Core areas:

- advanced algebra;
- sequences and series;
- combinatorics;
- number theory;
- complex numbers;
- vectors and matrices;
- calculus;
- differential equations;
- optimization.

### Track C — Mathematical problem solving

Goal: develop transfer, creativity, estimation, mental calculation, proof habits, and unfamiliar-problem solving.

Areas:

- mental math;
- estimation/Fermi problems;
- probability puzzles;
- inequalities;
- geometry problems;
- combinatorics;
- number theory;
- Olympiad-style problems;
- proof problems;
- mathematics + programming problems.

### Track D — University mathematics

Goal: transition from procedural mathematics to rigorous mathematical thinking.

Areas:

- logic and sets;
- proof;
- discrete mathematics;
- linear algebra;
- real analysis;
- probability;
- statistics;
- abstract algebra;
- multivariable calculus;
- differential equations;
- numerical methods.

### Track E — Quantitative finance

Goal: build mathematical/statistical/computational foundations relevant to quantitative research, trading, and quantitative development.

Areas:

- probability;
- statistics;
- linear algebra;
- calculus;
- optimization;
- simulation;
- statistical modelling;
- time series;
- market microstructure foundations;
- quantitative research;
- quantitative trading reasoning;
- interview preparation.

### Track F — Computer science

Goal: understand computation deeply enough to solve problems, reason about systems, and build performant software.

Areas:

- Python;
- C;
- C++;
- algorithms;
- data structures;
- complexity;
- memory;
- operating systems;
- databases;
- networking;
- distributed systems;
- computational thinking.

### Track G — Software engineering

Goal: build reliable, maintainable, tested, secure software.

Areas:

- Git;
- testing;
- debugging;
- codebase design;
- API design;
- architecture;
- performance;
- security;
- observability;
- system design;
- AI-assisted engineering.

## 3. Recommended phase progression

### Phase 0 — Baseline diagnosis

Determine actual strengths, gaps, misconceptions, and problem-solving ability. Do not infer mastery from prior school grades alone.

### Phase 1 — Foundation repair

Repair arithmetic, algebra, functions, trigonometry, geometry, and probability gaps.

### Phase 2 — Advanced secondary mathematics

Add advanced algebra, sequences, combinatorics, number theory, complex numbers, vectors, calculus, and differential equations.

### Phase 3 — Problem-solving maturity

Run systematic unfamiliar-problem practice alongside Phase 2 rather than waiting until all school mathematics is complete.

### Phase 4 — University transition

Introduce proof, abstraction, rigorous calculus, linear algebra, probability, statistics, and discrete mathematics.

### Phase 5 — Quant/CS convergence

Use shared mathematics to support statistics, machine learning, quantitative finance, algorithms, and computational work.

### Phase 6 — Advanced specialization

Branch according to demonstrated strength into quant research, quantitative development, advanced software engineering, ML, or deeper mathematics.

## 4. Concept node model

Every concept should have a stable identifier and metadata approximately equivalent to:

```text
id
track
phase
domain
title
summary
learning_objectives
prerequisites
recommended_resource
alternative_resources
estimated_effort
difficulty
mastery_dimensions
common_mistakes
related_concepts
quant_connections
cs_connections
practice_set_ids
status
last_reviewed
```

## 5. Prerequisite graph rules

- Prerequisites must represent genuine dependency, not merely thematic similarity.
- Avoid unnecessary prerequisite chains that block useful learning.
- Every advanced concept should expose its required prerequisites.
- The graph can contain cross-track dependencies.
- Cycles are prohibited unless a mutually reinforcing relationship is explicitly modeled outside the prerequisite relation.
- A resource does not prove that its prerequisites are mastered.

## 6. Mastery dimensions

Mastery should be multidimensional:

- conceptual understanding;
- computational fluency;
- problem solving/transfer;
- proof/reasoning where applicable;
- application/modeling;
- retention.

A learner may be procedurally strong while conceptually weak. The system must be able to represent that.

## 7. Evidence types

Possible evidence:

- guided exercise;
- independent exercise;
- unfamiliar problem;
- timed challenge;
- proof/derivation;
- coding implementation;
- project;
- oral/self-explanation;
- spaced re-test;
- AI-assisted attempt with disclosed assistance level.

Assisted work should not be counted the same as independent work.

## 8. Mastery state

A concept can be:

`unknown → learning → practiced → provisionally-mastered → mastered → needs-review`

Mastery is not permanent. Spaced review can move a concept to `needs-review` when retention evidence drops.

## 9. Assistance ladder

For problems, record assistance level:

0 — independent

1 — clarification

2 — small hint

3 — directional hint

4 — partial solution

5 — full solution

This allows the system to distinguish genuine independence from successful AI-assisted completion.

## 10. Advancement rule

Advancement should require evidence appropriate to the concept. A simple learning status check is insufficient for high-value prerequisite nodes.

Example rule:

```text
Advance only when:
- conceptual check passes;
- independent practice reaches threshold;
- at least one unfamiliar problem is solved or adequately reasoned;
- no unresolved critical prerequisite remains.
```

Thresholds are configurable and should depend on concept difficulty.

## 11. Recommendation engine

The next-best-action engine should consider:

- current goal;
- graph prerequisites;
- mastery deficits;
- recent mistakes;
- retention risk;
- available time;
- resource availability;
- learner-selected track priority.

It should prefer a small number of high-value actions rather than producing an overwhelming queue.

## 12. Curriculum design rule

One recommended primary route per concept. Alternatives are explicitly labeled by purpose, such as:

- intuition-first;
- rigorous;
- practice-heavy;
- video-first;
- coding-first.

The learner should never need to choose among dozens of equivalent resources before starting.

## 13. Source hierarchy

For factual/technical learning content, prioritize:

1. official university/course material and primary sources;
2. reputable educational platforms and official documentation;
3. high-quality secondary explanations;
4. community material.

The system must show when a resource is a reference rather than an authoritative source.

## 14. Success condition

The curriculum is successful when the learner can progress without guessing, knows why a prerequisite matters, can demonstrate independent competence, and can transfer concepts into quantitative and computational contexts.