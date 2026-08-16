# AGENTS.md — Political Education System

## 1. Mission

This repository implements the **Hệ thống Giáo dục Chính trị** for one unit.

The repository is intentionally documentation-first. Requirements, screen IDs, API IDs,
database entities and tests must stay traceable.

## 2. Read order before doing work

Before changing files, read in this order:

1. `docs/PROJECT-STATUS.md`
2. `docs/prompts/PROMPT-PRINCIPLES.md`
3. `docs/00-input/REQUIREMENTS-BASELINE.md`
4. `docs/v0.1/BUSINESS-REQUIREMENTS.md`
5. The document for the current phase/version.
6. Relevant `docs/ADR/*.md`.
7. `docs/TRACEABILITY-MATRIX.md`.
8. Relevant wireframe/UI reference when a UI task is involved.
9. The nearest nested `AGENTS.md` for the directory being changed.

Do not rely on chat memory when the repository contains a written decision.

## 3. Technology baseline — locked

- Java 21.
- Spring Boot 4.1.x.
- Modular Monolith.
- REST API.
- Spring Security.
- Spring Data JPA / Hibernate.
- Flyway.
- Maven + Maven Wrapper.
- MySQL 8.4 LTS.
- React 19 + TypeScript.
- Vite 8.
- React Router.
- TanStack Query v5.
- React Hook Form.
- Zod.
- Ant Design 6.
- OpenAPI 3 / Swagger UI.
- Playwright + TypeScript.
- Nginx for production web serving.
- GitHub for repository, issues, PRs, project management and CI.
- **No Docker.**
- **No Docker Compose.**
- **No Testcontainers.**
- Do not introduce microservices, Kafka, Redis, Elasticsearch/OpenSearch, GraphQL,
  Kubernetes, Keycloak or another major infrastructure component without an accepted ADR.

## 4. Source of truth

Priority when documents conflict:

1. Explicit user-approved change recorded in the repository.
2. Newer accepted ADR.
3. Newer approved project version.
4. `docs/v0.1/BUSINESS-REQUIREMENTS.md`.
5. `docs/00-input/REQUIREMENTS-BASELINE.md`.

If a requirement is missing or ambiguous, **do not invent the business rule**.
Record it as an Open Issue and continue only on work that does not depend on it.

## 5. Required traceability

Every business implementation task must reference at least one Requirement ID such as:

- `USR-001`
- `QUIZ-004`
- `COMP-003`

When implementation begins, update `docs/TRACEABILITY-MATRIX.md` with:
Requirement → Functional Spec → Screen → API → DB → Test.

Never silently rename a Requirement ID already used by another artifact.

## 6. Autonomy boundary

For requests to **review/explain/plan**, inspect the relevant repository files and report.
Do not modify code unless the request asks to build/change/fix.

For requests to **build/change/fix**, you may:
- Read local files.
- Edit in-scope repository files.
- Run safe local build, typecheck and test commands.
- Create new in-scope tests.
- Update documentation and traceability required by the same change.

Do **not** without explicit instruction:
- Push to a remote.
- Create/merge/close a GitHub Pull Request.
- Force-push.
- Rewrite shared Git history.
- Delete branches or tags.
- Drop production databases.
- Delete user data.
- Change Technology Baseline.
- Add a new major dependency or platform.

## 7. Implementation rules

- Keep changes minimal and scoped to the requested Requirement ID(s).
- Prefer package-by-feature / feature-by-domain organization.
- Do not create speculative abstractions for future requirements.
- No hard-coded credentials, tokens or production URLs.
- Database schema changes must use Flyway migrations.
- Never use `spring.jpa.hibernate.ddl-auto=update` in production.
- Frontend must use TypeScript strict mode.
- UI text is Vietnamese unless a document explicitly says otherwise.
- Code identifiers, package names and technical comments should normally be English.
- Reuse shared components only after there is a real repeated pattern.
- User Portal and Admin Portal may have different visual systems.
- The UI reference is a design reference, **not a pixel-perfect clone requirement**.

## 8. Execution reports

For every execution task that changes repository files, create a new report under `docs/reports/`
and follow `docs/prompts/PROMPT-PRINCIPLES.md`.

Do not mix execution reports into `docs/prompts/`.

## 8. Definition of Done

A feature is DONE only when applicable items pass:

1. Requirement ID identified.
2. Functional behavior matches current docs.
3. Relevant Screen/API/DB IDs are linked.
4. Implementation is complete.
5. Validation/error behavior is covered.
6. Unit/integration tests are added where valuable.
7. Playwright is added/updated for a critical end-to-end flow.
8. Build/typecheck/tests pass.
9. No material console/runtime errors remain.
10. Traceability Matrix is updated.
11. Relevant docs/changelog are updated.

## 10. Git workflow

Recommended branch names:

- `feature/<REQ-ID>-short-name`
- `fix/<REQ-ID>-short-name`
- `docs/<DOC-ID>-short-name`
- `test/<REQ-ID>-short-name`

Commit examples:

- `feat(auth): implement login [USR-001]`
- `feat(quiz): generate random quiz [QUIZ-004]`
- `fix(competition): correct ranking order [COMP-002]`
- `docs(v0.2): refine quiz acceptance criteria`
- `test(e2e): cover quiz result flow [QUIZ-007]`

Prefer one logical concern per commit.

## 11. Current phase

Always check `docs/PROJECT-STATUS.md`.
Do not assume later design documents are approved because placeholder files exist.
