# MasteryOS Design Variants

## Brief

Reference: `DESIGN-REFERENCES.md`
Goal: make long, serious study sessions easier while making the learner's next action, evidence, and weaknesses obvious.
Viewport/device targets: desktop/laptop first, mobile fully usable
Constraints: local-first, information-rich, mathematical notation, code, graphs, AI overlays, accessible, performant

## Variant A — Academic Laboratory

Direction: A modern digital mathematics/computing laboratory with editorial typography, structured reading surfaces, diagrams, graphs, and quiet navigation.

Why it fits: Strong support for deep reading and rigorous study without feeling like a gamified app.

Key differences: Reader-first composition, restrained dashboard elements, strong typography.

Reference IDs: R-003, R-004, R-005, R-008

Implementation notes: Best for dense mathematics and long-form technical content.

Status: rejected as the sole direction; useful visual influence retained.

## Variant B — Mission Control

Direction: A focused personal operations dashboard centered on today's mission, current mastery, weak areas, and next-best actions.

Why it fits: Makes progression highly visible and gives the learner immediate direction.

Key differences: Stronger progress visualization and operational framing.

Reference IDs: R-001, R-002, R-005

Implementation notes: Must avoid generic SaaS KPI-card aesthetics.

Status: rejected as the sole direction; mission/progress patterns retained.

## Variant C — Technical Knowledge IDE

Direction: A split-pane workspace inspired by modern developer tools: curriculum context, central learning/work area, contextual AI.

Why it fits: MasteryOS combines technical reading, code, mathematics, assessment, projects, and AI in one environment.

Key differences: Contextual side panels, command palette, keyboard-friendly interaction, high information density.

Reference IDs: R-002, R-003, R-008

Implementation notes: Requires carefully designed responsive modes so mobile does not become a shrunken desktop IDE.

Status: retained as a major interaction pattern.

## Selected direction — Technical Learning Laboratory

MasteryOS combines the strongest characteristics of A, B, and C into one distinct product direction.

### Core thesis

A serious personal technical-learning laboratory: academic enough for rigorous mathematics and theory, tool-like enough for software engineering and coding, and interactive enough for active concept learning.

### Design composition

- Primary shell: calm technical workspace.
- Primary navigation: Universal Core, Programs, Today, Practice, Projects, Progress, Resources, Settings.
- Contextual navigation: current program/route/topic/prerequisites.
- Main surface: lesson, problem, editor, workbench, or assessment depending on the current learning object.
- Secondary surface: contextual AI and evidence/progress information that can collapse or dock.
- Persistent status: mastery state and next recommended action should be visible without overwhelming the learner.
- Command/search surface: fast navigation and topic lookup.

### What this direction deliberately avoids

- generic SaaS KPI dashboards;
- oversized AI-chat panels dominating the application;
- decorative gamification as the main visual language;
- excessive card grids;
- copied visual identity from any reference product;
- mobile layouts that simply squeeze desktop panels together.

### Research-informed patterns retained

- Brilliant: visual interactive concept learning and adaptive guidance.
- Codecademy: contextual in-browser code work and AI feedback.
- Exercism: concept-map structure and test-backed practice.
- Mimo: low-friction/mobile-friendly learning interactions.
- DataCamp: clear track/assessment/progress organization.
- Khan Academy: breadth and discoverability.
- roadmap.sh: route/roadmap orientation.
- GitHub Codespaces: serious browser workspace principles.

## Evaluation outcome

Selected: **Technical Learning Laboratory**

Reason: It best fits the actual MasteryOS product boundary because no single reference product covers the combination of deep technical learning, interactive work, mastery evidence, contextual AI, and local-first operation.

Decision recorded in: `DECISIONS.md`

Implementation authority: `DESIGN-BRIEF.md`, `DESIGN-SYSTEM.md`, `docs/FRONTEND-SHELL-SPEC.md`.
