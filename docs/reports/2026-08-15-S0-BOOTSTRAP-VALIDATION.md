# S0 BOOTSTRAP VALIDATION & SKELETON STABILIZATION

**Project:** Hệ thống Giáo dục Chính trị  
**Task ID:** S0  
**Date:** 2026-08-15  
**Status:** Completed with toolchain blockers  
**Current gate:** `SKELETON_READY`

## 1. Mức độ hiểu task

- Mức độ hiểu task: **100%**.
- Chắc chắn: đây là validation khung xương, không phải triển khai nghiệp vụ; chỉ sửa defect có bằng chứng; không tạo entity/schema/API/authentication/business E2E.
- Giả định nghiệp vụ: không có.
- Dữ kiện/công cụ thiếu: repository không có Git metadata; máy không có Maven, Node.js, npm, MySQL CLI trong `PATH`; repository không có Nginx config hoặc thông tin hạ tầng production thật. Dependency resolution, compile/build, browser smoke, MySQL startup và production deployment vì vậy chưa thể xác minh.

## 2. Tóm tắt yêu cầu

Xác minh skeleton nhất quán với Technology Baseline; sinh Maven Wrapper và npm lockfiles bằng tool chính thức nếu có thể; chạy backend test/package, frontend typecheck/build và Playwright shell smoke; chỉ sửa defect rõ ràng; cập nhật trạng thái đúng bằng chứng và tạo report audit.

## 3. Scope

- Đọc đầy đủ rule, docs, ADR Accepted, traceability và wireframe bắt buộc.
- Kiểm tra backend, frontend, Playwright, env, scripts và CI shell.
- Kiểm tra prerequisite và chạy tối đa validation môi trường cho phép.
- Chỉ sửa defect source/config được xác nhận.
- Cập nhật status/changelog và tạo report.

## 4. Out of scope

- Final business entity/table/migration/repository/service/controller/API contract.
- Authentication, invitation code, quiz, competition, weekly question, CMS và business E2E thật.
- Final V0.3/V0.4/V0.5, production UI hoặc thiết kế lại UI.
- Cài toolchain/hạ tầng, tạo DB, deploy Nginx/production hoặc audit hiệu năng toàn hệ thống.
- Docker, Docker Compose, Testcontainers, thay Technology Baseline.
- Git init/commit/push/PR/remote mutation.

## 5. Hiện trạng trước khi sửa

- `git status --short --branch` trả về `fatal: not a git repository`; không có `.git`.
- Backend khai báo Java 21, Spring Boot 4.1.0 và đủ dependency shell theo baseline. Root package là `vn.pes`; main class là `PoliticalEducationApplication`.
- Có đủ 14 boundary: `auth`, `user`, `handbook`, `resolution`, `news`, `music`, `quiz`, `politicaleducation`, `hochiminh`, `weeklyquestion`, `competition`, `file`, `dashboard`, `common`.
- Security mới là shell; không có hardcoded credential trong source, chưa có authentication thật.
- Base config bật Flyway, `open-in-view: false` và `ddl-auto: validate`; prod cũng dùng `validate`. Migration folder không có SQL schema.
- Frontend khai báo React 19, Vite 8, TypeScript strict và đủ các library baseline; có `app/pages/features/layouts/shared/styles`.
- Có `/login`, `/register`, `/home`, đủ 9 module route và `/admin`, `/admin/question-bank`, `/admin/handbook`. Home lấy đúng 9 phần tử từ `moduleDefinitions`.
- Playwright có `desktop-chromium` và `mobile-chromium`; test mang tên `SHELL-*`, không tự nhận là business E2E.
- Chưa có Maven Wrapper hoặc hai `package-lock.json`.

## 6. Nguyên nhân gốc / kết luận xác minh

### 6.1 Defect source/config

> Không xác nhận defect từ source.

Static checks không phát hiện inconsistency rõ cần sửa trong phạm vi skeleton. Không sửa source/config chỉ để cải thiện hoặc đoán trước design.

### 6.2 Blocker validation

- `mvn` không có trong `PATH`: không thể sinh wrapper, resolve dependency, compile, test hoặc package backend.
- `node`/`npm` không có trong `PATH`: không thể sinh lockfile, typecheck/build, cài Chromium hoặc chạy Playwright.
- `mysql` CLI không có: không chặn static review nhưng chặn MySQL-backed startup/integration verification.
- Không có Nginx config/deployment artifact: không thể xác minh reverse proxy production.

Đây là blocker môi trường, không phải root cause giả định trong application source.

## 7. Chiến lược sửa

- Không sửa backend/frontend/E2E/runtime config vì không xác nhận defect.
- Không viết giả wrapper/lockfile; chỉ tool chính thức được phép sinh.
- Chỉ cập nhật `docs/PROJECT-STATUS.md` và `CHANGELOG.md` theo kết quả thật.
- Tạo report này. Không cập nhật traceability vì không có business/API/DB/test artifact mới.

## 8. Danh sách file đã đọc

### Rule, docs và ADR

| Path | Mục đích | Kết luận |
|---|---|---|
| `AGENTS.md` | Rule gốc | Baseline khóa, no Docker/Testcontainers, report bắt buộc. |
| `docs/PROJECT-STATUS.md` | Gate | `SKELETON_READY`; code chỉ scaffold; V0.3–V0.6 chưa approved. |
| `docs/prompts/PROMPT-PRINCIPLES.md` | Convention | Source/evidence-first, minimal diff, honest validation. |
| `.cursor/rules/000-project-core.mdc` | Core constraints | Baseline/source-of-truth nhất quán. |
| `.cursor/rules/010-requirements-traceability.mdc` | Traceability | Không tạo business artifact trong S0. |
| `.cursor/rules/020-agent-workflow.mdc` | Workflow | Xác nhận defect trước sửa; report bắt buộc. |
| `.cursor/rules/030-git-github.mdc` | Git/CI | Không remote mutation; CI không container. |
| `.cursor/rules/100-backend-java-spring.mdc` | Backend | Java 21, Spring MVC/Security/JPA/Flyway/MySQL. |
| `.cursor/rules/110-database-mysql-flyway.mdc` | DB | Validate schema; chưa tạo final table trước V0.4. |
| `.cursor/rules/200-frontend-react-typescript.mdc` | Frontend | React 19, strict TS, Vite 8 và library baseline. |
| `.cursor/rules/210-ui-ux-reference.mdc` | UI | Home đủ 9 module; không pixel-perfect. |
| `.cursor/rules/300-testing-quality.mdc` | Test | Dedicated MySQL; không H2/Testcontainers. |
| `.cursor/rules/310-playwright-e2e.mdc` | E2E | Skeleton chỉ là shell smoke. |
| `.cursor/rules/400-docs-versioning.mdc` | Docs | Không nâng trạng thái khi chưa verify. |
| `README.md` | Map/runbook | Wrapper/lockfile là bootstrap work. |
| `CONTRIBUTING.md` | Workflow | Local validation được phép; không remote mutation. |
| `CHANGELOG.md` | Lịch sử | Skeleton 2026-08-14, prompt governance 2026-08-15. |
| `docs/00-input/REQUIREMENTS-BASELINE.md` | Baseline input | 9 module, MySQL 8.4, no Docker, production còn open issues. |
| `docs/v0.1/BUSINESS-REQUIREMENTS.md` | Scope boundary | Requirement IDs tồn tại; không triển khai trong S0. |
| `docs/v0.2/FUNCTIONAL-SPECIFICATION.md` | Current phase | Draft; shell/mock được phép; API/DB chưa final. |
| `docs/v0.2/SCREEN-CATALOG.md` | Screen reference | P0/P1 catalog cho shell/wireframe. |
| `docs/TRACEABILITY-MATRIX.md` | Trace status | API/DB/Test vẫn TBD; không cần cập nhật. |
| `docs/ADR/ADR-001-technology-baseline.md` | Accepted ADR | Xác nhận stack khóa. |
| `docs/ADR/ADR-002-no-docker.md` | Accepted ADR | Cấm Docker/Compose/Testcontainers. |
| `docs/ADR/ADR-003-github-project-management.md` | Accepted ADR | GitHub workflow, không mutate trong task. |
| `wireframes/WIREFRAME-SPEC.md` | UI reference | Home 9 module; admin layout riêng; low fidelity. |

### Backend

| Path | Mục đích/kết luận |
|---|---|
| `backend/AGENTS.md` | Nested rule; không persistence final trước V0.4. |
| `backend/README.md` | Wrapper chưa sinh là trạng thái đã biết. |
| `backend/pom.xml` | Java 21, Boot 4.1.0; Web/Security/JPA/Validation/Actuator/Flyway/MySQL/OpenAPI/test được khai báo. |
| `backend/src/main/java/vn/pes/PoliticalEducationApplication.java` | Main class/root package đúng. |
| `backend/src/main/java/vn/pes/common/config/SecurityConfig.java` | Public health/OpenAPI/ping; phần khác authenticated; compile chưa verify. |
| `backend/src/main/java/vn/pes/common/web/SystemController.java` | Ping endpoint, không business/query. |
| `backend/src/main/java/vn/pes/auth/package-info.java` | Boundary placeholder. |
| `backend/src/main/java/vn/pes/user/package-info.java` | Boundary placeholder. |
| `backend/src/main/java/vn/pes/handbook/package-info.java` | Boundary placeholder. |
| `backend/src/main/java/vn/pes/resolution/package-info.java` | Boundary placeholder. |
| `backend/src/main/java/vn/pes/news/package-info.java` | Boundary placeholder. |
| `backend/src/main/java/vn/pes/music/package-info.java` | Boundary placeholder. |
| `backend/src/main/java/vn/pes/quiz/package-info.java` | Boundary placeholder. |
| `backend/src/main/java/vn/pes/politicaleducation/package-info.java` | Boundary placeholder. |
| `backend/src/main/java/vn/pes/hochiminh/package-info.java` | Boundary placeholder. |
| `backend/src/main/java/vn/pes/weeklyquestion/package-info.java` | Boundary placeholder. |
| `backend/src/main/java/vn/pes/competition/package-info.java` | Boundary placeholder; chưa scoring. |
| `backend/src/main/java/vn/pes/file/package-info.java` | Storage boundary; chưa file I/O. |
| `backend/src/main/java/vn/pes/dashboard/package-info.java` | Reporting boundary; chưa query. |
| `backend/src/main/resources/application.yml` | Port 8080, default dev, OSIV false, Flyway true, validate. |
| `backend/src/main/resources/application-dev.yml` | MySQL dev defaults; `./data/uploads`. |
| `backend/src/main/resources/application-test.yml` | Dedicated MySQL test config; không H2. |
| `backend/src/main/resources/application-prod.yml` | Prod DB/storage env bắt buộc; validate. |
| `backend/src/main/resources/db/migration/README.md` | Cố ý chưa có business migration. |
| `backend/src/test/java/vn/pes/SkeletonTest.java` | Pure unit marker; không load Spring/MySQL. |

### Frontend

| Path | Mục đích/kết luận |
|---|---|
| `frontend/AGENTS.md` | Nested rule: strict TS, baseline libraries, mock isolation. |
| `frontend/package.json` | Major declarations đúng; actual dependency resolution chưa verify. |
| `frontend/tsconfig.json` | Project references hợp lệ về cấu trúc. |
| `frontend/tsconfig.app.json` | `strict: true`. |
| `frontend/tsconfig.node.json` | Bundler config cho Vite. |
| `frontend/vite.config.ts` | Port 5173, strict port. |
| `frontend/index.html` | React mount, locale/title Việt. |
| `frontend/src/main.tsx` | React root, Router, providers, CSS. |
| `frontend/src/app/App.tsx` | Đủ route shell yêu cầu. |
| `frontend/src/app/AppProviders.tsx` | Query/Ant providers; không polling. |
| `frontend/src/features/README.md` | Boundary roadmap, chưa implementation. |
| `frontend/src/layouts/AdminLayout.tsx` | Admin navigation shell. |
| `frontend/src/pages/admin/AdminDashboardPage.tsx` | Demo được ghi nhãn rõ. |
| `frontend/src/pages/auth/LoginPage.tsx` | Navigation demo, chưa backend auth. |
| `frontend/src/pages/auth/RegisterPage.tsx` | Disabled demo, chưa invitation logic. |
| `frontend/src/pages/home/HomePage.tsx` | Render 9 module, responsive grid. |
| `frontend/src/pages/module/ModulePlaceholderPage.tsx` | Placeholder được ghi nhãn. |
| `frontend/src/shared/api/httpClient.ts` | Env API URL/fallback localhost; chưa có caller. |
| `frontend/src/shared/config/moduleDefinitions.ts` | Đúng 9 module/path. |
| `frontend/src/styles/global.css` | Shell responsive, không resource-heavy behavior. |

### E2E, env, CI và scripts

| Path | Mục đích/kết luận |
|---|---|
| `e2e/AGENTS.md` | Shell smoke only; no Docker/production data. |
| `e2e/package.json` | Playwright scripts; version chưa khóa do thiếu lockfile. |
| `e2e/playwright.config.ts` | Desktop/mobile Chromium; failure trace/screenshot. |
| `e2e/tests/shell.spec.ts` | Login + 9 cards và admin shell; `SHELL-*`. |
| `e2e/README.md` | Frontend/browser prerequisites. |
| `.env.example` | Backend 8080, DB 3306, API 8080, E2E 5173, storage path. |
| `.gitignore` | Lockfiles không bị ignore; local/build/data artifacts bị ignore. |
| `.editorconfig`, `.gitattributes` | Encoding/line ending conventions. |
| `.github/ISSUE_TEMPLATE/bug.yml` | Bug evidence template. |
| `.github/ISSUE_TEMPLATE/config.yml` | Issue settings. |
| `.github/ISSUE_TEMPLATE/documentation.yml` | Docs impact template. |
| `.github/ISSUE_TEMPLATE/feature.yml` | Requirement/AC/trace template. |
| `.github/pull_request_template.md` | Validation/traceability checklist. |
| `.github/workflows/backend-ci.yml` | Java 21, Maven test/package; no Docker. |
| `.github/workflows/frontend-ci.yml` | Node 22, install/typecheck/build; no Docker. |
| `.github/workflows/e2e.yml` | Start/wait Vite, Chromium, shell test; no Docker. |
| `scripts/bootstrap/check-prerequisites.ps1` | Xác nhận Git/Java có; Maven/Node/npm/MySQL thiếu. |
| `scripts/dev/start-backend.ps1` | Wrapper-first, Maven fallback. |
| `scripts/dev/start-frontend.ps1` | Install nếu cần, start Vite. |
| `scripts/sql/create-local-databases.sql` | Chỉ local dev/test DB utf8mb4; user/grant là comment. |
| `scripts/test/run-e2e.ps1` | E2E install/browser/test; frontend start riêng. |

## 9. Danh sách file đã sửa

| Path | Lý do | Lớp ảnh hưởng |
|---|---|---|
| `docs/PROJECT-STATUS.md` | Ghi static validation và toolchain blocker; thay next task đã lỗi thời. | docs |
| `CHANGELOG.md` | Ghi đúng phần validated/not verified. | docs |
| `docs/reports/2026-08-15-S0-BOOTSTRAP-VALIDATION.md` | Report bắt buộc. | docs |

Không sửa file `ui / api / business / db / runtime / test / ci`.

## 10. Diff từng file

### `docs/PROJECT-STATUS.md`

- Cũ: ngày 2026-08-14; shell chỉ ghi scaffold; next task yêu cầu chạy Prompt 00.
- Mới: ngày 2026-08-15; ghi static checks và blocker; thêm bootstrap generated-files status; next task là cung cấp toolchain và rerun.
- Lý do/ảnh hưởng: status trung thực, docs-only.

```diff
-**Updated:** 2026-08-14
+**Updated:** 2026-08-15
-| Backend code shell | Scaffolded | No business modules implemented |
-| Frontend code shell | Scaffolded | Navigation/demo shell only |
-| Playwright | Scaffolded | Shell smoke test only |
+| Backend code shell | Scaffolded | Static structure/config checked; test/package NOT VERIFIED because Maven is unavailable |
+| Frontend code shell | Scaffolded | Static structure/config checked; typecheck/build NOT VERIFIED because Node.js/npm are unavailable |
+| Playwright | Scaffolded | Shell smoke source checked; runtime NOT VERIFIED because Node.js/npm are unavailable |
+| Bootstrap generated files | Blocked | Maven Wrapper and npm lockfiles were not generated because Maven/npm are unavailable |
-Read ... then run Prompt 00 ...
+Install/provide Maven and Node.js 22+ with npm, then rerun Prompt 00 validation commands ...
```

### `CHANGELOG.md`

- Cũ: chưa có entry kết quả S0.
- Mới: entry phân biệt static validated và runtime not verified, kèm report.
- Lý do/ảnh hưởng: AC-S0-09, docs-only.

```diff
+## 2026-08-15 — S0 Bootstrap Validation
+
+Validated:
+- Static repository structure and declared backend/frontend/E2E technology baseline.
+- Backend package boundaries, Spring profiles, Flyway enablement and `ddl-auto=validate` wiring.
+- Frontend strict TypeScript configuration, 9-module route shell and Admin route shell.
+- Desktop/mobile Chromium Playwright project definitions and shell smoke source.
+
+Not verified:
+- Maven Wrapper generation and backend test/package because Maven is unavailable.
+- Frontend install/lockfile/typecheck/build and Playwright execution because Node.js/npm are unavailable.
+- MySQL-backed startup and production/Nginx runtime behavior because the required runtime environment is unavailable or not defined in this repository.
```

### Report này

File mới theo AC-S0-10. Không lặp self-diff vì chính nội dung file là artifact audit đầy đủ.

## 11. Generated files

Không có bootstrap file được sinh.

| Command dự kiến | Path | Result |
|---|---|---|
| `mvn wrapper:wrapper` | `backend/mvnw`, `backend/mvnw.cmd`, `backend/.mvn/wrapper/**` | Không khởi chạy: `mvn` không được nhận diện. |
| `npm install` trong frontend | `frontend/package-lock.json` | Không khởi chạy: `npm` không được nhận diện. |
| `npm install` trong e2e | `e2e/package-lock.json` | Không khởi chạy: `npm` không được nhận diện. |

Không chỉnh tay wrapper/lockfile; không có checksum vì không có generated artifact.

## 12. Ảnh hưởng behavior/runtime

- Behavior/source/runtime wiring: không thay đổi.
- Docs: status/changelog phản ánh đúng blocker.
- CPU/RAM/disk: không ảnh hưởng đáng kể; chỉ ba Markdown file.

## 13. Resource / performance review

- DB/N+1/full scan: không có entity, repository, query hoặc business migration. **Chưa có implementation để đánh giá.**
- CPU/RAM/loop: không có business processing/workload thật.
- File/media: chỉ có storage property; chưa có upload/read/write/temp implementation.
- Disk/log: không có custom logging loop hoặc file job.
- Background: không phát hiện `@Scheduled`, cron, fixed-rate/fixed-delay hoặc polling.
- Frontend QueryClient retry 1, tắt refetch-on-focus; chưa có query caller.

> Chưa có query/business workload thật để đánh giá N+1, full scan, CPU hoặc memory ở mức nghiệp vụ.

## 14. Stability / production wiring review

- Env: example values không phải secret thật. Prod yêu cầu DB env và `FILE_STORAGE_ROOT`.
- Profile: base mặc định `dev`; production phải set `SPRING_PROFILES_ACTIVE=prod`, nếu quên sẽ dùng dev defaults.
- MySQL/Flyway: mọi profile dùng MySQL; Flyway bật; `ddl-auto=validate`; chưa có SQL schema. Startup chưa verify.
- API URL: frontend đọc `VITE_API_BASE_URL`, fallback localhost:8080; production build phải inject URL đúng. Chưa có API caller/Nginx artifact.
- Ports: backend 8080; Vite/E2E 5173; env example nhất quán.
- Storage: dev `./data/uploads`; prod bắt buộc path; chưa có code ghi file.
- CI: Java 21/Maven; Node 22/install/typecheck/build; Vite + Playwright; không Docker/service container.
- Reproducibility: chưa có lockfile; E2E dùng `@playwright/test: latest` cho tới khi lockfile chính thức được sinh.
- Nginx/startup: không có artifact nên production không được coi là verified.

## 15. Data / side effects

- Không đổi API/schema/route hoặc business behavior.
- Không tạo/sửa/xóa database/data/migration.
- Không có network/remote mutation.
- Filesystem side effect chỉ gồm ba docs file ở mục 9.

## 16. Edge cases

- Thiếu Maven/Node/npm/MySQL; Chromium availability chưa kiểm tra được vì `npx` không tồn tại.
- Production profile hoặc env thiếu.
- Port 5173 bị chiếm sẽ fail rõ vì `strictPort: true`; port 8080 chưa startup để kiểm tra.
- Windows/Unix wrapper chưa sinh.
- Repository không có Git metadata; không init Git, dùng before/after report.

## 17. Acceptance Criteria verification

| AC | Evidence | Result |
|---|---|---|
| AC-S0-01 | Static XML/JSON/source: declared baseline, modules/routes/config đúng skeleton. | PASS |
| AC-S0-02 | Không runtime/build/test Docker/Compose/Testcontainers. | PASS |
| AC-S0-03 | Maven test/package không khởi chạy vì Maven thiếu. | NOT VERIFIED |
| AC-S0-04 | npm typecheck/build không khởi chạy vì npm thiếu. | NOT VERIFIED |
| AC-S0-05 | Playwright không khởi chạy vì Node.js/npm toolchain thiếu; browser availability chưa kiểm tra được. | NOT VERIFIED |
| AC-S0-06 | Không tạo business entity/table/migration/service/repository/controller. | PASS |
| AC-S0-07 | Không tạo thủ công wrapper/lockfile; official tool unavailable. | PASS |
| AC-S0-08 | Không source/config fix; docs diff nhỏ và có evidence. | PASS |
| AC-S0-09 | Status/changelog chỉ ghi static validated/runtime not verified. | PASS |
| AC-S0-10 | Report đúng path bắt buộc. | PASS |

## 18. Kết quả command

| Command | Exit/result | Đánh giá | Ghi chú |
|---|---|---|---|
| `git status --short --branch` | Exit 128 | FAIL (Git audit unavailable) | Không phải Git repo; không init Git. |
| `rg --files` và inventory | Exit 0 | PASS | Inventory hoàn tất. |
| `powershell -ExecutionPolicy Bypass -File scripts/bootstrap/check-prerequisites.ps1` | Exit 0 | PASS (check) | Git 2.55.0, Java 21.0.12; Maven/Node/npm/MySQL missing. |
| Parse POM/package/tsconfig + static assertions | Exit 0 | PASS | Boot 4.1.0, Java 21, strict TS, 9 modules, 14 boundaries, Flyway/JPA, 2 browser projects. |
| Static scan runtime/background/query/log/migration | Exit 0 | PASS | Không runtime Docker/job/query/custom log; 0 SQL migration. |
| `mvn wrapper:wrapper` | CommandNotFoundException | NOT RUN | `mvn` not recognized. |
| `mvn test` | CommandNotFoundException | NOT RUN | `mvn` not recognized. |
| `mvn package` | CommandNotFoundException | NOT RUN | `mvn` not recognized. |
| `npm install` frontend/e2e | CommandNotFoundException | NOT RUN | `npm` not recognized; không sinh lockfile. |
| `npm run typecheck` | CommandNotFoundException | NOT RUN | `npm` not recognized. |
| `npm run build` | CommandNotFoundException | NOT RUN | `npm` not recognized. |
| `npm test` trong e2e | CommandNotFoundException | NOT RUN | Desktop/mobile chưa chạy. |
| `npx playwright install chromium` | Không gọi | NOT RUN | `npx` không tồn tại. |

| Playwright project | Result | Blocker |
|---|---|---|
| `desktop-chromium` | NOT RUN | npm/frontend/browser toolchain không khả dụng. |
| `mobile-chromium` | NOT RUN | npm/frontend/browser toolchain không khả dụng. |

## 19. Expected runtime verification

Không claim production verified. Khi có toolchain/hạ tầng cần:

1. Sinh Maven Wrapper chính thức; chạy wrapper `test` và `package`.
2. Sinh hai lockfile bằng `npm install`; chạy frontend `typecheck` và `build`.
3. Start Vite, chạy cả desktop/mobile shell smoke.
4. Với MySQL 8.4 dev/test, start Spring để kiểm tra datasource, Flyway, security, health và ping.
5. Ở staging, set prod profile/DB/storage/API env; kiểm tra permission, process startup, Nginx proxy/static fallback và health.

## 20. Rủi ro còn lại

- Dependency/compile compatibility chưa resolve.
- Thiếu wrapper/lockfile nên build chưa reproducible/self-contained.
- Backend/frontend/Playwright chưa thực thi.
- MySQL/Flyway/security startup chưa verify.
- Nginx/process/storage permission/API URL production chưa có artifact/môi trường.
- `@playwright/test: latest` chưa được lock.

## 21. Đề xuất tiếp theo

**Một next best task:** cung cấp Maven và Node.js 22+ kèm npm trong môi trường local/CI, sau đó rerun Prompt 00 để sinh wrapper/lockfiles chính thức và hoàn tất backend test/package, frontend typecheck/build, Playwright desktop/mobile smoke.
