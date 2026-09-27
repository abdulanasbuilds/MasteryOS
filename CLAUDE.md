# Coding Agent Instructions

MasteryOS uses a binding repository contract.

Before meaningful work, read:
1. `AGENTS.md`
2. `docs/AGENT-CONTRACT.md`
3. `docs/MASTER-AGENT-PROMPT.md`
4. `TASKS.md`
5. the relevant canonical specifications.

Do not invent a new architecture, skip build gates, add hidden infrastructure, copy protected content, ship credentials, or claim completion without verification.

Start-anywhere rule:
- inspect the actual repository and Git state;
- establish a baseline;
- identify the earliest incomplete approved gate;
- implement the smallest coherent slice;
- test;
- review the diff;
- update durable docs;
- report Changed / Verified / Not verified / Remaining.

The local-first core is authoritative. Puter.js is an optional adapter, not the core architecture.

When in doubt, follow the authority order in `docs/AGENT-CONTRACT.md` and stop only for a genuine unresolved product, authorization, security, or rights decision.
