# FUNCTIONAL SPECIFICATION — V0.2

**Project:** Hệ thống Giáo dục Chính trị  
**Document ID:** PES-FS-V0.2  
**Version:** 0.2  
**Date:** 2026-08-15  
**Status:** Review Ready  
**Depends on:** `docs/00-input/REQUIREMENTS-BASELINE.md`, `docs/v0.1/BUSINESS-REQUIREMENTS.md`  
**Downstream:** `docs/v0.2/SCREEN-CATALOG.md`, P0 wireframe, V0.3 System Design, V0.4 Database Design, V0.6 Test & Acceptance

---

## 1. Mục đích và ranh giới

Tài liệu chuyển yêu cầu V0.1 thành hành vi chức năng đủ để review, dựng wireframe và lập kế hoạch implementation/test. Mọi hành vi phải truy ngược được về Requirement ID; khoảng trống nghiệp vụ được ghi thành Open Issue thay vì được lấp bằng giả định.

V0.2 không khóa endpoint, request/response DTO, cơ chế JWT/session, bảng/cột database, SQL/index, thư viện preview, storage provider hoặc visual style cuối cùng. Các route trong Screen Catalog chỉ là route khái niệm.

## 2. Nguồn và thứ tự ưu tiên

1. `docs/v0.1/BUSINESS-REQUIREMENTS.md` là nguồn Requirement ID chính.
2. `docs/00-input/REQUIREMENTS-BASELINE.md` là input đã Accepted.
3. Các ADR Accepted khóa technology baseline và No-Docker.
4. Wireframe/UI reference chỉ mô tả hướng trình bày; không phải business truth.
5. Code shell không được dùng để suy ngược business rule.

## 3. Quy ước

| Artifact | Convention | Ghi chú |
|---|---|---|
| Requirement | ID ổn định từ V0.1 | Không rename trong V0.2 |
| Use Case | `UC-<DOMAIN>-NNN` | Giữ các ID đã tồn tại, kể cả `UC-ADM-USER-001`, `UC-ADM-INV-001`, `UC-ADM-CFG-001` |
| Screen | `SCR-<DOMAIN>-NNN` | Danh mục chuẩn ở Screen Catalog |
| Acceptance Criteria | `AC-UC-<DOMAIN>-NNN-NN` | Có thể kiểm thử, không mô tả pixel/style |
| Open Issue | `OI-NNN` | Không chứa quyết định khi chưa có căn cứ |
| API / DB / final Test | `TBD` | Chỉ xác định ở version downstream tương ứng |

`ADMIN` trong các flow dưới đây bao gồm `ADMIN` và `SUPER_ADMIN`, trừ khi có ghi khác. `USER` là người dùng đã xác thực. Cán bộ/Chiến sĩ là phân loại nghiệp vụ, không phải role hệ thống độc lập (`ACT-004`).

## 4. Requirement inventory và coverage policy

### 4.1 Inventory V0.1

| Nhóm | Phân loại | Số ID | Cách xử lý trong V0.2 |
|---|---|---:|---|
| `BR-*` | Business objective | 7 | Bao phủ bởi các domain Use Case và mục 5 |
| `SCOPE-*` | Functional scope container | 11 | Bao phủ bởi các domain Use Case; không cần UC trùng lặp |
| `OOS-*` | Out of scope | 11 | Giữ nguyên ở mục 5.2 |
| `ACT-*` | Actor | 4 | Dùng ở mục 3 và các Use Case |
| `USR/HAN/RES/NEWS/MUS/QUIZ/EDU/HCM/WEEK/COMP/HOME/ADM/REP/FILE-*` | Functional requirement | 74 | Map chi tiết trong từng UC/mục 5 và Traceability Matrix |
| `NFR-*` | Non-functional | 10 | Functional constraints ở mục 6; không tạo UC giả |
| `TECH-*` | Technical constraint | 12 | Giữ nguyên baseline ở mục 6.6; không thiết kế lại |
| `RULE-*` | Business rule | 8 | Tham chiếu trong UC và mục 5.3 |
| `ASM-*` | Assumption | 5 | Không chuyển thành behavior; rủi ro liên quan nằm ở Open Issues |
| `OI-*` | Open issue có sẵn | 5 | Giữ nguyên ID, mở rộng ở mục 25 |
| `MS-*` | Milestone | 2 | Dùng để phân loại P0/P1 và thời điểm cần quyết định |

### 4.2 Requirement không cần Use Case riêng

| Requirement | Nơi xử lý | Lý do |
|---|---|---|
| `USR-005`, `NFR-002` | Mục 6.1 | Quy mô/tải mục tiêu, không phải tương tác người dùng |
| `RES-005`, `NEWS-005`, `MUS-004`, `EDU-004`, `HCM-004`, `ADM-004`, `FILE-004` | Mục 5.2 và UC liên quan | Ràng buộc loại trừ, không tạo flow mới |
| `HOME-004`, `HOME-005`, `NFR-001` | `UC-HOME-001`, mục 6.2 | Hướng UI/responsive, không phải use case độc lập |
| `NFR-003..NFR-010`, `TECH-001..TECH-012` | Mục 6.6 | Quality/technology constraint, không phải business flow |
| `RULE-001..RULE-008` | UC liên quan và mục 5.3 | Rule điều phối behavior, không phải actor goal độc lập |
| `COMP-007`, `FILE-005` | UC liên quan + `OI-002`, `OI-005` | Quyết định bắt buộc trước implementation, chưa đủ dữ kiện để chốt |

## 5. Phạm vi chức năng đã chốt

### 5.1 In scope

- 9 phân hệ `SCOPE-001..SCOPE-009`.
- Quản trị hệ thống và báo cáo `SCOPE-010..SCOPE-011`.
- Đăng nhập, tự đăng ký bằng mã giới thiệu, role `SUPER_ADMIN/ADMIN/USER`.
- Website responsive cho một đơn vị, khoảng 500 người dùng.

### 5.2 Out of scope / negative behavior

`OOS-001..OOS-011` giữ nguyên: không mobile native, 2FA, workflow duyệt nhiều bước, permission CRUD chi tiết, multi-unit, theo dõi tiến độ học, SMS/email/push, tìm kiếm toàn cục, playlist/favorite/listening statistics, AI hoặc hạ tầng phân tán. Theo đó:

- Không tạo trạng thái giao bài/tiến độ cho Nghị quyết hoặc Giáo dục chính trị (`RES-005`, `EDU-004`).
- Không lưu lịch sử đọc/nghe (`NEWS-005`) hoặc playlist/yêu thích/thống kê lượt nghe (`MUS-004`).
- Không thêm tìm kiếm nâng cao cho Lời Bác Hồ dạy (`HCM-004`).
- Nội dung Admin đăng trực tiếp, không có bước phê duyệt (`ADM-002`); audit trail đầy đủ không bắt buộc (`ADM-004`).
- Tài liệu công khai được tải; không có chế độ “chỉ xem, không tải” (`FILE-004`).

### 5.3 Business rules dùng chung

- `RULE-001`: chỉ ADMIN được tạo/thay đổi nội dung quản trị.
- `RULE-002`: đăng ký chỉ thành công với mã giới thiệu hợp lệ.
- `RULE-003..RULE-004`: đề kiểm tra theo cấu hình từ ngân hàng và được chấm tự động.
- `RULE-005`: câu hỏi tuần được chấm tự động.
- `RULE-006..RULE-008`: nguồn điểm có thể cập nhật thi đua, bảng xếp hạng công khai, nhưng rule điểm phải được chốt trước khi module hoàn thành.

## 6. Functional constraints dùng chung

### 6.1 Danh sách và tài nguyên

- Danh sách nội dung có thể tăng và tất cả bảng quản trị phải hỗ trợ pagination; filter/search chỉ áp dụng khi UC hoặc Screen Catalog nêu rõ.
- Media chỉ tải/phát khi người dùng mở nội dung; list không tải đồng thời toàn bộ file/video đầy đủ.
- UI phải có loading, empty và error state có ý nghĩa; form đang submit phải ngăn double-submit.
- Không có polling/cron/background job được yêu cầu trong V0.2. Báo cáo và export chạy theo thao tác người dùng.

### 6.2 UI và accessibility

- Home hiển thị đủ 9 điểm truy cập chính. Desktop ưu tiên 3 cột khi đủ chỗ; mobile 1–2 cột.
- User Portal content-first; Admin Portal table/form/dashboard oriented.
- Wireframe phải thể hiện label/action/state chính, không khóa visual token hoặc pixel layout.

### 6.3 Quiz data exposure

- Client chỉ nhận dữ liệu cần cho attempt hiện tại; không gửi toàn bộ ngân hàng câu hỏi hoặc đáp án đúng trước khi được phép công khai.
- Chấm kết quả là quyết định phía server ở thiết kế sau; V0.2 không chọn persistence/API mechanism.

### 6.4 Thời gian

Timezone chức năng là `Asia/Ho_Chi_Minh` cho “hôm nay”, tuần, kỳ kiểm tra, báo cáo và chu kỳ thi đua. Cách lưu timestamp thuộc V0.3/V0.4.

### 6.5 Security behavior

- Admin capability yêu cầu role `ADMIN` hoặc `SUPER_ADMIN`; USER truy cập chức năng Admin nhận unauthorized/forbidden state.
- Password không hiển thị/lưu plaintext; backend là nguồn validation cuối cùng.
- Rich text/file input phải được kiểm tra an toàn; chi tiết kỹ thuật thuộc V0.3.

### 6.6 Technology/non-functional baseline

`NFR-001..NFR-010` và `TECH-001..TECH-012` giữ nguyên: Java 21, Spring Boot 4.1.x Modular Monolith/REST/Security/JPA/Flyway/Maven Wrapper, MySQL 8.4 LTS, React 19/TypeScript/Vite 8 và các thư viện baseline, Playwright, Nginx, GitHub; không Docker/Compose/Testcontainers. V0.2 không thay đổi baseline này.

## 7. Authentication & Account

### UC-AUTH-001 — Đăng nhập

| Field | Specification |
|---|---|
| Related Requirements | `USR-001`, `USR-004`, `NFR-004` |
| Actor | USER, ADMIN |
| Preconditions | Tài khoản tồn tại và có thông tin xác thực hợp lệ. |
| Trigger | Actor mở màn hình đăng nhập và chọn đăng nhập. |
| Input | Tên đăng nhập, mật khẩu. |
| Main Flow | 1. Actor nhập thông tin. 2. Hệ thống kiểm tra trường bắt buộc. 3. Hệ thống xác thực. 4. Nếu hợp lệ, hệ thống thiết lập trạng thái đăng nhập theo thiết kế V0.3. 5. Điều hướng đến User Portal hoặc Admin Portal phù hợp role/ngữ cảnh. |
| Alternative Flow | Actor đã có trạng thái đăng nhập hợp lệ được điều hướng tới portal phù hợp. |
| Error / Exception Flow | Thiếu input; thông tin không hợp lệ; lỗi hệ thống; USER truy cập Admin nhận unauthorized. Thông báo không phân biệt username không tồn tại với password sai. |
| Validation | Username và password bắt buộc. |
| Business Rules | Role quyết định capability; không khóa JWT/session trong V0.2. |
| Output | Đăng nhập thành công hoặc thông báo lỗi không lộ thông tin tài khoản. |
| Postconditions | Thành công: actor được xác thực. Thất bại: không tạo trạng thái đăng nhập. |
| Acceptance Criteria | `AC-UC-AUTH-001-01`: thông tin hợp lệ cho phép vào portal phù hợp.<br>`AC-UC-AUTH-001-02`: thông tin sai/thiếu không tạo trạng thái đăng nhập.<br>`AC-UC-AUTH-001-03`: USER không dùng được chức năng Admin. |
| Related Screens | `SCR-AUTH-001`, `SCR-HOME-001`, `SCR-ADM-001` |
| Open Issues | Không. Cơ chế xác thực thuộc V0.3. |

### UC-AUTH-002 — Đăng ký bằng mã giới thiệu

| Field | Specification |
|---|---|
| Related Requirements | `USR-002`, `USR-003`, `RULE-002` |
| Actor | Người chưa có tài khoản |
| Preconditions | Actor có mã giới thiệu; hệ thống cho phép tự đăng ký theo baseline. |
| Trigger | Actor chọn đăng ký. |
| Input | Username, password, xác nhận password, mã giới thiệu, tên hiển thị, phân loại Cán bộ/Chiến sĩ. |
| Main Flow | 1. Actor nhập dữ liệu. 2. Hệ thống validate. 3. Kiểm tra username chưa tồn tại. 4. Kiểm tra mã giới thiệu hợp lệ theo chính sách sẽ được chốt. 5. Tạo tài khoản role USER. 6. Thông báo thành công và cung cấp đường tới đăng nhập. |
| Alternative Flow | Không chốt auto-login; wireframe dùng bước trở về đăng nhập để không giả định cơ chế phiên. |
| Error / Exception Flow | Thiếu/sai input, username trùng, password không khớp, mã không hợp lệ hoặc lỗi hệ thống → không tạo tài khoản. |
| Validation | Trường bắt buộc; username không trùng; password/xác nhận khớp; phân loại thuộc Cán bộ/Chiến sĩ; mã phải hợp lệ. |
| Business Rules | `RULE-002`; lifecycle/expiration/usage của mã chưa được quyết định. |
| Output | Xác nhận đăng ký hoặc lỗi cụ thể ở mức form. |
| Postconditions | Thành công: có tài khoản USER mới. Thất bại: không tạo tài khoản. |
| Acceptance Criteria | `AC-UC-AUTH-002-01`: mã không hợp lệ không tạo user.<br>`AC-UC-AUTH-002-02`: username trùng hoặc password không khớp không tạo user.<br>`AC-UC-AUTH-002-03`: dữ liệu hợp lệ tạo đúng role USER. |
| Related Screens | `SCR-AUTH-002`, `SCR-AUTH-001` |
| Open Issues | `OI-006` |

## 8. Home / User Portal

### UC-HOME-001 — Xem trang chủ

| Field | Specification |
|---|---|
| Related Requirements | `HOME-001..HOME-005`, `HCM-003`, `COMP-006` |
| Actor | USER, ADMIN |
| Preconditions | Actor đã đăng nhập. |
| Trigger | Actor vào User Portal hoặc chọn Home. |
| Input | Không có input nghiệp vụ bắt buộc. |
| Main Flow | 1. Hệ thống hiển thị header/profile. 2. Hiển thị banner/thông báo nếu có. 3. Hiển thị đúng 9 module card. 4. Hiển thị Lời Bác Hồ dạy hôm nay nếu có dữ liệu. 5. Actor chọn card để vào module. |
| Alternative Flow | Không có banner/lời dạy hôm nay → hiển thị empty state phù hợp, không tạo nội dung giả. |
| Error / Exception Flow | Không tải được một vùng dữ liệu → vùng đó hiển thị error/retry mà không làm mất navigation 9 module. |
| Validation | 9 module phải đủ và không trùng; link điều hướng phải tương ứng module. |
| Business Rules | UI reference chỉ là hướng visual; không clone 1:1. |
| Output | Trang chủ responsive với 9 điểm truy cập và nội dung hỗ trợ. |
| Postconditions | Không thay đổi dữ liệu nghiệp vụ. |
| Acceptance Criteria | `AC-UC-HOME-001-01`: hiển thị đủ 9 module trên desktop/mobile.<br>`AC-UC-HOME-001-02`: mỗi card dẫn tới đúng module khái niệm.<br>`AC-UC-HOME-001-03`: thiếu nội dung phụ không làm hỏng navigation. |
| Related Screens | `SCR-HOME-001`, `SCR-HCM-001`, `SCR-COMP-002` |
| Open Issues | Nội dung “phổ biến” nếu đặt trên Home phụ thuộc `OI-013`. |

## 9. Cẩm nang người lính

### UC-HAN-001 — Duyệt danh mục và danh sách bài

| Field | Specification |
|---|---|
| Related Requirements | `HAN-004` |
| Actor | USER, ADMIN |
| Preconditions | Có thể chưa có danh mục/bài công khai. |
| Trigger | Actor mở Cẩm nang hoặc chọn danh mục. |
| Input | Danh mục, trang danh sách. |
| Main Flow | 1. Hiển thị danh mục. 2. Actor chọn danh mục. 3. Hiển thị danh sách bài công khai có pagination. 4. Actor chọn bài. |
| Alternative Flow | Không chọn danh mục → hiển thị danh sách mặc định; không có bài → empty state. |
| Error / Exception Flow | Danh mục/bài không còn khả dụng hoặc lỗi tải → thông báo và retry/quay lại danh sách. |
| Validation | Chỉ hiển thị bài công khai và thuộc đúng danh mục. |
| Business Rules | Không favorite/read-later. |
| Output | Danh mục và danh sách bài. |
| Postconditions | Không thay đổi dữ liệu. |
| Acceptance Criteria | `AC-UC-HAN-001-01`: lọc danh mục trả đúng bài công khai.<br>`AC-UC-HAN-001-02`: list có loading/empty/error và pagination.<br>`AC-UC-HAN-001-03`: chọn bài mở chi tiết tương ứng. |
| Related Screens | `SCR-HAN-001`, `SCR-HAN-002`, `SCR-HAN-003` |
| Open Issues | Không. |

### UC-HAN-002 — Xem chi tiết bài

| Field | Specification |
|---|---|
| Related Requirements | `HAN-003`, `HAN-004` |
| Actor | USER, ADMIN |
| Preconditions | Bài tồn tại và được công khai với actor. |
| Trigger | Actor chọn bài từ danh sách/kết quả tìm kiếm. |
| Input | Bài được chọn. |
| Main Flow | 1. Tải metadata/nội dung. 2. Hiển thị văn bản. 3. Tải ảnh/video theo nhu cầu. 4. Cho phép quay lại danh sách. |
| Alternative Flow | Bài chỉ có một số loại media → hiển thị phần có dữ liệu. |
| Error / Exception Flow | Bài không tồn tại/không công khai; media lỗi → thông báo phù hợp, không làm hỏng toàn trang. |
| Validation | Không render nội dung không công khai; rich text/media phải qua kiểm tra an toàn ở implementation. |
| Business Rules | `RULE-001` áp dụng cho nguồn nội dung quản trị. |
| Output | Chi tiết bài với text/ảnh/video khả dụng. |
| Postconditions | Không lưu lịch sử đọc. |
| Acceptance Criteria | `AC-UC-HAN-002-01`: render đúng nội dung công khai.<br>`AC-UC-HAN-002-02`: media lỗi được cô lập.<br>`AC-UC-HAN-002-03`: nội dung không khả dụng trả not-found/unavailable state. |
| Related Screens | `SCR-HAN-003` |
| Open Issues | `OI-005` khi bài dùng upload media. |

### UC-HAN-003 — Tìm kiếm trong Cẩm nang

| Field | Specification |
|---|---|
| Related Requirements | `HAN-005` |
| Actor | USER, ADMIN |
| Preconditions | Actor ở phân hệ Cẩm nang. |
| Trigger | Actor nhập từ khóa và chọn tìm. |
| Input | Từ khóa, trang kết quả; danh mục nếu kết hợp lọc. |
| Main Flow | 1. Trim từ khóa. 2. Tìm trong phạm vi Cẩm nang. 3. Hiển thị kết quả công khai có pagination. 4. Actor mở bài. |
| Alternative Flow | Từ khóa rỗng → trở về danh sách mặc định; không kết quả → empty state. |
| Error / Exception Flow | Lỗi tìm kiếm → giữ input và cho retry. |
| Validation | Không phải tìm kiếm toàn cục; không trả nội dung không công khai. |
| Business Rules | `OOS-008` giới hạn phạm vi Cẩm nang. |
| Output | Danh sách kết quả. |
| Postconditions | Không thay đổi dữ liệu. |
| Acceptance Criteria | `AC-UC-HAN-003-01`: từ khóa hợp lệ chỉ tìm trong Cẩm nang.<br>`AC-UC-HAN-003-02`: từ khóa rỗng không phát sinh lỗi.<br>`AC-UC-HAN-003-03`: kết quả mở được chi tiết tương ứng. |
| Related Screens | `SCR-HAN-002`, `SCR-HAN-003` |
| Open Issues | Không. |

## 10. Học tập nghị quyết

### UC-RES-001 — Xem danh sách nghị quyết

| Field | Specification |
|---|---|
| Related Requirements | `RES-001`, `RES-004` |
| Actor | USER, ADMIN |
| Preconditions | Có thể chưa có nghị quyết công khai. |
| Trigger | Actor mở phân hệ Nghị quyết. |
| Input | Trang danh sách. |
| Main Flow | 1. Tải danh sách công khai có pagination. 2. Hiển thị tên, số/ký hiệu, ngày và cơ quan ban hành. 3. Actor chọn nghị quyết. |
| Alternative Flow | Không có dữ liệu → empty state. |
| Error / Exception Flow | Lỗi tải → error/retry; mục không còn khả dụng → refresh list. |
| Validation | Chỉ mục công khai; metadata hiển thị theo dữ liệu Admin đã lưu. |
| Business Rules | Không giao bắt buộc hoặc theo dõi tiến độ (`RES-005`). |
| Output | Danh sách nghị quyết. |
| Postconditions | Không thay đổi dữ liệu. |
| Acceptance Criteria | `AC-UC-RES-001-01`: list có metadata chính, pagination và states.<br>`AC-UC-RES-001-02`: chọn mục mở đúng chi tiết. |
| Related Screens | `SCR-RES-001`, `SCR-RES-002` |
| Open Issues | Không. |

### UC-RES-002 — Xem chi tiết nghị quyết

| Field | Specification |
|---|---|
| Related Requirements | `RES-002..RES-005` |
| Actor | USER, ADMIN |
| Preconditions | Nghị quyết tồn tại và công khai. |
| Trigger | Actor chọn nghị quyết. |
| Input | Nghị quyết được chọn; chuyên đề/bài học nếu actor điều hướng sâu. |
| Main Flow | 1. Hiển thị metadata/nội dung. 2. Hiển thị chuyên đề/bài học. 3. Hiển thị file, video, tài liệu liên quan. 4. Actor đọc/xem/tải theo capability file. |
| Alternative Flow | Một loại tài liệu không có → ẩn/empty đúng vùng. |
| Error / Exception Flow | Không tìm thấy/không công khai; media/file lỗi → unavailable state và fallback download nếu phù hợp. |
| Validation | Không tạo progress/completion/quiz riêng cho Nghị quyết. |
| Business Rules | `RES-005`, `FILE-003`, `FILE-004`. |
| Output | Nội dung nghị quyết và tài liệu liên quan. |
| Postconditions | Không ghi nhận tiến độ học. |
| Acceptance Criteria | `AC-UC-RES-002-01`: actor xem được dữ liệu công khai theo cấu trúc.<br>`AC-UC-RES-002-02`: không xuất hiện progress/assignment state.<br>`AC-UC-RES-002-03`: lỗi file không phá nội dung chính. |
| Related Screens | `SCR-RES-002` |
| Open Issues | `OI-005`, `OI-015` cho file/preview. |

## 11. Đọc báo và nghe tin

### UC-NEWS-001 — Duyệt tin theo chuyên mục

| Field | Specification |
|---|---|
| Related Requirements | `NEWS-001`, `NEWS-003` |
| Actor | USER, ADMIN |
| Preconditions | Có thể chưa có tin công khai. |
| Trigger | Actor mở module hoặc chọn chuyên mục. |
| Input | Chuyên mục, trang danh sách. |
| Main Flow | 1. Hiển thị chuyên mục. 2. Actor chọn/lọc. 3. Hiển thị tin công khai có pagination. 4. Actor chọn tin. |
| Alternative Flow | Không chọn chuyên mục → list mặc định; không dữ liệu → empty state. |
| Error / Exception Flow | Lỗi tải hoặc chuyên mục không còn khả dụng → thông báo/retry. |
| Validation | Tin phải thuộc chuyên mục hợp lệ khi dữ liệu có phân loại. |
| Business Rules | Không lưu lịch sử đọc/nghe (`NEWS-005`). |
| Output | Danh sách tin theo chuyên mục. |
| Postconditions | Không thay đổi dữ liệu. |
| Acceptance Criteria | `AC-UC-NEWS-001-01`: filter trả tin đúng chuyên mục.<br>`AC-UC-NEWS-001-02`: list có pagination/loading/empty/error. |
| Related Screens | `SCR-NEWS-001`, `SCR-NEWS-002` |
| Open Issues | `OI-001` chỉ liên quan nội dung nguồn ngoài. |

### UC-NEWS-002 — Xem chi tiết tin

| Field | Specification |
|---|---|
| Related Requirements | `NEWS-002`, `NEWS-005` |
| Actor | USER, ADMIN |
| Preconditions | Tin tồn tại và công khai. |
| Trigger | Actor chọn tin. |
| Input | Tin được chọn. |
| Main Flow | 1. Hiển thị nội dung chữ/metadata. 2. Nếu có video, tải khi actor xem. 3. Nếu có link ngoài, cho phép mở link với nhận diện rõ. |
| Alternative Flow | Tin chỉ có một trong các loại chữ/video/link. |
| Error / Exception Flow | Tin/link/media không khả dụng → thông báo; nội dung còn lại vẫn hiển thị nếu có. |
| Validation | Link/video phải là dữ liệu Admin đã cung cấp; không suy ra cơ chế crawl. |
| Business Rules | Không lưu lịch sử đọc/nghe. |
| Output | Chi tiết tin hoặc chuyển tới nguồn ngoài theo hành động actor. |
| Postconditions | Không ghi nhận lịch sử cá nhân. |
| Acceptance Criteria | `AC-UC-NEWS-002-01`: hiển thị đúng loại nội dung.<br>`AC-UC-NEWS-002-02`: external link được phân biệt với nội dung nội bộ.<br>`AC-UC-NEWS-002-03`: media/link lỗi không làm hỏng trang. |
| Related Screens | `SCR-NEWS-002` |
| Open Issues | `OI-001` nếu tin đến từ tích hợp ngoài. |

### UC-NEWS-003 — Tích hợp nguồn tin ngoài (deferred)

| Field | Specification |
|---|---|
| Related Requirements | `NEWS-004` |
| Actor | ADMIN, hệ thống tích hợp tương lai |
| Preconditions | Nguồn và quyền sử dụng đã được phê duyệt. Điều kiện này hiện chưa đạt. |
| Trigger | Quyết định triển khai tích hợp sau khi `OI-001` được chốt. |
| Input | Nguồn/nội dung theo quyết định tương lai; chưa định nghĩa RSS/API/crawler. |
| Main Flow | Deferred; V0.2 chỉ giữ extension boundary. |
| Alternative Flow | Admin tiếp tục đăng nội dung trực tiếp qua `UC-ADM-001`. |
| Error / Exception Flow | Không triển khai khi chưa có nguồn/quyền/phương thức được duyệt. |
| Validation | Không có validation integration trước quyết định. |
| Business Rules | Không tự chọn báo, RSS, crawler hoặc API. |
| Output | Chưa có output implementation. |
| Postconditions | Không thay đổi behavior MVP hiện tại. |
| Acceptance Criteria | `AC-UC-NEWS-003-01`: tài liệu giữ boundary nhưng không khẳng định cơ chế tích hợp.<br>`AC-UC-NEWS-003-02`: implementation bị chặn cho tới khi `OI-001` có quyết định. |
| Related Screens | Không có screen riêng; nội dung được quản lý ở `SCR-ADM-006` sau này nếu được duyệt. |
| Open Issues | `OI-001` |

## 12. Kho tàng âm nhạc

### UC-MUS-001 — Duyệt kho âm nhạc

| Field | Specification |
|---|---|
| Related Requirements | `MUS-001`, `MUS-003` |
| Actor | USER, ADMIN |
| Preconditions | Có thể chưa có nội dung công khai. |
| Trigger | Actor mở kho hoặc chọn nhóm chủ đề. |
| Input | Nhóm chủ đề, trang danh sách. |
| Main Flow | 1. Hiển thị nhóm chủ đề. 2. Actor lọc nhóm. 3. Hiển thị nội dung công khai có pagination. 4. Actor chọn nội dung để phát. |
| Alternative Flow | Không nhóm/dữ liệu → list mặc định hoặc empty state. |
| Error / Exception Flow | Lỗi tải → error/retry. |
| Validation | Chỉ nội dung công khai; nhóm phải hợp lệ. |
| Business Rules | Không playlist/favorite/history/recommendation/statistics (`MUS-004`). |
| Output | Danh sách âm nhạc/video. |
| Postconditions | Không thay đổi dữ liệu. |
| Acceptance Criteria | `AC-UC-MUS-001-01`: lọc theo nhóm đúng dữ liệu.<br>`AC-UC-MUS-001-02`: list có pagination và states. |
| Related Screens | `SCR-MUS-001`, `SCR-MUS-002` |
| Open Issues | Không. |

### UC-MUS-002 — Phát nội dung âm nhạc/video

| Field | Specification |
|---|---|
| Related Requirements | `MUS-002..MUS-004` |
| Actor | USER, ADMIN |
| Preconditions | Nội dung tồn tại, công khai và có nguồn upload hoặc YouTube. |
| Trigger | Actor chọn phát/xem. |
| Input | Nội dung được chọn. |
| Main Flow | 1. Tải metadata. 2. Khởi tạo player khi actor yêu cầu. 3. Phát nguồn upload hoặc YouTube. 4. Cho phép quay lại danh sách. |
| Alternative Flow | Nguồn không hỗ trợ phát trực tiếp → hiển thị unavailable/fallback phù hợp với source. |
| Error / Exception Flow | Link/video lỗi hoặc bị gỡ → thông báo, không lặp retry tự động. |
| Validation | Chỉ dùng source type đã hỗ trợ; không tải toàn bộ media từ list. |
| Business Rules | Không ghi listening statistics/history. |
| Output | Nội dung được phát hoặc lỗi nguồn rõ ràng. |
| Postconditions | Không lưu lịch sử/yêu thích. |
| Acceptance Criteria | `AC-UC-MUS-002-01`: nguồn hợp lệ phát theo hành động actor.<br>`AC-UC-MUS-002-02`: lỗi nguồn có state riêng.<br>`AC-UC-MUS-002-03`: không tự phát/tải toàn bộ media trên list. |
| Related Screens | `SCR-MUS-002` |
| Open Issues | `OI-005` cho upload limit. |

## 13. Kiểm tra trắc nghiệm

### UC-QUIZ-001 — Admin quản lý ngân hàng câu hỏi

| Field | Specification |
|---|---|
| Related Requirements | `QUIZ-001..QUIZ-003`, `RULE-001` |
| Actor | ADMIN |
| Preconditions | Actor đã đăng nhập và có quyền Admin; chủ đề dùng cho câu hỏi đã tồn tại hoặc được quản lý trong cùng capability. |
| Trigger | Actor mở Ngân hàng câu hỏi hoặc chọn tạo/sửa/xóa. |
| Input | Nội dung câu hỏi, loại một đáp án đúng hoặc đúng/sai, chủ đề, các lựa chọn, đáp án đúng. |
| Main Flow | 1. Hiển thị danh sách có pagination/filter theo chủ đề. 2. Actor chọn tạo/sửa. 3. Nhập dữ liệu. 4. Hệ thống validate. 5. Lưu và phản ánh lại danh sách. 6. Với xóa, hệ thống yêu cầu xác nhận rồi áp dụng behavior được quyết định ở thiết kế dữ liệu. |
| Alternative Flow | Actor hủy form/xóa → dữ liệu không đổi. |
| Error / Exception Flow | Thiếu nội dung/chủ đề/đáp án, loại và lựa chọn không khớp, unauthorized, dữ liệu không còn khả dụng → không lưu và hiển thị lỗi. |
| Validation | Một đáp án đúng phải có đúng một đáp án đúng; đúng/sai chỉ có hai giá trị logic và một đáp án đúng; chủ đề hợp lệ. |
| Business Rules | `RULE-001`, `RULE-003`; không lộ đáp án/ngân hàng đầy đủ cho USER. |
| Output | Danh sách/câu hỏi được cập nhật hoặc thông báo lỗi. |
| Postconditions | Thành công: dữ liệu câu hỏi hợp lệ được tạo/sửa/xóa theo thiết kế sau. |
| Acceptance Criteria | `AC-UC-QUIZ-001-01`: Admin quản lý được chủ đề và câu hỏi hai loại baseline.<br>`AC-UC-QUIZ-001-02`: dữ liệu không hợp lệ không được lưu.<br>`AC-UC-QUIZ-001-03`: table có filter/pagination/loading/empty/error.<br>`AC-UC-QUIZ-001-04`: USER bị từ chối truy cập. |
| Related Screens | `SCR-ADM-008` |
| Open Issues | Chính sách xóa thuộc V0.3/V0.4, không làm thay đổi wireframe list/form. |

### UC-QUIZ-002 — Admin cấu hình kỳ kiểm tra

| Field | Specification |
|---|---|
| Related Requirements | `QUIZ-004`, `QUIZ-005`, `RULE-003` |
| Actor | ADMIN |
| Preconditions | Có ngân hàng câu hỏi theo chủ đề; actor có quyền Admin. |
| Trigger | Actor tạo/sửa cấu hình kỳ kiểm tra. |
| Input | Tên kỳ, chủ đề/nguồn câu hỏi, số câu, thời gian làm bài, điểm đạt, trạng thái mở/đóng. |
| Main Flow | 1. Actor mở form. 2. Nhập cấu hình. 3. Hệ thống validate giá trị và khả năng đáp ứng của ngân hàng. 4. Lưu cấu hình. 5. Hiển thị lại trạng thái kỳ. |
| Alternative Flow | Actor hủy → không đổi dữ liệu; actor đóng kỳ → USER không bắt đầu attempt mới. |
| Error / Exception Flow | Số câu/thời gian/điểm đạt không hợp lệ; ngân hàng không đủ; unauthorized; conflict dữ liệu → không lưu. |
| Validation | Số câu và thời gian lớn hơn 0; điểm đạt thuộc thang hợp lệ; nguồn có đủ câu theo cấu hình. |
| Business Rules | Cấu hình được dùng khi sinh đề; chính sách attempt/lifecycle chưa chốt. |
| Output | Kỳ kiểm tra được cấu hình hoặc lỗi validation. |
| Postconditions | Cấu hình hợp lệ sẵn sàng cho USER khi trạng thái mở. |
| Acceptance Criteria | `AC-UC-QUIZ-002-01`: lưu được đầy đủ ba tham số bắt buộc.<br>`AC-UC-QUIZ-002-02`: không lưu khi ngân hàng không đủ câu.<br>`AC-UC-QUIZ-002-03`: trạng thái đóng ngăn bắt đầu attempt mới. |
| Related Screens | `SCR-ADM-009` |
| Open Issues | `OI-007`, `OI-008`, `OI-009` |

### UC-QUIZ-003 — User xem danh sách kỳ kiểm tra

| Field | Specification |
|---|---|
| Related Requirements | `QUIZ-005` |
| Actor | USER, ADMIN |
| Preconditions | Actor đã đăng nhập. |
| Trigger | Actor mở phân hệ Kiểm tra trắc nghiệm. |
| Input | Trang danh sách; trạng thái/filter nếu UI cung cấp. |
| Main Flow | 1. Tải kỳ kiểm tra có thể xem với pagination. 2. Hiển thị tên, số câu, thời gian, điểm đạt và trạng thái. 3. Actor chọn kỳ để xem hướng dẫn/thông tin. |
| Alternative Flow | Không có kỳ → empty state; kỳ đóng vẫn có thể hiển thị disabled nếu policy cho phép xem. |
| Error / Exception Flow | Lỗi tải → error/retry. |
| Validation | Action bắt đầu chỉ bật khi kỳ cho phép; attempt policy chưa được suy đoán. |
| Business Rules | Không gửi ngân hàng câu hỏi trong payload list. |
| Output | Danh sách và trạng thái kỳ. |
| Postconditions | Không tạo attempt cho tới khi actor xác nhận bắt đầu. |
| Acceptance Criteria | `AC-UC-QUIZ-003-01`: list hiển thị thông tin cấu hình cần cho quyết định bắt đầu.<br>`AC-UC-QUIZ-003-02`: kỳ không khả dụng có disabled/unavailable state.<br>`AC-UC-QUIZ-003-03`: list có pagination/states. |
| Related Screens | `SCR-QUIZ-001`, `SCR-QUIZ-002` |
| Open Issues | `OI-007` ảnh hưởng thông tin số lần làm. |

### UC-QUIZ-004 — Bắt đầu bài kiểm tra

| Field | Specification |
|---|---|
| Related Requirements | `QUIZ-004`, `QUIZ-006`, `RULE-003` |
| Actor | USER, ADMIN khi tham gia như người làm bài |
| Preconditions | Actor đã đăng nhập; kỳ đang cho phép bắt đầu; cấu hình/ngân hàng đáp ứng điều kiện. |
| Trigger | Actor xác nhận bắt đầu từ màn hình thông tin kỳ. |
| Input | Kỳ kiểm tra được chọn. |
| Main Flow | 1. Hệ thống kiểm tra kỳ và eligibility theo policy đã được chốt. 2. Tạo khái niệm attempt. 3. Chọn ngẫu nhiên đủ số câu theo cấu hình. 4. Đảo thứ tự câu và đáp án phù hợp. 5. Chỉ trả dữ liệu câu hỏi cần cho attempt, không trả đáp án đúng. 6. Hiển thị màn hình làm bài và thời gian cấu hình. |
| Alternative Flow | Actor hủy trước khi bắt đầu → không vào màn hình attempt; resume/refresh chỉ được đặc tả sau `OI-007`. |
| Error / Exception Flow | Kỳ đóng/không tồn tại, ngân hàng không đủ, actor không đủ điều kiện hoặc lỗi tạo attempt → không mở đề và thông báo. |
| Validation | Số câu đúng cấu hình; không lộ toàn bộ bank/đáp án; mỗi câu thuộc loại hỗ trợ. |
| Business Rules | Random và shuffle theo `QUIZ-004`, `QUIZ-006`; tính cố định của bộ câu trong attempt chưa được source chốt. |
| Output | Attempt sẵn sàng để trả lời hoặc lỗi bắt đầu. |
| Postconditions | Thành công: có attempt nghiệp vụ; chưa mặc định attempt này có thể resume. |
| Acceptance Criteria | `AC-UC-QUIZ-004-01`: đề sinh có đúng số câu và không lộ đáp án.<br>`AC-UC-QUIZ-004-02`: câu/đáp án được đảo theo requirement.<br>`AC-UC-QUIZ-004-03`: kỳ không khả dụng không tạo attempt.<br>`AC-UC-QUIZ-004-04`: wireframe không khẳng định refresh/resume khi chưa chốt. |
| Related Screens | `SCR-QUIZ-002`, `SCR-QUIZ-003` |
| Open Issues | `OI-007`, `OI-008` |

### UC-QUIZ-005 — Trả lời và nộp bài

| Field | Specification |
|---|---|
| Related Requirements | `QUIZ-007..QUIZ-009`, `RULE-004` |
| Actor | USER, ADMIN khi tham gia như người làm bài |
| Preconditions | Actor có attempt hợp lệ chưa được chấm. |
| Trigger | Actor chọn đáp án/chuyển câu hoặc chọn nộp bài. |
| Input | Lựa chọn của actor cho từng câu và hành động nộp. |
| Main Flow | 1. Actor chọn/sửa đáp án và chuyển câu. 2. UI thể hiện câu đã/chưa trả lời. 3. Actor chọn nộp. 4. Hệ thống yêu cầu xác nhận. 5. Khi hợp lệ, hệ thống khóa việc sửa theo policy, tự chấm phía server và xác định Đạt/Không đạt. 6. Lưu kết quả nghiệp vụ ở mức functional expectation. 7. Chuẩn bị kết quả làm nguồn thi đua nếu policy scoring sau này cho phép. |
| Alternative Flow | Actor quay lại câu trước khi nộp; việc submit khi còn câu trống phụ thuộc `OI-007`. |
| Error / Exception Flow | Attempt không tồn tại/đã nộp/hết hiệu lực; lỗi lưu/chấm; hết giờ → behavior phụ thuộc `OI-008`, không mặc định auto-submit. |
| Validation | Không chấp nhận submit lặp sau khi kết quả đã được chốt; đáp án phải thuộc lựa chọn của câu; backend là nguồn chấm cuối. |
| Business Rules | `RULE-004`; baseline chỉ yêu cầu kết quả Đạt/Không đạt cho USER. |
| Output | Kết quả Đạt/Không đạt hoặc lỗi; raw score chỉ hiển thị nếu `OI-009` được chốt cho phép. |
| Postconditions | Thành công: kết quả được lưu và attempt không còn chỉnh sửa theo policy; nguồn thi đua chưa được tính khi `OI-002` chưa chốt. |
| Acceptance Criteria | `AC-UC-QUIZ-005-01`: hệ thống tự chấm ở phía server.<br>`AC-UC-QUIZ-005-02`: USER luôn nhận Đạt/Không đạt sau submit hợp lệ.<br>`AC-UC-QUIZ-005-03`: submit lặp không tạo kết quả thứ hai cho cùng lần nộp.<br>`AC-UC-QUIZ-005-04`: timeout/unanswered/raw score không bị wireframe khẳng định sai. |
| Related Screens | `SCR-QUIZ-003`, `SCR-QUIZ-004` |
| Open Issues | `OI-007`, `OI-008`, `OI-009`, `OI-002` |

### UC-QUIZ-006 — Xem bảng xếp hạng kiểm tra

| Field | Specification |
|---|---|
| Related Requirements | `QUIZ-010` |
| Actor | USER, ADMIN |
| Preconditions | Có kỳ/kết quả đủ điều kiện theo chính sách xếp hạng chưa được chốt. |
| Trigger | Actor mở bảng xếp hạng kiểm tra. |
| Input | Kỳ kiểm tra, trang bảng xếp hạng. |
| Main Flow | 1. Chọn kỳ. 2. Tải bảng có pagination. 3. Hiển thị thứ hạng và danh tính/giá trị được phép theo policy. |
| Alternative Flow | Chưa có dữ liệu → empty state. |
| Error / Exception Flow | Kỳ không tồn tại hoặc lỗi tải → error/retry. |
| Validation | Không công bố raw score hoặc rule tie-breaker khi chưa được quyết định. |
| Business Rules | `QUIZ-010`; metric xếp hạng, attempt được chọn và tie-breaker chưa chốt. |
| Output | Bảng xếp hạng theo policy tương lai. |
| Postconditions | Không thay đổi kết quả. |
| Acceptance Criteria | `AC-UC-QUIZ-006-01`: screen thể hiện rank/kỳ và states mà không giả công thức.<br>`AC-UC-QUIZ-006-02`: dữ liệu có pagination.<br>`AC-UC-QUIZ-006-03`: implementation scoring bị chặn tới khi `OI-009` được quyết định. |
| Related Screens | `SCR-QUIZ-005` |
| Open Issues | `OI-009` |

## 14. Giáo dục chính trị

### UC-EDU-001 — Duyệt chương trình/chủ đề/bài giảng

| Field | Specification |
|---|---|
| Related Requirements | `EDU-001`, `EDU-003` |
| Actor | USER, ADMIN |
| Preconditions | Có thể chưa có chương trình công khai. |
| Trigger | Actor mở module hoặc chọn một cấp trong hierarchy. |
| Input | Chương trình, chủ đề, trang danh sách. |
| Main Flow | 1. Hiển thị chương trình. 2. Actor chọn chương trình. 3. Hiển thị chủ đề. 4. Actor chọn chủ đề. 5. Hiển thị bài giảng/tài liệu có pagination khi danh sách tăng. 6. Actor mở bài giảng. |
| Alternative Flow | Cấp hierarchy không có dữ liệu → empty state tại cấp đó. |
| Error / Exception Flow | Mục không còn công khai hoặc lỗi tải → unavailable/error và quay lại cấp cha. |
| Validation | Giữ hierarchy `Chương trình → Chủ đề → Bài giảng → Tài liệu`; khái niệm “Kiểm tra” chưa được gắn vào flow cụ thể. |
| Business Rules | Không progress tracking (`EDU-004`). |
| Output | Điều hướng hierarchy và danh sách nội dung. |
| Postconditions | Không ghi tiến độ/completion. |
| Acceptance Criteria | `AC-UC-EDU-001-01`: actor điều hướng được ba cấp nội dung.<br>`AC-UC-EDU-001-02`: mỗi cấp có loading/empty/error.<br>`AC-UC-EDU-001-03`: không hiển thị progress giả. |
| Related Screens | `SCR-EDU-001`, `SCR-EDU-002`, `SCR-EDU-003` |
| Open Issues | `OI-011` |

### UC-EDU-002 — Xem bài giảng và tài liệu

| Field | Specification |
|---|---|
| Related Requirements | `EDU-002..EDU-004` |
| Actor | USER, ADMIN |
| Preconditions | Bài giảng tồn tại và công khai. |
| Trigger | Actor chọn bài giảng. |
| Input | Bài giảng được chọn. |
| Main Flow | 1. Hiển thị nội dung bài viết. 2. Hiển thị PowerPoint/video/tài liệu liên quan khi có. 3. Actor xem hoặc tải theo capability file. |
| Alternative Flow | Một loại tài liệu không có hoặc không preview được → ẩn/fallback download. |
| Error / Exception Flow | Nội dung/file/media không khả dụng → state phù hợp, không làm hỏng toàn trang. |
| Validation | Không ghi nhận phần trăm/hoàn thành; không tự chuyển “Kiểm tra” thành Quiz module. |
| Business Rules | `EDU-004`, `FILE-003`, `FILE-004`. |
| Output | Bài giảng và tài liệu khả dụng. |
| Postconditions | Không ghi tiến độ. |
| Acceptance Criteria | `AC-UC-EDU-002-01`: render bài viết, PowerPoint/video/tài liệu theo dữ liệu có.<br>`AC-UC-EDU-002-02`: fallback rõ khi preview không khả dụng.<br>`AC-UC-EDU-002-03`: không tạo completion state. |
| Related Screens | `SCR-EDU-003` |
| Open Issues | `OI-011`, `OI-015`, `OI-005` |

## 15. Lời Bác Hồ dạy

### UC-HCM-001 — Xem lời dạy hôm nay

| Field | Specification |
|---|---|
| Related Requirements | `HCM-001`, `HCM-003` |
| Actor | USER, ADMIN |
| Preconditions | Actor mở Home/module; có thể chưa có dữ liệu khớp ngày. |
| Trigger | Tải Home hoặc mở Lời Bác Hồ dạy hôm nay. |
| Input | Ngày hiện tại theo `Asia/Ho_Chi_Minh`. |
| Main Flow | 1. Hệ thống xác định ngày. 2. Lấy mục được cấu hình tương ứng. 3. Hiển thị trích đoạn/hình ảnh nếu có. 4. Actor mở chi tiết. |
| Alternative Flow | Không có dữ liệu hôm nay → empty state, không tạo lời dạy giả. |
| Error / Exception Flow | Lỗi tải → vùng lỗi/retry; mục không còn khả dụng → quay Home/list phù hợp. |
| Validation | Chỉ hiển thị dữ liệu Admin đã quản lý; logic mapping ngày chi tiết thuộc thiết kế sau. |
| Business Rules | Không tìm kiếm nâng cao (`HCM-004`). |
| Output | Lời dạy hôm nay hoặc empty state. |
| Postconditions | Không thay đổi dữ liệu. |
| Acceptance Criteria | `AC-UC-HCM-001-01`: dùng timezone ứng dụng.<br>`AC-UC-HCM-001-02`: có dữ liệu thì hiển thị và mở được chi tiết.<br>`AC-UC-HCM-001-03`: thiếu dữ liệu không sinh content giả. |
| Related Screens | `SCR-HOME-001`, `SCR-HCM-001`, `SCR-HCM-002` |
| Open Issues | Không. |

### UC-HCM-002 — Xem chi tiết lời dạy

| Field | Specification |
|---|---|
| Related Requirements | `HCM-002`, `HCM-004` |
| Actor | USER, ADMIN |
| Preconditions | Mục tồn tại và công khai. |
| Trigger | Actor chọn xem chi tiết. |
| Input | Mục lời dạy được chọn. |
| Main Flow | 1. Hiển thị nội dung, ngày/thời điểm, nguồn, hoàn cảnh, ý nghĩa, hình ảnh và nội dung liên quan nếu có. 2. Actor mở nội dung liên quan nếu khả dụng. |
| Alternative Flow | Trường optional không có → không hiển thị placeholder giả. |
| Error / Exception Flow | Không tìm thấy/không công khai; ảnh/nội dung liên quan lỗi → state phù hợp. |
| Validation | Không cung cấp advanced search. |
| Business Rules | `HCM-004`. |
| Output | Chi tiết lời dạy. |
| Postconditions | Không thay đổi dữ liệu. |
| Acceptance Criteria | `AC-UC-HCM-002-01`: hiển thị đúng các trường có dữ liệu.<br>`AC-UC-HCM-002-02`: optional data thiếu không phá layout.<br>`AC-UC-HCM-002-03`: không có advanced search control. |
| Related Screens | `SCR-HCM-002` |
| Open Issues | Không. |

## 16. Mỗi tuần một câu hỏi

### UC-WEEK-001 — Admin quản lý câu hỏi tuần

| Field | Specification |
|---|---|
| Related Requirements | `WEEK-001`, `WEEK-002`, `WEEK-004`, `RULE-001` |
| Actor | ADMIN |
| Preconditions | Actor có quyền Admin. |
| Trigger | Actor mở quản lý câu hỏi tuần hoặc tạo/sửa/xóa/công khai. |
| Input | Tuần áp dụng, nội dung, lựa chọn, đáp án đúng, lời giải, trạng thái công khai. |
| Main Flow | 1. Hiển thị danh sách có pagination. 2. Actor tạo/sửa dữ liệu. 3. Hệ thống validate. 4. Lưu. 5. Công khai theo lifecycle sau khi `OI-010` được quyết định. |
| Alternative Flow | Actor hủy → không đổi; chưa công khai → USER không thấy như câu hỏi hiện hành. |
| Error / Exception Flow | Thiếu đáp án/lựa chọn/tuần, conflict câu hỏi chính, unauthorized → không lưu/công khai. |
| Validation | Câu hỏi trắc nghiệm phải có lựa chọn và một đáp án đúng; baseline chỉ có một câu hỏi chính tại một thời điểm nghiệp vụ. |
| Business Rules | `RULE-001`, `RULE-005`; cách xác định tuần/chuyển trạng thái chưa chốt. |
| Output | Câu hỏi tuần được quản lý hoặc lỗi. |
| Postconditions | Dữ liệu hợp lệ được lưu; publication lifecycle chưa mặc định. |
| Acceptance Criteria | `AC-UC-WEEK-001-01`: Admin quản lý được câu hỏi, đáp án, lời giải.<br>`AC-UC-WEEK-001-02`: dữ liệu thiếu/không hợp lệ không được công khai.<br>`AC-UC-WEEK-001-03`: UI không tự chốt thời điểm chuyển/reveal. |
| Related Screens | `SCR-ADM-012` |
| Open Issues | `OI-010` |

### UC-WEEK-002 — User trả lời câu hỏi tuần

| Field | Specification |
|---|---|
| Related Requirements | `WEEK-001..WEEK-003`, `WEEK-005`, `RULE-005` |
| Actor | USER, ADMIN khi tham gia như người trả lời |
| Preconditions | Có câu hỏi chính đang được phép trả lời theo lifecycle; actor đã đăng nhập. |
| Trigger | Actor mở câu hỏi tuần và chọn nộp câu trả lời. |
| Input | Lựa chọn cho câu hỏi hiện hành. |
| Main Flow | 1. Hiển thị câu hỏi/lựa chọn. 2. Actor chọn đáp án. 3. Actor nộp. 4. Hệ thống tự chấm phía server. 5. Lưu kết quả nghiệp vụ. 6. Chuẩn bị làm nguồn điểm thi đua nếu scoring policy cho phép. |
| Alternative Flow | Actor chưa chọn đáp án → không submit; việc trả lời lại/sau tuần phụ thuộc `OI-010`. |
| Error / Exception Flow | Không có câu hỏi hiện hành, đã hết thời điểm, attempt policy không cho phép, lỗi chấm/lưu → thông báo và không tạo kết quả sai. |
| Validation | Lựa chọn phải thuộc câu hỏi hiện hành; backend là nguồn chấm cuối. |
| Business Rules | `RULE-005`, `RULE-006`; số lần trả lời/deadline chưa chốt. |
| Output | Trạng thái đã ghi nhận/kết quả theo policy; lời giải chỉ xuất hiện khi được phép. |
| Postconditions | Kết quả được lưu; điểm thi đua chưa tính nếu `OI-002` chưa chốt. |
| Acceptance Criteria | `AC-UC-WEEK-002-01`: câu trả lời hợp lệ được tự chấm.<br>`AC-UC-WEEK-002-02`: không có câu hiện hành thì không ghi kết quả.<br>`AC-UC-WEEK-002-03`: UI không giả định nhiều lần/một lần hoặc trả lời sau tuần. |
| Related Screens | `SCR-WEEK-001`, `SCR-WEEK-002` |
| Open Issues | `OI-010`, `OI-002` |

### UC-WEEK-003 — Xem đáp án/lời giải

| Field | Specification |
|---|---|
| Related Requirements | `WEEK-004` |
| Actor | USER, ADMIN |
| Preconditions | Câu hỏi/lời giải tồn tại và đã đến thời điểm được công khai theo policy. |
| Trigger | Actor mở kết quả/đáp án. |
| Input | Câu hỏi tuần được chọn/hiện hành. |
| Main Flow | 1. Hệ thống kiểm tra quyền và thời điểm reveal. 2. Nếu được phép, hiển thị đáp án đúng và lời giải. |
| Alternative Flow | Chưa đến thời điểm → disabled/not-yet-available state, không lộ đáp án. |
| Error / Exception Flow | Không tìm thấy/lỗi tải → error/not-found. |
| Validation | Không trả đáp án trước policy reveal. |
| Business Rules | Thời điểm reveal chưa chốt. |
| Output | Đáp án/lời giải hoặc trạng thái chưa công khai. |
| Postconditions | Không thay đổi kết quả. |
| Acceptance Criteria | `AC-UC-WEEK-003-01`: chỉ hiển thị lời giải khi policy cho phép.<br>`AC-UC-WEEK-003-02`: trước thời điểm đó không lộ đáp án.<br>`AC-UC-WEEK-003-03`: wireframe có state “chưa công khai”. |
| Related Screens | `SCR-WEEK-002` |
| Open Issues | `OI-010` |

## 17. Chấm điểm thi đua

> Module bị chặn trước backend implementation bởi `OI-002`, `OI-012` và `OI-014`. V0.2 chỉ khóa actor goal, nguồn dự kiến, chu kỳ và presentation boundary.

### UC-COMP-001 — Xem điểm thi đua cá nhân

| Field | Specification |
|---|---|
| Related Requirements | `COMP-001`, `COMP-003..COMP-005` |
| Actor | USER, ADMIN |
| Preconditions | Actor đã đăng nhập; có dữ liệu điểm theo policy đã được phê duyệt. |
| Trigger | Actor mở điểm cá nhân hoặc đổi chu kỳ. |
| Input | Chu kỳ tuần/tháng/năm. |
| Main Flow | 1. Actor chọn chu kỳ. 2. Tải tổng điểm cá nhân. 3. Hiển thị breakdown nguồn điểm chỉ khi policy cho phép. |
| Alternative Flow | Chưa có dữ liệu → empty state, không hiển thị điểm mock như thật. |
| Error / Exception Flow | Chu kỳ không hợp lệ hoặc lỗi tải → error/retry. |
| Validation | Không tự tính formula/weight/normalization. |
| Business Rules | `RULE-006`, `RULE-008`; formula chưa chốt. |
| Output | Tổng điểm/breakdown được phép. |
| Postconditions | Không thay đổi điểm. |
| Acceptance Criteria | `AC-UC-COMP-001-01`: actor chọn được tuần/tháng/năm.<br>`AC-UC-COMP-001-02`: không có dữ liệu có empty state.<br>`AC-UC-COMP-001-03`: UI không mô tả công thức giả. |
| Related Screens | `SCR-COMP-001` |
| Open Issues | `OI-002`, `OI-012` |

### UC-COMP-002 — Xem bảng xếp hạng thi đua

| Field | Specification |
|---|---|
| Related Requirements | `COMP-001`, `COMP-002`, `COMP-005`, `COMP-006`, `RULE-007` |
| Actor | USER, ADMIN |
| Preconditions | Có dữ liệu ranking hợp lệ theo policy. |
| Trigger | Actor mở bảng xếp hạng hoặc đổi phạm vi/chu kỳ. |
| Input | Phạm vi cá nhân/tiểu đội/trung đội/đại đội; chu kỳ tuần/tháng/năm; trang. |
| Main Flow | 1. Chọn phạm vi và chu kỳ. 2. Tải bảng có pagination. 3. Hiển thị thứ hạng, đối tượng và điểm được phép. |
| Alternative Flow | Chưa có dữ liệu → empty state. |
| Error / Exception Flow | Phạm vi/chu kỳ không hợp lệ, hierarchy thiếu hoặc lỗi tải → error/retry. |
| Validation | Không tự tạo tie-breaker; đối tượng phải thuộc hierarchy đã được chốt. |
| Business Rules | Ranking công khai trong hệ thống; formula/tie-breaker chưa chốt. |
| Output | Bảng xếp hạng theo filter. |
| Postconditions | Không thay đổi điểm/rank. |
| Acceptance Criteria | `AC-UC-COMP-002-01`: có đủ bốn phạm vi và ba chu kỳ ở wireframe.<br>`AC-UC-COMP-002-02`: bảng có pagination/states.<br>`AC-UC-COMP-002-03`: điểm mock phải được ghi nhãn mock; implementation chờ OI. |
| Related Screens | `SCR-COMP-002` |
| Open Issues | `OI-002`, `OI-014`; tie-breaker thuộc `OI-002`. |

### UC-COMP-003 — Nhận nguồn điểm tự động

| Field | Specification |
|---|---|
| Related Requirements | `COMP-003`, `COMP-004`, `QUIZ-009`, `WEEK-005`, `RULE-006` |
| Actor | Hệ thống; ADMIN quan sát/cấu hình sau khi policy được duyệt |
| Preconditions | Nguồn hoạt động sinh kết quả hợp lệ; scoring policy/period/hierarchy đã được phê duyệt. Các điều kiện này hiện chưa đủ. |
| Trigger | Kết quả hoạt động đủ điều kiện được ghi nhận hoặc tác vụ tính theo yêu cầu được thiết kế sau. |
| Input | Quiz result, weekly result, tham gia hoạt động, điểm cộng/trừ; “hoàn thành học tập” đang conflict. |
| Main Flow | Deferred phần tính điểm. Boundary mong đợi: 1. Nhận nguồn hợp lệ. 2. Áp rule đã duyệt. 3. Gắn chu kỳ/đối tượng. 4. Cập nhật dữ liệu phục vụ tổng điểm/ranking. |
| Alternative Flow | Nguồn bị tắt/không đủ điều kiện → không cộng/trừ. |
| Error / Exception Flow | Thiếu policy/hierarchy/source identity → không tính và phải có trạng thái lỗi kiểm soát, không dùng default tự phát. |
| Validation | Không nhận nguồn trùng/không hợp lệ theo rule tương lai; chi tiết chưa thể chốt. |
| Business Rules | `RULE-006`, `RULE-008`; không thêm progress tracking để tạo nguồn completion. |
| Output | Nguồn điểm được xử lý sau khi policy tồn tại. |
| Postconditions | Hiện tại implementation bị chặn. |
| Acceptance Criteria | `AC-UC-COMP-003-01`: V0.2 liệt kê đúng nguồn dự kiến và đánh dấu completion conflict.<br>`AC-UC-COMP-003-02`: không có formula/weight mặc định.<br>`AC-UC-COMP-003-03`: backend implementation không bắt đầu trước quyết định blocking. |
| Related Screens | Không có screen xử lý nền riêng; kết quả dự kiến ở `SCR-COMP-001`, `SCR-COMP-002`, quản trị ở `SCR-ADM-013`. |
| Open Issues | `OI-002`, `OI-012`, `OI-014` |

### UC-COMP-004 — Admin quản lý cấu hình thi đua

| Field | Specification |
|---|---|
| Related Requirements | `COMP-007`, `ADM-003`, `RULE-008` |
| Actor | ADMIN |
| Preconditions | Bộ tiêu chí/công thức và hierarchy đã được Project Owner phê duyệt. Hiện chưa đạt. |
| Trigger | Actor mở quản lý thi đua. |
| Input | Tiêu chí, thang điểm, kỳ áp dụng, nguồn điểm theo quyết định tương lai; không khóa field/schema ở V0.2. |
| Main Flow | Sau quyết định: 1. Hiển thị cấu hình. 2. Actor tạo/sửa dữ liệu được phép. 3. Validate theo chính sách. 4. Lưu và áp dụng cho kỳ phù hợp. |
| Alternative Flow | Actor hủy → không đổi; nguồn bị tắt theo policy → không dùng cho kỳ mới phù hợp. |
| Error / Exception Flow | Policy chưa đủ, dữ liệu ngoài thang/kỳ conflict, unauthorized → không lưu. |
| Validation | Chỉ có thể đặc tả sau `OI-002`; không tự tạo coefficient/weight. |
| Business Rules | `RULE-008`. |
| Output | Cấu hình thi đua hợp lệ sau khi policy được duyệt. |
| Postconditions | Hiện tại chỉ wireframe placeholder; backend bị chặn. |
| Acceptance Criteria | `AC-UC-COMP-004-01`: screen phân biệt tiêu chí/thang điểm/kỳ/nguồn ở mức capability.<br>`AC-UC-COMP-004-02`: không cho cấu hình giả được coi là production rule.<br>`AC-UC-COMP-004-03`: implementation chờ OI blocking. |
| Related Screens | `SCR-ADM-013`, `SCR-ADM-015` |
| Open Issues | `OI-002`, `OI-012`, `OI-014` |

## 18. Admin Content Management

### UC-ADM-001 — Quản lý nội dung và danh mục

| Field | Specification |
|---|---|
| Related Requirements | `ADM-001`, `ADM-002`, `HAN-001..HAN-003`, `RES-001..RES-003`, `NEWS-001..NEWS-003`, `MUS-001..MUS-002`, `EDU-001..EDU-002`, `HCM-001..HCM-002`, `RULE-001` |
| Actor | ADMIN |
| Preconditions | Actor có quyền Admin. |
| Trigger | Actor mở một màn hình quản trị nội dung/danh mục hoặc chọn tạo/sửa/xóa/đăng. |
| Input | Metadata, category/hierarchy và text/media/link tương ứng từng domain; không khóa DTO. |
| Main Flow | 1. Hiển thị table có pagination và filter phù hợp. 2. Actor tạo/sửa nội dung hoặc danh mục/hierarchy. 3. Hệ thống validate trường theo requirement domain. 4. Lưu. 5. Actor đăng trực tiếp theo trạng thái đơn giản MVP. 6. USER thấy nội dung công khai. 7. Khi xóa, yêu cầu xác nhận và áp behavior dữ liệu được thiết kế sau. |
| Alternative Flow | Actor hủy → không đổi; nội dung chưa công khai không xuất hiện ở User Portal. |
| Error / Exception Flow | Unauthorized, input thiếu/sai, reference category không hợp lệ, file lỗi, conflict dữ liệu → không lưu/đăng và hiển thị lỗi. |
| Validation | Trường bắt buộc theo domain; nguồn YouTube/external link đúng loại; file theo whitelist/limit tương lai; rich text an toàn. |
| Business Rules | `RULE-001`; không có workflow duyệt (`ADM-002`); không mặc định soft/hard delete. |
| Output | Danh sách/nội dung được cập nhật hoặc lỗi form. |
| Postconditions | Thành công: nội dung/danh mục hợp lệ được lưu; trạng thái công khai quyết định khả năng USER xem. |
| Acceptance Criteria | `AC-UC-ADM-001-01`: Admin CRUD/đăng trực tiếp cho 6 nhóm content và hierarchy/danh mục liên quan.<br>`AC-UC-ADM-001-02`: USER không truy cập capability quản trị.<br>`AC-UC-ADM-001-03`: table có pagination/filter/states.<br>`AC-UC-ADM-001-04`: dữ liệu không hợp lệ không được công khai. |
| Related Screens | `SCR-ADM-004..SCR-ADM-007`, `SCR-ADM-010`, `SCR-ADM-011` |
| Open Issues | `OI-005`, `OI-011`, `OI-015`; `OI-001` nếu tích hợp nguồn tin ngoài. |

## 19. User và invitation administration

### UC-ADM-USER-001 — Quản lý người dùng

| Field | Specification |
|---|---|
| Related Requirements | `USR-004`, `ADM-001` |
| Actor | ADMIN |
| Preconditions | Actor có quyền Admin; user data tồn tại hoặc list rỗng. |
| Trigger | Actor mở quản lý người dùng hoặc chọn xem/sửa. |
| Input | Từ khóa/filter/page; thông tin cơ bản và role hợp lệ khi chỉnh sửa. |
| Main Flow | 1. Hiển thị table có pagination/search. 2. Actor chọn user. 3. Xem/chỉnh thông tin cơ bản hoặc role được phép. 4. Validate. 5. Lưu và phản ánh lại list. |
| Alternative Flow | Actor hủy → không đổi. |
| Error / Exception Flow | Unauthorized, role không hợp lệ, user không còn tồn tại, conflict → không lưu. |
| Validation | Role chỉ thuộc `SUPER_ADMIN/ADMIN/USER`; phân loại Cán bộ/Chiến sĩ không biến thành role. |
| Business Rules | Khóa/mở tài khoản và permission chi tiết chưa phải baseline; không tự thêm. |
| Output | Danh sách/thông tin user được cập nhật hoặc lỗi. |
| Postconditions | Thay đổi hợp lệ được lưu; không tạo audit trail đầy đủ ngoài scope. |
| Acceptance Criteria | `AC-UC-ADM-USER-001-01`: Admin xem/search/page user.<br>`AC-UC-ADM-USER-001-02`: chỉ role hợp lệ được lưu.<br>`AC-UC-ADM-USER-001-03`: screen không tự thêm lock/unlock. |
| Related Screens | `SCR-ADM-002` |
| Open Issues | `OI-014` cho organization assignment/hierarchy. |

### UC-ADM-INV-001 — Quản lý mã giới thiệu

| Field | Specification |
|---|---|
| Related Requirements | `USR-003`, `ADM-001` |
| Actor | ADMIN |
| Preconditions | Actor có quyền Admin. |
| Trigger | Actor mở quản lý mã hoặc chọn tạo/vô hiệu hóa. |
| Input | Giá trị mã hoặc yêu cầu sinh mã; trạng thái hiệu lực tối thiểu. Expiration/usage/owner chưa chốt. |
| Main Flow | 1. Hiển thị danh sách có pagination. 2. Actor tạo mã. 3. Hệ thống validate tính duy nhất/hợp lệ tối thiểu. 4. Lưu. 5. Actor có thể vô hiệu hóa mã. |
| Alternative Flow | Actor hủy → không đổi. |
| Error / Exception Flow | Mã trùng/không hợp lệ, unauthorized, conflict → không lưu/thay đổi. |
| Validation | Mã phải phân biệt được và có trạng thái hiệu lực; các rule còn lại chờ `OI-006`. |
| Business Rules | Mã hợp lệ là điều kiện đăng ký; không giả định dùng một lần, expiration, quota hoặc owner. |
| Output | Danh sách/trạng thái mã. |
| Postconditions | Mã mới hoặc trạng thái vô hiệu hóa được lưu theo policy tối thiểu. |
| Acceptance Criteria | `AC-UC-ADM-INV-001-01`: Admin tạo/xem/vô hiệu hóa mã.<br>`AC-UC-ADM-INV-001-02`: mã không hợp lệ/trùng không được lưu.<br>`AC-UC-ADM-INV-001-03`: UI đánh dấu các thuộc tính lifecycle chưa chốt thay vì đặt default. |
| Related Screens | `SCR-ADM-003` |
| Open Issues | `OI-006` |

## 20. System Configuration

### UC-ADM-CFG-001 — Quản lý cấu hình danh mục hệ thống

| Field | Specification |
|---|---|
| Related Requirements | `ADM-003` |
| Actor | ADMIN |
| Preconditions | Actor có quyền Admin; loại cấu hình được baseline liệt kê. |
| Trigger | Actor chọn một nhóm cấu hình và thao tác quản lý. |
| Input | Cơ cấu đơn vị, chức vụ, cấp bậc, danh mục nội dung, tiêu chí thi đua, thang điểm, năm học, đợt học, loại bài kiểm tra. Không khóa field/schema. |
| Main Flow | 1. Actor chọn nhóm cấu hình. 2. Xem list có pagination. 3. Tạo/sửa/xóa mục. 4. Hệ thống validate theo quyết định nghiệp vụ đã được duyệt. 5. Lưu và phản ánh ở capability liên quan. |
| Alternative Flow | Actor hủy → không đổi; nhóm bị chặn bởi OI chỉ hiển thị placeholder/disabled ở prototype. |
| Error / Exception Flow | Unauthorized, trùng/thiếu dữ liệu, mục đang được tham chiếu hoặc policy chưa được chốt → không lưu/xóa. |
| Validation | Chỉ quản lý nhóm được `ADM-003` liệt kê; validation thi đua/hierarchy chờ OI. |
| Business Rules | Thay đổi cấu hình không cần sửa code; không thiết kế DB/EAV. |
| Output | Cấu hình hợp lệ được cập nhật hoặc lỗi. |
| Postconditions | Form/capability liên quan có thể sử dụng cấu hình đã lưu sau implementation. |
| Acceptance Criteria | `AC-UC-ADM-CFG-001-01`: screen cho phép chọn đủ 9 nhóm cấu hình baseline.<br>`AC-UC-ADM-CFG-001-02`: dữ liệu hợp lệ phản ánh ở capability liên quan.<br>`AC-UC-ADM-CFG-001-03`: nhóm bị blocker không được coi là rule production. |
| Related Screens | `SCR-ADM-015`, `SCR-ADM-013` |
| Open Issues | `OI-002`, `OI-014` |

## 21. Reporting và Dashboard

### UC-REP-001 — Xem Dashboard Admin

| Field | Specification |
|---|---|
| Related Requirements | `REP-001..REP-004`, `BR-007` |
| Actor | ADMIN |
| Preconditions | Actor có quyền Admin; mỗi widget có thể chưa có dữ liệu. |
| Trigger | Actor vào Admin Portal/Dashboard. |
| Input | Chu kỳ/filter tổng quan nếu UI cung cấp; metric phổ biến chưa chốt. |
| Main Flow | 1. Tải tổng quân số. 2. Tải điểm thi đua/xếp hạng nếu policy và dữ liệu sẵn sàng. 3. Dành vùng nội dung phổ biến nhưng chỉ tính khi metric được chốt. 4. Mỗi widget hiển thị loading/data/empty/error độc lập. |
| Alternative Flow | Widget bị blocker/không dữ liệu → placeholder “chưa có dữ liệu/chưa chốt”, dashboard khác vẫn hoạt động. |
| Error / Exception Flow | Unauthorized; lỗi một widget → cô lập lỗi và cho retry theo thao tác người dùng. |
| Validation | Không dùng số mock như dữ liệu thật; không tự chọn view/listen/interaction làm popularity metric. |
| Business Rules | Dashboard tối thiểu gồm bốn nhóm `REP-001..REP-004`; không polling. |
| Output | Dashboard tổng quan hoặc placeholder có nhãn. |
| Postconditions | Không thay đổi dữ liệu. |
| Acceptance Criteria | `AC-UC-REP-001-01`: có vùng cho đủ bốn nhóm metric.<br>`AC-UC-REP-001-02`: widget lỗi/empty độc lập.<br>`AC-UC-REP-001-03`: popular content không hiển thị số liệu production trước `OI-013`.<br>`AC-UC-REP-001-04`: USER bị từ chối. |
| Related Screens | `SCR-ADM-001` |
| Open Issues | `OI-002`, `OI-013`, `OI-014` |

### UC-REP-002 — Xem báo cáo theo kỳ

| Field | Specification |
|---|---|
| Related Requirements | `REP-005` |
| Actor | ADMIN |
| Preconditions | Actor có quyền Admin; loại báo cáo và nguồn dữ liệu có thể chưa hoàn thiện. |
| Trigger | Actor mở Báo cáo hoặc đổi loại/kỳ. |
| Input | Loại báo cáo; ngày, tuần, tháng hoặc năm; trang/filter liên quan. |
| Main Flow | 1. Actor chọn loại và kỳ. 2. Chọn xem. 3. Hệ thống validate filter. 4. Tải kết quả theo yêu cầu, có pagination nếu dạng list. 5. Hiển thị data/empty/error. |
| Alternative Flow | Kỳ không có dữ liệu → empty state; actor đổi filter và chạy lại. |
| Error / Exception Flow | Filter không hợp lệ, nguồn metric bị blocker, unauthorized hoặc lỗi tạo báo cáo → thông báo, không chạy polling. |
| Validation | Kỳ bắt buộc phù hợp loại; không load/export toàn bộ không giới hạn trong UI list. |
| Business Rules | On-demand; metric thi đua/phổ biến phụ thuộc OI tương ứng. |
| Output | Báo cáo theo filter. |
| Postconditions | Không thay đổi dữ liệu. |
| Acceptance Criteria | `AC-UC-REP-002-01`: hỗ trợ đủ ngày/tuần/tháng/năm.<br>`AC-UC-REP-002-02`: filter sai không chạy báo cáo.<br>`AC-UC-REP-002-03`: report chạy theo thao tác, không polling.<br>`AC-UC-REP-002-04`: list report có pagination/states. |
| Related Screens | `SCR-ADM-014` |
| Open Issues | `OI-002`, `OI-013` tùy loại báo cáo. |

### UC-REP-003 — Xuất báo cáo Excel

| Field | Specification |
|---|---|
| Related Requirements | `REP-006` |
| Actor | ADMIN |
| Preconditions | Actor có quyền Admin; filter hợp lệ; loại báo cáo hỗ trợ export. |
| Trigger | Actor chọn Xuất Excel. |
| Input | Loại báo cáo và filter hiện tại. |
| Main Flow | 1. Validate filter/quyền. 2. Tạo export theo yêu cầu. 3. Khi sẵn sàng, browser tải file. 4. UI kết thúc loading. |
| Alternative Flow | Không có dữ liệu → behavior empty/no-file phải rõ, không tạo file gây hiểu nhầm. |
| Error / Exception Flow | Unauthorized, filter sai, lỗi tạo/tải file → thông báo và cho phép actor thử lại; không retry nền vô hạn. |
| Validation | Export phản ánh filter hiện tại; filename/content type an toàn; giới hạn kỹ thuật thuộc V0.3. |
| Business Rules | Chạy on-demand, không polling/background schedule bắt buộc. |
| Output | File Excel mở được bằng phần mềm bảng tính phổ biến hoặc lỗi rõ. |
| Postconditions | Không thay đổi dữ liệu nghiệp vụ; artifact tạm phải được quản lý/cleanup ở thiết kế sau. |
| Acceptance Criteria | `AC-UC-REP-003-01`: file phản ánh đúng filter.<br>`AC-UC-REP-003-02`: export chỉ chạy khi actor yêu cầu.<br>`AC-UC-REP-003-03`: lỗi export không tạo file hỏng được coi là thành công. |
| Related Screens | `SCR-ADM-014` |
| Open Issues | Giới hạn/chiến lược file lớn thuộc V0.3, không chặn wireframe. |

## 22. File / Media

### UC-FILE-001 — Upload file/media

| Field | Specification |
|---|---|
| Related Requirements | `FILE-001`, `FILE-005` |
| Actor | ADMIN |
| Preconditions | Actor ở form quản trị hỗ trợ file/media. |
| Trigger | Actor chọn file và upload/lưu nội dung. |
| Input | File/media và metadata liên quan; không khóa storage/API. |
| Main Flow | 1. Actor chọn file. 2. UI hiển thị tên/tiến trình khi upload. 3. Hệ thống kiểm tra quyền, loại, tên an toàn và size limit đã cấu hình. 4. Lưu file/reference theo V0.3. 5. Gắn vào nội dung. |
| Alternative Flow | Actor hủy/xóa file khỏi form trước khi lưu → không gắn file. |
| Error / Exception Flow | Loại/size không hợp lệ, upload gián đoạn, thiếu quyền, storage lỗi → thông báo và không tạo reference hỏng. |
| Validation | Whitelist type; sanitize filename; size limit bắt buộc nhưng giá trị còn `OI-005`; không dùng filename user làm storage path trực tiếp. |
| Business Rules | `RULE-001`; không chọn local/S3/converter trong V0.2. |
| Output | File được gắn vào nội dung hoặc lỗi upload. |
| Postconditions | Thành công: có reference hợp lệ; file tạm thất bại cần cleanup theo V0.3. |
| Acceptance Criteria | `AC-UC-FILE-001-01`: unauthorized/type sai/size vượt limit bị từ chối.<br>`AC-UC-FILE-001-02`: upload lỗi không để UI báo thành công.<br>`AC-UC-FILE-001-03`: wireframe có progress/error/remove state. |
| Related Screens | `SCR-ADM-004..SCR-ADM-007`, `SCR-ADM-010`, `SCR-ADM-011` |
| Open Issues | `OI-005`, `OI-015` |

### UC-FILE-002 — Xem/preview tài liệu

| Field | Specification |
|---|---|
| Related Requirements | `FILE-002` |
| Actor | USER, ADMIN |
| Preconditions | Tài liệu tồn tại và actor được phép xem. |
| Trigger | Actor chọn xem tài liệu. |
| Input | Tài liệu PDF/Word/PowerPoint được chọn. |
| Main Flow | 1. Kiểm tra quyền/availability. 2. Nếu định dạng/trình duyệt/phương án kỹ thuật hỗ trợ, mở preview. 3. Nếu không, hiển thị fallback download rõ ràng. |
| Alternative Flow | Preview không khả thi → tải file theo `UC-FILE-003`. |
| Error / Exception Flow | File không tồn tại/hỏng/không có quyền → unavailable/unauthorized, không lộ storage path. |
| Validation | Chỉ định dạng được hỗ trợ; không tự thêm Office viewer/converter/service ngoài. |
| Business Rules | “Nếu khả thi” trong `FILE-002`; quyết định kỹ thuật thuộc V0.3/V0.5. |
| Output | Preview hoặc fallback download. |
| Postconditions | Không thay đổi file. |
| Acceptance Criteria | `AC-UC-FILE-002-01`: PDF/Word/PowerPoint có preview state và fallback.<br>`AC-UC-FILE-002-02`: file lỗi/không quyền không lộ path.<br>`AC-UC-FILE-002-03`: V0.2 không khóa thư viện/dịch vụ. |
| Related Screens | Các screen detail: `SCR-HAN-003`, `SCR-RES-002`, `SCR-EDU-003` |
| Open Issues | `OI-015` |

### UC-FILE-003 — Tải tài liệu

| Field | Specification |
|---|---|
| Related Requirements | `FILE-003`, `FILE-004` |
| Actor | USER, ADMIN |
| Preconditions | Tài liệu tồn tại, được công khai/actor có quyền. |
| Trigger | Actor chọn tải hoặc dùng fallback từ preview. |
| Input | Tài liệu được chọn. |
| Main Flow | 1. Kiểm tra quyền/availability. 2. Trả file an toàn. 3. Browser tải về. |
| Alternative Flow | Preview không hỗ trợ → download là fallback hợp lệ. |
| Error / Exception Flow | Không quyền/không tìm thấy/lỗi tải → thông báo, không trả nội dung sai. |
| Validation | Filename/content type an toàn; không lộ path nội bộ. |
| Business Rules | Nội dung public không có chế độ “chỉ xem, không tải”. |
| Output | File tải về hoặc lỗi. |
| Postconditions | Không thay đổi file/dữ liệu. |
| Acceptance Criteria | `AC-UC-FILE-003-01`: tài liệu được phép tải thành công.<br>`AC-UC-FILE-003-02`: file không quyền/không tồn tại bị từ chối rõ.<br>`AC-UC-FILE-003-03`: download không phụ thuộc preview khả dụng. |
| Related Screens | `SCR-HAN-003`, `SCR-RES-002`, `SCR-EDU-003` |
| Open Issues | Không. |

## 23. Admin Dashboard navigation

Admin Portal dùng `SCR-ADM-001` làm điểm vào cho `UC-REP-001`; sidebar dẫn tới người dùng, mã giới thiệu, 9 phân hệ, ngân hàng/kỳ kiểm tra, câu hỏi tuần, thi đua, báo cáo và cấu hình. Unauthorized state áp dụng cho mọi `SCR-ADM-*`. Screen Catalog là nguồn đầy đủ cho action/state của từng màn hình.

## 24. Critical flow candidates cho V0.6

Các flow sau là đầu vào test, chưa phải test case final:

1. `UC-AUTH-002 → UC-AUTH-001 → UC-HOME-001`, chờ `OI-006` cho invitation lifecycle.
2. `UC-ADM-001 (Handbook) → UC-HAN-001 → UC-HAN-002`.
3. `UC-QUIZ-001 → UC-QUIZ-002 → UC-QUIZ-003 → UC-QUIZ-004 → UC-QUIZ-005`, chờ `OI-007..OI-009` cho lifecycle/ranking.
4. `UC-WEEK-001 → UC-WEEK-002 → UC-WEEK-003`, chờ `OI-010`.
5. `UC-COMP-003 → UC-COMP-002`, bị chặn bởi `OI-002`, `OI-012`, `OI-014`.
6. USER truy cập Admin → unauthorized (`NFR-004`).

## 25. Open Issues / Decision Backlog

| ID | Description | Source conflict/gap | Blocks | Priority | Required by | Proposed decision owner |
|---|---|---|---|---|---|---|
| `OI-001` | Chưa xác định nguồn báo/tin ngoài và quyền/phương thức tích hợp. | `NEWS-004`; baseline không nêu nguồn | Backend, Test | Blocking cho NEWS integration; non-blocking MVP đăng trực tiếp/UI | Trước implementation `UC-NEWS-003` | Project Owner / Analyst |
| `OI-002` | Chưa có tiêu chí, công thức, trọng số, normalization hoặc tie-breaker thi đua. | `COMP-003..COMP-007`, `RULE-006..RULE-008` | UI data, Backend, DB, Test | Blocking | Trước Competition backend/V0.3-V0.4 | Project Owner / Analyst |
| `OI-003` | Chưa chốt server/hosting production. | `ASM-005`, `NFR-003`, `TECH-011` | Production | Blocking cho deploy; non-blocking wireframe | Trước production design/deploy | Project Owner / Technical Design |
| `OI-004` | Chưa xác định đầy đủ dữ liệu thật ban đầu. | `ASM-003`, milestone MVP | UI content, DB seed, Test | Non-blocking wireframe; blocking data cutover | Trước UAT/data preparation | Project Owner |
| `OI-005` | Chưa chốt giới hạn dung lượng file/video upload. | `FILE-005` | Backend, UI validation, Test, Production | Blocking cho production upload validation | V0.3/V0.5 trước file implementation | Technical Design / Project Owner |
| `OI-006` | Lifecycle mã giới thiệu: một/nhiều lần, expiration, quota, gắn Admin nào. | `USR-003` chỉ yêu cầu mã hợp lệ | Registration UI detail, Backend, DB, Test | Non-blocking P0 wireframe; blocking implementation | Trước auth design/implementation | Project Owner / Analyst |
| `OI-007` | Quiz attempt policy: số lần làm, submit khi còn câu trống, bộ câu có cố định/resume sau refresh trong cùng attempt hay không. | `QUIZ-004..QUIZ-008` không quy định | Quiz UI states, Backend, DB, Test | Non-blocking P0 mock; blocking implementation | Trước quiz V0.3/V0.4 | Project Owner / Analyst |
| `OI-008` | Hết thời gian xử lý thế nào và có auto-submit không. | `QUIZ-005` có thời gian nhưng V0.1 không nêu timeout behavior | Quiz UI, Backend, Test | Non-blocking layout; blocking implementation/E2E | Trước quiz implementation | Project Owner / Analyst |
| `OI-009` | USER có xem raw score không; ranking dùng score/attempt nào và tie-breaker ra sao. | `QUIZ-008` chỉ yêu cầu Đạt/Không đạt; `QUIZ-010` yêu cầu ranking | Quiz result/ranking UI, Backend, DB, Test | Non-blocking P0 placeholder; blocking scoring/ranking implementation | Trước quiz ranking design | Project Owner / Analyst |
| `OI-010` | Lifecycle câu hỏi tuần: deadline/chuyển tuần, thời điểm reveal, trả lời sau tuần và một/nhiều lần. | `WEEK-001..WEEK-004` không định nghĩa lifecycle | Weekly UI, Backend, DB, Test | Non-blocking P1 wireframe; blocking implementation | Trước weekly implementation | Project Owner / Analyst |
| `OI-011` | “Kiểm tra” trong hierarchy EDU là nội dung gì và có liên hệ Quiz module hay không. | `EDU-001` có “Kiểm tra”; baseline đồng thời không yêu cầu quiz/progress riêng cho Nghị quyết và không mô tả EDU test behavior | EDU UI, Backend, DB, Test | Non-blocking content wireframe; blocking EDU test implementation | Trước EDU functional implementation | Project Owner / Analyst |
| `OI-012` | Nguồn “hoàn thành học tập” của thi đua không có dữ liệu vì MVP loại progress/completion tracking. | `COMP-004` xung đột `RES-005`, `EDU-004`, `OOS-006` | Competition Backend, DB, Test | Blocking | Trước Competition backend | Project Owner / Analyst |
| `OI-013` | Chưa có metric “nội dung phổ biến”; các module loại bỏ history/listening statistics. | `REP-004` so với `NEWS-005`, `MUS-004`; không có view/interaction metric | Dashboard UI data, Backend, DB, Test | Non-blocking dashboard placeholder; blocking metric implementation | Trước reporting design | Project Owner / Analyst |
| `OI-014` | Chưa đủ mô hình organization hierarchy/assignment giữa Cán bộ-Chiến sĩ và Tiểu/Trung/Đại đội; `COMP-001` còn không liệt kê Tiểu đội trong đối tượng chấm nhưng `COMP-002` có ranking Tiểu đội. | `ACT-004`, `ADM-003`, `COMP-001`, `COMP-002` | Admin config, Competition Backend, DB, Test | Non-blocking P0 layout; blocking implementation | Trước user/org/competition design | Project Owner / Analyst |
| `OI-015` | Khả năng preview Word/PowerPoint trên web và fallback theo browser/format cần quyết định kỹ thuật. | `FILE-002` dùng điều kiện “nếu khả thi” | UI behavior detail, Technical Design, Test | Non-blocking wireframe; blocking preview implementation | V0.3/V0.5 | Technical Design |

### 25.1 Đối chiếu Functional Decision ID cũ

Không rename âm thầm các ID đã xuất hiện trong Draft cũ:

| Legacy ID | Canonical Open Issue |
|---|---|
| `FD-001` | `OI-006` |
| `FD-002` | `OI-001` |
| `FD-003` | `OI-002` |
| `FD-004` | `OI-015` |
| `FD-005` | `OI-005` |
| `FD-006` | `OI-009` (`OI-002` tiếp tục chi phối tie-breaker thi đua) |
| `FD-007` | `OI-010` |

## 26. P0/P1 và Definition of Ready cho wireframe

P0 gồm đúng 12 screen ở Screen Catalog: Login, Register, Home, Handbook list/detail, Quiz list/attempt/result, Competition ranking, Admin Dashboard, Admin Question Bank và Admin Handbook. 29 screen còn lại là P1. Không thêm screen mới hoặc đưa toàn bộ MVP vào P0.

Một screen được coi là ready để wireframe khi có actor, purpose, action, state, requirement/UC reference và Open Issue ảnh hưởng. “Ready” không có nghĩa business rule ở OI đã được Accepted; wireframe phải dùng placeholder/disabled/note đúng classification.

## 27. Definition of Review Ready V0.2

- 74 functional requirement V0.1 được map sang UC/functional section trong Traceability Matrix.
- 40 Use Case ID hiện hữu có contract, AC và Screen reference.
- 41 Screen ID hiện hữu được mô tả ở Screen Catalog; P0 12/P1 29.
- Ambiguity được ghi thành `OI-001..OI-015`; không tạo final API/DB/business rule.
- Static ID/reference/coverage validation PASS.

`Review Ready` không phải `Accepted`. Các OI blocking vẫn phải được quyết định trước phần implementation tương ứng.

## 28. Next step

**Review/finalize P0 Wireframe based on V0.2 and Screen Catalog.**
