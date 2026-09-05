# MasteryOS Curriculum Master Specification

## Mission

Create a comprehensive, rigorous, continuously improvable technology education system that can take a learner from foundational literacy to advanced and specialist capability across computing, software engineering, AI, and related technical disciplines.

The curriculum should be at least university-equivalent for core areas and intentionally include advanced material, uncommon topics, and research-adjacent subjects where credible resources can be identified.

## Curriculum philosophy

MasteryOS is organized around competence, not course brands.

A course, video, textbook, article, documentation set, or external platform is a resource used to teach a capability. It is not itself the curriculum authority.

The curriculum authority is the prerequisite and competency graph maintained by MasteryOS.

## Shared foundation

The exact mandatory foundation is versioned, but all technology learners should encounter an appropriate subset of:

1. Learning, reasoning, problem decomposition, and technical communication.
2. Mathematics and discrete reasoning required for computing.
3. Computer and internet fundamentals.
4. Programming fundamentals and computational thinking.
5. Data structures and algorithms.
6. Git, command line, debugging, testing, and development workflow.
7. Web, networking, operating-system, and computer-architecture fundamentals.
8. Databases and data modeling.
9. Security, privacy, reliability, and responsible engineering.
10. AI literacy, model behavior, evaluation, prompting, and responsible AI use.

Not every learner must progress equally deeply in every core area. Route requirements determine the minimum depth, while MasteryOS may recommend deeper study when dependencies justify it.

## Program families

Programs include, but are not limited to:

- Software Engineering
- Computer Science
- AI Engineering
- Machine Learning
- Deep Learning
- Data Science
- Data Engineering
- Backend Engineering
- Web Engineering
- Mobile Engineering
- Systems Engineering
- Cloud Engineering
- DevOps / Platform Engineering
- Cybersecurity
- Networking
- Distributed Systems
- Databases / Data Systems
- Computer Architecture
- Operating Systems
- Programming Languages
- Compilers
- Developer Tools / Developer Experience
- Human-Computer Interaction
- Applied Mathematics for Computing
- Quantitative and Computational Finance
- Research and Advanced Computing

## Depth model

Every topic can have one or more depth levels:

`FOUNDATION → CORE → ADVANCED → SPECIALIST → FRONTIER`

### Foundation
Prerequisites and mental models.

### Core
University-equivalent knowledge and practical competence.

### Advanced
Harder theory, implementation, mathematical grounding, architecture, trade-offs, and substantial practice.

### Specialist
Focused industry or research-level depth.

### Frontier
Uncommon, research-adjacent, emerging, niche, or difficult-to-find material. Frontier content must carry explicit evidence and uncertainty labels.

## Topic contract

Every meaningful curriculum node should define:

- stable ID
- name
- description
- category/program relationships
- prerequisites
- learning objectives
- depth level
- concepts
- vocabulary
- examples
- diagrams/visual models when useful
- guided lessons
- retrieval questions
- practice
- assessment
- project(s)
- mastery criteria
- common misconceptions
- resource references
- evidence/confidence
- version/update metadata

## Learning sequence

A typical node follows:

`Orient → Explain → Visualize → Worked example → Guided practice → Independent practice → Assessment → Application → Reflection → Gate`

A learner who fails a gate is routed back to the weakest prerequisite or skill instead of being allowed to brute-force unlock the next stage.

## Cross-route transfer

MasteryOS should explicitly show where knowledge transfers across disciplines. Examples include:

- discrete mathematics → algorithms
- probability → machine learning
- linear algebra → graphics/ML
- operating systems → systems engineering
- networking → distributed systems/cloud
- compilers → programming languages/tooling
- software testing → reliable AI systems
- optimization → ML/quantitative computing

## University-equivalent and beyond

The goal is not to claim equivalence to a particular university degree. Instead, MasteryOS should use strong university curricula as calibration references and then extend beyond common undergraduate coverage where justified.

Advanced content may include difficult implementation details, deeper mathematical treatment, systems internals, unusual algorithms, research papers, source-code archaeology, compiler internals, advanced distributed systems, model evaluation, advanced security, performance engineering, and other topics rarely packaged into beginner-friendly learning paths.

## Curriculum integrity

Do not add a topic merely because it sounds advanced.

A topic enters the curriculum only when:

- it has a clear competency outcome;
- its place in the prerequisite graph is defensible;
- its scope is bounded;
- trustworthy instructional material exists or can be authored;
- assessment can distinguish understanding from exposure.

## Versioning

Curriculum changes are decisions, not silent edits. Major graph changes should be recorded in `DECISIONS.md` and relevant changelog entries.
