# CONTRIBUTING

## Workflow

1. Pick or create a GitHub Issue with Requirement ID.
2. Create a branch from `main`.
3. Read `AGENTS.md` and relevant `.cursor/rules`.
4. Implement only the issue scope.
5. Run relevant validation.
6. Update traceability/docs if required.
7. Open a Pull Request.
8. Merge only after required checks pass.

## Branches

- `feature/<REQ-ID>-short-name`
- `fix/<REQ-ID>-short-name`
- `docs/<DOC-ID>-short-name`
- `test/<REQ-ID>-short-name`

## Pull Requests

A PR should include:
- Requirement ID(s).
- What changed.
- Screens/API/DB affected.
- How it was tested.
- Screenshots for UI changes.
- Open issues or follow-up work.

## Remote safety

AI agents may prepare commits and PR-ready changes locally, but must not push, merge,
force-push or modify GitHub remotely unless explicitly instructed.
