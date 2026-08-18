# BUSINESS REQUIREMENTS DOCUMENT — V0.1

**Project:** Hệ thống Giáo dục Chính trị  
**Document ID:** PES-BRD-V0.1  
**Version:** 0.1  
**Date:** 2026-08-14  
**Status:** Draft for baseline approval

---

## 1. Purpose

Tài liệu này mô tả yêu cầu nghiệp vụ cấp cao của Hệ thống Giáo dục Chính trị. Đây là nguồn tham chiếu chính cho các tài liệu tiếp theo gồm Functional Specification, System Design, Database Design, UI/UX Specification, Test & Acceptance và V1.0 Baseline.

## 2. Business objectives

### BR-001 — Tập trung nội dung giáo dục chính trị
Hệ thống phải cung cấp một cổng thông tin thống nhất để người dùng truy cập các nội dung giáo dục chính trị của đơn vị.

### BR-002 — Số hóa tài liệu học tập
Hệ thống phải hỗ trợ số hóa và quản lý các bài viết, tài liệu, video và nội dung liên quan phục vụ học tập.

### BR-003 — Tổ chức kiểm tra nhận thức
Hệ thống phải cho phép tổ chức kiểm tra trắc nghiệm từ ngân hàng câu hỏi và tự động xác định kết quả Đạt/Không đạt.

### BR-004 — Duy trì hoạt động hỏi đáp kiến thức hàng tuần
Hệ thống phải có chức năng “Mỗi tuần một câu hỏi”, cho phép người dùng trả lời một câu hỏi kiến thức và hệ thống tự chấm.

### BR-005 — Hỗ trợ chấm điểm thi đua
Hệ thống phải tổng hợp dữ liệu từ các hoạt động phù hợp để phục vụ chấm điểm và xếp hạng thi đua.

### BR-006 — Hỗ trợ công tác quản trị
Admin phải có khả năng quản lý nội dung và cấu hình nghiệp vụ mà không phải thay đổi mã nguồn đối với các danh mục cấu hình đã xác định.

### BR-007 — Hỗ trợ báo cáo
Hệ thống phải cung cấp dashboard và xuất báo cáo cơ bản phục vụ công tác theo dõi, báo cáo.

---

## 3. Scope

### 3.1 In Scope

#### SCOPE-001 — Cẩm nang người lính
Quản lý danh mục và bài viết về điều lệnh, chế độ, quy định, kiến thức quân sự, xử lý tình huống, pháp luật và kỹ năng.

#### SCOPE-002 — Học tập nghị quyết
Quản lý nghị quyết, chuyên đề/bài học, tài liệu, video và nội dung liên quan.

#### SCOPE-003 — Đọc báo và nghe tin
Quản lý tin/bài viết/video/link theo chuyên mục. Hỗ trợ nội dung do Admin đăng và chuẩn bị khả năng tích hợp nguồn ngoài.

#### SCOPE-004 — Kho tàng âm nhạc
Quản lý nội dung âm nhạc/video theo nhóm chủ đề; hỗ trợ nội dung upload và nguồn YouTube.

#### SCOPE-005 — Kiểm tra trắc nghiệm
Quản lý ngân hàng câu hỏi, sinh đề ngẫu nhiên, làm bài, chấm kết quả và bảng xếp hạng.

#### SCOPE-006 — Giáo dục chính trị
Quản lý chương trình, chủ đề, bài giảng, tài liệu và nội dung kiểm tra liên quan.

#### SCOPE-007 — Lời Bác Hồ dạy
Quản lý và hiển thị lời dạy theo ngày, trong đó có khu vực “Lời Bác Hồ dạy hôm nay”.

#### SCOPE-008 — Mỗi tuần một câu hỏi
Quản lý một câu hỏi kiến thức trắc nghiệm theo tuần, tự chấm và công khai đáp án/lời giải.

#### SCOPE-009 — Chấm điểm thi đua
Tổng hợp điểm, tính/xếp hạng theo các đối tượng được hỗ trợ và hiển thị bảng xếp hạng công khai.

#### SCOPE-010 — Quản trị hệ thống
Quản lý người dùng, danh mục, cấu hình, nội dung và dashboard.

#### SCOPE-011 — Báo cáo
Cung cấp báo cáo theo ngày/tuần/tháng/năm và xuất Excel.

### 3.2 Out of Scope for MVP

#### OOS-001
Ứng dụng mobile native.

#### OOS-002
Xác thực hai lớp OTP/2FA.

#### OOS-003
Quy trình biên tập nhiều bước: Nháp → Chờ duyệt → Xuất bản.

#### OOS-004
Phân quyền chi tiết theo từng hành động CRUD.

#### OOS-005
Phân quyền và tách dữ liệu nhiều đơn vị.

#### OOS-006
Theo dõi tiến độ học chi tiết theo từng bài/nghị quyết.

#### OOS-007
Hệ thống thông báo SMS/email/push.

#### OOS-008
Tìm kiếm toàn cục trên toàn hệ thống.

#### OOS-009
Playlist cá nhân, yêu thích bài hát và thống kê lượt nghe.

#### OOS-010
AI, chatbot, sinh câu hỏi bằng AI và các chức năng AI khác.

#### OOS-011
Microservices, Docker, Kubernetes, message broker và các thành phần hạ tầng phân tán.

---

## 4. Stakeholders and actors

### ACT-001 — Super Admin
Vai trò quản trị cao nhất trong hệ thống. Trong V1, hệ thống chỉ phục vụ một đơn vị.

### ACT-002 — Admin
Quản lý toàn bộ 9 phân hệ, nội dung, người dùng, câu hỏi, kỳ kiểm tra, cấu hình và thi đua.

### ACT-003 — User
Người sử dụng hệ thống để đọc/xem nội dung, làm bài kiểm tra, trả lời câu hỏi tuần và xem điểm/xếp hạng.

### ACT-004 — Cán bộ / Chiến sĩ
Là nhóm phân loại người dùng nghiệp vụ; không phải hệ thống role độc lập trong baseline hiện tại.

---

## 5. User management requirements

### USR-001 — Đăng nhập
Người dùng phải có thể đăng nhập bằng tên đăng nhập và mật khẩu.

### USR-002 — Tự đăng ký
Người dùng được tự đăng ký tài khoản.

### USR-003 — Mã giới thiệu
Đăng ký tài khoản phải yêu cầu mã giới thiệu hợp lệ do Admin cung cấp.

### USR-004 — Role
Mỗi tài khoản phải thuộc một role hệ thống phù hợp.

### USR-005 — Quy mô
Hệ thống MVP phải đáp ứng khoảng 500 người dùng của một đơn vị.

---

## 6. Module requirements

## 6.1 Cẩm nang người lính

### HAN-001
Admin phải có thể quản lý danh mục Cẩm nang.

### HAN-002
Admin phải có thể tạo, sửa, xóa và đăng bài Cẩm nang.

### HAN-003
Bài viết phải hỗ trợ văn bản, ảnh và video.

### HAN-004
Người dùng phải có thể duyệt bài theo danh mục.

### HAN-005
Người dùng phải có thể tìm kiếm nội dung trong phân hệ Cẩm nang.

---

## 6.2 Học tập nghị quyết

### RES-001
Admin phải có thể quản lý nghị quyết với tên, số/ký hiệu, ngày ban hành, cơ quan ban hành và nội dung.

### RES-002
Nghị quyết có thể có file tài liệu, video bài giảng và tài liệu liên quan.

### RES-003
Nghị quyết có thể được chia thành chuyên đề/bài học.

### RES-004
Người dùng phải có thể duyệt và đọc/xem nghị quyết.

### RES-005
MVP không yêu cầu giao nghị quyết bắt buộc hay theo dõi tiến độ học cá nhân.

---

## 6.3 Đọc báo và nghe tin

### NEWS-001
Admin phải có thể tạo và quản lý tin/bài.

### NEWS-002
Tin/bài phải hỗ trợ nội dung chữ, video và link bài báo.

### NEWS-003
Tin/bài phải có thể phân loại theo chuyên mục.

### NEWS-004
Hệ thống phải có khả năng mở rộng để lấy nội dung từ nguồn bên ngoài sau khi nguồn được phê duyệt.

### NEWS-005
MVP không cần lưu lịch sử người dùng đã đọc/nghe.

---

## 6.4 Kho tàng âm nhạc

### MUS-001
Admin phải có thể quản lý nội dung âm nhạc/video theo nhóm chủ đề.

### MUS-002
Hệ thống phải hỗ trợ video upload và nội dung từ YouTube.

### MUS-003
Người dùng phải có thể duyệt và phát nội dung âm nhạc/video.

### MUS-004
MVP không yêu cầu playlist, yêu thích hoặc thống kê lượt nghe.

---

## 6.5 Kiểm tra trắc nghiệm

### QUIZ-001
Admin phải có thể quản lý ngân hàng câu hỏi.

### QUIZ-002
Ngân hàng phải hỗ trợ câu hỏi một đáp án đúng và đúng/sai.

### QUIZ-003
Câu hỏi phải được phân loại theo chủ đề.

### QUIZ-004
Hệ thống phải có thể sinh đề ngẫu nhiên từ ngân hàng câu hỏi.

### QUIZ-005
Admin phải cấu hình được số lượng câu hỏi, thời gian làm bài và điểm đạt.

### QUIZ-006
Hệ thống phải đảo thứ tự câu hỏi và đáp án cho người làm bài.

### QUIZ-007
Hệ thống phải tự chấm bài.

### QUIZ-008
Sau khi nộp bài, người dùng chỉ cần nhận kết quả Đạt/Không đạt theo baseline nghiệp vụ.

### QUIZ-009
Kết quả kiểm tra phải có khả năng đóng góp vào điểm thi đua.

### QUIZ-010
Hệ thống phải có bảng xếp hạng kết quả kiểm tra.

---

## 6.6 Giáo dục chính trị

### EDU-001
Hệ thống phải tổ chức nội dung theo mô hình Chương trình → Chủ đề → Bài giảng → Tài liệu → Kiểm tra.

### EDU-002
Bài giảng phải hỗ trợ bài viết, PowerPoint và video.

### EDU-003
Người dùng phải có thể duyệt và xem nội dung giáo dục chính trị.

### EDU-004
MVP không theo dõi tiến độ học tập cá nhân.

---

## 6.7 Lời Bác Hồ dạy

### HCM-001
Admin phải có thể quản lý kho Lời Bác Hồ dạy.

### HCM-002
Mỗi mục có thể chứa nội dung, ngày/thời điểm, nguồn trích dẫn, hoàn cảnh, ý nghĩa, hình ảnh và nội dung liên quan.

### HCM-003
Hệ thống phải hiển thị “Lời Bác Hồ dạy hôm nay” trên trang chủ.

### HCM-004
MVP không yêu cầu tìm kiếm nâng cao theo từ khóa/chủ đề/ngày.

---

## 6.8 Mỗi tuần một câu hỏi

### WEEK-001
Tại một thời điểm nghiệp vụ, hệ thống hỗ trợ một câu hỏi kiến thức chính theo tuần.

### WEEK-002
Câu hỏi tuần là dạng trắc nghiệm.

### WEEK-003
Hệ thống phải tự chấm câu trả lời.

### WEEK-004
Hệ thống phải hỗ trợ công khai đáp án/lời giải.

### WEEK-005
Kết quả câu hỏi tuần phải có khả năng đóng góp vào điểm thi đua.

---

## 6.9 Chấm điểm thi đua

### COMP-001
Hệ thống phải hỗ trợ chấm điểm/xếp hạng cho cá nhân, trung đội và đại đội.

### COMP-002
Bảng xếp hạng phải hỗ trợ cá nhân, tiểu đội, trung đội và đại đội.

### COMP-003
Điểm thi đua có thể được lấy tự động từ hoạt động trên hệ thống.

### COMP-004
Nguồn điểm dự kiến gồm hoàn thành học tập, kết quả kiểm tra, câu hỏi tuần, tham gia hoạt động, điểm cộng và điểm trừ.

### COMP-005
Hệ thống phải hỗ trợ chu kỳ tuần, tháng và năm.

### COMP-006
Bảng xếp hạng được công khai cho người dùng.

### COMP-007
Công thức chấm điểm chi tiết phải được xác định trước khi hoàn thành Functional Specification/System Design của module thi đua.

---

## 7. Homepage requirements

### HOME-001
Trang chủ phải ưu tiên hiển thị 9 phân hệ chính dưới dạng các điểm truy cập trực quan.

### HOME-002
Trang chủ phải có banner/thông báo quan trọng.

### HOME-003
Trang chủ phải hiển thị “Lời Bác Hồ dạy hôm nay”.

### HOME-004
UI User Portal sử dụng ảnh mẫu đã cung cấp như visual reference, không clone 1:1.

### HOME-005
Website phải responsive trên máy tính và điện thoại.

---

## 8. Administration requirements

### ADM-001
Admin được quản lý toàn bộ 9 phân hệ.

### ADM-002
Admin được đăng nội dung trực tiếp mà không cần bước phê duyệt trong MVP.

### ADM-003
Admin phải có thể cấu hình các dữ liệu sau mà không cần sửa mã nguồn:
- Cơ cấu đơn vị.
- Chức vụ.
- Cấp bậc.
- Danh mục nội dung.
- Tiêu chí thi đua.
- Thang điểm.
- Năm học.
- Đợt học.
- Loại bài kiểm tra.

### ADM-004
MVP không yêu cầu audit trail đầy đủ cho mọi thay đổi Admin.

---

## 9. Reporting requirements

### REP-001
Dashboard phải hiển thị tổng quân số.

### REP-002
Dashboard phải hiển thị điểm thi đua.

### REP-003
Dashboard phải hiển thị xếp hạng.

### REP-004
Dashboard phải có khả năng hiển thị nội dung phổ biến.

### REP-005
Báo cáo phải hỗ trợ ngày, tuần, tháng và năm.

### REP-006
Hệ thống phải có khả năng xuất báo cáo Excel.

---

## 10. File and media requirements

### FILE-001
Hệ thống phải hỗ trợ upload file/media cần thiết cho các phân hệ.

### FILE-002
Hệ thống phải hỗ trợ xem PDF, Word và PowerPoint trên website nếu khả thi với định dạng/trình duyệt được hỗ trợ.

### FILE-003
Người dùng được phép tải tài liệu về máy.

### FILE-004
MVP không có yêu cầu nội dung “chỉ xem, không tải”.

### FILE-005
Giới hạn dung lượng upload phải được chốt ở System Design.

---

## 11. Non-functional requirements

### NFR-001 — Platform
Hệ thống là website responsive, không yêu cầu mobile native app.

### NFR-002 — User scale
MVP hướng tới khoảng 500 người dùng của một đơn vị.

### NFR-003 — Internet
Hệ thống được triển khai để sử dụng qua mạng Internet.

### NFR-004 — Security baseline
Phải có xác thực, phân quyền theo role và bảo vệ các endpoint quản trị.

### NFR-005 — Maintainability
Kiến trúc backend phải theo Modular Monolith để duy trì ranh giới module rõ ràng.

### NFR-006 — Database migration
Mọi thay đổi schema phải được quản lý bằng Flyway.

### NFR-007 — API documentation
REST API phải có OpenAPI/Swagger.

### NFR-008 — Testing
Các luồng nghiệp vụ quan trọng phải có automated tests; end-to-end sử dụng Playwright.

### NFR-009 — Deployment
Không sử dụng Docker trong baseline hiện tại.

### NFR-010 — Source control
Toàn bộ source code, docs và workflow phát triển được quản lý bằng GitHub.

---

## 12. Technology constraints

### TECH-001
Backend: Java 21 + Spring Boot 4.1.x.

### TECH-002
Database: MySQL 8.4 LTS.

### TECH-003
Frontend: React + TypeScript + Vite.

### TECH-004
Frontend core libraries: React Router, TanStack Query, React Hook Form, Zod, Ant Design.

### TECH-005
Persistence: Spring Data JPA + Hibernate.

### TECH-006
Authentication/authorization: Spring Security.

### TECH-007
Database migration: Flyway.

### TECH-008
Build backend: Maven Wrapper.

### TECH-009
API: REST + OpenAPI 3 / Swagger UI.

### TECH-010
E2E: Playwright + TypeScript.

### TECH-011
Web server: Nginx.

### TECH-012
Không sử dụng Docker và Testcontainers.

---

## 13. Business rules

### RULE-001
Chỉ Admin/Super Admin được phép tạo hoặc thay đổi nội dung quản trị.

### RULE-002
Người dùng chỉ có thể tự đăng ký khi cung cấp mã giới thiệu hợp lệ.

### RULE-003
Kỳ kiểm tra trắc nghiệm phải được sinh từ ngân hàng câu hỏi theo cấu hình được Admin xác định.

### RULE-004
Kết quả kiểm tra được tính tự động.

### RULE-005
Kết quả câu hỏi tuần được tính tự động.

### RULE-006
Các hoạt động được cấu hình là nguồn điểm thi đua có thể tự động cập nhật dữ liệu thi đua.

### RULE-007
Bảng xếp hạng thi đua được hiển thị công khai cho người dùng trong hệ thống.

### RULE-008
Mọi quy tắc điểm thi đua phải cấu hình/đặc tả rõ trước khi module thi đua được coi là hoàn thành.

---

## 14. Assumptions

### ASM-001
V1 chỉ phục vụ một đơn vị.

### ASM-002
Hệ thống không xử lý dữ liệu thuộc mức độ mật/hạn chế truy cập theo baseline hiện tại.

### ASM-003
Dữ liệu hiện có không bắt buộc import vào hệ thống.

### ASM-004
Admin chịu trách nhiệm chuẩn bị và kiểm duyệt nội dung trước khi đăng.

### ASM-005
Hạ tầng production sẽ được chốt trước giai đoạn triển khai.

---

## 15. Open issues

### OI-001 — External news sources
Chưa xác định nguồn báo/tin được phép lấy tự động.

### OI-002 — Competition scoring formula
Chưa có bộ tiêu chí/công thức điểm chính thức.

### OI-003 — Infrastructure
Chưa xác định server/hosting production.

### OI-004 — Initial data
Chưa xác định đầy đủ dữ liệu thật ban đầu.

### OI-005 — Upload limits
Chưa xác định kích thước file/video tối đa.

---

## 16. Milestones

### MS-001 — UI Reporting Prototype
**Target:** 2026-08-21

Mục tiêu:
- Có giao diện báo cáo/diễn trình được.
- Hiển thị đầy đủ 9 phân hệ.
- Có luồng chính Login → Home → Content/Quiz/Ranking → Admin.
- UI không phụ thuộc backend hoàn chỉnh.

### MS-002 — MVP V1
**Target:** before 2026-09-20

Mục tiêu:
- Backend + Frontend + MySQL tích hợp.
- Các nghiệp vụ MVP hoạt động.
- Có automated test quan trọng.
- Playwright E2E cho các critical flows.
- Đóng V1.0 Baseline.

---

## 17. Traceability policy

Mọi artifact sau V0.1 phải sử dụng Requirement ID từ tài liệu này.

Ví dụ:

```text
QUIZ-004
    ↓
Functional Specification
    ↓
Screen ID
    ↓
API ID
    ↓
Database entity/table
    ↓
Test Case
    ↓
Playwright E2E
```

Nếu yêu cầu thay đổi:
1. Không sửa âm thầm requirement cũ.
2. Cập nhật version tài liệu.
3. Ghi thay đổi vào CHANGELOG.
4. Cập nhật Traceability Matrix.
5. Đánh giá tác động tới code/test hiện có.

---

## 19. V0.4 Owner Decision Amendments — 2026-08-18

This section records approved amendments resulting from the V0.4 Blocking Business Decision Pack (Project Owner decisions approved 2026-08-18). No Requirement IDs are changed. Where existing text would be contradicted, the governing rule is the Owner Decision. All changes are traceable to `docs/decisions/V0.4-BLOCKING-BUSINESS-DECISIONS.md`.

### 19.1 Organization hierarchy and user assignment (BD-V04-014 → ACT-004, ADM-003, COMP-001, COMP-002, USR-004)

- Hierarchy is **fixed**: Đại đội > Trung đội > Tiểu đội. No additional levels.
- Each user (`ACT-003`) has exactly one **current Tiểu đội assignment**; assignment is the leaf-level membership.
- `ACT-004` (Cán bộ/Chiến sĩ) is confirmed as **business classification only**, not a system role. Classification is managed separately on the user record, not through system roles.
- Reassignment history is preserved over time; closed-period attribution does not change when a user is reassigned.
- **Ranking scopes** (governing `COMP-001`, `COMP-002`): Cá nhân, Tiểu đội, Trung đội, Đại đội.
  - `COMP-001` is amended: scoring/ranking now explicitly includes Tiểu đội alongside Trung đội and Đại đội.
  - `COMP-002` ranking scopes confirmed: Cá nhân, Tiểu đội, Trung đội, Đại đội.

### 19.2 Invitation lifecycle and scope (BD-V04-006 → USR-002, USR-003, RULE-002, ADM-003)

- Invitation is **single-use** (quota = 1); Admin is the issuer.
- **Expiry** is configurable; exact default duration is deferred to configuration/implementation.
- Each invitation is **scoped to one Tiểu đội**; successful registration automatically creates the user's current assignment to that Tiểu đội.
- Invitation does **not** assign Cán bộ/Chiến sĩ classification; classification is managed separately by Admin after registration.
- Consumption must be **atomic**; a disabled, expired, or already-consumed invitation is not valid.

### 19.3 Quiz attempt policy (BD-V04-007 → QUIZ-004..QUIZ-008, RULE-003, RULE-004)

- Attempt count is **limited**; the limit is Admin-configurable. Exact numeric default is deferred to configuration/implementation.
- Maximum **1 active attempt** per user per test at any time.
- An active attempt **resumes** across refresh/re-login; it does not create a second active attempt.
- The generated question set, question order, and answer order are **fixed** within an attempt.
- **Unanswered submit** is permitted with user confirmation.
- Final submission is **idempotent**.
- A new attempt may only be created when the previous attempt has reached a terminal state and the user has not exceeded the configured limit.

### 19.4 Quiz timeout finalization (BD-V04-008 → QUIZ-005, QUIZ-007)

- The **backend is authoritative** for attempt time.
- When configured duration expires, the backend **auto-finalizes** the attempt from answers already persisted; unanswered questions follow BD-V04-007 semantics.
- The finalized attempt is graded normally.
- **Late manual submission** after timeout finalization is not accepted.
- Finalization is **idempotent**.
- No background scheduler is required; finalization may occur at next request or via a controlled transition.
- The UI timer is **informational only**.

### 19.5 Quiz result and ranking policy (BD-V04-009 → QUIZ-007..QUIZ-010)

- Raw grading score is **persisted internally** but is **not exposed to USER** in V1 baseline.
- USER result UI displays **Đạt/Không đạt only** (confirms `QUIZ-008`).
- Quiz ranking (`QUIZ-010`) uses the **highest valid final graded attempt** per user per test; PASS/FAIL does not itself gate a valid finalized result from Quiz ranking.
- A timeout-finalized attempt is eligible for ranking if otherwise valid.
- Ranking metric: raw grading score descending. Equal scores share equal rank.
- Deterministic secondary ordering is for display only and is not a business tie-break.

### 19.6 Weekly question lifecycle (BD-V04-010 → WEEK-001..WEEK-005, RULE-005)

- Period identity: **calendar-week** semantics.
- **One submission** per user per weekly question; no additional submissions permitted.
- Late submission after period closes is **not accepted**.
- Server **auto-grades** the submission; the submitted result is final.
- Correct answer and explanation are revealed **after the period closes**.
- Competition eligibility controlled by BD-V04-002 (see §19.8).
- Exact Monday/Sunday/timezone boundary is configurable/pending explicit implementation decision.

### 19.7 Political Education Test association (BD-V04-011 → EDU-001, EDU-004)

- The "Kiểm tra" element in `EDU-001` hierarchy **reuses Quiz module capability**.
- Political Education owns: Program / Topic / Lecture / Document / placement-context.
- Quiz module owns: test configuration / attempt / submission / grading / result.
- V1 cardinality: **0..1 primary Quiz/Test per Lecture**.
- EDU module calls the **public Quiz application capability**; it does not access the Quiz module repository directly.
- EDU progress/completion tracking remains **excluded** (`EDU-004` unchanged).

### 19.8 Competition sources and scoring policy (BD-V04-002 → COMP-001..COMP-007, RULE-006..RULE-008)

- **Eligible source classes**: Quiz result; Weekly Question result; manual bonus/penalty adjustment.
- **Excluded**: learning completion; undefined participation/activity sources until explicitly approved.
- Policy and criteria are **Admin-configurable** within approved source classes; each policy version has an effective period.
- Historical closed periods retain the policy version applied at the time.
- **Manual adjustment**: allowed; Admin only; bonus or penalty; reason required; belongs to a competition period.
- **Individual aggregation**: sum of approved contributions within the period.
- **Unit aggregation**: normalized average of eligible-member individual scores; aggregates Tiểu đội → Trung đội → Đại đội. Raw total is not the unit ranking metric.
- **Periods**: weekly, monthly, yearly.
- **Tie**: equal final score shares equal rank; secondary deterministic ordering is display-only.
- **Recalculation**: open period may recalculate when source facts or policy change; closed period is stable; changing a closed period requires explicit authorized correction.
- Exact numeric coefficients and default weights are deferred to implementation/configuration; they must be Owner-approved before implementation of affected module.

### 19.9 Learning-completion source excluded (BD-V04-012 → COMP-004, RES-005, EDU-004, OOS-006)

- **`COMP-004` amendment**: "hoàn thành học tập" (learning completion) is **excluded from MVP competition scoring**.
- Quiz result and Weekly result are Quiz/Weekly facts respectively; they are not reinterpreted as learning-completion facts.
- `RES-005`, `EDU-004`, and `OOS-006` (no progress tracking) remain unchanged.
- Future inclusion of learning completion as a competition source requires an explicit scope change approved through change-control.

### 19.10 Popular-content metric (BD-V04-013 → REP-004, NEWS-005, MUS-004)

- Popularity metric: **aggregate successful detail-view count**.
- **No personal reading history**, no unique-user tracking, no viewer identity stored. Repeated valid detail views may count.
- Included baseline domains: Cẩm nang người lính, Học tập nghị quyết, Đọc báo và nghe tin, Giáo dục chính trị, Lời Bác Hồ dạy.
- Excluded by default: Quiz/Test; Weekly Question; Competition Ranking; Admin; authentication; Music.
- Ranking: aggregate detail-view count descending within the reporting period.
- Equal count: equal popularity position or deterministic display ordering; no business tie-break invented.
- Future unique-user metric requires explicit scope/privacy decision.

### 19.11 Deferred implementation values

The following values are approved-conceptually but deferred to configuration/implementation:
- Exact invitation expiry duration.
- Exact quiz attempt limit numeric default.
- Exact quiz grading point scale beyond pass/fail semantics.
- Exact numeric competition weights/coefficients.
- Exact calendar timezone/Monday boundary for weekly question.

### 19.12 Competition unit attribution rule (Owner Clarification 1A — 2026-08-18)

**Approved: Option 1A — Period-end assignment attribution.**

Governing requirements: `COMP-001`, `COMP-002`, `BD-V04-014`, `BD-V04-002`.

- For each competition period, a user is attributed to **exactly one Tiểu đội**.
- The Tiểu đội is determined by the organization assignment **effective at `competition_period.ends_at`**.
- A user's scores are **not split across multiple Tiểu đội** within the same period.
- The attributed Tiểu đội is used to derive the parent Trung đội and Đại đội for aggregation.
- When a period is **CLOSED**, the unit attribution must be **snapshot/stabilized**; reassignment after period close does **not** alter the historical attribution.
- A mid-period transfer does **not** cause the same user to be counted in two Tiểu đội for that period.
- If no valid Tiểu đội assignment exists at `period.ends_at` (pathological edge case), business eligibility is **not invented**; the case is documented for implementation validation.

### 19.13 Competition Quiz and Weekly source semantics (Owner Clarification 2A — 2026-08-18)

**Approved: Option 2A.**

Governing requirements: `QUIZ-007..QUIZ-010`, `WEEK-003..WEEK-005`, `COMP-003`, `BD-V04-009`, `BD-V04-002`.

**Quiz contribution:**
- Quiz module owns grading, result, and ranking semantics.
- For a given Quiz/Test, the **highest eligible final graded attempt** is the result used for competition source selection.
- Only a **PASS (Đạt)** result may produce a competition contribution.
- A **FAIL (Không đạt)** result does **not** produce a competition contribution.
- A timeout-finalized graded result remains valid under `BD-V04-008`/`BD-V04-009` rules.
- Competition module owns whether and how the valid source result contributes points; competition policy provides the Admin-configured point value/weight.
- No multiple Quiz contributions from multiple attempts of the same qualifying Quiz/Test in the same competition period.

**Weekly Question contribution:**
- A correct final Weekly submission **may** produce a competition contribution.
- An **incorrect** result does **not** produce a competition contribution.
- Point value/weight is Admin-configured in Competition policy.

**Manual adjustment:**
- Approved bonus/penalty semantics are preserved (see §19.8).
- No new numeric formula or default is invented.

**Stability:**
- Competition periods remain authoritative boundaries for competition facts.
- Later source facts do **not** silently rewrite a CLOSED period.

---

## 18. Approval criteria for V0.1

V0.1 được coi là chốt khi:
- Phạm vi 9 phân hệ được xác nhận.
- Role cơ bản được xác nhận.
- Technology Baseline được xác nhận.
- Mốc UI 21/08/2026 được xác nhận.
- Mốc MVP trước 20/09/2026 được xác nhận.
- Open Issues được chấp nhận là không chặn bước tiếp theo.

Sau khi V0.1 được chốt, bước kế tiếp là `V0.2 — Functional Specification`.
