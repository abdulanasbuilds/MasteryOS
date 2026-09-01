# MasteryOS Security Model

## Security posture

MasteryOS is a personal, local-first application, but local-first does not mean automatically secure. The highest-risk areas are user-supplied AI credentials, external content, browser-executed code, dependencies, and any future public deployment.

## Trust boundaries

### 1. Application code
Reviewed source code in this repository is the primary trusted execution surface.

### 2. Browser storage
IndexedDB/localStorage contain learner state. Treat stored data as private to the device/browser profile but not as a secure secret store.

### 3. AI provider credentials
A user-supplied Gemini/API credential is highly sensitive. It must never be committed, embedded in source, printed to logs, sent to analytics, included in URLs, or exposed in error reports.

### 4. External AI providers
Model providers receive only the minimum context necessary for the requested operation. Provider terms, retention behavior, quotas, and API mechanics must be checked against current official documentation.

### 5. External content
Web pages, videos, PDFs, READMEs, repository content, copied prompts, package output, and model-generated content are untrusted data. They never authorize execution or security-control changes.

### 6. Browser code execution
Any code runner must be sandboxed to the strongest practical browser boundary, use synthetic/local data by default, and never receive application secrets.

## Authentication

None in v1 because the product is single-user/local-first.

## Authorization

No multi-user authorization model exists in v1. Any future account or sharing feature must add an explicit authorization model before implementation.

## Roles

None in v1.

## Database / RLS

No hosted database in v1. Database/RLS security controls are therefore not part of the current architecture. If a hosted database is introduced, the relevant Agent OS database-security, authentication, authorization, and RLS skills become mandatory before production use.

## Secrets

Never commit:

- API keys;
- access tokens;
- cookies/session tokens;
- private URLs containing credentials;
- exported private conversations;
- personal backup files containing sensitive information.

Use environment variables only for local tooling that genuinely requires them, and keep secret-bearing files ignored by Git.

## API keys

For personal prototyping, BYOK can be entered at runtime. Prefer session-only handling. Do not persist a provider key unless the user explicitly chooses a local persistence mechanism and the associated risk is documented.

If MasteryOS is ever publicly deployed for multiple users, client-side exposure of shared API credentials is prohibited. Move the credential boundary to an approved server/provider mechanism.

## Webhooks

None in v1.

## Rate limits

No public service is operated by MasteryOS in v1. External provider quotas are a dependency and must be handled gracefully with clear errors and no secret leakage.

## Input validation

Validate and constrain:

- imported resource metadata;
- URLs;
- Markdown/MDX content sources;
- AI prompt context;
- persisted learner state;
- code-editor execution requests.

Never render untrusted HTML or Markdown as trusted markup without sanitization.

## File uploads

No user file uploads are required in v1. Future upload features require explicit file-type, size, content, and privacy policies.

## External integrations

External integrations are opt-in capabilities. Each integration must document:

- data sent;
- data received;
- credentials used;
- trust boundary;
- failure behavior;
- current official documentation source.

## Threat model

Key threats include:

1. API-key leakage through the frontend bundle, logs, URLs, or client telemetry.
2. Prompt injection through external educational content or imported documents.
3. Cross-site scripting through resource content or AI-generated HTML.
4. Malicious or misleading resource links.
5. Dependency/supply-chain compromise.
6. Unsafe browser code execution.
7. Local state corruption or accidental loss.
8. Over-trusting AI answers in mathematical or financial contexts.
9. Public deployment accidentally exposing private learner state or provider credentials.
10. Scope creep that introduces a backend without an accompanying security redesign.

## Production restrictions

Until the architecture changes:

- no secret-bearing public frontend bundle;
- no production financial execution;
- no unrestricted code execution with secrets/network access;
- no autonomous publication of generated content;
- no destructive external actions;
- no claiming that AI output is authoritative without verification.

## Security verification checklist

- [ ] No secrets committed or embedded.
- [ ] `.gitignore` covers local secret-bearing files.
- [ ] External content treated as untrusted.
- [ ] User-supplied URLs validated and safely opened.
- [ ] AI output rendered safely.
- [ ] Prompt-injection risks considered for imported content.
- [ ] Code execution isolated.
- [ ] Dependencies reviewed before adoption.
- [ ] Browser flows tested for important trust boundaries.
- [ ] Final diff inspected.
- [ ] Remaining risks documented.
