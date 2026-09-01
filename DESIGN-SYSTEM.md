# MasteryOS Design System

This is the source of truth for the product UI once a direction is selected. It should evolve through explicit decisions rather than ad-hoc component styling.

## Design thesis

MasteryOS should feel like a personal academic and technical laboratory: rigorous enough for advanced mathematics, efficient enough for engineering work, and calm enough for long study sessions.

## Visual language

- Serious over playful.
- Information-rich over decorative.
- Precise over ornamental.
- Human-readable over maximal density.
- Distinctive without looking like a generic AI/SaaS dashboard.
- Progressive disclosure for difficult content.

## Typography

Use a highly legible interface font paired with a technical monospace for code and a mathematics-compatible display system for equations.

Roles:

- Display: mission/major section title.
- Heading: topic and screen hierarchy.
- Body: explanations and resource text.
- UI/meta: controls, labels, mastery metadata.
- Code: editor/code blocks.
- Math: KaTeX-compatible mathematical rendering.

Final font choices remain open until the design direction and performance are verified.

## Color roles

Define semantic tokens rather than hard-coded colors:

- background;
- surface;
- elevated surface;
- text;
- muted text;
- border;
- action;
- focus;
- success/mastered;
- warning/needs review;
- error;
- informational/AI.

Avoid making gradients, accent colors, or decorative effects carry semantic meaning.

## Spacing and sizing

Use a consistent spacing scale and predictable content widths. Reading-heavy screens should use a comfortable maximum line length. Dense technical screens may widen when tables, code, or graphs justify it.

## Radius and borders

Use restrained radii. Borders should establish grouping and hierarchy without turning every element into a floating card.

## Elevation and shadows

Prefer structural contrast over heavy shadows. Elevation is reserved for transient overlays, menus, dialogs, and important focus layers.

## Component vocabulary

Core patterns:

- application shell;
- mission panel;
- curriculum/prerequisite node;
- resource card;
- lesson reader;
- equation block;
- code block/editor;
- practice problem;
- hint ladder;
- mastery meter;
- mistake record;
- AI tutor popover;
- command palette;
- filter/search controls;
- status banner;
- modal/drawer;
- responsive navigation.

## Interaction states

Every meaningful interactive component defines:

- default;
- hover;
- focus-visible;
- active;
- selected;
- disabled;
- loading;
- error;
- empty;
- offline/limited-capability where relevant.

## Motion

Motion must clarify state or relationships. Avoid continuous decorative animation. Respect `prefers-reduced-motion`.

## Imagery and iconography

Use diagrams, graphs, mathematical visuals, and project-owned illustrations where they improve comprehension. Icons are semantic and consistent. Avoid decorative stock imagery unless it materially improves learning.

## Responsive rules

The product must support:

- desktop/laptop study;
- narrow mobile reading;
- touch interactions;
- keyboard navigation on desktop.

Dense graphs, tables, editors, and side-by-side AI panels require explicit mobile behavior rather than accidental overflow.

## Accessibility rules

- semantic HTML where possible;
- visible focus states;
- keyboard access to core flows;
- adequate contrast;
- labels and descriptions for non-obvious controls;
- no color-only status communication;
- reduced motion support;
- equations and code remain understandable when layout changes.

## Intentional exceptions

Every exception must explain why it exists in the component or decision record. Do not accumulate unexplained one-off styles.