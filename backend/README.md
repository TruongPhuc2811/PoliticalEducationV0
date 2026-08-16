# Backend

## Prerequisites

- JDK 21
- Maven
- MySQL 8.4

## Local DB

Run:

`scripts/sql/create-local-databases.sql`

Set environment variables described in root `.env.example`.

## Run

```powershell
mvn spring-boot:run
```

## First bootstrap task

Generate Maven Wrapper and commit:
- `mvnw`
- `mvnw.cmd`
- `.mvn/wrapper/*`

After that, repository commands should prefer `./mvnw` / `mvnw.cmd`.

## Important

This is an application shell only.
Do not add production tables/entities before V0.4 is approved unless the user explicitly requests it.
