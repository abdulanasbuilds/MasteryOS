# MasteryOS Embedded Learning Specification

## Product rule

The learner should be able to complete the intended learning workflow inside MasteryOS without being forced to leave the application for another learning platform.

## What "built-in" means

Built-in does not mean that MasteryOS illegally copies or republishes third-party courses, books, videos, question banks, or proprietary platforms.

MasteryOS uses a layered content model:

### 1. Native original content

MasteryOS may contain original explanations, examples, diagrams, exercises, quizzes, projects, summaries, and instructional sequences created for the system.

### 2. Licensed/permissioned content

Content may be embedded or stored when the project has verified rights, an appropriate license, or explicit permission.

### 3. Provider-approved embeds/APIs

When a provider allows an embedded player, API, or similar mechanism, MasteryOS may present the allowed experience inside its learning interface while respecting provider terms.

### 4. Reference-only external sources

If content cannot legally or technically be brought inside, MasteryOS may link to it as a supporting reference, but it must not pretend that the external resource has been integrated.

## Reader experience

The goal is not a bookmark launcher.

A learning node should behave like an interactive textbook/workbench:

`lesson → explanation → diagram → example → interaction → question → response → feedback → practice → assessment`

Long-form material should be rendered as a first-class learning experience with:

- structured sections;
- inline definitions;
- diagrams and interactive visualizations where valuable;
- code examples;
- expandable derivations/details;
- checkpoints;
- questions embedded within the lesson;
- notes/highlights;
- AI context actions;
- progress state;
- mastery requirements.

## Textbook mode

A topic can provide a reading mode with:

- chapter navigation;
- table of contents;
- reading progress;
- glossary;
- references;
- code blocks;
- equations/graphs;
- diagrams;
- inline exercises;
- highlight-to-AI actions.

## Whiteboard/workbench mode

Technical topics should have a more interactive mode when appropriate. Examples:

- algorithms shown step-by-step;
- data structures visualized;
- system architecture diagrams manipulated conceptually;
- network flows simulated;
- mathematical graphs explored;
- state machines stepped through;
- code executed in a sandbox where the runtime is safely available;
- SQL/data exercises run against isolated synthetic data;
- debugging scenarios presented as controlled tasks.

## Resource provenance

Every imported, embedded, or referenced resource must have provenance metadata and a reuse status. See `ASSET-REGISTER.md` and `docs/RESOURCE-GOVERNANCE.md`.

## Offline/local behavior

Where practical, core original learning content should be packaged with the application or cached locally so that the learner's core path is not dependent on visiting many external sites.

External services may still be required for current AI model calls, remote videos, current documentation, or licensed resources.

## Content update model

Fast-changing external material must carry an "externally maintained" label and a verification date. Do not silently freeze volatile API behavior into permanent lessons without noting the version.

## Prohibited shortcut

Do not solve the built-in learning requirement by scraping and republishing arbitrary third-party educational catalogs. The product goal is integrated learning, not unauthorized content aggregation.
