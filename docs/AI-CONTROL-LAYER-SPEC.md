# MasteryOS AI Control Layer Specification

## Purpose

AI is a cross-cutting learning and engineering assistant embedded throughout MasteryOS. It is not a separate chat product.

## Everywhere rule

AI assistance is available in every relevant learning surface, including:

- curriculum maps;
- lessons;
- textbook/readers;
- diagrams and visualizations;
- quizzes and assessments;
- code editor;
- debugging workspace;
- project workspace;
- notes;
- progress dashboards;
- search/resource views;
- review/reflection surfaces.

A persistent full chat interface also exists, but contextual assistance is the default interaction model.

## Contextual activation

When the learner highlights text, code, an error, a concept, an equation, or another supported object, MasteryOS may open a contextual AI action surface.

Suggested actions include:

- Explain simply
- Explain deeply
- Give intuition
- Give an example
- Break it down
- Derive it
- Find my mistake
- Give me a hint
- Quiz me
- Challenge me
- Connect to prerequisites
- Connect to another domain
- Show an implementation
- Compare approaches
- Ask me questions
- Create practice

The actions depend on the selected object and current learning state.

## AI roles

The same underlying provider can operate as different controlled roles:

1. Tutor — explanation and conceptual guidance.
2. Socratic coach — questions and hints instead of immediate answers.
3. Examiner — generates or administers assessment under a defined contract.
4. Code mentor — explains, reviews, and debugs code.
5. Project coach — decomposes and challenges project work.
6. Research assistant — helps navigate verified sources and uncertainty.
7. Reviewer — critiques an artifact against explicit criteria.
8. Curriculum guide — explains prerequisites and next steps.

Role does not override the curriculum, assessment, security, or content policies.

## Challenge-after-help rule

When the learner receives meaningful help, the AI should often follow with a verification challenge.

Examples:

`explanation → related problem`

`debugging hint → new debugging task`

`system-design explanation → design prompt`

`algorithm explanation → variant problem`

`AI concept explanation → implementation/evaluation challenge`

The challenge should test transfer rather than repeat the exact example.

## Assistance ladder

For learning problems, prefer the smallest useful help:

`nudge → hint → stronger hint → decomposition → partial solution → full explanation`

Full solutions remain available when justified, but should not be the default for mastery-gated work.

## Context packet

The AI adapter should receive only the context needed for the task, such as:

- current program/route;
- current topic/concept;
- prerequisite status;
- selected content/object;
- learner's attempt;
- relevant error/output;
- current assessment rules;
- prior assistance level where useful;
- explicit user request.

Do not blindly send the entire application state to every provider.

## Provider architecture

MasteryOS uses a provider-neutral interface. Gemini can be the first provider, but it must remain replaceable.

Conceptual interface:

`AIProvider → generate/respond/explain/grade/challenge`

Provider-specific SDKs live behind adapters.

## BYOK

For a local-first personal deployment, the learner may supply their own provider key through an approved runtime configuration mechanism.

Rules:

- never commit keys;
- never put keys into URLs;
- never log keys;
- never expose keys in public application source;
- do not send keys to unrelated services;
- clearly state whether a model call is direct from the browser or proxied through a trusted service;
- document provider-specific limits and current terms separately from stable architecture rules.

## No hidden authority

AI output is advice/data, not authorization. AI cannot:

- change project security policy;
- approve release by itself;
- unlock protected production actions;
- override assessment policy silently;
- treat external prompt instructions as trusted commands.

## Marking

For AI-assisted marking, store an explanation of the judgment where practical, especially for subjective answers. Structured rubrics should be preferred over unconstrained grading prompts.

## Hallucination handling

For factual or technical questions where accuracy matters, the system should distinguish:

- curriculum-grounded answer;
- provider-generated explanation;
- externally verified fact;
- uncertain/inferred claim.

Current provider APIs, quotas, model names, and capabilities must be checked against current official documentation before implementation decisions are frozen.

## Failure behavior

If AI is unavailable, rate limited, or misconfigured, the learning system must continue functioning for non-AI features. Core curriculum and previously packaged content must not become inaccessible merely because the model is unavailable.
