# ADR-004 — Authentication Session Strategy

**Status:** Accepted
**Date:** 2026-08-16

## Context

The MVP is a web-only system for one unit and about 500 users. Production direction is same-origin: Nginx serves the React SPA and reverse proxies REST requests to Spring Boot. Requirements specify username/password, invitation-based registration and role authorization, but do not require a public external API, native mobile client or stateless token protocol.

The current `formLogin` and HTTP Basic configuration is skeleton-only and must not define production authentication by accident.

## Decision

Use Spring Security with a backend-authoritative, server-managed browser session for V1.

- Session identifier is carried in an HttpOnly cookie.
- Production cookie is Secure and `SameSite=Lax`, with the narrowest practical path/domain for the same-origin deployment.
- Spring Security session-fixation protection and session rotation on authentication are retained.
- CSRF protection remains enabled/configured for state-changing browser requests; the SPA uses an approved Spring-compatible CSRF token flow.
- Logout invalidates the server session. Frontend visibility/state never replaces backend authentication or authorization.
- HTTP Basic is not the intended production browser mechanism and must be removed/disabled from the production browser flow during auth implementation.

## Alternatives considered

- **JWT bearer tokens:** rejected for V1 because no multi-client/public-API requirement justifies browser token storage, refresh and revocation complexity.
- **Opaque stateless token service:** rejected for the same reason and because it adds lifecycle infrastructure without evidence.
- **Dual session/JWT mode:** rejected; it expands security paths without a requirement.

## Consequences

- Session memory/capacity must be observed during implementation and runtime testing; the current scale does not justify distributed session infrastructure by default.
- A future cross-origin, native-client, public-API or horizontal-deployment requirement may require a new ADR for session placement/stickiness or another auth mechanism.
- Password policy and invitation lifecycle are not decided here. `OI-006` and the Deferred portion of `TD-003` remain open.
- `SecurityConfig` must be aligned in a later implementation task; this ADR does not change application source.
