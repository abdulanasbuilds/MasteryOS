# MasteryOS Design Brief

## 1. Product

- Product: Local-first technology mastery environment.
- Primary outcome: Help a learner build real capability across technology disciplines from foundations through advanced and frontier levels.
- Primary interaction: Move from the next learning objective to understanding, practice, assessment, application, and evidence of mastery.
- Primary CTA: Continue today's mission / next highest-value learning action.
- Core promise: One coherent environment for learning, practicing, proving, building, and tracking technology mastery.

## 2. Audience and context

- Initial user: One learner using the system for intensive self-directed study.
- Long-term audience: Technology learners with different starting points and different program goals.
- Category: Personal learning / education technology / technical training environment.
- Delivery: Local application and browser-capable experience first; optional connected services later.
- Devices: Desktop/laptop should support intensive work; mobile remains a supported reading and lightweight practice device.
- Trust expectations: Rigorous, honest about uncertainty, source-aware, transparent about AI, respectful of learner privacy.

## 3. Product experience principles

- The learner should feel they are operating a **personal laboratory for becoming highly capable**, not browsing a course catalog.
- The interface should make the next useful action obvious without hiding the larger curriculum.
- The system should distinguish exposure, practice, assessment, mastery, weakness, and review.
- Assessment should feel meaningful rather than punitive.
- AI should appear contextually where useful without dominating the interface.
- Dense technical information is acceptable when hierarchy and progressive disclosure keep it legible.
- The product should work even when external resources or AI services are unavailable.

## 4. Core surfaces

- **Today / Mission** — what matters now and why.
- **Universal Core** — shared foundations and progress.
- **Programs / Routes** — specialization selection and route planning.
- **Curriculum Graph** — prerequisites, dependencies, and transfer relationships.
- **Lesson / Reader** — textbook-like interactive teaching environment.
- **Practice / Assessment** — active performance and evidence collection.
- **Workbench / Lab** — code, algorithms, systems, diagrams, and technical experiments.
- **Projects** — applied work and evaluation.
- **Mistakes / Review** — weaknesses, misconceptions, and repair loops.
- **Progress / Mastery** — trustworthy evidence of capability.
- **AI Context Panel** — contextual assistance rather than a separate destination only.
- **Resources** — provenance-aware references, alternatives, and permitted embeds.
- **Settings / Data** — local storage, export/import, accessibility, and integrations.

## 5. Brand personality

Rigorous, focused, curious, demanding, calm, technical, and optimistic about learning.

Desired emotional response:

> “This feels like my laboratory for getting extremely good at hard things.”

Avoid generic AI/SaaS visual tropes, excessive neon, noisy gradients, and dashboard-card overload.

## 6. Visual direction

Design thesis: combine the clarity of a strong academic text, the precision of an IDE, the spatial reasoning of a whiteboard, and the feedback quality of a serious training environment.

Use:

- clear information hierarchy;
- purposeful density;
- strong reading width;
- restrained surfaces;
- semantic status indicators;
- technically legible typography;
- diagrams/graphs as learning tools, not decoration;
- progressive disclosure for advanced material.

## 7. Interaction model

Important interactions include:

- graph exploration;
- lesson progression;
- inline questions;
- equation interaction;
- whiteboard/workbench actions;
- code editing/execution;
- assessment submission;
- hint/AI assistance ladder;
- mastery feedback;
- mistake review;
- project evaluation;
- focus/productivity sessions.

AI activation must support highlight-to-ask and context-aware actions on text, equations, diagrams, and code.

## 8. Components

Required primitives and patterns include:

- application shell;
- responsive navigation;
- command palette;
- curriculum/prerequisite node;
- route/phase navigator;
- lesson reader;
- equation/derivation block;
- diagram/graph block;
- interactive table;
- code editor;
- whiteboard/workbench;
- practice problem;
- assessment interface;
- hint ladder;
- AI contextual popover/panel;
- mastery/evidence display;
- mistake record;
- project workspace;
- resource/provenance card;
- local data controls.

Avoid decorative KPI widgets and gamification elements that do not help the learner understand or act.

## 9. Accessibility and performance

Aim for WCAG 2.2 AA practices for the browser UI.

Core flows must support keyboard navigation on desktop, usable touch interaction on mobile, visible focus, adequate contrast, reduced motion, meaningful labels, and non-color-only status communication.

Keep the initial application lightweight and lazy-load expensive runtimes, visualizations, and large content where practical.

## 10. Open decisions before implementation

- Final visual direction variant.
- Final typography stack.
- Exact frontend framework/build architecture.
- Initial coding runtime/sandbox.
- Exact AI interaction placement and provider implementation.
- First vertical-slice competency.

These decisions must be made through the relevant Agent OS design/research/architecture workflows, not by assumption.
