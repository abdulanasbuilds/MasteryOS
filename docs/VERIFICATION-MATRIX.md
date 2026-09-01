# MasteryOS Verification Matrix

## Purpose

MasteryOS is a learning system, so verification must cover both software correctness and educational correctness. A feature can work technically while teaching the wrong thing.

## 1. Curriculum correctness

| Area | Verification |
|---|---|
| Topic metadata | Required fields present and internally consistent |
| Prerequisites | No unjustified dependencies or cycles |
| Advancement | Mastery rules match the intended evidence |
| Difficulty | Problems/resources are appropriate for the assigned level |
| Cross-track links | Quant/CS connections are meaningful rather than decorative |
| Resource mapping | Recommended resource actually covers the concept |

## 2. Mathematical correctness

For project-owned mathematical explanations/problems:

- verify formulas and derivations independently;
- test numerical examples;
- check edge cases and domain restrictions;
- check notation consistency;
- look for hidden assumptions;
- use authoritative references for disputed facts.

A passing UI test is not evidence of mathematical correctness.

## 3. AI tutor correctness

Test:

- simple explanations;
- rigorous explanations;
- derivations;
- example generation;
- hints;
- full-solution escalation;
- proof review;
- code review;
- prerequisite diagnosis;
- quant/CS connections;
- malformed/provider-error responses.

For each, evaluate correctness, level appropriateness, and whether the tutor creates unnecessary dependency.

## 4. AI security

Verify:

- API keys never appear in repository source;
- keys never appear in logs/errors;
- keys are not included in URLs;
- model output is safely rendered;
- external prompt injection does not override application policy;
- untrusted resources cannot trigger tool execution;
- public builds cannot contain shared credentials.

## 5. Local-first behavior

Verify:

- learner progress survives reload;
- learner state remains available after a normal browser restart where intended;
- no server is required for core curriculum browsing;
- corrupted state fails safely;
- reset/export/import behavior is deterministic once implemented.

## 6. Resource integrity

Verify:

- links resolve;
- external domains are expected;
- source metadata matches the destination;
- verification date is recorded;
- retired/broken resources stop being primary recommendations.

## 7. Browser/UI testing

For every meaningful feature:

1. Load the real application.
2. Exercise the important user flow.
3. Test responsive behavior.
4. Inspect console/network failures relevant to the feature.
5. Test keyboard and focus behavior where applicable.
6. Test empty/loading/error states.
7. Re-run after fixes.

## 8. Accessibility

Verify:

- keyboard reachability;
- visible focus;
- meaningful labels;
- no color-only meaning;
- readable typography;
- acceptable contrast;
- reduced-motion behavior;
- usable math/code regions.

## 9. Performance

Measure where relevant:

- initial load;
- content navigation;
- graph rendering;
- AI interaction responsiveness;
- code-editor startup;
- code runtime initialization;
- large resource pages.

Large client runtimes should be lazy-loaded.

## 10. Dependency/security review

Before adding a dependency:

- establish why the capability is necessary;
- check maintenance/health;
- review license;
- review permission/network behavior;
- prefer simpler standard/browser APIs when sufficient.

## 11. Release gate

A release candidate is not complete until:

- required tests pass;
- browser verification passes for important flows;
- curriculum/resource correctness has been sampled;
- security checks pass;
- accessibility review is complete for the changed surface;
- final diff has been inspected;
- known limitations are recorded.

Do not claim "bug-free", "fully secure", or "fully correct". Report tested scope and remaining uncertainty.