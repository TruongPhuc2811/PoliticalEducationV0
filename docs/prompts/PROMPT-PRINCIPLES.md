# PROMPT EXECUTION PRINCIPLES

**Document ID:** PES-PROMPT-RULES  
**Version:** 1.0  
**Date:** 2026-08-15  
**Status:** Accepted working convention  
**Applies to:** Cursor Agent / Codex execution prompts in this repository

---

## 1. Mục đích

Tài liệu này là quy ước bắt buộc cho mọi prompt giao cho Codex/Cursor Agent khi agent được yêu cầu:

- sửa code;
- tạo code;
- sửa cấu hình;
- hoàn thiện một version tài liệu;
- triển khai UI;
- sửa bug;
- bổ sung test;
- thay đổi migration/database;
- thay đổi runtime/deploy wiring.

Mục tiêu là giữ thay đổi **đúng phạm vi, có căn cứ từ source, minimal diff, kiểm chứng được và phù hợp với môi trường production hạn chế tài nguyên**.

Nếu prompt riêng không nhắc lại toàn bộ quy tắc này thì tài liệu này vẫn được xem là ràng buộc.

---

# 2. NGUYÊN TẮC CỐT LÕI

Agent phải tuân thủ:

1. **Source-first:** đọc source/rule/docs liên quan trước khi sửa.
2. **Evidence-first:** chỉ kết luận khi có căn cứ từ repository.
3. **Minimal diff:** sửa nhỏ nhất đủ đạt task/Acceptance Criteria.
4. **No speculative refactor:** không refactor vì “đẹp hơn”.
5. **No invented business rules:** thiếu dữ kiện thì ghi Open Issue.
6. **Runtime-aware:** mọi thay đổi phải được đánh giá ảnh hưởng runtime.
7. **Resource-aware:** luôn tính đến production hạn chế CPU/RAM/disk.
8. **Test honestly:** chạy được gì ghi đúng cái đó; không claim điều chưa verify.
9. **Traceability:** thay đổi nghiệp vụ phải truy được về Requirement ID.
10. **Report-first reviewability:** sau task phải có report đủ để reviewer audit.
11. **No unrelated fixes:** phát hiện lỗi ngoài scope thì ghi đề xuất, không sửa ké.
12. **No remote mutation by default:** không push/merge/mutate GitHub nếu chưa được yêu cầu rõ.

---

# 3. BỐI CẢNH PRODUCTION BẮT BUỘC PHẢI TÍNH ĐẾN

Production được xem là **resource-constrained**.

Không tự giả định số CPU/RAM/disk cụ thể nếu repository chưa ghi rõ cấu hình thật.

Khi phân tích hoặc sửa code, phải đánh giá ngắn gọn các rủi ro có căn cứ sau:

## 3.1 Database

- N+1 query;
- query thiếu điều kiện/index hợp lý;
- full scan;
- fetch quá nhiều row;
- không phân trang nơi dữ liệu có thể tăng;
- `EAGER` không cần thiết;
- query trong loop;
- transaction quá rộng;
- lock/ghi dư thừa.

## 3.2 CPU / memory

- load toàn bộ dữ liệu vào memory;
- tạo collection/buffer lớn không cần thiết;
- vòng lặp dư thừa;
- serialize payload quá lớn;
- xử lý file/media trong memory không kiểm soát;
- endpoint làm tính toán nặng không cần thiết.

## 3.3 Disk / logging / file

- log quá nhiều;
- log trong loop;
- log payload/file lớn;
- file tạm không cleanup;
- upload không giới hạn hợp lý;
- ghi file lặp lại không cần thiết;
- log/token/credential bị lộ.

## 3.4 Background behavior

- polling;
- cron;
- scheduled job;
- retry loop;
- background worker;

chỉ được thêm khi requirement thật sự cần và phải đánh giá tải.

## 3.5 Runtime / production wiring

Project này **không sử dụng Docker**.

Vì vậy khi task liên quan runtime/deploy, ưu tiên kiểm tra:

- environment variables;
- `application-*.yml`;
- Maven/Java runtime;
- Node/Vite build;
- MySQL connection;
- Flyway;
- Nginx;
- process/service startup script;
- file permissions/path;
- GitHub Actions;
- reverse proxy/API base URL;
- production profile;
- secrets wiring.

Không tạo Dockerfile, Docker Compose, Testcontainers hoặc bước kiểm tra Docker.

---

# 4. TRÌNH TỰ LÀM VIỆC BẮT BUỘC

## Bước 1 — Đọc rule và convention

Tối thiểu:

- `AGENTS.md`;
- `docs/PROJECT-STATUS.md`;
- `docs/prompts/PROMPT-PRINCIPLES.md`;
- `.cursor/rules/*` liên quan;
- `README.md`;
- nested `AGENTS.md` của khu vực task.

Tùy task phải đọc thêm:

- `package.json`;
- `pom.xml`;
- `tsconfig*`;
- Vite config;
- Spring config;
- env example;
- GitHub Actions;
- Nginx/deploy/startup scripts;
- docs/version/report trước đó.

## Bước 2 — Đọc đủ context trực tiếp

Không dựa vào tên file để đoán.

Phải đọc luồng thật liên quan:

- route/controller;
- application/service/use-case;
- repository;
- entity/query/migration;
- frontend route/page/api adapter;
- security/config;
- test;
- runtime wiring.

Chỉ đọc frontend khi flow thật sự đi qua frontend.
Chỉ đọc backend khi flow thật sự đi qua backend.

## Bước 3 — Chốt hiện trạng và nguyên nhân

Trước khi sửa phải trả lời được:

- hiện trạng thật từ source là gì;
- task/bug nằm ở đâu;
- flow hiện tại chạy thế nào;
- nguyên nhân gốc có được source xác nhận không;
- phạm vi sửa nhỏ nhất là gì;
- vì sao không cần đụng phần khác.

Nếu chưa đủ căn cứ:

- không bịa;
- không ép phải có “root cause”;
- ghi rõ chưa xác nhận được;
- chỉ tiếp tục phần có căn cứ.

## Bước 4 — Sửa minimal diff

Không được:

- refactor rộng;
- rename hàng loạt;
- format toàn repo;
- đổi style unrelated;
- thêm dependency mới nếu không bắt buộc;
- thay API contract ngoài scope;
- đổi business behavior ngoài AC;
- sửa “tiện tay”;
- tạo abstraction chỉ vì “sau này có thể cần”.

## Bước 5 — Kiểm tra

Chạy các lệnh phù hợp nhất mà repository cho phép.

Ví dụ:

### Backend
- Maven compile/test/package;
- targeted test;
- config validation;
- Flyway validation khi task có DB và môi trường hỗ trợ.

### Frontend
- typecheck;
- build;
- targeted test.

### E2E
- Playwright scenario liên quan;
- shell smoke nếu task chỉ là skeleton.

### Runtime wiring
- grep/config verification;
- startup verification;
- request flow;
- profile/env presence;
- Nginx config check nếu có.

Nếu không chạy được:

- ghi command;
- ghi lý do;
- không đổi sang “pass” bằng suy đoán.

---

# 5. PHÂN TÍCH BẮT BUỘC TRONG PHẠM VI TASK

Trong report phải có đánh giá ngắn cho phần code/config vừa đọc:

## A. Resource / performance

Chỉ nêu khi có căn cứ:

- RAM;
- CPU;
- DB query;
- loop;
- payload;
- disk/log;
- đồng thời khoảng vài user trở lên.

Không biến task nhỏ thành performance audit toàn hệ thống.

## B. Stability / runtime

- env có dễ thiếu không;
- local chạy nhưng production có thể fail ở đâu;
- config nào optional/bắt buộc;
- restart/deploy có ảnh hưởng gì;
- reverse proxy/path/profile có điểm đáng lưu ý không.

## C. Data / side effects

- behavior nào đổi;
- behavior nào giữ nguyên;
- backward compatibility;
- null/empty/invalid input;
- migration/version mismatch;
- concurrent action nếu có liên quan.

---

# 6. QUY TẮC PHẠM VI

Chỉ sửa file phục vụ trực tiếp task.

Nếu phát hiện lỗi khác:

- không sửa;
- ghi `Đề xuất tiếp theo`.

Không được:

- thay architecture;
- thêm platform lớn;
- thay database;
- thêm Docker;
- thêm Testcontainers;
- thêm Redis/Kafka/OpenSearch/GraphQL/Keycloak nếu chưa có ADR được duyệt;
- sửa secret thật;
- log credential/token.

---

# 7. ACCEPTANCE CRITERIA LÀ RELEASE GATE CỦA TASK

Prompt task phải có AC rõ.

Agent phải map:

`AC -> thay đổi -> kiểm tra -> kết quả`

Task không được gọi là hoàn thành nếu AC bắt buộc chưa đạt.

Nếu một AC không thể verify trong môi trường local/CI hiện tại:

- ghi `Not verified`;
- giải thích;
- mô tả expected runtime verification.

Không được tự giảm AC để task “pass”.

---

# 8. REPORT BẮT BUỘC

## 8.1 Vị trí chuẩn

**Prompt:** `docs/prompts/`  
**Report:** `docs/reports/`

Không lưu execution report chung vào `docs/prompts/`.

Mỗi execution task tạo **một report Markdown mới**.

Tên khuyến nghị:

`docs/reports/YYYY-MM-DD-<TASK-ID>-<short-name>.md`

Ví dụ:

`docs/reports/2026-08-15-S0-BOOTSTRAP-VALIDATION.md`

## 8.2 Mục bắt buộc

1. Mức độ hiểu task.
2. Tóm tắt yêu cầu.
3. Scope / Out of scope.
4. Hiện trạng trước khi sửa.
5. Nguyên nhân gốc hoặc kết luận xác minh từ source.
6. Chiến lược sửa.
7. Danh sách file đã đọc.
8. Danh sách file đã sửa.
9. Diff thay đổi từng file.
10. Ảnh hưởng runtime / behavior.
11. Resource & performance review.
12. Stability / production wiring review.
13. Data / side effects.
14. Edge cases đã xem xét.
15. Acceptance Criteria verification.
16. Kết quả command/test.
17. Expected runtime verification nếu chưa verify production.
18. Rủi ro còn lại.
19. Đề xuất tiếp theo.

## 8.3 Mức độ hiểu task

Phải ghi:

- `% hiểu task`;
- phần chắc chắn;
- phần còn giả định;
- dữ kiện thiếu.

## 8.4 File đã đọc

Mỗi file:

- path;
- lý do đọc;
- kết luận quan trọng nếu có.

## 8.5 File đã sửa

Mỗi file:

- path;
- mục đích;
- lớp ảnh hưởng: `docs / ui / api / business / db / runtime / test / ci`.

## 8.6 Diff

Đối với mỗi file source/config/docs sửa thủ công:

- trước đó liên quan task là gì;
- đã sửa gì;
- vì sao;
- ảnh hưởng;
- block `diff` đủ audit.

### Generated files

Không paste hàng nghìn dòng từ:

- `package-lock.json`;
- generated Maven Wrapper binary/JAR;
- generated report;
- generated artifact.

Thay vào đó ghi:

- file được sinh bởi command nào;
- size/checksum nếu hữu ích;
- dependency/tooling purpose;
- phần thay đổi logic do generated file tạo ra.

Mục tiêu là audit được thay đổi, không làm report phình vô ích.

---

# 9. FORMAT CHAT CUỐI CÙNG

Sau execution task, final chat phải ngắn và theo thứ tự:

- Hiểu task: `<x>%`.
- Kết luận/root cause: `<ngắn gọn; nếu không có bug thì nói không có root cause giả tạo>`.
- File đã sửa: `<paths hoặc số file + nhóm chính>`.
- Report: `<path>`.
- Kiểm tra: `<typecheck/build/test/runtime config: pass/fail/not run>`.
- Rủi ro còn lại: `<ngắn gọn>`.

Không lặp toàn bộ report trong chat.

---

# 10. QUY TẮC ĐẶC BIỆT CHO PROJECT NÀY

- Không Docker.
- Không Testcontainers.
- Không final DB schema trước khi V0.4 được duyệt.
- Không claim final UI conformance trước khi V0.5 được duyệt.
- UI report có thể dùng mock adapter rõ ràng.
- Mock data không được nhúng lẫn vào production data path.
- GitHub remote mutation phải có yêu cầu rõ.
- Mọi business change phải có Requirement ID.
- Production được xem là hạn chế tài nguyên; ưu tiên giải pháp đơn giản, dễ vận hành.
