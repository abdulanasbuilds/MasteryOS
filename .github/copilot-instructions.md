# MasteryOS repository instructions

Follow `AGENTS.md` and `docs/AGENT-CONTRACT.md` as binding instructions.

Required workflow:
UNDERSTAND → CAPABILITY CHECK → PLAN/SPEC → SLICE → IMPLEMENT → VERIFY → REVIEW → REPAIR → SECURITY/RELEASE GATES → REPORT

Never:
- make cloud/backend/auth/database mandatory;
- expose provider credentials or API keys;
- move core learner state to a remote source of truth;
- scatter Puter calls through the UI/domain;
- copy or mirror protected third-party course content;
- add unrestricted code execution;
- skip the earliest incomplete gate;
- claim tests or browser verification that were not actually run.

Before editing, inspect the actual repository, tests, package manifest, and current task/gate state.

When implementing connected features, use provider adapters and prove the local core still works without the provider.

Final report must state: Changed, Verified, Not verified, Remaining.
