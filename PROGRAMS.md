# MasteryOS Programs & Routes

## Purpose

MasteryOS is not a single course. It is a structured technology mastery system that begins with a shared foundation, then branches into increasingly specialized programs and mastery routes.

## Universal Core

Every learner must build a common foundation before specializing. The exact curriculum is versioned in `docs/CURRICULUM-MASTER-SPEC.md`.

The universal core should cover, at appropriate depth:

- learning and problem-solving fundamentals
- mathematical and logical reasoning
- computer literacy and digital systems
- programming fundamentals
- data structures and algorithms fundamentals
- software development fundamentals
- Git and collaborative development fundamentals
- command line, networking, internet, and web fundamentals
- databases and data fundamentals
- testing, debugging, security, and reliability fundamentals
- technical communication, documentation, and developer tooling
- AI literacy and responsible AI use

The core is not a shallow "intro to everything". Topics can be taken to university-equivalent or higher depth where they are foundational to later routes.

## Major Programs

MasteryOS should organize specialization into programs such as:

- Software Engineering
- Computer Science
- AI Engineering
- Machine Learning
- Data Science
- Data Engineering
- Web Engineering
- Mobile Engineering
- Backend Engineering
- Systems Engineering
- Cloud & DevOps
- Cybersecurity
- Networking & Distributed Systems
- Databases & Data Systems
- Computer Architecture & Operating Systems
- Programming Languages & Compilers
- Developer Tools & Developer Experience
- Applied Mathematics for Computing
- Quantitative/Computational Finance as an optional advanced route
- Research/Advanced Computing as an advanced route

The catalog is extensible. A new program requires a curriculum specification, prerequisite map, evidence requirements, and resource plan before being considered complete.

## Route structure

A route follows:

`Program → Level → Phase → Domain → Topic → Lesson → Practice → Assessment → Project → Mastery Gate`

A learner can have multiple programs active, but the system should recommend a primary route to reduce fragmentation.

## Depth standard

MasteryOS deliberately targets more than minimum university survey depth where useful.

Depth levels:

- Foundation — prerequisite literacy and mental models
- Core — university-equivalent conceptual and practical competency
- Advanced — deeper theory, implementation, trade-offs, and difficult problems
- Specialist — industry/research-level specialization
- Frontier — uncommon, research-adjacent, emerging, or difficult-to-find material

Frontier material is especially valuable when trustworthy educational resources are scarce. Such material must be labeled clearly and supported by strong references.

## Alternative routes

Alternatives can exist, but they should not create uncontrolled course-choice paralysis. The system should show:

- Recommended route
- Strong alternative
- Optional deep-dive route

The recommended route remains explicit.

## Source-informed route expansion

The expanded curriculum seed in `content/curriculum/master-curriculum-manifest.json` synthesizes the supplied Class Central, OSSU, ForrestKnight, and Scrimba references.

The synthesis adds explicit domains for:

- advanced mathematical foundations;
- mathematical maturity and proof;
- HTML/CSS and web foundations;
- core and advanced computer science;
- Unix/Linux and developer tooling;
- algorithms and data structures;
- systems, networking, databases, theory, and security;
- software engineering and architecture;
- AI/ML;
- quantitative/computational finance;
- quantitative research/development/interview preparation.

HTML/CSS is available through the Web Engineering route but is not a mandatory prerequisite for pure Computer Science or Quantitative/Computational Finance routes.

Source-derived material must become native MasteryOS learning experiences rather than external course clones. See:

- `docs/SOURCE-SYNTHESIS-MASTER-SPEC.md`
- `docs/SOURCE-COVERAGE-CROSSWALK.md`
- `content/references/source-catalog.json`

## Advancement rule

Learners do not unlock later material solely by reading earlier material.

A mastery gate may require:

- conceptual check
- retrieval questions
- timed or untimed practice
- implementation task
- debugging task
- explanation/proof
- project or design exercise
- cumulative assessment

The required evidence depends on the topic type.
