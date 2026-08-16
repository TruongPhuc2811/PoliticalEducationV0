# Backend Agent Instructions

In addition to root `AGENTS.md`:

- Java 21 + Spring Boot 4.1.x only.
- Package by feature.
- Feature packages: auth, user, handbook, resolution, news, music, quiz,
  politicaleducation, hochiminh, weeklyquestion, competition, file, dashboard.
- New mature features should prefer internal packages:
  - `api`
  - `application`
  - `domain`
  - `infrastructure`
- Controllers must not contain business calculations.
- JPA entities must not be returned directly as public API DTOs.
- All schema changes use Flyway.
- Do not implement final entities/tables before V0.4 is approved unless explicitly requested.
- Integration tests use a dedicated MySQL test database; never Docker/Testcontainers/H2 as a MySQL substitute.
