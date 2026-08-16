# CODEX START PROMPTS

**Project:** Hệ thống Giáo dục Chính trị  
**Prompt convention:** `docs/prompts/PROMPT-PRINCIPLES.md`  
**Reports:** `docs/reports/`

> Mọi prompt trong file này bắt buộc tuân thủ `PROMPT-PRINCIPLES.md`.
> Nếu prompt task và nguyên tắc chung xung đột, dừng và report xung đột thay vì tự suy diễn.

---

# Prompt 00 — S0 Bootstrap Validation & Skeleton Stabilization

Sử dụng prompt này **đầu tiên** sau khi mở repository root bằng Cursor/Codex.

```text
Bạn đang kiểm tra và ổn định KHUNG XƯƠNG ban đầu của project
"Hệ thống Giáo dục Chính trị".

Đây chưa phải task triển khai nghiệp vụ.
Không được tự mở rộng scope sang feature implementation.

BẮT BUỘC tuân thủ:
- AGENTS.md
- docs/prompts/PROMPT-PRINCIPLES.md
- docs/PROJECT-STATUS.md
- .cursor/rules/*
- các ADR đã Accepted

==================================================
1. BỐI CẢNH VÀ RÀNG BUỘC
==================================================

Technology Baseline đã khóa:

BACKEND
- Java 21
- Spring Boot 4.1.x
- Modular Monolith
- Spring Web MVC
- Spring Security
- Spring Data JPA / Hibernate
- Bean Validation
- Flyway
- Maven / Maven Wrapper
- OpenAPI / Swagger
- Actuator

DATABASE
- MySQL 8.4 LTS

FRONTEND
- React 19
- TypeScript strict
- Vite 8
- React Router
- TanStack Query v5
- React Hook Form
- Zod
- Ant Design 6

TEST
- JUnit / Spring Boot Test
- Playwright + TypeScript

PROJECT / DEPLOY
- GitHub
- Nginx
- Không Docker
- Không Docker Compose
- Không Testcontainers

Production được xem là môi trường tài nguyên hạn chế.
Không tự giả định số CPU/RAM/disk cụ thể.

Khi đánh giá skeleton chỉ nêu resource/performance risk có căn cứ từ source/config.
Không audit hoặc tối ưu lan rộng.

==================================================
2. MỤC TIÊU TASK
==================================================

Mục tiêu duy nhất:

XÁC MINH repository skeleton có đủ nhất quán và chạy được ở mức khung xương,
sau đó chỉ sửa các defect/config issue nhỏ đã được source xác nhận.

Phải thực hiện:

1. đọc rule/convention/docs;
2. kiểm tra cấu trúc repository;
3. kiểm tra backend build skeleton;
4. kiểm tra frontend typecheck/build skeleton;
5. kiểm tra Playwright shell smoke flow nếu môi trường cho phép;
6. kiểm tra config/env/CI skeleton có mâu thuẫn rõ với Technology Baseline hay không;
7. sinh các generated bootstrap files cần thiết nếu toolchain local cho phép;
8. chỉ fix defect tối thiểu có căn cứ;
9. tạo execution report chi tiết.

KHÔNG triển khai:
- entity nghiệp vụ;
- final DB table;
- repository/service/controller nghiệp vụ;
- auth thật;
- quiz thật;
- competition thật;
- production UI hoàn chỉnh;
- final V0.3/V0.4/V0.5 design.

==================================================
3. BƯỚC 1 — ĐỌC TRƯỚC KHI SỬA
==================================================

Ưu tiên đọc theo thứ tự:

1. AGENTS.md
2. docs/PROJECT-STATUS.md
3. docs/prompts/PROMPT-PRINCIPLES.md
4. toàn bộ .cursor/rules/*.mdc
5. README.md
6. docs/00-input/REQUIREMENTS-BASELINE.md
7. docs/v0.1/BUSINESS-REQUIREMENTS.md
8. docs/v0.2/FUNCTIONAL-SPECIFICATION.md
9. docs/v0.2/SCREEN-CATALOG.md
10. docs/TRACEABILITY-MATRIX.md
11. docs/ADR/*.md
12. wireframes/WIREFRAME-SPEC.md
13. backend/AGENTS.md
14. backend/pom.xml
15. backend/src/main/resources/application*.yml
16. backend/src/main/java/... skeleton/config hiện có
17. frontend/AGENTS.md
18. frontend/package.json
19. frontend/tsconfig*.json
20. frontend/vite.config.ts
21. frontend/src/... shell hiện có
22. e2e/AGENTS.md
23. e2e/package.json
24. e2e/playwright.config.ts
25. e2e/tests/*
26. .github/workflows/*
27. .env.example
28. scripts/* liên quan bootstrap/dev/test

Không được chỉ đọc tên file rồi kết luận.

==================================================
4. BƯỚC 2 — XÁC MINH HIỆN TRẠNG TỪ SOURCE
==================================================

Trước khi sửa, tự xác định:

A. Structure
- module/folder có khớp baseline không;
- nested AGENTS/rules có mâu thuẫn không;
- có file placeholder nào dễ bị hiểu nhầm là Approved không.

B. Backend
- pom có phù hợp Java/Spring baseline không;
- source skeleton có compile được về mặt cấu trúc không;
- Spring Security skeleton có compile được không;
- application profiles có mâu thuẫn rõ không;
- Flyway có vô tình bắt phải có final migration chưa;
- không được tạo schema nghiệp vụ để làm build pass.

C. Frontend
- package/config/type setup có nhất quán không;
- route shell có compile/typecheck không;
- 9 module home có đúng skeleton requirement không;
- mock/skeleton behavior có được đánh dấu rõ không.

D. E2E
- config có hợp lệ không;
- shell test có phản ánh đúng skeleton hiện tại không;
- không được biến shell smoke thành business acceptance test giả.

E. Runtime / CI
- không có Docker runtime step;
- env example không chứa secret thật;
- CI không phụ thuộc Docker/Testcontainers;
- path/port/base URL giữa shell components không mâu thuẫn rõ.

Nếu phát hiện giả thuyết ban đầu sai:
- không bịa defect;
- không sửa để “có việc”;
- report rõ là không xác nhận được defect đó.

==================================================
5. BƯỚC 3 — PHẠM VI SỬA TỐI ĐA
==================================================

Chỉ được sửa:

- defect compile/type/config rõ ràng của skeleton;
- inconsistency nhỏ giữa config và baseline;
- script bootstrap/dev/test bị sai rõ;
- shell test bị sai so với shell hiện tại;
- docs status/changelog/report để phản ánh kết quả thật;
- generated bootstrap files cần thiết:
  - Maven Wrapper;
  - package-lock.json.

Không được:
- refactor structure đang hợp lệ;
- đổi package convention;
- đổi stack/version nếu không có blocker thật;
- thêm package/dependency mới chỉ vì tiện;
- tạo production schema;
- triển khai business logic;
- thay UI concept;
- đổi API contract nghiệp vụ;
- thêm Docker;
- mutate GitHub remote.

==================================================
6. GENERATED BOOTSTRAP FILES
==================================================

Nếu Maven local hoạt động:

- generate Maven Wrapper đúng với project;
- commit-ready files phải nằm trong backend/.

Nếu network/npm hoạt động:

- chạy install tại frontend/;
- chạy install tại e2e/;
- sinh package-lock.json tương ứng.

Không chỉnh tay nội dung generated lock/wrapper binary.

Nếu không sinh được:
- ghi exact command;
- exact error;
- không tự dựng file giả.

==================================================
7. KIỂM TRA BẮT BUỘC
==================================================

Chạy tối đa các kiểm tra phù hợp sau, theo khả năng môi trường:

A. Prerequisite
- PowerShell prerequisite script nếu chạy được trên môi trường hiện tại
  HOẶC kiểm tra tương đương cho Java/Maven/Node/npm.

B. Backend
Ưu tiên Maven Wrapper nếu đã sinh được:
- backend: test
- backend: package

Nếu wrapper chưa có và Maven local có:
- mvn test
- mvn package

Không yêu cầu MySQL cho unit skeleton nếu test hiện tại không cần Spring context.
Không tạo DB/table chỉ để ép skeleton test chạy.

C. Frontend
- npm run typecheck
- npm run build

D. E2E
Nếu frontend start được:
- start frontend dev server;
- chạy Playwright shell smoke test;
- ít nhất Chromium desktop;
- nếu mobile project chạy cùng command thì ghi kết quả riêng.

E. Static runtime/config verification
- xác nhận không có Docker invocation thực thi;
- xác nhận env example không có secret thật;
- xác nhận frontend API base URL và backend port không mâu thuẫn rõ;
- xác nhận production config không dùng ddl-auto=update.

Không claim "production verified".

==================================================
8. RESOURCE / PRODUCTION REVIEW TRONG TASK NÀY
==================================================

Chỉ review phần skeleton/config đã đọc.

Phải ghi ngắn:

- có background polling/cron/job nào đang được bật không;
- có logging cấu hình quá mức rõ ràng không;
- có config nào có thể làm app fail vì thiếu env không;
- có file/media path nào có rủi ro rõ không;
- có query/business path nào chưa tồn tại thì nói rõ "chưa có để đánh giá",
  không được suy đoán N+1/full scan khi chưa có query.

Không tối ưu lan man.

==================================================
9. ACCEPTANCE CRITERIA
==================================================

AC-S0-01
Repository structure phù hợp với Technology Baseline và không có mâu thuẫn nghiêm trọng chưa được report.

AC-S0-02
Không có Docker/Docker Compose/Testcontainers được thêm hoặc dùng để làm task pass.

AC-S0-03
Backend skeleton compile/test/package PASS nếu toolchain/dependency resolution khả dụng;
nếu không khả dụng phải có blocker chính xác, không fake PASS.

AC-S0-04
Frontend `typecheck` và `build` PASS nếu toolchain/dependency resolution khả dụng;
nếu fail phải xác nhận lỗi source/config trước khi sửa.

AC-S0-05
Playwright shell smoke test PASS nếu frontend + Playwright browser có thể chạy;
nếu không chạy được phải ghi rõ blocker.

AC-S0-06
Không tạo final business entity/table/migration để hoàn thành bootstrap.

AC-S0-07
Maven Wrapper và npm lock files được sinh bằng tool chính thức nếu môi trường cho phép;
không chỉnh tay generated files.

AC-S0-08
Mọi defect được sửa theo minimal diff và có căn cứ source.

AC-S0-09
docs/PROJECT-STATUS.md và CHANGELOG.md chỉ được cập nhật bằng kết quả đã verify.

AC-S0-10
Tạo report:
docs/reports/2026-08-15-S0-BOOTSTRAP-VALIDATION.md

==================================================
10. REPORT BẮT BUỘC
==================================================

Tạo:

docs/reports/2026-08-15-S0-BOOTSTRAP-VALIDATION.md

Report phải tuân thủ `docs/prompts/PROMPT-PRINCIPLES.md`.

Bắt buộc có:

1. Mức độ hiểu task (%).
2. Tóm tắt yêu cầu.
3. Scope / Out of scope.
4. Hiện trạng trước sửa.
5. Defect/root cause đã xác nhận từ source.
   - Nếu không có defect: ghi rõ "không xác nhận defect", không bịa root cause.
6. Chiến lược sửa.
7. Danh sách file đã đọc + lý do.
8. Danh sách file đã sửa + lớp ảnh hưởng.
9. Diff từng file sửa thủ công.
10. Generated files summary.
11. Ảnh hưởng behavior/runtime.
12. Resource/performance review.
13. Stability/production wiring review.
14. Data/side effects.
15. Edge cases.
16. Bảng AC -> evidence -> result.
17. Commands đã chạy + PASS/FAIL/NOT RUN.
18. Expected runtime verification chưa làm được.
19. Rủi ro còn lại.
20. Đề xuất đúng 1 "next best task".

==================================================
11. QUY TẮC DIFF / REPORT
==================================================

Nếu repository đã có Git:
- dùng git diff để hỗ trợ audit.

Nếu chưa init Git:
- không tự init chỉ để tạo diff;
- dùng before/after hoặc diff tương đương trong report.

Không paste full diff của:
- package-lock.json;
- binary Maven Wrapper JAR;
- generated artifact lớn.

Với generated file:
- ghi command sinh file;
- path;
- purpose;
- size/checksum khi hữu ích.

==================================================
12. FORMAT CHAT CUỐI CÙNG
==================================================

Sau khi hoàn tất, chỉ trả lời ngắn:

- Hiểu task: <x>%.
- Kết luận/root cause: <...>.
- File đã sửa: <...>.
- Report: docs/reports/2026-08-15-S0-BOOTSTRAP-VALIDATION.md
- Kiểm tra: backend test/package <PASS/FAIL/NOT RUN>; frontend typecheck/build <...>; Playwright <...>; runtime-config <...>.
- Rủi ro còn lại: <...>.

Không paste lại toàn bộ report vào chat.

Không push, không tạo/merge PR, không mutate GitHub remote.
```

---

# Prompt 01 — Finalize V0.2 before deeper implementation

> Chưa chạy Prompt 01 cho tới khi Prompt 00 đã có report và `docs/PROJECT-STATUS.md`
> phản ánh chính xác trạng thái bootstrap.

```text
Đọc:
- AGENTS.md
- docs/prompts/PROMPT-PRINCIPLES.md
- docs/PROJECT-STATUS.md
- report của Prompt 00
- V0.1
- V0.2
- Screen Catalog
- Traceability Matrix
- wireframe hiện có

Mục tiêu:
hoàn thiện V0.2 để implementation-ready cho scope UI report,
không phát minh business rule còn thiếu.

Task này sẽ được chi tiết hóa thành prompt riêng sau khi Prompt 00 hoàn tất.
Không tự chạy tiếp Prompt 02.
```

---

# Prompt 02 — Build P0 UI from finalized wireframe

```text
CHƯA CHẠY.

Chỉ được chi tiết hóa/chạy sau khi:
- Prompt 00 pass hoặc blocker đã được xử lý;
- V0.2 đã Review Ready/Accepted;
- P0 Screen Catalog và wireframe đã được chốt cho UI report.
```

---

# Prompt 03 — Start V0.3 after UI reporting milestone

```text
CHƯA CHẠY.

Chỉ bắt đầu sau UI-report milestone hoặc khi project owner yêu cầu rõ.
```
