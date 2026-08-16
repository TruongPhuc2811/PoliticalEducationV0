# CHANGELOG

## 2026-08-16 — P0 Wireframe Finalization

Added/changed:
- Completed the exact 12-screen P0 wireframe specification, including the missing `SCR-AUTH-002` Register screen.
- Separated the 9-screen User/Public P0 flow from the 3-screen Admin P0 flow and documented responsive, state, mock and implementation-handoff boundaries.
- Rebuilt the portable interactive HTML with 12 auditable `data-screen-id` representations, nine Home module entries and dependency-free mock navigation.
- Annotated `OI-002`, `OI-005`, `OI-006`, `OI-007`, `OI-008`, `OI-009`, `OI-012`, `OI-013`, `OI-014` and `OI-015` without deciding their business rules.

Verified:
- Static catalog/spec/HTML/reference validation PASS: P0 12, P1 29, no duplicate/unknown IDs, no broken navigation/dialog targets, no external dependency, secret, Docker usage, final API or database design.
- Standalone HTML PASS on Chromium desktop 1280×800 and mobile 375×812; the checked flows had no global horizontal overflow or console/page error.
- No backend, frontend, E2E, package, database, CI or runtime source was changed.

Status:
- P0 Wireframe is `Review Ready`, not `Accepted`; React implementation has not started.

Report:
- `docs/reports/2026-08-16-P0-WIREFRAME-FINALIZATION.md`

## 2026-08-15 — V0.2 Functional Specification Finalization

Changed:
- Promoted the V0.2 Functional Specification and Screen Catalog from Draft to Review Ready without marking them Accepted.
- Completed functional contracts for all 40 existing Use Case IDs with actor, flow, validation, output, postconditions, acceptance criteria, screens and Open Issues.
- Expanded the Screen Catalog to all 41 existing Screen IDs and classified them as P0 12 / P1 29.
- Mapped all 74 V0.1 functional requirements to a Use Case/functional section and Screen where applicable; API, DB and final Test remain TBD.

Clarified without deciding:
- Preserved `OI-001..OI-005` and added `OI-006..OI-015` for invitation lifecycle, quiz attempt/timeout/ranking, weekly lifecycle, EDU test meaning, competition completion conflict, popular-content metric, organization hierarchy and Office preview feasibility.
- Retained legacy `FD-001..FD-007` through an explicit cross-reference table instead of silently renaming them.
- Removed Draft assumptions that auto-submit and a fixed/resumable quiz attempt were already decided; both remain Open Issues.

Verified:
- Static documentation checks passed: 74/74 functional requirements, 40 unique Use Cases with all required fields, 41 unique Screen entries, 15 unique Open Issues, and no unknown UC/Screen references.
- Technology Baseline remains unchanged; no source, runtime, CI, final API or database design was added.

Report:
- `docs/reports/2026-08-15-V0.2-FUNCTIONAL-SPEC-FINALIZATION.md`

## 2026-08-15 — S0B Bootstrap Runtime Validation

Generated:
- Official Maven Wrapper 3.3.4 scripts/properties targeting Maven 3.9.16.
- npm lockfiles for the frontend and Playwright shell.

Fixed:
- Added Vite client types to the frontend app TypeScript config after `import.meta.env` failed typecheck.
- Marked the Vite config TypeScript project as no-emit to satisfy `allowImportingTsExtensions` constraints.

Verified:
- Backend Maven Wrapper test/package PASS on Java 21.
- Frontend typecheck/build PASS; Vite reported a non-blocking 701.58 kB minified JavaScript chunk warning.
- Playwright desktop/mobile Chromium shell smoke PASS (4/4 tests).
- Static runtime wiring remains No-Docker/No-Testcontainers with production `ddl-auto=validate`.

Not verified:
- MySQL-backed application startup and production/Nginx deployment; MySQL CLI and production runtime artifacts are unavailable.

Report:
- `docs/reports/2026-08-15-S0B-BOOTSTRAP-RUNTIME-VALIDATION.md`

## 2026-08-15 — S0 Bootstrap Validation

Validated:
- Static repository structure and declared backend/frontend/E2E technology baseline.
- Backend package boundaries, Spring profiles, Flyway enablement and `ddl-auto=validate` wiring.
- Frontend strict TypeScript configuration, 9-module route shell and Admin route shell.
- Desktop/mobile Chromium Playwright project definitions and shell smoke source.

Not verified:
- Maven Wrapper generation and backend test/package because Maven is unavailable.
- Frontend install/lockfile/typecheck/build and Playwright execution because Node.js/npm are unavailable.
- MySQL-backed startup and production/Nginx runtime behavior because the required runtime environment is unavailable or not defined in this repository.

Report:
- `docs/reports/2026-08-15-S0-BOOTSTRAP-VALIDATION.md`

## 2026-08-15 — Prompt Governance Baseline

Added/changed:
- Added `docs/prompts/PROMPT-PRINCIPLES.md` as the mandatory execution convention.
- Standardized prompts under `docs/prompts/` and execution reports under `docs/reports/`.
- Rewrote Prompt 00 as a source-first, minimal-diff, resource-aware bootstrap validation task.
- Added explicit low-resource production review rules without inventing hardware specifications.
- Removed Docker/Compose/Testcontainers verification patterns from the task convention.
- Updated `AGENTS.md` and Cursor agent workflow rule to require execution reports and evidence-based root-cause analysis.

## 2026-08-14 — Repository Skeleton + Cursor/Codex Rules

Added:
- `.cursor/rules/*.mdc` modern project rules.
- Root/nested `AGENTS.md`.
- Project status, execution backlog, GitHub setup and Codex starter prompts.
- Backend Spring Boot 4.1.0 application shell.
- Frontend React 19/Vite 8 application shell with 9-module navigation.
- Playwright shell smoke tests.
- GitHub issue/PR templates and CI skeleton.
- No-Docker local bootstrap scripts.
- Placeholder V0.3/V0.4/V0.5/V0.6/V1.0 documents with explicit non-approved status.

Notes:
- No final business database schema was created.
- Frontend auth/module content remains a skeleton/mock navigation shell.
- Maven Wrapper generation remains the first bootstrap validation task.

## 2026-08-14 — P0 Wireframe Started

Added:
- `wireframes/WIREFRAME-SPEC.md`
- `wireframes/flows/P0-USER-FLOW.md`
- `wireframes/P0-interactive-wireframe.html`
- Interactive low-fidelity prototype for 11 P0 screens.


## 2026-08-14 — V0.2 Functional Specification

Added:
- `docs/v0.2/FUNCTIONAL-SPECIFICATION.md`
- `docs/v0.2/SCREEN-CATALOG.md`
- Use Case IDs.
- Screen IDs.
- Validation rules.
- Acceptance Criteria.
- Critical E2E flows.
- UI prototype P0/P1 scope.
- Functional decision backlog.

Updated:
- `docs/TRACEABILITY-MATRIX.md`

Next:
- Wireframe P0 screens.
- UI flow diagrams.
- UI guideline reference draft.
