# Political Education System

Hệ thống Giáo dục Chính trị cho đơn vị.

## Delivery targets

- UI reporting prototype: **2026-08-21**
- MVP V1 completion: **before 2026-09-20**

## Technology baseline

### Backend
- Java 21
- Spring Boot 4.1.x
- Modular Monolith
- Spring Web MVC
- Spring Security
- Spring Data JPA / Hibernate
- Flyway
- MySQL 8.4 LTS
- Maven / Maven Wrapper
- OpenAPI / Swagger UI
- Actuator

### Frontend
- React 19
- TypeScript
- Vite 8
- React Router
- TanStack Query v5
- React Hook Form
- Zod
- Ant Design 6

### Test / Delivery
- JUnit
- Spring Boot Test
- Playwright + TypeScript
- GitHub Actions
- Nginx
- **No Docker / Docker Compose / Testcontainers**

## Repository map

```text
.
├── .cursor/rules/       # Cursor Project Rules
├── .github/             # GitHub templates and CI
├── backend/             # Spring Boot modular monolith
├── frontend/            # React TypeScript app
├── e2e/                 # Playwright end-to-end tests
├── docs/                # Versioned product/system documentation
├── wireframes/          # Flows + interactive wireframe
├── scripts/             # Local bootstrap/dev/test helpers
├── AGENTS.md            # Agent/Codex project instructions
└── README.md
```

## Read this first

1. `AGENTS.md`
2. `docs/PROJECT-STATUS.md`
3. `docs/00-input/REQUIREMENTS-BASELINE.md`
4. `docs/v0.1/BUSINESS-REQUIREMENTS.md`
5. `docs/v0.2/FUNCTIONAL-SPECIFICATION.md`
6. `docs/TRACEABILITY-MATRIX.md`

## Local prerequisites

- Git
- JDK 21
- Maven (until the Maven Wrapper is generated/committed)
- Node.js 22+
- npm
- MySQL 8.4
- Cursor

Run:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/bootstrap/check-prerequisites.ps1
```

## Frontend shell

```powershell
cd frontend
npm install
npm run dev
```

The current frontend is only an application shell. Authentication and business data are not implemented yet.

## Backend shell

Create the local databases using `scripts/sql/create-local-databases.sql`, then configure
environment variables from `.env.example`.

```powershell
cd backend
mvn spring-boot:run
```

The first Codex bootstrap task should generate/commit Maven Wrapper scripts.

## E2E shell smoke test

Start the frontend first, then:

```powershell
cd e2e
npm install
npx playwright install chromium
npm test
```

## Prompt execution convention

- Global prompt principles: `docs/prompts/PROMPT-PRINCIPLES.md`
- Execution prompts: `docs/prompts/`
- Execution reports: `docs/reports/`

## Cursor + Codex

- Cursor project rules live in `.cursor/rules/*.mdc`.
- `AGENTS.md` contains repository-level agent instructions.
- Read `docs/prompts/PROMPT-PRINCIPLES.md` first.
- Start with `docs/prompts/CODEX-START.md` Prompt 00.
