# V1 Registration Prerequisites Static Approval

**Date:** 2026-08-19  
**Status:** Static Accepted  
**Formal gate:** `V1_REGISTRATION_PREREQUISITES_STATIC_ACCEPTED`  
**Requirements:** `USR-002`, `USR-003`, `USR-004`, `RULE-002`

## 1. Approval scope and previous blocker

This is a documentation/status approval of the prerequisite patch evidenced by
`2026-08-19-V1-REGISTRATION-PREREQUISITE-PATCH.md`. The previous 11A blocker was
the absence of an accepted PasswordEncoder bean and targeted construction, read, and
consumption APIs. This approval does not implement the Registration Use Case.

## 2. Input gates

The following gates remain present and accepted:

- `V0.4_DATABASE_DESIGN_ACCEPTED`
- `V0.4_FLYWAY_BASELINE_STATIC_ACCEPTED`
- `V0.4_JPA_PERSISTENCE_MODEL_STATIC_ACCEPTED`
- `V0.4_REPOSITORY_FOUNDATION_STATIC_ACCEPTED`

## 3. Prerequisite implementation evidence

- **ADR-005:** Accepted. It selects Spring Security `PasswordEncoder` from
  `PasswordEncoderFactories.createDelegatingPasswordEncoder()`.
- **PasswordEncoder:** `SecurityConfig` declares one PasswordEncoder bean. The
  SecurityFilterChain and password policy remain unchanged.
- **Account:** `registeredUser(...)` accepts an encoded password hash, forces
  `USER`, leaves classification `null`, and creates an active account.
- **Assignment APIs:** `UserAssignment.initialAssignment(...)` and
  `UserAssignmentHistory.initialAssignment(...)` exist; initial history sets
  `effectiveTo = null`.
- **Invitation and OrgUnit:** Invitation exposes targeted reads and
  `consume(accountId, consumedAt)`, which changes only status, consumer, and
  consumption time. OrgUnit exposes `getId()` and `getUnitType()`.

## 4. Persistence and implementation immutability

- Persisted field delta: **0**.
- JPA mapping delta: **0**.
- Repository source delta: **0**.
- V001 delta: **0**.
- New migrations: **0**.
- No registration application service, REST API, frontend work, or production
  reflection mutation was added by the prerequisite patch or this approval task.

## 5. Tests and runtime status

The prerequisite report records `backend/mvnw.cmd test` as **6 tests, 0 failures,
0 errors, 0 skipped**. No runtime MySQL validation was performed.

- Flyway/MySQL: **UNVERIFIED — SAFE TEST DB UNAVAILABLE**
- JPA/MySQL: **UNVERIFIED — SAFE TEST DB UNAVAILABLE**
- Repository/MySQL: **UNVERIFIED — SAFE TEST DB UNAVAILABLE**

## 6. Open issues

Unchanged: `OI-001`, `OI-003`, `OI-004`, `OI-005`, `OI-015`.

## 7. Approval-task files and validation

Changed by this approval task only:

- `docs/PROJECT-STATUS.md` — records the formal gate and removes the obsolete
  prerequisite-review blocker.
- `docs/TRACEABILITY-MATRIX.md` — updates existing `USR-002` and `USR-003`
  prerequisite status references.
- `CHANGELOG.md` — records the static approval.
- This report.

No implementation source was changed by this approval task. `git diff --check`
passes. The formal gate is present in `PROJECT-STATUS.md`.

## 8. Formal result and next task

Registration Prerequisites are **STATIC ACCEPTED** under
`V1_REGISTRATION_PREREQUISITES_STATIC_ACCEPTED`.

The Registration Use Case is **Not Implemented / Ready to Start**. This gate does
not accept registration runtime behavior, the Auth module, login/session handling,
or a REST registration API.

**Next best task:** Checkpoint Registration Prerequisites baseline, then retry
Task 11A.
