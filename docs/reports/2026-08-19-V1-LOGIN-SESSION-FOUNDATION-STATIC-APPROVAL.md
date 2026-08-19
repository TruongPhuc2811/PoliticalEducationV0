# V1 Login + Session Authentication Foundation — Static Approval

**Date:** 2026-08-19  
**Status:** Static Accepted / Runtime Unverified  
**Gate:** `V1_LOGIN_SESSION_FOUNDATION_STATIC_ACCEPTED`  
**Understanding:** 100%. This is a documentation/status approval of the existing V1
authentication foundation, not a runtime acceptance or an implementation task.

## 1. Approval scope and input gates

The review covers the V1 username/password loading, standard provider, principal,
session, logout, and cookie configuration for `USR-001`, with ADR-004 and ADR-005
preserved. All required inputs are present:

- `V0.4_DATABASE_DESIGN_ACCEPTED`
- `V0.4_FLYWAY_BASELINE_STATIC_ACCEPTED`
- `V0.4_JPA_PERSISTENCE_MODEL_STATIC_ACCEPTED`
- `V0.4_REPOSITORY_FOUNDATION_STATIC_ACCEPTED`
- `V1_REGISTRATION_PREREQUISITES_STATIC_ACCEPTED`
- `V1_REGISTRATION_USE_CASE_STATIC_ACCEPTED`
- `V1_LOGIN_SESSION_FOUNDATION_REVIEW_READY`

## 2. Review chain and resolved finding

The 11B implementation report was reviewed together with the 11B1
standard-provider patch report and the final source/tests. The original finding was
that 11B used a custom password `AuthenticationProvider` with manual
`PasswordEncoder.matches`. It is resolved: production source has zero custom
`AuthenticationProvider` implementations and zero manual production password matches.

## 3. Account loader, provider, and password verification

`AccountUserDetailsService` is the sole repository-backed `UserDetailsService`. It
uses only `AccountRepository.findByUsername(username)`; username is not normalized and
email, phone, and account ID are not authentication identities.

`SecurityConfig` configures exactly one `DaoAuthenticationProvider` with that loader
and the one ADR-005 delegating `PasswordEncoder`, then creates a standard
`ProviderManager`. Password verification is therefore owned by
`DaoAuthenticationProvider` plus ADR-005, with no raw/hash equality, re-encoding,
SHA-256 password, or `NoOpPasswordEncoder` path.

## 4. Principal, credentials, and account behavior

`AccountAuthenticationUserDetails` is the only successful `UserDetails` principal.
It contains account ID, username, role, authorities, enabled state, and only the
internal encoded password needed during authentication. It implements
`CredentialsContainer`; the successful `ProviderManager` flow erases that credential.
Its `toString()` excludes the hash, and no public hash DTO/result, invitation data, or
classification authority is exposed.

Unknown usernames use `UsernameNotFoundException` in the loader and generic provider
authentication-failure semantics. Wrong passwords fail through
`DaoAuthenticationProvider`. `Account.isActive` maps to `UserDetails.isEnabled`, so
inactive accounts are rejected by standard account-status checks. No lockout,
password-expiry, or account-expiry policy was added.

Role mapping is exact: `USER → ROLE_USER`, `ADMIN → ROLE_ADMIN`, and
`SUPER_ADMIN → ROLE_SUPER_ADMIN`. `CAN_BO` and `CHIEN_SI` remain business
classification only and are not authorities.

## 5. Session, CSRF, browser authentication, logout, and cookies

ADR-004 server-managed HTTP session is accepted with
`SessionCreationPolicy.IF_REQUIRED`; `STATELESS`, DB/Redis session storage, JWT,
Bearer, refresh tokens, and custom auth/token cookies are absent. Session fixation is
configured as `sessionFixation(...changeSessionId())`. This accepts the static
configuration only; runtime HTTP session-ID rotation was not run.

CSRF remains enabled: `csrf.disable` and global API CSRF bypass scans both return zero.
HTTP Basic and default generated HTML form login are disabled; no product login endpoint
exists. Standard logout invalidates the HTTP session, clears authentication/security
context, and deletes `JSESSIONID`; no custom logout controller exists.

Cookie configuration is HttpOnly with `SameSite=Lax`; the production profile sets
`Secure=true`, while development remains usable over local HTTP. Browser-cookie
runtime validation was not run.

## 6. Registration and persistence regressions

`SelfRegistrationService`, `RegistrationCommand`, `RegistrationResult`, registration
exceptions, the invitation SHA-256 helper, and registration tests remain unchanged.
The registration gate remains `V1_REGISTRATION_USE_CASE_STATIC_ACCEPTED`.

The persistence baseline remains 50 repository interfaces, 16 custom methods, one
`@Lock`, two `@Query`, and zero native queries. Entity source, fixed enums, repository
source, V001, and migrations are unchanged; no migration was added.

## 7. Static inventory and tests

Final production inventory:

- custom `AuthenticationProvider`: 0
- manual production `PasswordEncoder.matches`: 0
- configured `DaoAuthenticationProvider`: 1
- custom `CredentialsContainer` `UserDetails`: 1
- `csrf.disable`, `SessionCreationPolicy.STATELESS`, `httpBasic`, JWT/Bearer,
  `NoOpPasswordEncoder`, DB/Redis session store: 0
- `PasswordEncoder` beans: 1

`backend/mvnw.cmd test` passed: **25 tests, 0 failures, 0 errors, 0 skipped**. Coverage
includes USER, ADMIN, SUPER_ADMIN, unknown username, wrong password, inactive account,
classification exclusion, PasswordEncoder integration, principal identity, credential
erasure, hash-safe principal text, session configuration, CSRF, Basic/form-login
absence, logout baseline, and registration regression. The previous 26-test
intermediate count is superseded: the standard-provider test consolidates the former
custom-provider loading assertion.

## 8. Runtime boundary, OIs, and task diff

- MYSQL AUTHENTICATION INTEGRATION: **UNVERIFIED — SAFE TEST DB UNAVAILABLE**
- HTTP SESSION LOGIN INTEGRATION: **UNVERIFIED / NOT RUN**
- HTTP SESSION ID ROTATION: **UNVERIFIED / NOT RUN**
- SESSION COOKIE RUNTIME VALIDATION: **UNVERIFIED / NOT RUN**
- Flyway/MySQL, JPA/MySQL, Repository/MySQL, Registration/MySQL: **UNVERIFIED**

Static/unit evidence does not prove browser or MySQL runtime behavior. Open issues
remain `OI-001`, `OI-003`, `OI-004`, `OI-005`, and `OI-015`.

This approval task changes only `docs/PROJECT-STATUS.md`,
`docs/TRACEABILITY-MATRIX.md`, `CHANGELOG.md`, and this report. Auth/security source
and tests, registration source, entities, repositories, fixed enums, V001, migrations,
and application cookie configuration are unchanged by this task. No REST controller or
frontend file was created.

`git diff --check` passes. The dirty implementation scope is limited to the permitted
11B/11B1 auth/security source/tests, session-cookie configuration, required records,
implementation/patch reports, and this approval report.

## 9. Formal result and next task

**Login + Session Authentication Foundation: STATIC ACCEPTED**  
**Gate:** `V1_LOGIN_SESSION_FOUNDATION_STATIC_ACCEPTED`  
**Runtime qualification:** **RUNTIME UNVERIFIED**

This does not mark `AUTH_ACCEPTED`, `LOGIN_RUNTIME_ACCEPTED`, or
`SESSION_RUNTIME_ACCEPTED`.

**Next best task:** Checkpoint V1 Login + Session Authentication Foundation baseline.
