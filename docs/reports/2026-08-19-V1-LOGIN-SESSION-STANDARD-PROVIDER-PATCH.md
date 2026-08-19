# V1 Login + Session Standard Provider Patch

**Date:** 2026-08-19  
**Status:** Final Review Ready  
**Gate:** `V1_LOGIN_SESSION_FOUNDATION_REVIEW_READY`

## 1. System Analyst finding and 2. Root cause

The 11B foundation implemented a custom `AccountAuthenticationProvider` that repeated username/password behavior already supplied by Spring Security `DaoAuthenticationProvider`. It manually called `PasswordEncoder.matches`, creating avoidable custom credential flow and a second successful-principal type.

## 3. Previous design and 4. Corrected design

The custom provider and `AuthenticatedAccountPrincipal` were removed. `SecurityConfig` now creates `DaoAuthenticationProvider(AccountUserDetailsService)`, applies the existing ADR-005 `PasswordEncoder`, and builds a standard `ProviderManager` from that provider. No custom AuthenticationManager, AuthenticationProvider, login controller, or wrapper was added.

## 5. AccountUserDetailsService and 6. PasswordEncoder integration

`AccountUserDetailsService` remains the repository-backed `UserDetailsService`, using only `AccountRepository.findByUsername`. Username is unmodified. Existing `SecurityConfig.passwordEncoder()` remains the sole delegating PasswordEncoder bean; the standard Dao provider invokes it for password verification.

## 7. Credential erasure and 8. Successful principal

`AccountAuthenticationUserDetails` is now the sole successful `UserDetails` principal. It contains account ID, username, role, authorities, and enabled state. Its mutable internal encoded-password field exists only to support authentication, implements `CredentialsContainer`, and becomes `null` through ProviderManager's standard credential-erasure flow. Its `toString` excludes the credential, and it has no public password-hash getter or JSON/DTO exposure.

## 9. Unknown user, 10. Wrong password, and 11. Inactive account

The loader retains `UsernameNotFoundException` for absent username. `DaoAuthenticationProvider` normalizes authentication failure to `BadCredentialsException`; wrong passwords fail through its configured PasswordEncoder. `Account.isActive` remains `UserDetails.isEnabled`, and the provider's standard account-status check rejects inactive accounts with `DisabledException`. No lockout, expiry, or username normalization was introduced.

## 12. Role mapping regression

Mapping remains exact: `USER → ROLE_USER`, `ADMIN → ROLE_ADMIN`, `SUPER_ADMIN → ROLE_SUPER_ADMIN`. `classification` remains unrelated to authorities.

## 13. Session, 14. CSRF, 15. HTTP Basic/form-login, and 16. Cookie regressions

The correction preserves `SessionCreationPolicy.IF_REQUIRED`, `changeSessionId()` session fixation protection, enabled CSRF, disabled HTTP Basic and default form login, logout session invalidation/cookie deletion, servlet-container in-memory session storage, HttpOnly/`SameSite=Lax` cookies, and production `Secure=true`.

## 17. Registration regression and 18. Persistence immutable checks

Registration source/tests, entities, fixed enums, repositories, V001, migrations, and Database Design were not changed. No REST endpoint or frontend source was added.

## 19. Static scan counts

- `implements AuthenticationProvider` in production source: **0**
- Manual `PasswordEncoder.matches` in production auth source: **0**
- `DaoAuthenticationProvider` production configuration: **1**
- `CredentialsContainer` custom UserDetails implementation: **1**
- `csrf.disable`, `SessionCreationPolicy.STATELESS`, `httpBasic`, `JWT`, `Bearer`, `NoOpPasswordEncoder`: **0**

## 20. Unit/security tests and 21. Maven result

`DaoAuthenticationProviderTest` authenticates through configured `DaoAuthenticationProvider`/`ProviderManager`; it verifies USER success, all role mappings, unknown username failure, wrong password rejection, inactive rejection, classification exclusion, standard PasswordEncoder use, principal identity, credential erasure, and hash-safe `toString`. `SecurityConfigTest` retains the session/CSRF/HTTP Basic/form-login/logout/static-provider baseline.

`backend/mvnw.cmd test`: **25 tests, 0 failures, 0 errors, 0 skipped**. The count decreased by one because the corrected standard-provider test consolidates the former custom-provider loading assertion into its successful standard authentication case.

## 22. Runtime-unverified boundary

- MYSQL AUTHENTICATION INTEGRATION: **NOT RUN — SAFE TEST DB UNAVAILABLE**
- HTTP SESSION LOGIN INTEGRATION: **NOT RUN**
- HTTP SESSION ID ROTATION: **NOT RUN**
- SESSION COOKIE RUNTIME VALIDATION: **NOT RUN**

Static/provider tests do not prove browser/session runtime behavior.

## 23. Files changed

- Removed `AccountAuthenticationProvider.java` and `AuthenticatedAccountPrincipal.java`.
- Updated `AccountAuthenticationUserDetails.java` and `SecurityConfig.java`.
- Replaced the custom-provider test with `DaoAuthenticationProviderTest.java`; updated `SecurityConfigTest.java`.
- Updated PROJECT-STATUS, TRACEABILITY-MATRIX, CHANGELOG, and this report.

## 24. Git diff, 25. Open OIs, and 26. Deviations/blockers

`git diff --check` passes. Open OIs remain `OI-001`, `OI-003`, `OI-004`, `OI-005`, and `OI-015`. No architecture deviation was made; safe MySQL and HTTP runtime validation remain unavailable.

## 27. Acceptance matrix

All `AC-AUTH-PATCH-01` through `AC-AUTH-PATCH-32` pass by source, focused tests, Maven, and static scans, except the explicitly runtime-unverified checks which remain honestly NOT RUN.

## 28. Next best task

System Analyst final review of Login + Session Foundation.
