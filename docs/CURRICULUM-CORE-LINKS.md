# Universal Core → Program Links

Decision: D-024. Each row is a prerequisite edge from a program topic or phase to a Universal Core foundation. The edges themselves live in `content/curriculum/master-curriculum-manifest.json`; this file records why each one exists.

Rules applied (LEARNING-ARCHITECTURE §7):

- An edge is a real dependency, not thematic similarity.
- Topic-level edges are preferred. A whole core phase is required only when the dependent phase genuinely needs all of it, so a learner is not blocked by unrelated core material.
- No edge points from a shallower topic to a deeper one; the validator enforces this.

## Phase-level edges

| Program phase | Requires core phase | Reason |
|---|---|---|
| Computer Science → Core Programming | Programming & Algorithms Foundation | paradigms/types/design assume all programming fundamentals |
| Computer Science → Algorithms & Data Structures | Programming & Algorithms Foundation | implementing algorithms needs programming and the core DSA tools |
| Web Engineering → Modern Frontend Engineering | Programming & Algorithms Foundation | JS/TS application work needs all programming fundamentals |
| AI & Machine Learning → Machine Learning Foundations | Programming & Algorithms Foundation | ML practice is implemented in code over collections and functions |
| AI & Machine Learning → Modern AI Systems | Security, Reliability & Responsible AI | building AI systems needs security, privacy, reliability and responsible-AI basics |
| Quantitative & Computational Finance → Quantitative Development | Programming & Algorithms Foundation | quant development is programming work |
| Mathematics & Computational Mathematics → Advanced Secondary Mathematics | Mathematical & Quantitative Foundation | advanced algebra, functions and trigonometry extend the core foundations |
| Software Engineering → Engineering Practice | Programming & Algorithms Foundation; Developer Foundations | added in D-023 for the first lesson |

## Topic-level edges

| Program topic | Program(s) | Requires core topic | Reason |
|---|---|---|---|
| Python foundations | Computer Science | Control flow | learns Python syntax for already-known control flow |
| C foundations | Computer Science | Control flow | learns C syntax for already-known control flow |
| C foundations | Computer Science | How computers work | C exposes memory and the machine model directly |
| Problem solving with code | Computer Science | Functions & scope | structures solutions as functions |
| Imperative programming | Computer Science | Variables & state | imperative style is explicit state mutation |
| Functional programming | Computer Science | Functions & scope | treats functions as values; needs functions and scope |
| Object-oriented programming | Computer Science | Structured data | objects bundle structured data with behavior |
| JavaScript foundations | Web Engineering | Functions & scope | JS learning assumes functions, scope and control flow |
| Python for research | Quantitative & Computational Finance | Collections & iteration | research code iterates over collections from day one |
| C++ foundations | Quantitative & Computational Finance | Functions & scope | C++ foundations assume functions and scope |
| Arrays, lists, stacks & queues | Computer Science | Fundamental data structures | core-depth treatment of structures first met as tools |
| Hash tables | Computer Science | Fundamental data structures | implements the hash map used as a tool in the core |
| Sorting | Computer Science | Searching & sorting basics | analysis of sorts builds on simple sorts and their cost |
| Searching | Computer Science | Searching & sorting basics | builds on linear and binary search |
| Divide & conquer | Computer Science | Recursion basics | divide and conquer is recursive by construction |
| Dynamic programming | Computer Science | Recursion basics | DP is derived from recursive formulations |
| Asymptotic analysis | Computer Science | Complexity intuition | formalizes the cost intuition from computational thinking |
| Coding interview foundations | Quantitative & Computational Finance | Fundamental data structures | interview problems assume the standard structures |
| Coding interview foundations | Quantitative & Computational Finance | Searching & sorting basics | interview problems assume basic search and sort |
| Computer organization | Computer Science | How computers work | deepens the CPU/memory/storage model |
| Processes & threads | Computer Science | Operating system basics | deepens the user-level view of processes |
| Filesystems | Computer Science | Operating system basics | deepens the user-level view of files and permissions |
| System calls | Computer Science | Operating system basics | system calls are the OS interface met in the core |
| Network models | Computer Science | How the internet works | layered models formalize addresses and packets |
| DNS | Computer Science | How the internet works | deepens DNS met at literacy depth |
| HTTP | Computer Science | How the web works | protocol depth on top of request/response literacy |
| HTTP basics | Web Engineering | How the web works | web-platform HTTP builds on how the web works |
| Browser runtime | Web Engineering | How the web works | assumes the browser/URL/HTTP mental model |
| URLs & routing | Web Engineering | How the web works | builds on URL literacy |
| Relational model | Computer Science | Database fundamentals | formalizes tables and keys |
| SQL foundations | Computer Science | Database fundamentals | builds on simple queries |
| Data modeling | Computer Science | Database fundamentals | deepens data-modeling basics |
| pandas data workflows | Quantitative & Computational Finance | Data literacy | tabular workflows assume reading tables and summaries |
| Feature engineering | AI & Machine Learning | Data literacy | feature work assumes reading and questioning data |
| Security principles | Computer Science | Security fundamentals | deepens threats and least privilege |
| Secure coding | Computer Science | Security fundamentals | assumes threat and secret-handling basics |
| Authentication & authorization | Computer Science | Security fundamentals | deepens authentication basics |
| Security model basics | Web Engineering | Security fundamentals | browser security model assumes general security basics |
| Supply-chain security | Software Engineering | Security fundamentals | assumes threat and trust basics |
| Privacy | Computer Science | Privacy fundamentals | deepens personal data, consent and minimization |
| Reliability | Software Engineering | Reliability fundamentals | deepens failure and recovery basics |
| Incident thinking | Software Engineering | Reliability fundamentals | incident response assumes failure and recovery basics |
| LLM fundamentals | AI & Machine Learning | AI literacy | technical depth on how models produce output |
| AI safety & reliability | AI & Machine Learning | Responsible AI use | engineering depth on bias, misuse and oversight |
| Program decomposition with TypeScript functions | Software Engineering | Decomposition; Functions & scope | added in D-022/D-023 |
