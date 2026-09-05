# MasteryOS Assessment & Mastery Specification

## Purpose

Assessment is a first-class part of learning. Reading or watching material does not unlock the next stage by itself.

## Gate model

A gated learning unit follows:

`LEARN → ATTEMPT → ASSESS → DIAGNOSE → REMEDIATE → REASSESS → UNLOCK`

## Assessment types

### Knowledge

- retrieval questions;
- concept classification;
- definitions in the learner's own words;
- explain-why questions;
- misconception checks.

### Mathematics and reasoning

- calculations;
- proofs and derivations;
- modeling;
- estimation;
- multi-step reasoning;
- novel problems.

### Programming

- code completion;
- implementation tasks;
- debugging;
- refactoring;
- algorithmic problems;
- tests to write;
- performance analysis.

### Computer science / systems

- tracing system behavior;
- architecture analysis;
- design trade-offs;
- networking/OS/database exercises;
- debugging scenarios;
- design questions.

### AI/ML

- implementation;
- dataset reasoning;
- evaluation design;
- experiment interpretation;
- model debugging;
- failure analysis;
- system design.

### Project assessment

A substantial project demonstrates transfer. Projects are evaluated against an explicit rubric rather than completion alone.

## Mastery levels

Each topic can progress through:

1. **Exposure** — learner encountered the material.
2. **Understanding** — learner can explain core ideas.
3. **Working competence** — learner can solve standard tasks independently.
4. **Independent mastery** — learner handles unfamiliar variants and can justify decisions.
5. **Transfer** — learner applies the concept in a new domain/project.
6. **Advanced mastery** — learner can reason about edge cases, trade-offs, limitations, and deeper theory.

The exact labels may evolve, but MasteryOS must distinguish exposure from demonstrated capability.

## Promotion rules

A topic cannot be marked mastered solely because:

- a lesson was opened;
- a video was watched;
- a book section was read;
- an AI answer was viewed;
- an external course was marked complete.

Promotion requires evidence appropriate to the topic.

## Failure handling

A failed assessment produces a diagnosis instead of only a score. The system should identify likely causes such as:

- missing prerequisite;
- vocabulary gap;
- conceptual misconception;
- procedural weakness;
- poor problem decomposition;
- careless error;
- insufficient practice;
- weak transfer ability.

The next activity should target the smallest useful remediation.

## AI-generated assessment

AI may generate variants, explanations, hints, and challenge questions, but generated assessment must be bounded by the curriculum contract and validated where feasible.

AI is not automatically the final authority for mastery decisions on high-stakes or ambiguous assessments.

## Anti-cheating / assistance awareness

Where the environment permits, assessment records whether AI assistance was used and what type of help was requested. The system should preserve a distinction between:

- independent attempt;
- hint-assisted attempt;
- explanation-assisted attempt;
- solution-assisted attempt;
- externally completed work.

This metadata supports honest progress reporting rather than punishment.

## Unlock policy

Unlock requirements must be visible before the learner starts the gate. The system should explain what evidence is needed and why.

## Reassessment

Failed gates can be retried after targeted remediation. Do not create arbitrary friction or infinite grind. Retry difficulty should test the same competency through a sufficiently different problem.
