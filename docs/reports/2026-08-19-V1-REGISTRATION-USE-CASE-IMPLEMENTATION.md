# V1 Atomic Registration Use Case Implementation

**Status:** Review Ready  
**Gate:** `V1_REGISTRATION_USE_CASE_REVIEW_READY`  
**Requirements:** `USR-002`, `USR-003`, `USR-004`, `RULE-002`; `BD-V04-006`, `BD-V04-014`

## Scope, gates, and architecture

Implemented `vn.pes.auth.application.SelfRegistrationService`, command/result models,
minimal Auth-owned exceptions, SHA-256 helper, Clock configuration, and focused unit tests.
The accepted V0.4 Database/Flyway/JPA/Repository gates and
`V1_REGISTRATION_PREREQUISITES_STATIC_ACCEPTED` were present at precheck on `main`
tracking `origin/main`. No REST, login/session, frontend, repository, entity, enum,
V001, migration, or ADR changes were made.

`SelfRegistrationService.register(RegistrationCommand)` is the exact single
`@Transactional` application boundary. It calls the invitation, account, org unit,
current assignment, and assignment-history repositories.

## Registration flow and security

The operation order is: validate command; calculate one `LocalDateTime now` from
injected `Clock`; SHA-256 the UTF-8 raw invitation code; execute the existing locked
`InvitationRepository.findByCodeHash(byte[])`; validate `ACTIVE` and expiry; perform
the friendly username precheck; load/validate invitation OrgUnit as `TIEU_DOI`; encode
the password with the accepted PasswordEncoder; save Account; save current assignment
and initial history using the same instant; consume the managed invitation; return only
account ID, username, and display name.

The JDK `MessageDigest` SHA-256 helper returns a 32-byte digest. Raw invitation and
password values are transient command inputs only and are neither logged, persisted,
nor included in result/exception payloads. ADR-005 PasswordEncoder is injected and
encodes the password before `Account.registeredUser(...)`.

Expiry is exclusive: a null deadline is valid; otherwise `now < expiresAt` is required.
Non-ACTIVE, missing, expired, disabled, and consumed invitations produce the same
public `InvalidInvitationException`. Invitation scope is authoritative: missing OrgUnit
and non-Tiểu đội scopes fail before mutable registration state is created.

`Account.registeredUser(...)` forces USER and null classification. Assignment/history
are scoped to `Invitation.orgUnitId`, share `effectiveFrom`, and history has
`effectiveTo = null`. `Invitation.consume(accountId, now)` runs last; JPA dirty
checking persists its managed mutation. Database UNIQUE remains final authority for a
duplicate-username race. Unchecked failures propagate and therefore preserve Spring
transaction rollback semantics; mocks do not prove MySQL rollback.

## Static audits

- Invitation lock: unchanged `InvitationRepository.findByCodeHash(byte[])` retains
  `@Lock(PESSIMISTIC_WRITE)` and is called in the transactional method.
- Sensitive logging scan: no logging APIs in new production code; no secret logging.
- Reflection/unsafe mutation scan: zero production matches.
- Repository regression remains 50 repositories / 16 custom methods / 1 `@Lock` /
  2 `@Query` / 0 native queries.
- Entity/fixed enum, repository, V001, and migration diffs: none.

## Unit tests and runtime

`backend/mvnw.cmd test` passed: **18 tests, 0 failures, 0 errors, 0 skipped**.
`SelfRegistrationServiceTest` covers happy flow, SHA-256 digest/32-byte lookup,
invalid states and expiry boundaries, null expiry, duplicate username, missing and
non-Tiểu đội orgs, password encoding, forced account invariants, invitation-scoped
assignment/history, shared timestamps, consumption, propagated mutation failure, and
secret-safe result shape.

- MYSQL REGISTRATION INTEGRATION = **NOT RUN — SAFE TEST DB UNAVAILABLE**
- MYSQL PESSIMISTIC LOCK VALIDATION = **NOT RUN — SAFE TEST DB UNAVAILABLE**
- MYSQL TRANSACTION ROLLBACK VALIDATION = **NOT RUN — SAFE TEST DB UNAVAILABLE**

## Files, validation, and remaining work

Changed files are Auth application source/test plus `PROJECT-STATUS.md`,
`TRACEABILITY-MATRIX.md`, `CHANGELOG.md`, and this report. `git diff --check` passes.
Open OIs remain `OI-001`, `OI-003`, `OI-004`, `OI-005`, `OI-015`. No deviations or
baseline blockers were found.

**Next best task:** System Analyst review of V1 Atomic Registration Use Case.
