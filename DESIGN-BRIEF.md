# MasteryOS Design Brief

## 1. Product

- Product/service: Personal mastery learning operating system.
- Primary outcome: Make the learner substantially stronger in mathematics, quantitative reasoning, computer science, and software engineering.
- Primary user outcome: Always know what to learn, why it matters, how deeply to learn it, how to practice it, and what weakness to repair next.
- Primary CTA: Continue today's mission / practice the next highest-value task.

## 2. Audience and context

- Primary audience: One learner using the system for intensive self-study.
- Buyer/user distinction: Not applicable; owner is the user.
- Industry/category: Education technology / personal learning tool.
- Primary market/country: Ghana-origin learner with global academic/professional targets.
- Primary devices: Desktop/laptop first for serious study; mobile must remain usable because learning may happen on smaller devices.
- Trust expectations: Serious, intellectually honest, source-aware, non-gimmicky, transparent about AI uncertainty.

## 3. Brand

- Existing brand assets: None required at initialization.
- Personality: Rigorous, focused, curious, demanding, calm, technical.
- Desired emotional response: "This is my laboratory for getting extremely good at hard things."
- Colors to keep/avoid: Avoid generic AI purple gradients and excessive neon. Choose a restrained academic/technical palette after reference analysis.
- Fonts to keep/avoid: Prioritize highly legible UI and mathematics/code typography.
- Competitor/category conventions: Learn from learning platforms and developer tools without copying their visual identity.

## 4. Content

- Above-the-fold message: The next best action toward mastery, not a marketing slogan.
- Key sections: Today/Mission, curriculum graph, current topic, practice, mistakes, mastery, resources, AI tutor.
- Critical content: Prerequisites, learning objectives, evidence of mastery, weak areas, recommended resources, next actions.
- Long-form/dense content: Mathematics and technical explanations must remain readable with clear hierarchy, notation, examples, and expandable depth.

## 5. Assets

- Owned photography: None required.
- Illustrations: Prefer generated/owned diagrams for conceptual explanations.
- Logos/marks: Project-owned only.
- Product screenshots: None at initialization.
- Video: External links/embeds may be used where rights and platform constraints allow.
- External assets allowed: Only with provenance and appropriate reuse class.
- Licensing constraints: Do not ship third-party copyrighted assets without verified rights.

## 6. Visual direction

- Design thesis: A serious personal mathematical/computational laboratory with the precision of an IDE and the guidance of a high-quality academic workspace.
- Composition: Clear information hierarchy; dense where useful, never cluttered.
- Density: Higher information density than a consumer learning app, balanced with strong whitespace and progressive disclosure.
- Surface/material behavior: Mostly restrained surfaces; avoid dashboard-card soup.
- Typography: Strong hierarchy, excellent code and mathematical readability.
- Color strategy: Functional color roles, not decorative gradients.
- Iconography: Consistent, restrained, semantic icons.

## 7. Components

- Existing design system: None.
- Required primitives: Navigation, tabs, command palette, progress indicators, graph nodes, reader, equation blocks, code blocks/editor, problem cards, hint/solution controls, AI popover, modal/drawer, data tables.
- Reusable patterns: Learning node, resource card, mastery evidence, mistake record, tutor action menu, prerequisite warning.
- Components to avoid: Generic KPI dashboard blocks that do not help learning; ornamental badges with no semantic value.

## 8. Motion

- Purposeful motion: Use motion to explain transitions, state changes, graph relationships, or feedback.
- Transition language: Fast, controlled, subtle.
- Scroll/gesture behavior: Preserve reading stability; no distracting scroll hijacking.
- Reduced-motion behavior: Provide reduced-motion-safe alternatives.

## 9. Accessibility and performance

- Required WCAG target if applicable: Aim for WCAG 2.2 AA practices for the web UI.
- Keyboard/focus requirements: All core learning and AI actions must be keyboard reachable on desktop.
- Motion sensitivity requirements: Respect reduced-motion preferences.
- Performance budget: Keep the initial app shell lightweight; load large visualizations/code runtimes on demand.

## 10. Open decisions

- Final visual direction variant.
- Final typography stack.
- Whether Next.js adds enough value over a simpler Vite/React static app.
- Initial code-execution runtime.
- Exact AI interaction placement across reader/editor/problem views.
