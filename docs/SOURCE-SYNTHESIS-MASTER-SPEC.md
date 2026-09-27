# MasteryOS External Curriculum Synthesis Specification

## Purpose

This document defines how MasteryOS absorbs the useful educational structure represented by Class Central, OSSU Computer Science, ForrestKnight's Open Source CS Degree, and Scrimba's HTML/CSS learning repository/course without turning MasteryOS into a link directory or an unauthorized course mirror.

The goal is stronger than reproducing any source:

> absorb the coverage, sequence, prerequisite logic, project patterns, and pedagogy; then rebuild them as a coherent, native, interactive MasteryOS curriculum that can be completed inside the application.

## Source roles

### Class Central — discovery and coverage intelligence

Canonical source:
https://www.classcentral.com/subject/cs

Current research snapshot:
- Class Central's Computer Science directory currently lists thousands of courses and exposes topic filters including distributed systems, algorithms/data structures, graphics, operating systems, architecture, quantum computing, programming languages/compilers, theoretical CS, HCI, AI, cybersecurity, databases, DevOps, web development, and more.
- The directory also distinguishes free courses, certificates, university sources, levels, durations, languages, and other metadata.

Role inside MasteryOS:
- discovery universe;
- gap detector;
- alternative-resource index;
- course metadata benchmark.

Class Central is NOT the authority for the MasteryOS prerequisite graph. The MasteryOS competency graph remains authoritative.

### OSSU Computer Science — undergraduate CS spine

Canonical source:
https://github.com/ossu/computer-science

OSSU is a major structural reference because it explicitly organizes a self-taught CS education into Intro CS, Core CS, Advanced CS, and a final project. Its Core CS spans programming, mathematics, CS tools, systems, theory, security, applications, and ethics; Advanced CS adds programming, systems, theory, information security, and mathematics.

Role inside MasteryOS:
- undergraduate breadth baseline;
- prerequisite and sequencing reference;
- university-equivalent minimum coverage;
- advanced-topic inventory.

MasteryOS should improve on OSSU by:
- making competencies rather than course brands authoritative;
- adding diagnostic placement;
- adding native interactive lessons;
- adding mastery gates;
- adding deliberate practice;
- adding software-engineering execution;
- adding quant/math routes;
- adding AI/ML and modern engineering depth;
- adding local-first persistence and contextual AI.

### ForrestKnight Open Source CS — alternate compact degree map

Canonical source:
https://github.com/ForrestKnight/open-source-cs

The repository curates free courses from institutions such as MIT, Stanford, Princeton, Duke, University of Washington, and others across programming, math, systems, theory, applications, and Unix/Linux.

Role inside MasteryOS:
- alternate course/path calibration;
- independent cross-check against OSSU;
- identification of strong university course sequences;
- practical route alternatives.

The project is MIT-licensed, so its project-level structure and permitted material can be considered under its license. Individual linked courses remain subject to their own providers' terms.

### Scrimba Learn HTML & CSS — interaction and project pedagogy reference

Canonical sources:
https://scrimba.com/links/htmlandcss
https://github.com/scrimba/learn-html-and-css

The current Scrimba course is beginner-oriented, browser-based, interactive, and project-driven. The current course page describes 106 interactive scrims across six modules, with more than 75 coding challenges and multiple build/deploy projects. The repository contains starter files for those course challenges.

Role inside MasteryOS:
- micro-lesson design;
- immediate practice after explanation;
- in-context editing;
- challenge/solution cadence;
- project ladder;
- browser-first learning UX.

MasteryOS must not copy Scrimba's protected lesson text, video, interactive recordings, or course expression. The course/repository listing does not by itself establish a permissive license for all course material; treat course content as reference-only unless separate permission/licensing is verified.

## Source synthesis rule

Never create four parallel versions of the curriculum.

Instead:

Source research → coverage extraction → deduplication → competency graph → native lesson design → interactive practice → assessment → mastery gate

For each source, extract:
- subject/domain;
- concept coverage;
- prerequisite relationships;
- intended depth;
- project patterns;
- exercise patterns;
- estimated effort;
- strengths;
- gaps;
- obsolete/volatile items;
- rights/provenance status.

Then map those findings into the MasteryOS competency graph.

## MasteryOS upgrades beyond the source set

The resulting curriculum should go beyond the source set in the following dimensions.

### Mathematical depth
- arithmetic/algebra repair;
- functions and advanced algebra;
- trigonometry;
- precalculus;
- single-variable calculus;
- multivariable calculus;
- linear algebra;
- probability;
- statistics;
- discrete mathematics;
- proof and mathematical maturity;
- number theory;
- combinatorics;
- optimization;
- numerical methods;
- real analysis;
- abstract algebra;
- stochastic processes;
- advanced quantitative mathematics.

### Software engineering depth
- programming fundamentals;
- debugging;
- testing;
- design;
- architecture;
- APIs;
- databases;
- networking;
- Linux;
- concurrency;
- performance;
- distributed systems;
- reliability;
- security;
- observability;
- developer tooling;
- large-scale system design;
- AI-assisted engineering.

### Computer science depth
- algorithms;
- data structures;
- computer architecture;
- operating systems;
- compilers;
- programming languages;
- theory of computation;
- complexity;
- cryptography/security;
- graphics;
- HCI;
- distributed systems;
- databases;
- networking;
- advanced systems.

### AI/ML depth
- mathematical foundations;
- classical machine learning;
- optimization;
- deep learning;
- representation learning;
- transformers/LLMs;
- evaluation;
- data pipelines;
- MLOps;
- efficient inference;
- retrieval/agents;
- research literacy.

### Quantitative finance depth
- probability;
- statistics;
- linear algebra;
- calculus;
- optimization;
- stochastic processes;
- time series;
- numerical methods;
- market microstructure;
- quantitative research;
- quantitative development;
- interview problem solving;
- simulation and backtesting as educational laboratories.

## Canonical learning experience

Every source-derived area must become an internal learning sequence rather than a list of URLs:

Orient → Explain → Visualize → Interactive Example → Guided Practice → Independent Practice → Assessment → Transfer Challenge → Project → Mastery Gate

## Scrimba-inspired lesson contract

Short technical concepts should use this pattern when suitable:

1. Explain one concept.
2. Show a concrete example.
3. Give the learner an immediate editable task.
4. Validate the attempt locally.
5. Explain errors.
6. Offer progressively stronger hints.
7. Ask for a variation of the problem.
8. Finish with a small project or integration task.

This should be applied to mathematics, programming, systems, and other technical subjects—not just HTML/CSS.

## Resource policy

External resources remain valuable, but the learner's main path should not require leaving MasteryOS.

Where rights permit:
- store original/licensed material locally;
- embed approved content;
- import permitted open-source exercises.

Where rights do not permit reproduction:
- author a native MasteryOS explanation and exercise;
- retain the external source only as provenance/reference;
- never copy protected expression.

## Native equivalence requirement

For every high-priority source-derived competency, the implementation backlog should eventually contain:
- an original lesson;
- interactive example(s);
- at least one deliberate-practice activity;
- a deterministic or well-defined assessment;
- misconception/diagnostic rules;
- a follow-up/transfer challenge;
- a project/application where appropriate;
- provenance metadata for source inspiration.

The learner should therefore be able to complete the competency inside MasteryOS even when external sites are unavailable.

## Recommended source hierarchy

For unstable technical facts:
1. official documentation/specification;
2. official university/course material;
3. primary research;
4. established educational material;
5. community resources.

For curriculum structure:
1. MasteryOS competency graph;
2. university/standards calibration;
3. OSSU/ForrestKnight/Class Central cross-check;
4. specialist resources.

For learning interaction:
- use Scrimba-like immediate practice patterns;
- use MasteryOS mastery rules as the progression authority.

## Anti-overload rule

Do not expose thousands of choices to the learner.

For every important competency the system should present:
- Recommended native path;
- Best reference resource(s);
- One strong alternative;
- Optional deep dive.

The full source catalog remains searchable for advanced learners.

## Update policy

Source catalogs change. Store:
- canonical URL;
- source type;
- last verified date;
- status;
- relevant snapshot notes;
- rights/provenance class.

A changed external course must not silently redefine the MasteryOS curriculum.

## Completion definition

This source-synthesis work is complete only when:
- source coverage is represented in the competency graph;
- duplicate paths are deduplicated;
- all high-priority areas have native-learning specifications;
- prerequisite relationships are explicit;
- source provenance is recorded;
- rights are classified;
- interactive lesson patterns are defined;
- the resulting route is strictly richer than any one source.
