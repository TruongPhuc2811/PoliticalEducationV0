# V1 Registration Prerequisite Patch

**Date:** 2026-08-19  
**Status:** Final Review Ready  
**Gate proposed:** `V1_REGISTRATION_PREREQUISITES_REVIEW_READY`  
**Requirements:** `USR-002`, `USR-003`, `USR-004`, `RULE-002`

## 1. Previous 11A blocker

The V1 atomic registration use case was not implemented because the accepted persistence baseline provided neither a `PasswordEncoder` bean nor entity APIs to construct a new Account, construct assignment records, inspect invitation/org-unit state, or consume an invitation without reflection. This controlled patch resolves only those prerequisites.

## 2. Scope

Included:

- ADR-005 password-encoding decision and one Spring `PasswordEncoder` bean.
- Minimal intent-revealing entity factories, consumption operation, and read access needed by the later registration use case.
- Focused unit tests and prerequisite documentation.

Excluded:

- Registration application service, transaction boundary, SHA-256 invitation lookup, validation, repository orchestration, login/session changes, REST, frontend, invitation issuance flow, and transfers.

## 3. PasswordEncoder decision and ADR

`docs/ADR/ADR-005-v1-password-encoding-strategy.md` is Accepted. It selects Spring Security `PasswordEncoderFactories.createDelegatingPasswordEncoder()`. New values are bcrypt-backed by the current delegating factory and carry an algorithm identifier. Password encoding is independent from invitation SHA-256: passwords use adaptive one-way encoding; invitation lookup retains its accepted deterministic SHA-256 `BINARY(32)` digest.

No password complexity, reset, lockout, or throttling rule was introduced.

## 4. Encoder bean evidence

`vn.pes.common.config.SecurityConfig` now declares exactly one `PasswordEncoder` bean using `PasswordEncoderFactories.createDelegatingPasswordEncoder()`. The existing `SecurityFilterChain` was not changed.

## 5. Entity API inventory

| Entity | Added API | Purpose |
|---|---|---|
| `Account` | `registeredUser(...)` and targeted reads | Constructs an active USER with a caller-supplied encoded hash, null classification, and caller-supplied timestamps. |
| `UserAssignment` | `initialAssignment(...)` and reads | Constructs current assignment data only. |
| `UserAssignmentHistory` | `initialAssignment(...)` and reads | Constructs initial open history with `effectiveTo = null`. |
| `Invitation` | `issued(...)`, `consume(...)`, targeted reads | Supports valid persisted-state construction and the sole consumption state transition. |
| `OrgUnit` | `getId()`, `getUnitType()` | Allows later application validation of invitation scope. |

`Invitation.consume(accountId, consumedAt)` changes only `status`, `consumedByAccountId`, and `consumedAt`. It does not perform invitation validity, expiry, organization, username, or transaction validation.

## 6. JPA mapping delta audit

The changed entities retain their existing `@Table`, `@Id`, `@GeneratedValue`, `@Column`, nullability, lengths, enum mappings, scalar FKs, and persisted field inventories. No JPA relationship, persisted field, `@Version`, or schema annotation was added, removed, or modified.

**Persisted field delta: 0. JPA mapping delta: 0.**

## 7. Immutable repository and Flyway audit

- Repository source diff: empty. The accepted inventory remains 50 repositories, 16 custom methods, one `@Lock`, two `@Query`, and zero native queries.
- `V001__v04_accepted_physical_baseline.sql` diff: empty.
- New migrations: 0.

## 8. Security audit

Static scan found no `NoOpPasswordEncoder`, `MessageDigestPasswordEncoder`, reflection mutation, `BeanUtils.copyProperties`, raw-password persistence, or credential/invitation logging additions. The Account factory accepts an already encoded `passwordHash`; the entity does not encode a password.

## 9. Unit tests

`backend/mvnw.cmd test` passed:

| Test | Coverage |
|---|---|
| `SecurityConfigTest` | Encoded value differs from raw input and matches through `PasswordEncoder`. |
| `RegistrationEntityConstructionTest` | Forced USER role, null classification, supplied encoded hash and timestamps, current assignment, and open initial history. |
| `InvitationTest` | Consumption fields change while code hash, scope, issuer, and expiry remain unchanged. |

Result: **6 tests, 0 failures, 0 errors, 0 skipped.**

## 10. Runtime status

No MySQL, H2, Docker, or Testcontainers run was used. Flyway/JPA/repository runtime integration remains **UNVERIFIED — SAFE TEST DB UNAVAILABLE**.

## 11. Files changed

- `backend/src/main/java/vn/pes/common/config/SecurityConfig.java` — technical bean.
- `backend/src/main/java/vn/pes/user/{Account,OrgUnit,UserAssignment,UserAssignmentHistory}.java` — minimal entity APIs.
- `backend/src/main/java/vn/pes/auth/Invitation.java` — controlled consumption/read APIs.
- `backend/src/test/java/vn/pes/**` — focused unit tests.
- `docs/ADR/ADR-005-v1-password-encoding-strategy.md` — accepted technical decision.
- `docs/PROJECT-STATUS.md`, `docs/TRACEABILITY-MATRIX.md`, `CHANGELOG.md`, and this report — status, traceability, and audit evidence.

## 12. Git diff

`git diff --check` passed. The diff is limited to the prerequisite configuration/entity/test/documentation changes listed above; it contains no repository, V001, migration, registration-service, REST, or frontend changes.

## 13. Open OIs and deviations

Open OIs remain unchanged: `OI-001`, `OI-003`, `OI-004`, `OI-005`, `OI-015`.

No deviations or blockers remain for this prerequisite patch. Password policy and public-login protection policy remain deferred by design and are not prerequisites for the internal registration use-case transaction.

## 14. Acceptance matrix

| Criteria | Result |
|---|---|
| AC-PREREG-01..04 | PASS — blocker documented; ADR and one delegating encoder bean; no insecure encoder. |
| AC-PREREG-05..08 | PASS — Account factory forces USER, null classification, and accepts encoded hash only. |
| AC-PREREG-09..14 | PASS — assignment/history/consume/read APIs are targeted and preserve required invariants. |
| AC-PREREG-15..19 | PASS — zero mapping/persisted-field/repository/V001/migration delta. |
| AC-PREREG-20..22 | PASS — no registration service, REST/frontend, or reflection production mutation. |
| AC-PREREG-23..25 | PASS — focused unit tests and Maven pass; `git diff --check` passes. |

## 15. Next best task

System Analyst review of this prerequisite patch, then retry 11A V1 atomic registration use case.
