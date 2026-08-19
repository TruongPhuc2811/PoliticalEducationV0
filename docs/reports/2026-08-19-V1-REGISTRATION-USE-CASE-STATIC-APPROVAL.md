# V1 Registration Use Case Static Approval

**Status:** Static Accepted / Runtime Unverified  
**Gate:** `V1_REGISTRATION_USE_CASE_STATIC_ACCEPTED`

## Approval scope and gates

This documentation-only approval reviewed the 11A implementation report, the
prerequisite approval/patch reports, ADR-005, and the actual Auth application source
and tests. Input gates are present: V0.4 Database Design, Flyway, JPA Persistence
Model, Repository Foundation, Registration Prerequisites, and
`V1_REGISTRATION_USE_CASE_REVIEW_READY`.

## Accepted implementation evidence

`SelfRegistrationService.register(RegistrationCommand)` is the sole Auth-owned
`@Transactional` registration boundary. It calculates one Clock-derived `now`, hashes
the UTF-8 bearer code with JDK SHA-256 to byte[32], and calls the existing
`@Lock(PESSIMISTIC_WRITE)` invitation lookup inside that transaction.

It accepts only ACTIVE invitations, permits null expiry, rejects equality/expired
non-null expiry using `now < expiresAt`, retains the database UNIQUE constraint as the
final duplicate-username authority, injects the ADR-005 PasswordEncoder, and encodes
the raw password before Account construction. Raw invitation/password/hash data is
not persisted, logged, or returned.

Account creation forces USER and null classification. Invitation org scope is
authoritative, must exist, and must be TIEU_DOI. Current assignment and initial history
use the invitation org and the same effective instant; history is open
(`effectiveTo = null`). Invitation consumption runs after dependent state and uses the
same account ID and instant. Failures propagate without an intentional partial-success
path; static/unit evidence does not prove database rollback.

## Tests and immutable baselines

`backend/mvnw.cmd test` passed: **18 tests, 0 failures, 0 errors, 0 skipped**. The
focused coverage includes happy registration, SHA-256/32-byte lookup, invitation
states/expiry boundaries, null expiry, duplicate username, org validation, password
encoding, account invariants, assignment/history, shared timestamps, consumption,
failure propagation, and secret-safe result shape.

Repository regression remains 50 interfaces / 16 custom methods / 1 `@Lock` /
2 `@Query` / 0 native queries. Entity/fixed enum, repository, V001, and migration
sources remain unchanged. No login, REST, or frontend implementation was added.

## Runtime boundary, files, and result

- MYSQL REGISTRATION INTEGRATION: **UNVERIFIED — SAFE TEST DB UNAVAILABLE**
- MYSQL PESSIMISTIC LOCK VALIDATION: **UNVERIFIED — SAFE TEST DB UNAVAILABLE**
- MYSQL TRANSACTION ROLLBACK VALIDATION: **UNVERIFIED — SAFE TEST DB UNAVAILABLE**

Flyway/JPA/Repository MySQL runtime status remains unverified. Open OIs remain
`OI-001`, `OI-003`, `OI-004`, `OI-005`, `OI-015`.

This approval task changes only PROJECT-STATUS, TRACEABILITY-MATRIX, CHANGELOG, and
this report; registration source/tests remain unchanged. `git diff --check` passes.

**Formal result:** `V1_REGISTRATION_USE_CASE_STATIC_ACCEPTED`.  
**Next best task:** Checkpoint V1 Registration Use Case baseline.
