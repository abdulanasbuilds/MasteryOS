# MasteryOS Coding & Technical Lab Specification

## Purpose

Coding should be learned and assessed inside the same environment wherever safely feasible. The learner should not need to leave MasteryOS for basic programming practice, debugging, or technical exercises.

## Core lab modes

### Code editor

Provide an integrated editor for supported languages with:

- syntax highlighting;
- formatting;
- diagnostics where available;
- file/tree support for project exercises;
- run/test controls;
- output/errors;
- reset to task baseline;
- AI contextual assistance.

### Algorithm playground

Provide visual or interactive exercises for:

- arrays;
- linked lists;
- stacks/queues;
- trees;
- graphs;
- sorting;
- searching;
- hashing;
- recursion;
- dynamic programming;
- other curriculum-defined structures.

### Systems/architecture lab

Where feasible, provide controlled simulations or interactive diagrams rather than forcing learners to read static descriptions only.

### Debugging lab

Present intentionally faulty code/system states and require the learner to identify root cause and produce a fix.

## Execution safety

Code execution must be isolated from the host where technically possible.

Never execute untrusted learner code with unrestricted host privileges.

A browser-only or sandboxed execution path is preferred. Languages/runtimes that cannot be safely sandboxed are not automatically enabled.

## Assessment integration

Code exercises can act as mastery gates. The system may evaluate:

- correctness;
- tests;
- edge cases;
- complexity;
- readability;
- reasoning;
- debugging quality;
- constraints explicitly declared by the task.

## AI in the lab

Highlighting code or errors opens contextual actions such as:

- explain;
- trace;
- hint;
- find bug;
- compare approaches;
- suggest tests;
- ask me a question;
- challenge me;
- review after attempt.

The AI should not silently rewrite a mastery-gated solution without preserving the learner's independent attempt.

## Project mode

Larger projects should provide:

- objective;
- requirements;
- constraints;
- milestone checklist;
- test criteria;
- rubric;
- hints;
- submission/checkpoint state;
- reflection;
- post-project assessment.

## Browser/runtime degradation

If a full runtime cannot be provided, MasteryOS should degrade gracefully to a non-executing exercise rather than pretending code ran.

## Dependency policy

Code labs should minimize unnecessary package installation. Dependencies must be reviewed under Agent OS supply-chain rules, and exercises should prefer standard-library/runtime capabilities when educationally equivalent.
