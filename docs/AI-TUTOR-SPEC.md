# MasteryOS AI Tutor Specification

## Purpose

The AI tutor is a learning component, not a generic chat box. It should help the learner understand, reason, practice, diagnose mistakes, and become independent.

## 1. Core principles

1. Explain at the learner's demonstrated level, not an assumed expert level.
2. Preserve mathematical/programming rigor while using simple language first.
3. Prefer reasoning and questions over answer dumping.
4. Never claim certainty when the model is uncertain.
5. Encourage verification for consequential technical or quantitative claims.
6. Use the current concept/prerequisite context rather than unrelated history.
7. Keep AI calls as small and focused as practical.

## 2. Primary interaction: highlight-to-ask

When the learner highlights text, equation, code, or a problem statement, show a contextual tutor menu.

Suggested actions:

- Explain simply
- Explain rigorously
- Give intuition
- Show an example
- Derive it
- Common mistakes
- Quiz me
- Coach me
- Go deeper
- Connect to quant
- Connect to CS
- Review my proof
- Review my code

The selected material is included as explicit context. The UI must distinguish selected text from surrounding lesson text.

## 3. Tutor modes

### Explain Simply

Use plain language and a concrete example. Avoid unnecessary jargon. Do not remove the mathematical truth.

### Explain Rigorously

Use definitions, notation, assumptions, derivation, and formal reasoning appropriate to the learner's current level.

### Intuition

Explain the mental model, geometry, or conceptual picture before formal notation.

### Derive

Show where a formula or result comes from rather than only stating it.

### Example

Provide one well-chosen worked example and explain the decision points.

### Quiz Me

Generate a small assessment without immediately revealing answers.

### Coach Me

Use Socratic questioning and incremental hints. Do not reveal the complete solution unless the learner explicitly requests it or the pedagogical policy allows escalation after sufficient failed attempts.

### Go Deeper

Move one conceptual level upward, such as school algebra → abstract function view, or computational probability → random-variable formalism.

### Connect to Quant

Explain whether and how the concept appears in probability, statistics, optimization, quantitative research, trading, or quantitative development.

### Connect to CS

Explain relevance to algorithms, data structures, systems, machine learning, programming, or software engineering.

### Proof Review

Check definitions, logical direction, missing assumptions, invalid implications, counterexamples, and notation. Distinguish an incomplete proof from a false claim.

### Code Review

Check correctness, complexity, clarity, edge cases, maintainability, security concerns, and language-specific issues.

## 4. Learner context packet

Each request should include only relevant context:

- current track;
- phase/domain/topic/concept IDs;
- lesson/problem/code selection;
- relevant prerequisites;
- mastery indicators;
- known mistakes;
- prior attempt;
- assistance level;
- requested tutor mode;
- desired depth.

Do not send the entire curriculum or entire conversation when unnecessary.

## 5. Response structure

Where appropriate, answers should follow:

1. Direct explanation.
2. Why it works.
3. Example.
4. Common pitfall.
5. One check-for-understanding question.
6. Optional deeper connection.

The system should adapt this structure for very short questions or debugging requests.

## 6. Socratic escalation

For a hard problem:

`independent attempt → clarification → hint 1 → hint 2 → directional method → partial solution → full solution`

Escalation should be explicit so the learner knows how much assistance was used.

## 7. Anti-dependence rules

The tutor should:

- ask what the learner has tried when appropriate;
- make assumptions visible;
- avoid solving every exercise automatically;
- encourage independent re-solution after a full solution is shown;
- mark AI-assisted completion distinctly;
- suggest spaced re-testing of concepts learned through heavy assistance.

## 8. Mathematical correctness

For mathematics, the tutor should prefer:

- definitions before manipulation;
- dimensional/units sanity checks where relevant;
- alternate verification when practical;
- counterexamples when a claim is false;
- transparent intermediate steps;
- explicit notation.

The UI should make it easy to report an AI explanation as incorrect or confusing.

## 9. Quantitative finance guardrail

Quant-related tutoring is educational. It must not be presented as guaranteed investment advice or as an autonomous trading system. The tutor should distinguish educational models from real-market assumptions and disclose uncertainty when discussing live/current facts.

## 10. Provider architecture

The UI calls an internal `AIProvider` interface. Provider-specific implementations are isolated.

Initial provider: Gemini Developer API for trusted personal use.

Possible later providers: OpenRouter, Hugging Face inference, local browser-capable models, or a secure server-side mediator if the product becomes public/multi-user.

## 11. Key handling

For personal prototype use:

- user enters their own provider credential at runtime;
- do not hard-code keys;
- do not commit keys;
- prefer session-only handling;
- never print keys in logs/errors;
- never send keys to analytics or AI prompts.

Public multi-user deployment requires a new security architecture.

## 12. Structured output

Where supported, prefer structured AI responses internally so the client can safely render:

- answer sections;
- hints;
- next question;
- confidence/uncertainty markers;
- suggested resources;
- detected prerequisite weaknesses;
- code blocks;
- mathematics blocks.

Do not trust model-produced HTML blindly.

## 13. Failure handling

Handle:

- provider unavailable;
- invalid key;
- quota exceeded;
- timeout;
- malformed response;
- model refusal/safety response;
- unsupported model capability.

The app should preserve the learner's current work and offer a non-AI path where possible.

## 14. Evaluation

The tutor must be evaluated for:

- factual correctness;
- mathematical correctness;
- appropriate difficulty;
- hint quality;
- premature solution leakage;
- prerequisite diagnosis quality;
- safe rendering;
- provider failure behavior;
- latency;
- token/context efficiency.

## 15. Success condition

The AI tutor is successful when it makes difficult concepts easier to understand while the learner becomes progressively less dependent on it.