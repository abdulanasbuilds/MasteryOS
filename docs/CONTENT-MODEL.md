# MasteryOS Content Model

## Purpose

Define the canonical content units that the application renders and connects into the mastery graph.

## Content hierarchy

`Program → Phase → Domain → Topic → Lesson → Concept → Example → Practice → Assessment → Project`

Supporting entities:

- glossary term
- diagram
- interactive visualization
- code exercise
- dataset
- reference
- source/evidence record
- mistake pattern
- mastery rubric

## Content should be executable as learning

A content unit is incomplete when it only contains prose. Where appropriate, it should expose an action:

- predict;
- calculate;
- explain;
- compare;
- derive;
- implement;
- debug;
- design;
- test;
- reflect.

## Content metadata

Every lesson/topic should be able to declare:

- stable ID;
- title;
- summary;
- prerequisites;
- objectives;
- difficulty/depth;
- estimated effort;
- content blocks;
- assessment links;
- project links;
- resources;
- provenance;
- version;
- last verification date;
- status.

## Interactive blocks

The content renderer should support composable blocks such as:

- rich text;
- callout;
- equation;
- graph;
- table;
- diagram;
- image;
- video;
- code;
- runnable example;
- question;
- multiple choice;
- free response;
- ordering/matching;
- simulation;
- checkpoint;
- project prompt;
- AI action.

## Authoring rule

Content must remain separable from application presentation. The learning graph should not be hard-coded into individual UI components.

## Resource reuse

Content may reference licensed, provider-approved, or original resources according to `docs/EMBEDDED-LEARNING-SPEC.md` and `docs/RESOURCE-GOVERNANCE.md`.

## Content correctness

For technical content that changes over time, record version/date context. For mathematical content, preserve definitions and notation carefully. For advanced or frontier content, record confidence and evidence strength.
