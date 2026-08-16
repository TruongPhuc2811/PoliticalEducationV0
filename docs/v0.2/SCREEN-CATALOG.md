# SCREEN CATALOG — V0.2

**Project:** Hệ thống Giáo dục Chính trị  
**Document ID:** PES-SCREEN-CATALOG-V0.2  
**Version:** 0.2  
**Date:** 2026-08-16  
**Status:** Review Ready  
**Depends on:** `docs/v0.2/FUNCTIONAL-SPECIFICATION.md`  
**Purpose:** Danh mục màn hình chuẩn cho review, wireframe, UI planning và test traceability.

---

## 1. Quy ước

- Giữ nguyên toàn bộ 41 Screen ID của Draft V0.2.
- `Route conceptual` chỉ mô tả điểm điều hướng để wireframe thống nhất; không phải final frontend route hoặc API contract.
- P0 chỉ phục vụ UI Reporting Prototype; P1 là các màn hình MVP còn lại. P0/P1 không biểu thị trạng thái implementation.
- `Wireframe status: Review Ready` nghĩa là màn hình P0 đã có đặc tả và representation trong standalone interactive wireframe; trạng thái này không đồng nghĩa `Accepted` hoặc đã implement React.
- State chỉ liệt kê khi có ý nghĩa chức năng; common unauthorized áp dụng cho mọi Admin screen.

## 2. P0 — UI Reporting Prototype (12 screens)

| Screen ID | Name | Actor | Priority | Route conceptual | Related Requirement IDs | Related Use Case IDs | Purpose | Primary actions | Key states | Open Issues | Wireframe status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `SCR-AUTH-001` | Đăng nhập | All roles | P0 | `/login` | `USR-001`, `USR-004`, `NFR-004` | `UC-AUTH-001` | Xác thực để vào portal phù hợp | Nhập username/password; đăng nhập; sang đăng ký | Default, validation error, authenticating, invalid credentials, system error | Không; auth mechanism thuộc V0.3 | Review Ready |
| `SCR-AUTH-002` | Đăng ký bằng mã giới thiệu | Người chưa có tài khoản | P0 | `/register` | `USR-002`, `USR-003` | `UC-AUTH-002` | Tạo tài khoản USER khi có mã hợp lệ | Nhập thông tin; submit; về login | Default, field error, invalid code, duplicate username, submitting, success | `OI-006` | Review Ready |
| `SCR-HOME-001` | Trang chủ 9 phân hệ | USER, ADMIN | P0 | `/home` | `HOME-001..HOME-005`, `HCM-003`, `COMP-006` | `UC-HOME-001`, `UC-HCM-001`, `UC-COMP-002` | Điểm vào User Portal và 9 module | Chọn module; xem lời dạy hôm nay; xem ranking | Loading vùng, default, partial empty/error, unauthorized | `OI-013` nếu hiển thị nội dung phổ biến | Review Ready |
| `SCR-HAN-002` | Danh sách bài Cẩm nang | USER, ADMIN | P0 | `/handbook` | `HAN-004`, `HAN-005` | `UC-HAN-001`, `UC-HAN-003` | Duyệt/tìm bài theo danh mục | Chọn danh mục; tìm; đổi trang; mở bài | Loading, default, no results, error | Không | Review Ready |
| `SCR-HAN-003` | Chi tiết Cẩm nang | USER, ADMIN | P0 | `/handbook/:contentId` | `HAN-003`, `HAN-004`, `FILE-002..FILE-004` | `UC-HAN-002`, `UC-FILE-002`, `UC-FILE-003` | Đọc text và xem/tải media | Xem media; tải tài liệu; quay lại | Loading, default, media error, unavailable/not found | `OI-005`, `OI-015` | Review Ready |
| `SCR-QUIZ-001` | Danh sách kỳ kiểm tra | USER, ADMIN | P0 | `/quizzes` | `QUIZ-005` | `UC-QUIZ-003` | Chọn kỳ và hiểu cấu hình cơ bản | Đổi trang/filter; xem thông tin; bắt đầu khi cho phép | Loading, empty, open, closed/disabled, error | `OI-007` | Review Ready |
| `SCR-QUIZ-003` | Làm bài kiểm tra | USER, ADMIN tham gia | P0 | `/quizzes/:quizId/attempt/:attemptRef` | `QUIZ-004`, `QUIZ-006..QUIZ-008` | `UC-QUIZ-004`, `UC-QUIZ-005` | Trả lời, điều hướng câu và nộp | Chọn đáp án; câu trước/sau; xác nhận nộp | Loading, active, answered/unanswered indicator, submit confirm, submit error, expired placeholder | `OI-007`, `OI-008` | Review Ready |
| `SCR-QUIZ-004` | Kết quả kiểm tra | USER, ADMIN tham gia | P0 | `/quizzes/:quizId/result/:resultRef` | `QUIZ-007..QUIZ-009` | `UC-QUIZ-005` | Hiển thị kết quả baseline Đạt/Không đạt | Về Home; xem ranking | Loading, pass, fail, error/not found | `OI-009`, `OI-002` | Review Ready |
| `SCR-COMP-002` | Bảng xếp hạng thi đua | USER, ADMIN | P0 | `/competition/ranking` | `COMP-001`, `COMP-002`, `COMP-005`, `COMP-006` | `UC-COMP-002` | Xem ranking công khai theo phạm vi/kỳ | Chọn phạm vi; chọn chu kỳ; đổi trang | Loading, mock-labelled/default, empty, blocked metric, error | `OI-002`, `OI-014` | Review Ready |
| `SCR-ADM-001` | Admin Dashboard | ADMIN | P0 | `/admin` | `REP-001..REP-004` | `UC-REP-001` | Tổng quan quân số, thi đua, ranking, popular content | Chọn vùng/đi tới module; retry widget | Loading per widget, data, empty, blocked placeholder, partial error, unauthorized | `OI-002`, `OI-013`, `OI-014` | Review Ready |
| `SCR-ADM-008` | Ngân hàng câu hỏi | ADMIN | P0 | `/admin/question-bank` | `QUIZ-001..QUIZ-003` | `UC-QUIZ-001` | Quản lý chủ đề/câu hỏi | Search/filter/page; tạo/sửa/xóa; xác nhận | Loading, empty, form validation, save success/error, delete confirm, unauthorized | Không | Review Ready |
| `SCR-ADM-004` | Quản lý Cẩm nang | ADMIN | P0 | `/admin/handbook` | `HAN-001..HAN-003`, `FILE-001` | `UC-ADM-001`, `UC-FILE-001` | Quản lý danh mục/bài đại diện cho content admin | Search/filter/page; CRUD; đăng; upload | Loading, empty, edit/create, validation, upload progress/error, save success, delete confirm, unauthorized | `OI-005`, `OI-015` | Review Ready |

## 3. P1 — Authentication, User Portal và module còn lại (14 screens)

| Screen ID | Name | Actor | Priority | Route conceptual | Related Requirement IDs | Related Use Case IDs | Purpose | Primary actions | Key states | Open Issues | Wireframe status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `SCR-HAN-001` | Danh mục Cẩm nang | USER, ADMIN | P1 | `/handbook/categories` | `HAN-004` | `UC-HAN-001` | Chọn danh mục Cẩm nang | Chọn danh mục; sang danh sách | Loading, empty, default, error | Không | Not started |
| `SCR-RES-001` | Danh sách nghị quyết | USER, ADMIN | P1 | `/resolutions` | `RES-001`, `RES-004`, `RES-005` | `UC-RES-001` | Duyệt nghị quyết công khai | Đổi trang; mở chi tiết | Loading, empty, default, error | Không | Not started |
| `SCR-RES-002` | Chi tiết nghị quyết | USER, ADMIN | P1 | `/resolutions/:resolutionId` | `RES-002..RES-005`, `FILE-002..FILE-004` | `UC-RES-002`, `UC-FILE-002`, `UC-FILE-003` | Đọc nội dung/chuyên đề/tài liệu | Mở bài học; xem/tải file; xem video | Loading, default, missing section, file/media error, not found | `OI-005`, `OI-015` | Not started |
| `SCR-NEWS-001` | Danh sách tin | USER, ADMIN | P1 | `/news` | `NEWS-001`, `NEWS-003`, `NEWS-005` | `UC-NEWS-001` | Duyệt tin theo chuyên mục | Chọn chuyên mục; đổi trang; mở tin | Loading, empty, default, error | `OI-001` không chặn nội dung Admin đăng | Not started |
| `SCR-NEWS-002` | Chi tiết tin | USER, ADMIN | P1 | `/news/:newsId` | `NEWS-002`, `NEWS-005` | `UC-NEWS-002` | Đọc tin/xem video/mở link ngoài | Phát video; mở link; quay lại | Loading, text/video/link, source unavailable, not found | `OI-001` cho source ngoài | Not started |
| `SCR-MUS-001` | Kho âm nhạc | USER, ADMIN | P1 | `/music` | `MUS-001`, `MUS-003`, `MUS-004` | `UC-MUS-001` | Duyệt nội dung theo nhóm | Chọn nhóm; đổi trang; mở player | Loading, empty, default, error | Không | Not started |
| `SCR-MUS-002` | Trình phát nội dung | USER, ADMIN | P1 | `/music/:mediaId` | `MUS-002..MUS-004` | `UC-MUS-002` | Phát upload media/YouTube theo yêu cầu | Play/pause theo player; quay lại | Loading, ready, source unavailable/error | `OI-005` | Not started |
| `SCR-QUIZ-002` | Hướng dẫn/thông tin kỳ kiểm tra | USER, ADMIN tham gia | P1 | `/quizzes/:quizId` | `QUIZ-004`, `QUIZ-005` | `UC-QUIZ-003`, `UC-QUIZ-004` | Cho actor xem cấu hình và xác nhận bắt đầu | Bắt đầu; quay lại | Loading, open, closed/disabled, unavailable, error | `OI-007`, `OI-008` | Not started |
| `SCR-QUIZ-005` | Bảng xếp hạng kiểm tra | USER, ADMIN | P1 | `/quizzes/:quizId/ranking` | `QUIZ-010` | `UC-QUIZ-006` | Xem ranking của kỳ | Chọn kỳ; đổi trang | Loading, placeholder, empty, error | `OI-009` | Not started |
| `SCR-EDU-001` | Chương trình giáo dục chính trị | USER, ADMIN | P1 | `/political-education` | `EDU-001`, `EDU-003`, `EDU-004` | `UC-EDU-001` | Chọn chương trình | Chọn chương trình; đổi trang | Loading, empty, default, error | `OI-011` | Not started |
| `SCR-EDU-002` | Chủ đề/Bài giảng | USER, ADMIN | P1 | `/political-education/:programId` | `EDU-001`, `EDU-003`, `EDU-004` | `UC-EDU-001` | Điều hướng chủ đề/bài giảng | Chọn chủ đề/bài; đổi trang | Loading, empty at level, default, error/not found | `OI-011` | Not started |
| `SCR-EDU-003` | Chi tiết bài giảng | USER, ADMIN | P1 | `/political-education/lessons/:lessonId` | `EDU-002..EDU-004`, `FILE-002..FILE-004` | `UC-EDU-002`, `UC-FILE-002`, `UC-FILE-003` | Đọc bài/xem/tải tài liệu | Xem video/PPT; tải file; quay lại | Loading, default, preview fallback, media error, not found | `OI-005`, `OI-011`, `OI-015` | Not started |
| `SCR-HCM-001` | Lời Bác Hồ dạy hôm nay | USER, ADMIN | P1 | `/ho-chi-minh` | `HCM-001`, `HCM-003`, `HCM-004` | `UC-HCM-001` | Hiển thị mục theo ngày | Mở chi tiết | Loading, today data, empty, error | Không | Not started |
| `SCR-HCM-002` | Chi tiết lời dạy | USER, ADMIN | P1 | `/ho-chi-minh/:teachingId` | `HCM-002`, `HCM-004` | `UC-HCM-002` | Xem nội dung/nguồn/hoàn cảnh/ý nghĩa | Mở nội dung liên quan; quay lại | Loading, default, optional fields absent, not found/error | Không | Not started |

## 4. P1 — Weekly/Competition và Admin Portal (15 screens)

| Screen ID | Name | Actor | Priority | Route conceptual | Related Requirement IDs | Related Use Case IDs | Purpose | Primary actions | Key states | Open Issues | Wireframe status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `SCR-WEEK-001` | Câu hỏi tuần | USER, ADMIN tham gia | P1 | `/weekly-question` | `WEEK-001..WEEK-003`, `WEEK-005` | `UC-WEEK-002` | Xem/chọn/nộp câu hỏi hiện hành | Chọn đáp án; nộp | Loading, active, no current question, submitting, recorded, unavailable/error | `OI-010`, `OI-002` | Not started |
| `SCR-WEEK-002` | Kết quả/đáp án câu hỏi tuần | USER, ADMIN | P1 | `/weekly-question/result` | `WEEK-003`, `WEEK-004` | `UC-WEEK-002`, `UC-WEEK-003` | Xem trạng thái kết quả và lời giải khi được phép | Xem lời giải; quay lại | Loading, recorded, not-yet-revealed, revealed, not found/error | `OI-010` | Not started |
| `SCR-COMP-001` | Điểm thi đua cá nhân | USER, ADMIN | P1 | `/competition/me` | `COMP-001`, `COMP-003..COMP-005` | `UC-COMP-001` | Xem tổng điểm/breakdown được phép | Chọn chu kỳ; xem nguồn điểm | Loading, blocked placeholder, empty, data, error | `OI-002`, `OI-012` | Not started |
| `SCR-ADM-002` | Quản lý người dùng | ADMIN | P1 | `/admin/users` | `USR-004`, `ADM-001` | `UC-ADM-USER-001` | Xem/search/sửa user và role | Search/filter/page; xem/sửa | Loading, empty, validation, save success/error, unauthorized | `OI-014` | Not started |
| `SCR-ADM-003` | Quản lý mã giới thiệu | ADMIN | P1 | `/admin/invitations` | `USR-003`, `ADM-001` | `UC-ADM-INV-001` | Tạo/xem/vô hiệu hóa mã | Page; tạo; vô hiệu hóa; xác nhận | Loading, empty, create validation, active/disabled, save error, unauthorized | `OI-006` | Not started |
| `SCR-ADM-005` | Quản lý nghị quyết | ADMIN | P1 | `/admin/resolutions` | `RES-001..RES-003`, `FILE-001` | `UC-ADM-001`, `UC-FILE-001` | Quản lý nghị quyết/chuyên đề/file/video | Search/filter/page; CRUD; đăng; upload | Table/form/loading/empty, upload, validation, success/error, unauthorized | `OI-005`, `OI-015` | Not started |
| `SCR-ADM-006` | Quản lý tin tức | ADMIN | P1 | `/admin/news` | `NEWS-001..NEWS-003`, `FILE-001` | `UC-ADM-001`, `UC-FILE-001` | Quản lý chuyên mục/tin chữ/video/link | Search/filter/page; CRUD; đăng; upload/link | Table/form/loading/empty, validation, link/media error, success, unauthorized | `OI-001`, `OI-005` | Not started |
| `SCR-ADM-007` | Quản lý âm nhạc | ADMIN | P1 | `/admin/music` | `MUS-001`, `MUS-002`, `FILE-001` | `UC-ADM-001`, `UC-FILE-001` | Quản lý nhóm/upload/YouTube | Filter/page; CRUD; đăng; upload/link | Table/form/loading/empty, validation, upload error, success, unauthorized | `OI-005` | Not started |
| `SCR-ADM-009` | Quản lý kỳ kiểm tra | ADMIN | P1 | `/admin/quizzes` | `QUIZ-004`, `QUIZ-005` | `UC-QUIZ-002` | Cấu hình số câu/thời gian/điểm đạt/trạng thái | Filter/page; tạo/sửa; mở/đóng | Loading, empty, validation, insufficient bank, save success/error, unauthorized | `OI-007`, `OI-008`, `OI-009` | Not started |
| `SCR-ADM-010` | Quản lý Giáo dục chính trị | ADMIN | P1 | `/admin/political-education` | `EDU-001`, `EDU-002`, `FILE-001` | `UC-ADM-001`, `UC-FILE-001` | Quản lý hierarchy/bài giảng/tài liệu | Filter/page; CRUD; đăng; upload | Tree/list/form/loading/empty, validation, upload, success/error, unauthorized | `OI-005`, `OI-011`, `OI-015` | Not started |
| `SCR-ADM-011` | Quản lý Lời Bác Hồ dạy | ADMIN | P1 | `/admin/ho-chi-minh` | `HCM-001`, `HCM-002`, `FILE-001` | `UC-ADM-001`, `UC-FILE-001` | Quản lý mục theo ngày và nội dung liên quan | Filter/page; CRUD; đăng; upload | Table/form/loading/empty, validation, date conflict placeholder, success/error, unauthorized | `OI-005` | Not started |
| `SCR-ADM-012` | Quản lý câu hỏi tuần | ADMIN | P1 | `/admin/weekly-questions` | `WEEK-001`, `WEEK-002`, `WEEK-004` | `UC-WEEK-001` | Quản lý câu/đáp án/lời giải/publication | Filter/page; CRUD; công khai | Loading, empty, form validation, lifecycle placeholder, success/error, unauthorized | `OI-010` | Not started |
| `SCR-ADM-013` | Quản lý thi đua | ADMIN | P1 | `/admin/competition` | `COMP-003..COMP-007`, `ADM-003` | `UC-COMP-003`, `UC-COMP-004` | Placeholder/manage policy sau khi được phê duyệt | Xem trạng thái blocker; quản lý tiêu chí/kỳ/nguồn sau quyết định | Blocked, loading, validation placeholder, unauthorized | `OI-002`, `OI-012`, `OI-014` | Not started |
| `SCR-ADM-014` | Báo cáo | ADMIN | P1 | `/admin/reports` | `REP-005`, `REP-006` | `UC-REP-002`, `UC-REP-003` | Xem báo cáo theo kỳ và export on-demand | Chọn loại/kỳ; xem; page; xuất Excel | Default, filter validation, loading, empty, data, export progress/error, unauthorized | `OI-002`, `OI-013` tùy báo cáo | Not started |
| `SCR-ADM-015` | Cấu hình hệ thống | ADMIN | P1 | `/admin/settings` | `ADM-003` | `UC-ADM-CFG-001` | Quản lý 9 nhóm cấu hình baseline | Chọn nhóm; page; CRUD; xác nhận | Loading, empty, form validation, referenced-item error, blocked group, success, unauthorized | `OI-002`, `OI-014` | Not started |

## 5. Summary và wireframe gate

| Priority | Count | Review Ready wireframe | Not started |
|---|---:|---:|---:|
| P0 | 12 | 12 | 0 |
| P1 | 29 | 0 | 29 |
| **Total** | **41** | **12** | **29** |

P0 đủ flow báo cáo UI theo yêu cầu. Wireframe Review Ready đã:

1. Bổ sung `SCR-AUTH-002` vào P0.
2. Không trình bày auto-submit, số attempt, raw score, formula/tie-breaker hoặc popularity metric như quyết định đã chốt.
3. Ghi nhãn rõ dữ liệu mock ở ranking/dashboard.
4. Thể hiện các state blocking/placeholder được liệt kê ở catalog.

## 6. Next step

**Implement P0 UI Reporting Prototype in React based on the Review Ready wireframe.**
