# MasteryOS Design References

## Project

MasteryOS — a local-first technology mastery environment.

## Design goal

Create an interface that supports long, demanding study sessions and makes progression, uncertainty, mistakes, resources, assessments, code, and AI assistance understandable at a glance. The product should feel like a serious technical learning laboratory rather than a generic education dashboard.

## Research brief

Industry: education technology / developer tooling / technical knowledge work
Audience: serious self-directed learner
Product type: local-first learning application with browser delivery and optional future connected services
Primary action: continue the highest-value mastery action
Visual qualities wanted: rigorous, technical, calm, dense-but-readable, distinctive, evidence-oriented, interactive
Visual qualities rejected: generic SaaS dashboard, excessive gradients, decorative gamification, card-grid overload, AI-chat-as-entire-product
Devices: desktop/laptop and mobile

## Research findings

### R-001 — Brilliant
Source: https://brilliant.org/
Evidence: Brilliant describes visually rich interactive lessons, active problem solving, personalized progression based on concepts mastered and stuck points, contextual tutoring, and gamified progression.
Learn from it:
- concept-first screens;
- interactive visual explanations;
- immediate problem interaction;
- learner-state-aware guidance;
- clear progression milestones.
Do not copy:
- visual identity, protected artwork, copy, proprietary tutor behavior, or exact layouts.
MasteryOS adaptation:
- use an interactive lesson/workbench model and make conceptual manipulation a first-class learning primitive.

### R-002 — Codecademy
Source: https://www.codecademy.com/
Evidence: Codecademy provides an in-browser coding environment, AI learning assistance aware of course/instruction/solution context, assessments, guided and independent projects, and workspaces for experimentation.
Learn from it:
- lesson/editor split layouts;
- immediate execution and feedback;
- contextual AI tied to the current exercise;
- explicit transitions from guided work to independent projects.
Do not copy:
- proprietary UI, wording, course content, or exact editor layout.
MasteryOS adaptation:
- build coding tasks directly into lesson and assessment flows instead of sending the learner to another IDE.

### R-003 — Exercism
Source: https://exercism.org/
Evidence: Exercism structures tracks as concepts plus concept/practice exercises, uses concept maps, automated code analysis/tests, and mentoring workflows.
Learn from it:
- separate concept teaching from practice;
- explicit practice exercises;
- concept-map mental model;
- test-backed coding feedback;
- mentoring notes tied to exercises.
Do not copy:
- protected interface or content.
MasteryOS adaptation:
- encode curriculum as concepts with attached guided practice, independent practice, assessment evidence, and remediation notes.

### R-004 — Mimo
Source: https://mimo.org/
Evidence: Mimo emphasizes short interactive lessons, real coding, real-time results, daily practice, projects, progress, and gamification, with a strong mobile learning focus.
Learn from it:
- low-friction lesson starts;
- compact interactive exercises;
- immediate feedback;
- mobile-first interaction patterns for small screens.
Do not copy:
- visual identity, protected assets, wording, or exact gamification mechanics.
MasteryOS adaptation:
- support focused micro-sessions without reducing advanced subjects to shallow bite-size content.

### R-005 — DataCamp
Source: https://www.datacamp.com/
Evidence: DataCamp organizes learning around courses, skill/career tracks, assessments, practice, projects, and visible progress.
Learn from it:
- separation of learning modes;
- clear track structure;
- assessment as a first-class object;
- progress surfaces tied to actual learning activity.
Do not copy:
- proprietary interface and content.
MasteryOS adaptation:
- create one coherent Progress/Mastery area that combines route progression, evidence, weak areas, and next actions.

### R-006 — Khan Academy
Source: https://www.khanacademy.org/
Evidence: Khan Academy provides broad subject organization, structured course progression, learner progress, and practice-oriented learning flows.
Learn from it:
- broad curriculum discoverability;
- clear course/topic hierarchy;
- low-friction continue/resume behavior.
Do not copy:
- visual language or content.
MasteryOS adaptation:
- make Universal Core and Programs immediately understandable while retaining deeper mastery mechanics.

### R-007 — roadmap.sh
Source: https://roadmap.sh/
Evidence: roadmap.sh provides role-based and skill-based interactive roadmaps, helping learners choose a route and track progress.
Learn from it:
- map-based orientation;
- program/role framing;
- route discovery;
- reducing uncertainty about what comes next.
Do not copy:
- exact roadmaps, branding, or content.
MasteryOS adaptation:
- use a prerequisite/competency graph as the authoritative system and expose simplified route views for learners.

### R-008 — GitHub Codespaces
Source: https://docs.github.com/en/codespaces/
Evidence: GitHub supports browser-based development environments and reproducible repository-specific development environments.
Learn from it:
- browser-based development ergonomics;
- explicit environment boundaries;
- repository-aware developer tooling.
Do not copy:
- product UI or proprietary implementation.
MasteryOS adaptation:
- use the same principle of a bounded, reproducible coding workspace for learning tasks, while keeping learner code execution isolated from application secrets.

## Synthesis: what MasteryOS should combine

1. **Brilliant:** visual, interactive conceptual learning and adaptive tutoring.
2. **Codecademy:** immediate in-browser coding and contextual feedback.
3. **Exercism:** concept maps, practice exercises, tests, and mentoring structure.
4. **Mimo:** low-friction interaction and mobile usability.
5. **DataCamp:** track/course/assessment/progress organization.
6. **Khan Academy:** breadth and discoverability.
7. **roadmap.sh:** route visualization and next-step clarity.
8. **Codespaces:** serious browser-based technical workspace principles.

The synthesis is intentionally not a visual clone of any one product. MasteryOS's distinguishing layer is the combination of Universal Core → Programs, evidence-based mastery gates, in-app technical learning, system-wide contextual AI, local-first state, and advanced/frontier depth.

## Design principles derived from research

- The learner should always know **where they are**, **why they are there**, **what evidence is required**, and **what unlocks next**.
- Interactive work should be the default for high-value concepts rather than passive text-only screens.
- AI should appear in context of the current learning object, not dominate the interface.
- Code, math, diagrams, assessments, and project work should share a coherent workspace language.
- Progress should represent demonstrated capability, not merely activity.
- Mobile is a supported learning surface, but advanced technical workflows must remain usable on desktop/laptop.
- Dense technical information should be structured with progressive disclosure instead of being hidden behind dozens of cards.

## Proposed MasteryOS visual direction

**Technical Learning Laboratory**

A calm, high-information interface influenced by the clarity of developer tools and academic workspaces, with visual/interactive learning inspired by Brilliant but without copying its aesthetic. The UI should prioritize:

- strong typography;
- readable long-form content;
- precise diagrams;
- persistent but quiet mastery state;
- split-pane technical work where useful;
- restrained semantic color;
- contextual AI controls;
- minimal decorative chrome.

## Design-selection status

Approved as the working design thesis: **Technical Learning Laboratory**.
This is a product direction, not a final pixel design. Exact tokens, components, and layouts remain implementation decisions governed by `DESIGN-SYSTEM.md` and `DESIGN-VARIANTS.md`.

## Rights notes

These sources are research and inspiration references. Do not copy protected visual identity, copyrighted lesson content, proprietary assets, or source code without permission. Any shipped external asset must be separately recorded in `ASSET-REGISTER.md`.