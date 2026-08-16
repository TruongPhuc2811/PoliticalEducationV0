# S0B BOOTSTRAP RUNTIME VALIDATION

**Project:** Hệ thống Giáo dục Chính trị  
**Task ID:** S0B  
**Date:** 2026-08-15  
**Status:** Completed  
**Resulting gate:** `SKELETON_VALIDATED`  
**Predecessor:** `docs/reports/2026-08-15-S0-BOOTSTRAP-VALIDATION.md`

## 1. Mức độ hiểu task

- Mức độ hiểu: **100%**.
- Chắc chắn: S0B chỉ giải quyết blocker toolchain/runtime kế thừa từ S0; không lặp toàn bộ static audit, không triển khai nghiệp vụ.
- Giả định nghiệp vụ: không có.
- Dữ kiện còn thiếu: MySQL CLI/server và Nginx/production runtime artifact không có, nên không xác minh startup DB hoặc production deployment.

## 2. Tóm tắt yêu cầu

Xác minh Maven/Node/npm, sinh Maven Wrapper và hai npm lockfile bằng tool chính thức, chạy backend test/package, frontend typecheck/build, Playwright desktop/mobile shell smoke; chỉ sửa defect được command chứng minh; cập nhật status/changelog và tạo report follow-up.

## 3. Scope

- Maven Wrapper generated artifacts.
- `frontend/package-lock.json` và `e2e/package-lock.json`.
- Minimal source/config fix nếu validation fail do repository.
- Backend wrapper test/package.
- Frontend typecheck/build.
- Playwright shell smoke desktop/mobile.
- Static runtime/No-Docker verification.
- Status, changelog và report S0B.

## 4. Out of scope

- Business entity/table/migration/API/service/repository/controller/authentication.
- Business E2E, final UI, V0.2 refinement, V0.3–V0.5 implementation.
- Docker/Compose/Testcontainers, architecture/dependency-baseline change.
- MySQL database creation, production/Nginx deploy.
- Git init/commit/push/PR/remote mutation.

## 5. Trạng thái kế thừa từ S0

S0 đã static-review structure/source/config và không xác nhận defect. Các blocker kế thừa là thiếu Maven/Node/npm/MySQL trong PATH, chưa có wrapper/lockfile, và chưa chạy backend/frontend/E2E. Gate trước S0B là `SKELETON_READY`.

Repository vẫn không có `.git`, nên không dùng được `git status`/`git diff` và không init Git. Before/after diff thủ công được ghi trong report.

## 6. Toolchain availability

| Tool | Kết quả |
|---|---|
| Git | 2.55.0.windows.4 |
| Java | 21.0.12 LTS |
| Maven | 3.9.16 |
| Node.js | 22.23.2 |
| npm | 10.9.8 qua official `npm.cmd` |
| npx | 10.9.8 qua official `npx.cmd` |
| MySQL CLI | Không có trong PATH; không chặn unit/build/shell smoke |

`npm --version` qua PowerShell shim fail vì execution policy chặn `D:\DownloadGG\npm.ps1`. Không đổi execution policy; dùng `npm.cmd`/`npx.cmd` chính thức.

Maven mặc định cố dùng `C:\.m2\repository` do home env của runner không khả dụng. Không sửa system config; task dùng local repository tạm `tmp/s0b-m2` và scoped `MAVEN_USER_HOME`, sau đó cleanup.

## 7. Defect/root cause xác nhận từ command/source

### Defect 1 — thiếu Vite client types

- Command: `npm.cmd run typecheck`.
- Error: `src/shared/api/httpClient.ts(2,15): error TS2339: Property 'env' does not exist on type 'ImportMeta'.`
- Source: `httpClient.ts` dùng `import.meta.env.VITE_API_BASE_URL`; `tsconfig.app.json` không khai báo `vite/client`.
- Root cause: Vite env type declarations không nằm trong app TypeScript program.
- Minimal fix: thêm `"types": ["vite/client"]` vào `compilerOptions`.
- Không cần sửa `httpClient.ts` hoặc dependency vì runtime API usage hợp lệ và Vite đã là dependency.

### Defect 2 — TypeScript no-emit constraint

- Command: `npm.cmd run typecheck`.
- Error: `tsconfig.node.json(7,35): error TS5096: Option 'allowImportingTsExtensions' can only be used when either 'noEmit' or 'emitDeclarationOnly' is set.`
- Source: `tsconfig.node.json` có `allowImportingTsExtensions: true` nhưng không có `noEmit`.
- Root cause: config vi phạm constraint TypeScript 5.9.
- Minimal fix: thêm `"noEmit": true`, phù hợp mục tiêu typecheck Vite config.
- Không cần sửa import/source hoặc bỏ option.

Sau hai thay đổi, typecheck và build đều PASS. Không có defect backend hoặc Playwright source được xác nhận.

### Environment/network failures không phải source defect

- Maven local repository mặc định `C:\.m2\repository` không ghi được.
- Sandbox chặn Maven Central/Playwright CDN/npm registry; rerun được phép network thành công.
- Chromium download lần đầu được phép network vượt timeout 5 phút; retry timeout 10 phút thành công.
- Không sửa source để né các blocker môi trường này.

## 8. Chiến lược sửa

- Sinh wrapper/lockfile bằng Maven/npm chính thức, không chỉnh tay.
- Sau wrapper, mọi backend validation dùng `mvnw.cmd`.
- Chỉ thêm hai option TypeScript đúng với exact errors.
- Rerun command fail và chạy build tiếp theo.
- Chạy shell smoke trên Vite thật, dùng Chromium Playwright chính thức.
- Dừng Vite sau test và xóa khoảng 931 MB cache/browser/log tạm `tmp/s0b-*`.
- Chỉ sau validation mới cập nhật gate/status/changelog.

## 9. File đã đọc

| Path | Mục đích/kết luận |
|---|---|
| `AGENTS.md` | Baseline, scope, report và no-business constraints. |
| `docs/PROJECT-STATUS.md` | Gate/blocker kế thừa S0. |
| `docs/prompts/PROMPT-PRINCIPLES.md` | Evidence-first, minimal diff, report convention. |
| `.cursor/rules/000-project-core.mdc` | Core baseline/no Docker. |
| `.cursor/rules/010-requirements-traceability.mdc` | Không có business change cần traceability update. |
| `.cursor/rules/020-agent-workflow.mdc` | Exact failure trước fix và rerun. |
| `.cursor/rules/030-git-github.mdc` | Không remote mutation; CI no container. |
| `.cursor/rules/100-backend-java-spring.mdc` | Java/Spring/Maven constraints. |
| `.cursor/rules/110-database-mysql-flyway.mdc` | MySQL/Flyway/validate, không schema final. |
| `.cursor/rules/200-frontend-react-typescript.mdc` | React/Vite/strict TS baseline. |
| `.cursor/rules/210-ui-ux-reference.mdc` | Không redesign UI. |
| `.cursor/rules/300-testing-quality.mdc` | Honest deterministic validation. |
| `.cursor/rules/310-playwright-e2e.mdc` | Test hiện tại chỉ là shell smoke. |
| `.cursor/rules/400-docs-versioning.mdc` | Status chỉ cập nhật theo evidence. |
| `docs/reports/2026-08-15-S0-BOOTSTRAP-VALIDATION.md` | Trạng thái, blocker và risk kế thừa. |
| `CHANGELOG.md` | Lịch sử S0 và vị trí entry S0B. |
| `backend/AGENTS.md` | Nested backend constraints. |
| `frontend/AGENTS.md` | Nested frontend constraints. |
| `e2e/AGENTS.md` | Nested shell smoke constraints. |
| `backend/pom.xml` | Maven project/Boot 4.1.0/Java 21. |
| `backend/src/test/java/vn/pes/SkeletonTest.java` | Một skeleton unit test, không DB context. |
| `backend/src/main/resources/application.yml` | Port/Flyway/base JPA config. |
| `backend/src/main/resources/application-prod.yml` | Prod `ddl-auto=validate`. |
| `frontend/package.json` | npm scripts/dependencies. |
| `frontend/tsconfig.app.json` | Root cause TS2339. |
| `frontend/tsconfig.node.json` | Root cause TS5096. |
| `frontend/src/shared/api/httpClient.ts` | Source dùng `import.meta.env`. |
| `frontend/vite.config.ts` | Vite port 5173. |
| `e2e/package.json` | npm/Playwright scripts. |
| `e2e/playwright.config.ts` | Base URL và desktop/mobile projects. |
| `e2e/tests/shell.spec.ts` | Hai shell tests chạy trên hai projects. |
| `.env.example` | Dev env/ports/secret scan. |
| `.github/workflows/backend-ci.yml` | Java/Maven CI, no Docker. |
| `.github/workflows/frontend-ci.yml` | Node/typecheck/build CI. |
| `.github/workflows/e2e.yml` | Vite/Playwright CI, no Docker. |
| `.gitignore` | Wrapper/lock/build/temp ignore behavior. |

## 10. File đã sửa

| Path | Lý do | Lớp |
|---|---|---|
| `frontend/tsconfig.app.json` | Fix TS2339 Vite env type. | ui/runtime |
| `frontend/tsconfig.node.json` | Fix TS5096 no-emit constraint. | ui/runtime |
| `docs/PROJECT-STATUS.md` | Chuyển gate và artifact status theo PASS thật. | docs |
| `CHANGELOG.md` | Ghi generated/fixed/verified/not verified. | docs |
| `docs/reports/2026-08-15-S0B-BOOTSTRAP-RUNTIME-VALIDATION.md` | Report bắt buộc. | docs |

Generated chính thức: `backend/mvnw`, `backend/mvnw.cmd`, `backend/.mvn/wrapper/maven-wrapper.properties`, hai npm lockfile. Không có business/db/api/test/CI source bị sửa.

## 11. Diff từng file sửa thủ công

### `frontend/tsconfig.app.json`

```diff
     "lib": ["ES2022", "DOM", "DOM.Iterable"],
+    "types": ["vite/client"],
     "allowJs": false,
```

Ảnh hưởng: chỉ type declarations lúc compile; không đổi runtime bundle behavior.

### `frontend/tsconfig.node.json`

```diff
     "composite": true,
     "skipLibCheck": true,
+    "noEmit": true,
     "module": "ESNext",
```

Ảnh hưởng: Vite config được typecheck nhưng không emit JS/declaration từ TypeScript build.

### `docs/PROJECT-STATUS.md`

```diff
-**Current gate:** `SKELETON_READY`
+**Current gate:** `SKELETON_VALIDATED`
-| Backend code shell | Scaffolded | ... NOT VERIFIED ... |
-| Frontend code shell | Scaffolded | ... NOT VERIFIED ... |
-| Playwright | Scaffolded | ... NOT VERIFIED ... |
-| Bootstrap generated files | Blocked | ... |
+| Backend code shell | Validated | Maven Wrapper test/package PASS on Java 21 |
+| Frontend code shell | Validated | npm lockfile generated; typecheck/build PASS |
+| Playwright | Validated | Desktop/mobile Chromium shell smoke PASS (4/4); not business E2E |
+| Bootstrap generated files | Ready | Maven Wrapper and frontend/e2e npm lockfiles generated by official tools |
```

Next task đổi từ cài toolchain/rerun S0 sang finalize V0.2; không đổi trạng thái V0.2.

### `CHANGELOG.md`

Thêm entry `2026-08-15 — S0B Bootstrap Runtime Validation` với các nhóm Generated, Fixed, Verified, Not verified và report path. Không ghi production/MySQL PASS.

Report này là file mới; không lặp self-diff.

## 12. Generated files

| Command | Path | Bytes | SHA-256 / purpose |
|---|---|---:|---|
| `mvn wrapper:wrapper` | `backend/mvnw` | 11,790 | `CAE96CEF...ED4D02`; Unix wrapper script |
| `mvn wrapper:wrapper` | `backend/mvnw.cmd` | 8,481 | `46EEDB84...929C1C`; Windows wrapper script |
| `mvn wrapper:wrapper` | `backend/.mvn/wrapper/maven-wrapper.properties` | 171 | `1F3CF0A7...BD931`; Wrapper 3.3.4 only-script, Maven 3.9.16 distribution |
| `npm.cmd install` | `frontend/package-lock.json` | 67,767 | `6B9EE0D7...E2F5E`; frontend dependency lock |
| `npm.cmd install --cache ..\tmp\s0b-npm-cache` | `e2e/package-lock.json` | 2,740 | `AB8F8CA2...9202D`; Playwright dependency lock |

Không dump full generated diff. Wrapper plugin chọn `distributionType=only-script` nên không tạo `maven-wrapper.jar`.

Resolved top-level frontend versions gồm React 19.2.8, Vite 8.2.1, Ant Design 6.6.0, React Router 7.18.2, TanStack Query 5.101.4, TypeScript 5.9.3. E2E lock Playwright ở 1.62.1.

Local ignored validation artifacts gồm backend `target` JAR 66,256,888 bytes, frontend `dist` và `node_modules`, E2E `node_modules`/Playwright report. Chúng không phải source/bootstrap file cần review diff.

## 13. Backend validation

- Wrapper generation: PASS, Maven Wrapper 3.3.4 only-script targeting Maven 3.9.16.
- `.\mvnw.cmd ... test`: PASS.
- Tests: 1 run, 0 failures, 0 errors, 0 skipped.
- `.\mvnw.cmd ... package`: PASS.
- Spring Boot executable JAR: 66,256,888 bytes.
- Không cần MySQL vì `SkeletonTest` không load Spring/DB context.
- Không sửa backend source/pom/config.

## 14. Frontend validation

- `npm.cmd install`: PASS, lockfile sinh chính thức.
- Typecheck lần đầu: FAIL với TS2339 và TS5096.
- Sau two-line config fix, `npm.cmd run typecheck`: PASS.
- `npm.cmd run build`: PASS, Vite 8.2.1, 1,541 modules transformed.
- Output: JS 701.58 kB minified, 226.32 kB gzip; CSS 4.31 kB.
- Vite warning chunk lớn hơn 500 kB là non-blocking. Không code-split/refactor trong S0B vì không phải blocker và UI vẫn là shell.

## 15. Playwright validation

- `npm.cmd install`: PASS; 4 packages, audit 0 vulnerabilities; lockfile sinh chính thức.
- Chromium/FFmpeg/headless shell/Winldd tải bằng Playwright chính thức.
- Vite `http://127.0.0.1:5173/login`: HTTP 200.
- `npm.cmd test`: PASS, 4/4 tests trong 15.2 giây.
- `desktop-chromium`: PASS — SHELL-001 và SHELL-002.
- `mobile-chromium`: PASS — SHELL-001 và SHELL-002.
- Vite listener PID 23400 được xác nhận qua port 5173, dừng sau test; port không còn listener.
- Đây vẫn là shell smoke, không phải business E2E.

## 16. Runtime/config verification

- No Docker/Docker Compose/Testcontainers runtime invocation: PASS.
- Production `ddl-auto=validate`, không `update`: PASS.
- `.env.example` secret scan: PASS; `change_me` chỉ là example.
- Backend port/API URL: 8080/`http://localhost:8080/api`, nhất quán.
- Vite/E2E URL: 5173/`http://127.0.0.1:5173`, nhất quán.
- 0 Flyway SQL migration, không business persistence implementation.
- CI files không sửa trong S0B.
- Production runtime không được claim verified.

## 17. Resource/performance review

- Không có repository query/entity relationship/business loop/media processing.
- **Chưa có business workload để đánh giá N+1, full scan, CPU/RAM hoặc file I/O ở mức nghiệp vụ.**
- Build phát hiện chunk JS 701.58 kB minified vượt warning threshold 500 kB. Đây là risk tải frontend có căn cứ nhưng không chặn shell; không cleanup dependency/refactor ngoài task.
- Không phát hiện duplicate top-level dependency rõ ràng từ `npm ls --depth=0`.
- Khoảng 931 MB cache/browser/log tạm được tạo cho validation và đã cleanup; `tmp`/`backend/tmp` không còn.
- Không để Vite/background process chạy sau test.

## 18. Stability/production review

- Wrapper/lockfile làm build reproducible hơn.
- Production vẫn phải set `SPRING_PROFILES_ACTIVE=prod`, DB env, `FILE_STORAGE_ROOT` và frontend API URL.
- MySQL-backed startup/Flyway/security context chưa chạy vì MySQL CLI/server không có; unit/package không cần DB.
- Nginx config/process/service/file permission production không có artifact để verify.
- Frontend build warning có thể được xem xét khi UI thật làm bundle tăng; không tự tối ưu ở skeleton.
- `@playwright/test: latest` trong package manifest hiện được lock thành 1.62.1; future reinstall theo lockfile ổn định nếu dùng lockfile-aware CI.

## 19. Data/side effects

- Không tạo/sửa/xóa database hoặc schema/migration.
- Không đổi API/route/business behavior.
- TypeScript fixes chỉ ảnh hưởng compile/typecheck.
- Generated wrapper/lockfile là backward-compatible tooling artifacts.
- Network side effects chỉ tải public Maven/npm/Playwright artifacts.
- Không mutate Git/GitHub remote.
- Temp cache/browser đã cleanup; build/node_modules/test reports là local ignored artifacts.

## 20. Edge cases

- PowerShell execution policy chặn `npm.ps1`: dùng `npm.cmd`, không đổi policy.
- Maven home không hợp lệ: dùng scoped temp repo/user home, không đổi system config.
- Network sandbox/CDN chậm: exact failures được rerun với approval.
- Chromium download timeout lần đầu: stale lock được kiểm tra/xóa và retry thành công.
- Port 5173 trống trước start, HTTP 200 khi chạy, không còn listener sau cleanup.
- MySQL thiếu không làm fail unit/build/shell E2E; không tạo H2/DB giả.
- Git metadata thiếu: không init Git hoặc discard file.

## 21. Acceptance Criteria matrix

| AC | Evidence | Result |
|---|---|---|
| AC-S0B-01 | Official Maven Wrapper 3.3.4 generated. | PASS |
| AC-S0B-02 | Wrapper test/package BUILD SUCCESS. | PASS |
| AC-S0B-03 | Frontend npm lockfile generated, checksum recorded. | PASS |
| AC-S0B-04 | Typecheck/build PASS after evidenced minimal config fix. | PASS |
| AC-S0B-05 | E2E npm lockfile generated, checksum recorded. | PASS |
| AC-S0B-06 | Desktop 2/2, mobile 2/2 shell tests PASS. | PASS |
| AC-S0B-07 | Static scan confirms no Docker/Compose/Testcontainers runtime. | PASS |
| AC-S0B-08 | No business entity/table/migration/API/service/repository/controller. | PASS |
| AC-S0B-09 | TS2339/TS5096 exact errors, 2-line root-cause fix, rerun PASS. | PASS |
| AC-S0B-10 | Project status reflects `SKELETON_VALIDATED` and actual PASS. | PASS |
| AC-S0B-11 | Changelog separates verified/not verified. | PASS |
| AC-S0B-12 | Report exists at required path. | PASS |

## 22. Commands + exact results

| Command | Initial/final result |
|---|---|
| `git --version` | PASS — 2.55.0.windows.4 |
| `java --version` | PASS — 21.0.12 LTS |
| `mvn --version` | PASS — 3.9.16 |
| `node --version` | PASS — 22.23.2 |
| `npm --version` | FAIL — `PSSecurityException` on npm.ps1 |
| `npm.cmd --version` / `npx.cmd --version` | PASS — 10.9.8 |
| `mysql --version` | NOT RUN — CommandNotFoundException |
| `mvn wrapper:wrapper` | Initial FAIL — cannot create `C:\.m2\repository` |
| Maven wrapper command with explicit temp repo | Sandbox FAIL — Maven Central `Permission denied: getsockopt`; approved rerun PASS, BUILD SUCCESS |
| Wrapper `test` | Sandbox wrapper download FAIL; approved rerun PASS, 1/1 test |
| Wrapper `package` | Sandbox plugin resolution FAIL; approved rerun PASS, executable JAR created |
| Frontend `npm.cmd install` | PASS |
| Frontend `npm.cmd run typecheck` | Initial FAIL — TS2339, TS5096; after fix PASS |
| Frontend `npm.cmd run build` | PASS with >500 kB chunk warning |
| E2E `npm.cmd install` | Initial FAIL — registry EACCES/log cache permission; approved temp-cache rerun PASS |
| `npx.cmd playwright install chromium` | Sandbox FAIL `connect EACCES`; approved 5-minute run timed out; stale lock cleanup; approved 10-minute retry PASS |
| Vite start/probe | Process runner command hung and was terminated; Vite itself ready, `/login` HTTP 200 |
| E2E `npm.cmd test` | PASS — 4/4 |
| Vite cleanup | PASS — listener PID 23400 stopped, port 5173 free |
| Static runtime checks | PASS — No Docker, prod validate, env/ports, no business persistence |
| Temp cleanup | Initial PowerShell long-path partial failure on npm SHA512 cache; scoped .NET long-path cleanup PASS |

## 23. Remaining risks

- MySQL-backed Spring startup/Flyway/security context chưa verified.
- Production Nginx/process/storage permissions/API URL chưa verified.
- Frontend initial chunk 701.58 kB minified; cần theo dõi khi UI thật phát triển.
- Git diff/status không khả dụng vì repository artifact không có `.git`.
- Shell smoke PASS không đại diện business E2E.

## 24. Một next best task duy nhất

**Finalize V0.2 Functional Specification và Screen Catalog theo các open decisions hiện có, không bắt đầu business implementation.**

