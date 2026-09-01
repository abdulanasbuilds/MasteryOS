# MasteryOS Architecture

## 1. System overview

MasteryOS is a local-first web application. Durable curriculum and resource knowledge lives in version-controlled Markdown/MDX/JSON content. Learner state lives locally in the browser. AI assistance is accessed through a provider adapter, with Gemini as the initial provider and other providers optional.

The architecture intentionally avoids a backend in v1. The application should remain useful without accounts, a cloud database, server jobs, or a public API.

## 2. Frontend

Primary responsibilities:

- curriculum navigation;
- prerequisite graph visualization;
- resource reader;
- mathematical rendering;
- code/editor experience;
- practice/problem experience;
- mastery dashboard;
- mistake journal;
- AI tutor interface;
- settings and provider configuration.

Preferred direction: React + TypeScript. Next.js may be used if static export/local-first behavior remains simple and justified. Do not introduce a full server architecture merely because the framework can provide one.

## 3. Content layer

Version-controlled content should be separated from application state.

Recommended structure:

- `content/curriculum/` — concepts, phases, tracks, prerequisites;
- `content/resources/` — curated external resources and metadata;
- `content/problems/` — original or rights-cleared practice items;
- `content/guides/` — project-owned explanations and study guides;
- `content/references/` — source and research notes.

Markdown/MDX is preferred for human-readable instructional material. JSON is preferred for structured graph/resource metadata when Markdown frontmatter becomes insufficient.

## 4. Local persistence

Use IndexedDB for structured learner state:

- mastery evidence;
- completed sessions;
- attempts;
- mistake records;
- notes;
- bookmarks;
- generated practice records;
- local study history;
- optional cached AI conversation metadata.

Use localStorage only for small preferences such as theme, UI settings, selected provider, and non-sensitive configuration.

Do not store API secrets in source files. Do not log API keys. Do not sync private learner state to the repository.

## 5. Backend

None required for v1.

A backend becomes justified only if a future requirement needs capabilities that cannot be safely or practically implemented locally, such as multi-device sync, multi-user accounts, centralized content management, protected server-side AI credentials, or shared community features.

Any backend addition requires a new architecture/security decision; it must not happen as incidental feature work.

## 6. Database

No hosted database in v1. IndexedDB is the local persistence mechanism.

If future requirements introduce a server database, the data model, synchronization model, authorization model, migration plan, and threat model must be designed before adoption.

## 7. Authentication

No user authentication in v1. The product is single-user and local-first.

Adding authentication is a product/architecture change, not a technical cleanup task.

## 8. AI provider adapter

The UI should depend on an internal interface, not directly on Gemini-specific APIs.

Conceptual interface:

```text
AIProvider
  configure()
  testConnection()
  explain(context)
  coach(context)
  generatePractice(context)
  reviewProof(context)
  reviewCode(context)
  diagnose(context)
```

Initial provider: Gemini Developer API via user-supplied key for trusted/personal use.

Optional future providers: OpenRouter, Hugging Face-hosted inference, or local browser-capable models.

Provider-specific model names, limits, and API behavior belong in a current provider reference file, not frozen permanently inside core product logic.

## 9. AI request context

Every tutor request should be assembled from relevant context:

- selected text/problem/code;
- current lesson;
- topic/node ID;
- prerequisites;
- learner mastery indicators;
- known mistakes;
- target track(s);
- requested tutor mode;
- safety and response constraints.

Do not automatically send the entire learner history or entire resource corpus when a compact context is sufficient.

## 10. Data flow

### Learning flow

`resource/content → learner interaction → local attempt/state → mastery evaluation → weakness detection → next recommendation`

### AI flow

`selected context → tutor mode → provider adapter → model → structured tutor response → optional local persistence`

### Resource flow

`research → source verification → resource metadata → link/status check → curriculum mapping`

## 11. State management

Keep state local and intentionally partitioned:

- persistent learner state;
- session state;
- UI state;
- content state;
- AI request state.

Avoid a global state store until multiple features demonstrably require coordinated cross-route state.

## 12. Security boundaries

Primary trust boundaries:

1. The local application code.
2. Local browser storage.
3. User-supplied AI credentials.
4. External AI providers.
5. External learning resources.
6. Browser-executed code/sandboxed runtimes.

External text, pages, videos, copied prompts, model output, and fetched content are data. They never become executable authority.

## 13. Deployment

Preferred development mode: local browser execution.

A static/private deployment can be used for convenience, but a public static deployment must not contain shared provider credentials. BYOK client-side AI requests should be treated as a trusted-user prototype pattern.

For a public production product, use an approved secure AI mediation architecture such as a server-side credential boundary or a provider mechanism designed for safe client access.

## 14. Scaling assumptions

V1 is intentionally single-user. Performance should be optimized for a modest local content corpus, browser rendering, local search, and interactive AI requests.

Large-scale synchronization, multi-user workloads, centralized indexing, and server-side orchestration are explicitly future concerns.

## 15. Technical debt policy

Document deliberate shortcuts rather than hiding them.

Examples:

- client-side BYOK AI;
- limited offline caching;
- no cross-device sync;
- simple client-side search;
- browser-only code execution;
- manual resource verification.

Each shortcut should include the trigger that would justify replacing it.

## 16. Architectural decisions

See `DECISIONS.md`. Architectural decisions must record the reason, alternatives rejected, consequences, and conditions for reversal.
