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

## 18. Approval criteria for V0.1

V0.1 được coi là chốt khi:
- Phạm vi 9 phân hệ được xác nhận.
- Role cơ bản được xác nhận.
- Technology Baseline được xác nhận.
- Mốc UI 21/08/2026 được xác nhận.
- Mốc MVP trước 20/09/2026 được xác nhận.
- Open Issues được chấp nhận là không chặn bước tiếp theo.

Sau khi V0.1 được chốt, bước kế tiếp là `V0.2 — Functional Specification`.
