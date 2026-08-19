# ADR-005 — V1 Password Encoding Strategy

**Status:** Accepted  
**Date:** 2026-08-19

## Context

The V1 self-registration use case needs an accepted password-storage implementation before it can persist an `accounts.password_hash` value. `TD-003` in the accepted V0.3 System Design approves the Spring Security `PasswordEncoder` abstraction and adaptive one-way hashing principle, while leaving password-policy requirements deferred.

Invitation bearer-code validation is separate: it uses a deterministic SHA-256 digest for direct `BINARY(32)` lookup and must not use password hashing.

## Decision

Use Spring Security `PasswordEncoder`, created by:

```java
PasswordEncoderFactories.createDelegatingPasswordEncoder()
```

Application code encodes a raw password using `PasswordEncoder.encode(rawPassword)` before it creates an `Account`. `Account.passwordHash` stores only that encoder-produced value. Later credential verification uses the same `PasswordEncoder` abstraction and `matches`.

The current Spring Security delegating factory uses bcrypt for new encodings and includes an algorithm identifier in the stored value, preserving a path for future algorithm migration without changing the Account schema.

## Consequences

- Raw passwords are never persisted or logged.
- No `NoOpPasswordEncoder`, raw SHA-256 password hashing, or custom password-hash implementation is permitted.
- This ADR creates no password complexity, reset, lockout, or throttling policy; those remain outside this decision.
- Invitation SHA-256 digest handling remains independent of password encoding.
