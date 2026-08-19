# V1 Login + Session Authentication Foundation — Implementation Report

**Date:** 2026-08-19  
**Status:** Review Ready  
**Gate:** `V1_LOGIN_SESSION_FOUNDATION_REVIEW_READY`  
**Understanding:** 100%. The task establishes only the Spring Security credential/session foundation for `USR-001`, `USR-004`, and `NFR-004`; no HTTP login transport, registration endpoint, or frontend behavior is included.

## 1. Scope

Implemented the V1 username/password account loader, PasswordEncoder-based authentication provider, minimal authenticated principal, deterministic role authorities, account active-state rejection, server-managed session policy, session-fixation rotation, CSRF-retaining filter-chain baseline, logout invalidation, and profile-aware cookie properties.

Out of scope and unchanged: registration use-case source/tests, entities, repositories, V001/Flyway, REST controllers, JWT/bearer/refresh tokens, persistent session storage, frontend, password reset, remember-me, MFA, OAuth/OIDC, and detailed endpoint RBAC.

## 2. Input gates and 3. Git precheck

All input gates were present: `V0.4_DATABASE_DESIGN_ACCEPTED`, `V0.4_FLYWAY_BASELINE_STATIC_ACCEPTED`, `V0.4_JPA_PERSISTENCE_MODEL_STATIC_ACCEPTED`, `V0.4_REPOSITORY_FOUNDATION_STATIC_ACCEPTED`, `V1_REGISTRATION_PREREQUISITES_STATIC_ACCEPTED`, and `V1_REGISTRATION_USE_CASE_STATIC_ACCEPTED`.

Precheck passed: `main` tracked `origin/main`, worktree was clean, `bde49b5 feat(auth): implement V1 atomic registration use case` was HEAD, the registration checkpoint was present, and `git diff --check` passed.

## 4. Security architecture

ADR-004 remains the implementation source: Spring Security with a backend-authoritative, server-managed same-origin HTTP session. No JWT, bearer token, refresh token, access-token storage, database session table, Spring Session JDBC/Redis, or HTTP Basic browser authentication was added.

## 5. Account loading and 6. Principal design

`AccountUserDetailsService` uses only `AccountRepository.findByUsername(username)` and does not normalize username case or use email, phone, ID, or display name. It maps persisted account data into a package-private credential-bearing `UserDetails` only for the authentication operation.

The successful `SecurityContext` principal is the immutable `AuthenticatedAccountPrincipal(accountId, username, role)`. It contains no password hash, invitation, display name, or classification. Authentication credentials are cleared (`null`) in the returned token.

## 7. Role mapping and 8. Account active semantics

Mapping is exact and deterministic: `SUPER_ADMIN → ROLE_SUPER_ADMIN`, `ADMIN → ROLE_ADMIN`, and `USER → ROLE_USER`. `Account.classification` is never read for authority derivation. The accepted `accounts.is_active` enabled flag maps to Spring Security `UserDetails.isEnabled`; inactive accounts are rejected with `DisabledException` before password verification. No lockout, expiry, or counter policy was introduced.

## 9. Password verification and 10. Password privacy

`AccountAuthenticationProvider` authenticates only via `PasswordEncoder.matches(rawPassword, storedPasswordHash)`. It does not re-encode or compare hash strings manually. The existing ADR-005 delegating PasswordEncoder remains the single bean. Raw password and hash values are not logged, returned, or exposed by the successful principal.

## 11. Session policy and 12. Session fixation

`SecurityConfig` uses `SessionCreationPolicy.IF_REQUIRED`, never `STATELESS`, and `sessionFixation(...changeSessionId())`. This is Spring Security's standard session-ID rotation mechanism after a successful authentication; no manual session-ID handling exists.

## 13. CSRF, 14. HTTP Basic audit, and 15. Form-login audit

CSRF is retained by omitting any disable/ignore rule. `httpBasic` and default `formLogin` were removed from the skeleton filter chain, so neither creates an accidental browser authentication path. No custom JSON login endpoint was created because the final REST transport belongs to a later task.

## 16. Route baseline and 17. Logout

Existing public infrastructure remains deliberately limited: health, OpenAPI/Swagger, skeleton ping, and future source-driven `/api/v1/auth/login` and `/api/v1/auth/registration` paths. All other requests require authentication. Logout uses Spring Security's baseline endpoint and invalidates the HTTP session, clears authentication, and removes `JSESSIONID`; no logout controller was created.

## 18. Cookie configuration and 19. Session storage

Base configuration explicitly sets the servlet session cookie to HttpOnly and `SameSite=Lax`. The `prod` profile sets `Secure=true`; dev stays compatible with local HTTP. Storage remains the servlet container's single-process, in-memory server-managed session with no database or external store.

## 20. Failure semantics

The provider converts unknown usernames and password mismatches to generic `BadCredentialsException`; inactive authentication returns generic-detail `DisabledException`. No HTTP error representation is introduced until the future REST endpoint task.

## 21. Registration regression and 22. Persistence immutable checks

All previous registration tests remain green. `SelfRegistrationService`, registration command/result/exceptions, invitation digest helper, registration tests, entity mappings, fixed enums, repository contracts, V001, and migrations are unchanged.

## 23. Static security scans

Production-source scans found zero matches for `csrf.disable`, `SessionCreationPolicy.STATELESS`, `httpBasic`, `JWT`, `Bearer`, `refresh token`, `NoOpPasswordEncoder`, or `SecurityContext`. A separate password logging scan found zero matches. The old skeleton HTTP Basic match was removed.

## 24. Unit/security test matrix

`AccountAuthenticationProviderTest` verifies active USER loading, ADMIN and SUPER_ADMIN mapping, unknown-user `UsernameNotFoundException` from the loader, `PasswordEncoder.matches`, wrong-password rejection, inactive-account rejection before matching, classification exclusion, and successful principal hash privacy. `SecurityConfigTest` verifies the PasswordEncoder and static session/CSRF/logout/Basic/form-login baseline.

The session-fixation assertion is static configuration evidence. No endpoint exists to execute and observe an HTTP session-ID change.

## 25. Maven result

`backend/mvnw.cmd test` passed: **26 tests, 0 failures, 0 errors, 0 skipped**. This includes all 18 existing registration/prerequisite tests plus 8 authentication/security tests. Maven emitted its existing Mockito dynamic-agent warning only.

## 26. MySQL runtime and 27. HTTP/session runtime

- MYSQL AUTHENTICATION INTEGRATION: **NOT RUN — SAFE TEST DB UNAVAILABLE**
- HTTP SESSION LOGIN INTEGRATION: **NOT RUN** — no login HTTP endpoint exists by scope.
- SESSION COOKIE RUNTIME VALIDATION: **NOT RUN** — no HTTP integration deployment was run.

Static/unit configuration must not be interpreted as browser cookie/session runtime validation.

## 28. Files changed

- `backend/src/main/java/vn/pes/auth/security/AccountAuthenticationUserDetails.java` — internal credential loader representation.
- `backend/src/main/java/vn/pes/auth/security/AccountUserDetailsService.java` — username account loading and role authority mapping.
- `backend/src/main/java/vn/pes/auth/security/AccountAuthenticationProvider.java` — PasswordEncoder authentication flow and hash-free result.
- `backend/src/main/java/vn/pes/auth/security/AuthenticatedAccountPrincipal.java` — immutable public authenticated identity.
- `backend/src/main/java/vn/pes/common/config/SecurityConfig.java` — provider manager, session, fixation, logout, public-route baseline, removal of Basic/form login.
- `backend/src/main/resources/application.yml`, `application-prod.yml` — cookie baseline.
- `backend/src/test/java/vn/pes/auth/security/AccountAuthenticationProviderTest.java`, `backend/src/test/java/vn/pes/common/config/SecurityConfigTest.java` — focused tests.
- `docs/PROJECT-STATUS.md`, `docs/TRACEABILITY-MATRIX.md`, `CHANGELOG.md` — required project records.
- This report — implementation evidence.

## 29. Git diff

`git diff --check` passed. The diff is limited to the authentication foundation, its unit/static tests, cookie configuration, and required documentation. No entity, repository, V001, migration, registration source, REST controller, or frontend file changed.

## 30. Open OIs and 31. Deviations/blockers

Open OIs remain `OI-001`, `OI-003`, `OI-004`, `OI-005`, and `OI-015`. No deviation from accepted architecture was required. Runtime MySQL and HTTP validation are blocked by the unavailable safe test database and the deliberately absent login transport.

## 32. Acceptance matrix

All static/unit acceptance criteria pass: source gates, username identity, ADR-005 verification, role mapping, classification exclusion, active-account rejection, server-managed non-stateless sessions, fixation protection, retained CSRF, no HTTP Basic/JWT/session store, logout invalidation baseline, immutable persistence/registration baseline, no REST/frontend implementation, test suite, and whitespace check.

## 33. Next best task

System Analyst review of Login + Session Foundation.
