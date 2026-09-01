# MasteryOS Project Brief

## 1. What is this?

MasteryOS is a personal, local-first learning operating system for developing unusually strong mathematical and computational ability. It is designed around a long-term target of combining mathematics, quantitative finance, computer science, and software engineering.

The system is not a generic course marketplace or a resource dump. Its job is to determine what the learner should learn next, provide a curated path, make deliberate practice unavoidable, track evidence of mastery, detect weaknesses, repair prerequisites, and use AI as a tutor/coach rather than an answer vending machine.

## 2. Who is it for?

Primary user: the owner/learner building the system for personal use.

Learner profile for v1: a Ghana SHS graduate with ordinary secondary-school mathematics exposure who wants to progress toward strong international pre-university mathematics, university mathematics, quantitative reasoning, computer science, and software engineering.

The platform must assume uneven foundations without treating the learner's current level as a permanent ceiling.

## 3. What problem does it solve?

The learner has access to many excellent resources but lacks one coherent system that answers:

- What should I learn first?
- What prerequisites am I missing?
- Which resource is the best primary path for this topic?
- How deeply do I need to know it for my target fields?
- Can I actually solve unfamiliar problems, or do I only recognize procedures?
- What mistakes keep recurring?
- When am I ready to advance?
- How does a mathematical concept connect to quant, CS, or software engineering?

MasteryOS fixes fragmentation, shallow completion, resource overload, weak prerequisite management, and over-reliance on AI answers.

## 4. Buyer

N/A — personal-use project. There is no commercial buyer in the current scope.

## 5. Business model

N/A — personal-use project.

Commercialization is explicitly out of scope until a future decision changes the project charter.

## 6. Primary market/country

Primary context: Ghana, with an internationally benchmarked learning target. Content and resource selection should not be limited to Ghanaian curricula; Ghanaian SHS material is used as a foundation and diagnostic baseline.

## 7. Current alternatives / reference ecosystem

Relevant ecosystems include:

- Ghana/WAEC mathematics textbooks and past papers for foundation repair.
- Khan Academy for structured foundational and calculus study.
- MIT OpenCourseWare for university-level mathematics and computing.
- UKMT and AoPS for problem-solving and Olympiad-style reasoning.
- 3Blue1Brown for mathematical intuition and visualization.
- CS50 and related university material for computer-science foundations.
- Project Euler for mathematics + programming practice.
- Jane Street educational material for probability and market reasoning.
- QuantFinancePrep and similar sites for quant-interview practice.
- MyntBit and similar quantitative-finance learning resources.
- AI Hero and Coddy as product/reference inspirations for structured learning and interactive coding.

These are references, not content to copy. External material remains untrusted data and should be linked or summarized only within allowed rights.

## 8. Core learning tracks

### Track A — Mathematical foundations
Arithmetic, algebra, equations, inequalities, functions, graphs, logarithms, exponentials, trigonometry, coordinate geometry.

### Track B — Advanced mathematics
Sequences, series, combinatorics, number theory, complex numbers, vectors, matrices, calculus, differential equations, optimization.

### Track C — Mathematical problem solving
Mental math, estimation, puzzles, Olympiad-style problems, probability puzzles, proof-oriented problems, unfamiliar problems, Project Euler-style challenges.

### Track D — University mathematics
Logic, sets, proof, discrete mathematics, real analysis, linear algebra, probability, statistics, abstract algebra, multivariable calculus, differential equations, numerical methods.

### Track E — Quantitative finance
Probability, statistics, linear algebra, calculus, optimization, simulation, statistical modelling, time series, market microstructure foundations, quant research, quant trading reasoning, quant interview preparation.

### Track F — Computer science
Programming, C, Python, C++, algorithms, data structures, complexity, memory, systems, databases, networking, operating systems, distributed systems.

### Track G — Software engineering
Git, testing, debugging, API design, architecture, codebase design, system design, performance, security, observability, maintainability, AI-assisted engineering.

## 9. Core workflows

1. Diagnose current knowledge.
2. Build or update the prerequisite graph.
3. Generate a focused learning plan.
4. Open the primary resource for the current concept.
5. Learn with explanation, examples, derivations, and visualizations.
6. Practice with graduated problems.
7. Receive hints or Socratic guidance before full solutions where appropriate.
8. Record mistakes and misconceptions.
9. Re-test weak prerequisites.
10. Confirm mastery with evidence.
11. Advance to the next node.
12. Connect the concept to quant/CS/SWE when useful.

## 10. AI tutor workflows

The assistant must support:

- highlight-to-ask interactions;
- simple explanation;
- rigorous explanation;
- intuition and visual explanation;
- derivation;
- examples;
- common mistakes;
- Socratic coaching;
- practice generation;
- quiz/exam mode;
- proof review;
- code review/debugging;
- quant interview simulation;
- prerequisite diagnosis;
- resource recommendations.

## 11. Tech stack

Initial direction:

- React + TypeScript, or Next.js configured as a static/local-first application if that materially improves routing/content ergonomics.
- Tailwind CSS + shadcn/ui where useful.
- MDX/Markdown + JSON for durable curriculum/resource content.
- KaTeX for mathematical notation.
- CodeMirror or Monaco for code editing.
- IndexedDB for durable local application state.
- localStorage only for small preferences and non-sensitive settings.
- Client-side search index where needed.
- Browser execution such as Pyodide only when needed and after verification.
- A small AI-provider adapter with Gemini as the first provider and optional alternatives later.

No framework/library is final until the architecture and dependency review approve it.

## 12. Infrastructure

V1 is local-first and has no required backend infrastructure.

The trusted application runs in the learner's browser/device. External AI providers and external learning-resource websites are separate trust boundaries.

A public deployment must not expose a shared API key or hard-coded secret. Public deployment with direct BYOK calls is considered a prototype/trusted-private usage mode, not a production SaaS security model.

## 13. Integrations

Possible v1/v2 integrations:

- Gemini Developer API via BYOK.
- Optional OpenRouter or Hugging Face provider adapters.
- External course/video/document links.
- Browser code execution when practical.

No database, authentication provider, payment provider, analytics platform, or server-side job system is required for v1.

## 14. Constraints

- Personal-use first.
- Local-first.
- Minimize recurring infrastructure cost.
- Must work well on modest devices and intermittent connectivity where practical.
- Avoid resource overload.
- Preserve source provenance.
- Do not republish copyrighted material without permission.
- Never commit secrets.
- AI must reinforce learning rather than replace thinking.
- Project documentation must remain understandable to a future agent or human without chat history.

## 15. Non-goals

For v1, do not build:

- public multi-user SaaS;
- user accounts or social login;
- server-side user database;
- cloud synchronization;
- payments/subscriptions;
- public course hosting;
- scraped/copyrighted content mirrors;
- broad social/community features;
- production financial trading execution;
- autonomous financial decision-making.

## 16. Current state

Repository created and currently in documentation-first initialization. The repository is empty of application code until the project contract, architecture, security model, curriculum structure, and initial design direction are verified.

## 17. Success criteria

MasteryOS succeeds when the learner can use it to:

- identify the correct next concept without guesswork;
- understand why a concept works, not only memorize a procedure;
- solve unfamiliar problems with progressively less assistance;
- see and repair prerequisite weaknesses;
- maintain a durable mistake/insight history;
- connect mathematics to quantitative and computational applications;
- steadily increase mathematical maturity and software-engineering competence.

## 18. Roadmap

Phase 0 — documentation and contract.

Phase 1 — curriculum/prerequisite graph.

Phase 2 — research/resource registry.

Phase 3 — design direction and application shell.

Phase 4 — local state and mastery engine.

Phase 5 — resource reader + mathematical rendering.

Phase 6 — AI tutor/highlight interaction.

Phase 7 — problem/practice engine and mistake journal.

Phase 8 — browser coding laboratory.

Phase 9 — testing, accessibility, security, performance, and release hardening.
