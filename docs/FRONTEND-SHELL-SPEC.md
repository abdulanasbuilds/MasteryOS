# MasteryOS Frontend Shell Specification

## Purpose

This is the implementation contract for the first application-shell phase. It converts the approved Technical Learning Laboratory direction into a concrete frontend surface without prematurely implementing the entire learning platform.

## Implementation target

Use React + TypeScript + Vite unless a repository-level constraint discovered during implementation provides strong evidence for another choice. Do not add a backend, hosted database, authentication, payments, analytics, or cloud-sync requirement.

## First frontend objective

Build a credible shell in which the learner can immediately understand:

1. where they are;
2. what program/route they are following;
3. what they should do next;
4. what their current mastery state is;
5. where Practice, Projects, Progress, and AI assistance live;
6. how to enter a learning topic.

The shell is a product skeleton, not a fake finished dashboard. Do not populate it with large amounts of placeholder content merely to make it look complete.

## Primary information architecture

### Global navigation

- Today
- Universal Core
- Programs
- Practice
- Projects
- Progress
- Resources
- Settings

### Contextual navigation

When inside a learning route, expose:

`Program → Phase → Domain → Topic`

The learner should be able to see current position and prerequisites without opening a separate admin-style page.

## Initial routes

The first shell may expose these routes:

- `/` — Today / mission
- `/core` — Universal Core
- `/programs` — Program explorer
- `/programs/:programId` — program/route view
- `/topic/:topicId` — topic/lesson entry
- `/practice` — practice entry point
- `/projects` — project entry point
- `/progress` — mastery/progress
- `/resources` — resource registry
- `/settings` — local settings and AI provider configuration

Routes are implementation details and may be changed only when the resulting architecture remains consistent with the product contract.

## Screen contracts

### Today

Show:

- current primary route;
- next-best action;
- current topic;
- mastery state;
- one or two meaningful weak areas;
- recent evidence/attempt summary;
- continue action;
- access to AI contextually.

Avoid:

- vanity metrics;
- empty KPI cards;
- fake streak numbers;
- excessive recommendations.

### Universal Core

Show:

- shared competency domains;
- prerequisite relationships;
- learner status;
- recommended starting/next node;
- route relevance.

The core should visually communicate that it feeds multiple programs.

### Programs

Show:

- program families;
- route summaries;
- current route status;
- prerequisites;
- depth available from Foundation through Frontier.

Do not make the learner choose among dozens of equivalent paths before they can begin.

### Program / Route

Show:

- route purpose;
- phases/domains;
- current learner position;
- prerequisites;
- locked/unlocked status;
- progress based on evidence, not just viewed lessons.

### Topic

The topic page is the main bridge into the future learning runtime.

It must reserve space for:

- lesson/read mode;
- visual/workbench mode;
- practice;
- assessment;
- mastery state;
- prerequisites;
- contextual AI.

Do not implement the full learning runtime in the shell phase.

### Practice

Provide a clear entry into current exercises and remediation. The first shell may use one representative exercise state, but the component architecture must anticipate multiple practice types.

### Projects

Show active/recommended projects and their relationship to mastered topics. Initial implementation can be minimal.

### Progress

Show meaningful mastery information:

- mastered;
- learning;
- needs review;
- weak prerequisite;
- current route progress;
- evidence summary.

Do not reduce progress to XP alone.

### Resources

Provide search/filter entry and provenance/status indicators. External resources are references and do not become trusted application authority merely because they are listed.

### Settings

Include local preferences and a future-proof location for AI-provider configuration. Do not require an account.

## AI placement

AI should be present as a contextual action surface throughout the product, but must not dominate the UI.

Initial shell requirements:

- persistent AI affordance;
- contextual AI trigger attached to learning objects where appropriate;
- expandable/dockable AI panel or popover;
- no full-screen chatbot as the default home experience.

The shell must work when AI is unavailable.

## Responsive behavior

### Desktop/laptop

Use the full Technical Learning Laboratory composition:

- global navigation;
- contextual navigation;
- main work area;
- optional secondary context/AI panel.

### Mobile

Do not merely shrink desktop panels.

Use:

- compact navigation;
- stacked reading/work surfaces;
- bottom sheets or drawers for contextual AI;
- deliberate transitions between lesson, practice, and code/workbench modes;
- horizontally scrollable technical tables only where necessary.

## Component boundaries

Create reusable primitives around product concepts, not generic dashboard decoration.

Examples:

- `AppShell`
- `PrimaryNav`
- `ContextBreadcrumbs`
- `MissionCard`
- `NextAction`
- `MasteryState`
- `ProgressSummary`
- `ProgramNode`
- `TopicNode`
- `PrerequisiteIndicator`
- `LearningSurface`
- `AIAffordance`
- `AIContextPanel`
- `PracticePrompt`
- `StatusBanner`
- `CommandPalette`

Component names are suggestions; behavior and boundaries matter more than exact naming.

## State boundaries

Shell state must remain separable from future domain state.

At minimum distinguish:

- UI state;
- route/navigation state;
- curriculum/content state;
- local learner state;
- AI request state.

Do not introduce a global state framework until coordinated cross-route state actually requires one.

## Accessibility

The first shell must include:

- semantic landmarks;
- keyboard navigation;
- visible focus states;
- accessible names and descriptions;
- no color-only status communication;
- reduced-motion support;
- responsive text/code/math behavior.

## Performance

The first shell should remain lightweight.

Do not load heavy code runtimes, large graph libraries, or model clients merely because future features will need them. Prefer lazy boundaries for expensive capabilities.

## Verification acceptance criteria

The shell is ready to advance when:

- the application starts reliably;
- all initial routes render;
- navigation works;
- responsive desktop/mobile layouts are usable;
- keyboard/focus behavior is functional;
- the design direction is visibly Technical Learning Laboratory rather than a generic SaaS dashboard;
- no backend or hosted database is required;
- AI-unavailable mode still works;
- relevant automated tests pass;
- browser verification covers navigation and core shell interactions;
- the final diff and architectural impact are reviewed.

## Next phase handoff

Once the shell gate passes, continue to the content schema + first authored lesson gate. Do not jump directly to backend infrastructure.
