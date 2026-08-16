# WIREFRAME SPECIFICATION — P0

**Project:** Hệ thống Giáo dục Chính trị  
**Document ID:** PES-WF-P0  
**Version:** 0.2  
**Date:** 2026-08-16  
**Status:** Review Ready  
**Depends on:** `docs/v0.2/FUNCTIONAL-SPECIFICATION.md`, `docs/v0.2/SCREEN-CATALOG.md`  
**Interactive source:** `wireframes/P0-interactive-wireframe.html`

---

## 1. Mục đích và ranh giới

Bộ wireframe khóa hierarchy, navigation, action placement, functional data, meaningful states và responsive behavior cho UI Reporting Prototype. Đây là nguồn trực tiếp cho task React P0 tiếp theo, nhưng không phải final visual specification hoặc production implementation.

- Screen Catalog V0.2 Review Ready là nguồn duy nhất của P0 inventory.
- Không khóa color/token/type scale/pixel breakpoint; ảnh UI reference chỉ truyền đạt tinh thần trang trọng, content-first và module card lớn.
- Không chọn auth mechanism, API, DTO, database, scoring formula, quiz lifecycle hoặc popularity metric.
- Mock/placeholder phải có nhãn; không được trình bày như dữ liệu hoặc rule production.

## 2. Exact P0 inventory

| # | Screen ID | Screen | Portal | Primary Use Case |
|---:|---|---|---|---|
| 1 | `SCR-AUTH-001` | Đăng nhập | Public | `UC-AUTH-001` |
| 2 | `SCR-AUTH-002` | Đăng ký bằng mã giới thiệu | Public | `UC-AUTH-002` |
| 3 | `SCR-HOME-001` | Trang chủ 9 phân hệ | User | `UC-HOME-001` |
| 4 | `SCR-HAN-002` | Danh sách bài Cẩm nang | User | `UC-HAN-001`, `UC-HAN-003` |
| 5 | `SCR-HAN-003` | Chi tiết Cẩm nang | User | `UC-HAN-002` |
| 6 | `SCR-QUIZ-001` | Danh sách kỳ kiểm tra | User | `UC-QUIZ-003` |
| 7 | `SCR-QUIZ-003` | Làm bài kiểm tra | User | `UC-QUIZ-004`, `UC-QUIZ-005` |
| 8 | `SCR-QUIZ-004` | Kết quả kiểm tra | User | `UC-QUIZ-005` |
| 9 | `SCR-COMP-002` | Bảng xếp hạng thi đua | User | `UC-COMP-002` |
| 10 | `SCR-ADM-001` | Admin Dashboard | Admin | `UC-REP-001` |
| 11 | `SCR-ADM-008` | Ngân hàng câu hỏi | Admin | `UC-QUIZ-001` |
| 12 | `SCR-ADM-004` | Quản lý Cẩm nang | Admin | `UC-ADM-001`, `UC-FILE-001` |

**P0 count: 12.** Không promote P1 và không demote P0.

## 3. Cross-portal layout rules

### 3.1 User Portal

- Content-first; header nhận diện + Home/profile placeholder.
- Home dùng 9 module cards, 3 cột khi desktop đủ rộng, 1–2 cột trên mobile tùy width.
- Content list/detail dùng chiều rộng đọc phù hợp; media chỉ là thumbnail/placeholder và được mở theo hành động.
- Primary action đặt gần context; back navigation luôn nhìn thấy ở flow sâu.

### 3.2 Admin Portal

- Desktop: sidebar navigation + compact topbar + vùng table/form/dashboard.
- Mobile: sidebar chuyển thành menu điều hướng có thể mở; table nằm trong vùng cuộn ngang có nhãn, không làm tràn toàn trang.
- Không biến Admin thành grid module card của User Portal.

### 3.3 Common states and accessibility

- Mỗi screen có heading gắn Screen ID trong prototype, vùng trạng thái có thể đọc được, và focus chuyển tới heading khi navigation.
- Form input có label; button/link dùng semantic element; trạng thái không chỉ truyền đạt bằng màu.
- Loading/empty/error/disabled/success/unauthorized/not-found chỉ xuất hiện ở screen có ý nghĩa.
- Wireframe không thêm social login, forgot password, OTP, favorite, autoplay hoặc notification.

## 4. Screen specifications

### 4.1 SCR-AUTH-001 — Đăng nhập

| Field | Wireframe specification |
|---|---|
| Actor | USER, ADMIN, SUPER_ADMIN |
| Related Requirements | `USR-001`, `USR-004`, `NFR-004` |
| Related Use Cases | `UC-AUTH-001` |
| Purpose | Thu username/password và mô phỏng điều hướng tới portal phù hợp; không mô tả JWT/session. |
| Entry points | Mở prototype; quay lại từ Register; trạng thái unauthenticated. |
| Exit points | `SCR-HOME-001`; `SCR-ADM-001` qua demo navigator; `SCR-AUTH-002`. |
| Layout zones | Public header/brand; centered auth panel; labeled form; validation/status region; action area. |
| Primary actions | Đăng nhập. |
| Secondary actions | Mở đăng ký. |
| Data displayed | Tên hệ thống; username; password; generic authentication status. |
| States | Default; required-field error; authenticating/disabled; invalid credentials; system error. |
| Desktop | Form card giới hạn chiều rộng, centered; brand tách khỏi form. |
| Mobile | Form full available width; controls ≥ usable touch size; không overflow. |
| Open Issues | Không; auth mechanism thuộc V0.3, không thể hiện ở wireframe. |
| UI-report behavior | Form submit là mock navigation; không gửi credential. |

### 4.2 SCR-AUTH-002 — Đăng ký bằng mã giới thiệu

| Field | Wireframe specification |
|---|---|
| Actor | Người chưa có tài khoản |
| Related Requirements | `USR-002`, `USR-003`, `RULE-002` |
| Related Use Cases | `UC-AUTH-002` |
| Purpose | Mô tả self-registration tối thiểu bằng username, password và invitation code. |
| Entry points | Link Đăng ký từ `SCR-AUTH-001`. |
| Exit points | Thành công mock → action quay `SCR-AUTH-001`; hủy/quay lại Login. |
| Layout zones | Public header/brand; registration form; OI annotation; validation/status; action area. |
| Primary actions | Đăng ký. |
| Secondary actions | Quay lại đăng nhập; mô phỏng generic invalid-code state. |
| Data displayed | Username; password; invitation code; success/error message. Không email/phone/OTP/organization assignment. |
| States | Default; field error; generic invalid code; duplicate username placeholder; submitting/disabled; success. |
| Desktop | Form card giới hạn chiều rộng; annotation dưới invitation field. |
| Mobile | Single column; status/action không bị che; keyboard order theo visual order. |
| Open Issues | `OI-006`: one/multi-use, expiration, quota, owner không được hiển thị như rule. |
| UI-report behavior | Mock validation/success only; không tạo account và không auto-login. |

### 4.3 SCR-HOME-001 — Trang chủ 9 phân hệ

| Field | Wireframe specification |
|---|---|
| Actor | USER, ADMIN |
| Related Requirements | `HOME-001..HOME-005`, `HCM-003`, `COMP-006` |
| Related Use Cases | `UC-HOME-001`, `UC-HCM-001`, `UC-COMP-002` |
| Purpose | Điểm vào trực quan cho đúng 9 phân hệ và content highlights đã có requirement. |
| Entry points | Login mock thành công; Home action từ các P0 user screens. |
| Exit points | P0: `SCR-HAN-002`, `SCR-QUIZ-001`, `SCR-COMP-002`; 6 card còn lại được ghi P1, không tạo P0 target giả. |
| Layout zones | User header; banner/thông báo; 9-card module grid; Lời Bác Hồ dạy hôm nay; competition highlight placeholder. |
| Primary actions | Chọn module. |
| Secondary actions | Mở ranking P0; xem profile/logout chỉ là placement placeholder. |
| Data displayed | Tên 9 module; banner; daily teaching excerpt/empty state; mock ranking highlight có nhãn. |
| States | Page loading; default; partial empty/error theo vùng; unauthorized. Navigation 9 module vẫn giữ khi highlight lỗi. |
| Desktop | Grid ưu tiên 3 cột; highlights 2-column khi đủ rộng. |
| Mobile | 1 cột ở narrow viewport, có thể 2 cột khi đủ; banner thấp hơn; cards không vỡ. |
| Open Issues | `OI-002`, `OI-012`, `OI-014` nếu có ranking highlight; không dùng popular-content metric ở Home. |
| UI-report behavior | Handbook/Quiz/Competition live navigation; 6 module P1 dùng disabled/annotation; content là mock. |

### 4.4 SCR-HAN-002 — Danh sách bài Cẩm nang

| Field | Wireframe specification |
|---|---|
| Actor | USER, ADMIN |
| Related Requirements | `HAN-004`, `HAN-005` |
| Related Use Cases | `UC-HAN-001`, `UC-HAN-003` |
| Purpose | Duyệt/search bài công khai theo category với pagination. |
| Entry points | Card Cẩm nang từ `SCR-HOME-001`; back từ detail. |
| Exit points | `SCR-HAN-003`; `SCR-HOME-001`. |
| Layout zones | User header/breadcrumb; title/context; search/filter; article list; category sidebar/filter; pagination; state region. |
| Primary actions | Tìm kiếm; chọn bài. |
| Secondary actions | Chọn category; đổi trang; về Home. |
| Data displayed | Category; title; excerpt; thumbnail placeholder; publication metadata nếu có. |
| States | Loading; default; no results/empty; error/retry. |
| Desktop | Main list + category sidebar; pagination dưới list. |
| Mobile | Category thành select/filter; article cards single column; pagination wrap được. |
| Open Issues | Không. |
| UI-report behavior | Search/filter/page cập nhật presentation mock, không truy vấn backend. |

### 4.5 SCR-HAN-003 — Chi tiết Cẩm nang

| Field | Wireframe specification |
|---|---|
| Actor | USER, ADMIN |
| Related Requirements | `HAN-003`, `HAN-004`, `FILE-002..FILE-004` |
| Related Use Cases | `UC-HAN-002`, `UC-FILE-002`, `UC-FILE-003` |
| Purpose | Trình bày hierarchy đọc bài với media on-demand/fallback. |
| Entry points | Chọn bài từ `SCR-HAN-002`. |
| Exit points | Quay `SCR-HAN-002`; về `SCR-HOME-001`. |
| Layout zones | User header/breadcrumb; title/metadata; media placeholder; content body; file/action area; related-content placeholder nếu có dữ liệu. |
| Primary actions | Quay lại danh sách; explicit play/preview. |
| Secondary actions | Tải tài liệu nếu có; về Home. |
| Data displayed | Title, category, metadata, text, image/video thumbnail/placeholder. Không thiết kế editor/schema. |
| States | Loading; default; media error; unavailable/not found; file preview fallback. |
| Desktop | Readable content column; media không preload. |
| Mobile | Single column; media responsive; actions wrap. |
| Open Issues | `OI-005` upload limit; `OI-015` Office preview feasibility. |
| UI-report behavior | Media action chỉ đổi placeholder state; không tải file/media thật. |

### 4.6 SCR-QUIZ-001 — Danh sách kỳ kiểm tra

| Field | Wireframe specification |
|---|---|
| Actor | USER, ADMIN tham gia |
| Related Requirements | `QUIZ-005` |
| Related Use Cases | `UC-QUIZ-003` |
| Purpose | Cho actor xem cấu hình tối thiểu và bắt đầu kỳ đang mở. |
| Entry points | Card Quiz từ `SCR-HOME-001`; về từ Result. |
| Exit points | P0 demo: action Bắt đầu mở confirmation inline rồi tới `SCR-QUIZ-003`; về `SCR-HOME-001`. `SCR-QUIZ-002` là P1 nên không tạo P0 screen giả. |
| Layout zones | User header; title; optional filter; paginated quiz cards/list; state area; pagination. |
| Primary actions | Bắt đầu kỳ đang mở. |
| Secondary actions | Đổi trang/filter; về Home. |
| Data displayed | Tên kỳ, số câu, thời gian, điểm đạt, open/closed state. Không hiển thị attempt count. |
| States | Loading; empty; open; closed/disabled; error. |
| Desktop | Card/list grid vừa phải; không preload question bank. |
| Mobile | Single column; disabled state có text, không chỉ màu. |
| Open Issues | `OI-007` attempt policy; `OI-008` timeout behavior. |
| UI-report behavior | Start là navigation mock; không random/gửi bank thật. |

### 4.7 SCR-QUIZ-003 — Làm bài kiểm tra

| Field | Wireframe specification |
|---|---|
| Actor | USER, ADMIN tham gia |
| Related Requirements | `QUIZ-004`, `QUIZ-006..QUIZ-008` |
| Related Use Cases | `UC-QUIZ-004`, `UC-QUIZ-005` |
| Purpose | Thể hiện question, answer selection, navigation, configured-time display và explicit submit. |
| Entry points | Start từ `SCR-QUIZ-001`. |
| Exit points | Submit confirmation → `SCR-QUIZ-004`; cancel/back → `SCR-QUIZ-001`. |
| Layout zones | User header/context; progress + static timer area; question/answers; question navigator; OI annotation; sticky-capable action area; confirm dialog. |
| Primary actions | Chọn đáp án; nộp bài có xác nhận. |
| Secondary actions | Câu trước/sau; chọn số câu; quay danh sách trước khi submit. |
| Data displayed | Một câu mock tại một thời điểm; answer options; answered/unanswered presentation; configured time. Không có correct answer/raw score. |
| States | Loading; active; answered/unanswered indicator; submit confirm; submit error; timeout placeholder only. |
| Desktop | Question main column + navigator side panel. |
| Mobile | Navigator xuống dưới; action area wrap/sticky-safe; radio labels full width. |
| Open Issues | `OI-007`: attempts/unanswered/fixed-resume. `OI-008`: timeout/auto-submit. `OI-009`: raw score/ranking. |
| UI-report behavior | Timer không countdown; timeout text ghi Pending `OI-008`; submit dẫn tới mock result, không chấm/random logic. |

### 4.8 SCR-QUIZ-004 — Kết quả kiểm tra

| Field | Wireframe specification |
|---|---|
| Actor | USER, ADMIN tham gia |
| Related Requirements | `QUIZ-007..QUIZ-009` |
| Related Use Cases | `UC-QUIZ-005` |
| Purpose | Hiển thị baseline result state Đạt/Không đạt mà không giả raw score/ranking rule. |
| Entry points | Submit mock từ `SCR-QUIZ-003`. |
| Exit points | `SCR-QUIZ-001`, `SCR-HOME-001`, `SCR-COMP-002` (competition P0, không phải quiz-ranking P1). |
| Layout zones | User header; centered result state; explanatory/OI note; action group. |
| Primary actions | Về danh sách kỳ; về Home. |
| Secondary actions | Mở bảng xếp hạng thi đua P0 với nhãn rõ. |
| Data displayed | Đạt hoặc Không đạt; mock-state label. Không raw score, selected-attempt metric hoặc tie-breaker. |
| States | Loading; pass; fail; error/not found. |
| Desktop | Compact centered panel. |
| Mobile | Full-width panel; actions stack/wrap. |
| Open Issues | `OI-009`; `OI-002` nếu kết quả đóng góp thi đua. |
| UI-report behavior | Result là mock presentation state; JavaScript không chấm bài. |

### 4.9 SCR-COMP-002 — Bảng xếp hạng thi đua

| Field | Wireframe specification |
|---|---|
| Actor | USER, ADMIN |
| Related Requirements | `COMP-001`, `COMP-002`, `COMP-005`, `COMP-006`, `RULE-007` |
| Related Use Cases | `UC-COMP-002` |
| Purpose | Trình bày ranking context theo phạm vi và chu kỳ mà không tạo formula. |
| Entry points | Competition card/Home highlight; action từ Quiz Result chỉ như cross-module navigation. |
| Exit points | `SCR-HOME-001`; các P1 detail không có target trong P0. |
| Layout zones | User header; title + mandatory mock warning; scope/period filters; ranked list/table; pagination; state area. |
| Primary actions | Chọn phạm vi cá nhân/tiểu đội/trung đội/đại đội; chọn tuần/tháng/năm. |
| Secondary actions | Đổi trang; về Home. |
| Data displayed | Rank, neutral mock subject, placeholder score, unit context. Không coefficient/weight/tie-break. |
| States | Loading; mock-labelled default; empty; blocked metric; error. |
| Desktop | Table with filters in one row where possible. |
| Mobile | Filter stack; intentionally scrollable table region or stacked rank rows; no page overflow. |
| Open Issues | `OI-002`, `OI-012`, `OI-014`. |
| UI-report behavior | `Mock UI data — business formula pending OI-002/OI-012/OI-014`; filter chỉ đổi label, không tính điểm. |

### 4.10 SCR-ADM-001 — Admin Dashboard

| Field | Wireframe specification |
|---|---|
| Actor | ADMIN, SUPER_ADMIN |
| Related Requirements | `REP-001..REP-004`, `NFR-004` |
| Related Use Cases | `UC-REP-001` |
| Purpose | Tổng quan đúng bốn nhóm metric đã có requirement và điều hướng tới hai Admin P0 capabilities. |
| Entry points | Admin login context/demo navigator; Admin navigation từ P0 management screens. |
| Exit points | `SCR-ADM-008`, `SCR-ADM-004`; Logout placement → `SCR-AUTH-001`. |
| Layout zones | Admin topbar; desktop sidebar/mobile menu; page header; four metric cards; ranking placeholder; popular-content placeholder; widget state region. |
| Primary actions | Mở Question Bank; mở Handbook management; retry widget theo thao tác. |
| Secondary actions | Logout mock; P1 nav items disabled/annotated. |
| Data displayed | Total personnel, competition score, ranking, popular content. Values là dash/mock-labelled; không thêm metric. |
| States | Loading per widget; data placeholder; empty; blocked metric; partial error; unauthorized. |
| Desktop | Sidebar + four-column stat area + two-column detail. |
| Mobile | Menu `<details>`; stat cards single/two column; widget stack. |
| Open Issues | `OI-002`, `OI-013`, `OI-014`. Popular content ghi `Metric placeholder — pending OI-013`. |
| UI-report behavior | Không polling; values là placeholder; retry chỉ đổi mock state. |

### 4.11 SCR-ADM-008 — Ngân hàng câu hỏi

| Field | Wireframe specification |
|---|---|
| Actor | ADMIN, SUPER_ADMIN |
| Related Requirements | `QUIZ-001..QUIZ-003`, `RULE-001` |
| Related Use Cases | `UC-QUIZ-001` |
| Purpose | Quản lý topic/question ở mức list/form interaction. |
| Entry points | `SCR-ADM-001`; Admin nav từ Handbook. |
| Exit points | `SCR-ADM-001`, `SCR-ADM-004`. |
| Layout zones | Admin shell; title/action; search/topic filter; paginated table; state region; create/edit dialog/panel. |
| Primary actions | Thêm/sửa/xóa câu hỏi; xác nhận xóa. |
| Secondary actions | Search/filter/page; về Dashboard. |
| Data displayed | Question excerpt, type, topic, status/action. Form mô tả content/type/topic/options/correct-answer capability, không DTO/schema. |
| States | Loading; empty; validation error; save success/error; delete confirmation; unauthorized. |
| Desktop | Sidebar + table; modal/panel within same Screen ID. |
| Mobile | Admin menu; filters/actions stack; table in labeled scroll region; dialog fits viewport. |
| Open Issues | Không có P0 OI; delete persistence semantics thuộc V0.3/V0.4 và không được wireframe quyết định. |
| UI-report behavior | CRUD là mock toast/dialog; không lưu question hoặc chạy quiz logic. |

### 4.12 SCR-ADM-004 — Quản lý Cẩm nang

| Field | Wireframe specification |
|---|---|
| Actor | ADMIN, SUPER_ADMIN |
| Related Requirements | `HAN-001..HAN-003`, `ADM-001`, `ADM-002`, `FILE-001` |
| Related Use Cases | `UC-ADM-001`, `UC-FILE-001` |
| Purpose | Mô tả table/form CRUD, category, publish và upload capability cho Cẩm nang. |
| Entry points | `SCR-ADM-001`; Admin nav từ Question Bank. |
| Exit points | `SCR-ADM-001`, `SCR-ADM-008`; content form/dialog ở cùng screen. |
| Layout zones | Admin shell; title/action; search/category filter; paginated table; state region; create/edit form/panel with media placeholder. |
| Primary actions | Thêm/sửa/xóa/đăng bài; quản lý category ở mức capability. |
| Secondary actions | Search/filter/page; upload/remove placeholder; về Dashboard. |
| Data displayed | Title, category, status, date/action; form content/media fields ở mức functional. Không final editor/storage design. |
| States | Loading; empty; create/edit; validation; upload progress/error; save/publish success; delete confirm; unauthorized. |
| Desktop | Sidebar + table/form panel. |
| Mobile | Admin menu; filters stack; labeled table scroll; form single column. |
| Open Issues | `OI-005`, `OI-015`. |
| UI-report behavior | CRUD/publish/upload là mock state/toast; không ghi file hoặc content. |

## 5. Navigation model

### 5.1 User flow

Nguồn chi tiết: `wireframes/flows/P0-USER-FLOW.md`.

```text
SCR-AUTH-001 ⇄ SCR-AUTH-002
SCR-AUTH-001 → SCR-HOME-001
SCR-HOME-001 → SCR-HAN-002 → SCR-HAN-003 → SCR-HAN-002
SCR-HOME-001 → SCR-QUIZ-001 → SCR-QUIZ-003 → SCR-QUIZ-004
SCR-HOME-001 → SCR-COMP-002
```

Register success dùng action quay Login; không auto-login. Quiz timeout/attempt/raw score/ranking policy không nằm trong navigation rule.

### 5.2 Admin flow

Nguồn chi tiết: `wireframes/flows/P0-ADMIN-FLOW.md`.

```text
SCR-AUTH-001 → SCR-ADM-001
SCR-ADM-001 ⇄ SCR-ADM-008
SCR-ADM-001 ⇄ SCR-ADM-004
SCR-ADM-008 ⇄ SCR-ADM-004
```

Các Admin module P1 chỉ là disabled navigation labels trong prototype.

## 6. Open Issues Affecting UI

| OI | Screen | UI impact | Wireframe treatment | Blocks prototype? |
|---|---|---|---|---|
| `OI-002` | `SCR-QUIZ-004`, `SCR-COMP-002`, `SCR-ADM-001` | Competition score/formula/tie-break chưa có | Dash/neutral mock values + explicit pending annotation; không tính toán | No |
| `OI-005` | `SCR-HAN-003`, `SCR-ADM-004` | Upload limit chưa chốt | File/upload placeholder không ghi size rule | No |
| `OI-006` | `SCR-AUTH-002` | Invitation lifecycle chưa có | Generic valid/invalid state; không expiration/one-use/quota/owner | No |
| `OI-007` | `SCR-QUIZ-001`, `SCR-QUIZ-003` | Attempt count, unanswered-submit, fixed/resume chưa có | Không hiển thị count; annotations tại question/submit | No |
| `OI-008` | `SCR-QUIZ-001`, `SCR-QUIZ-003` | Timeout/auto-submit chưa có | Static timer area; no countdown/auto navigation | No |
| `OI-009` | `SCR-QUIZ-003`, `SCR-QUIZ-004` | Raw score/ranking metric/attempt/tie-break chưa có | Result chỉ mock Đạt/Không đạt; no raw score | No |
| `OI-012` | `SCR-COMP-002`, `SCR-ADM-001` | Completion source conflicts with no progress tracking | Mock warning; không breakdown/formula | No |
| `OI-013` | `SCR-ADM-001` | Popular-content metric chưa có | `Metric placeholder — pending OI-013`; no views/likes/plays | No |
| `OI-014` | `SCR-COMP-002`, `SCR-ADM-001` | Organization hierarchy/assignment chưa đủ | Neutral unit labels; filters present but no assignment behavior | No |
| `OI-015` | `SCR-HAN-003`, `SCR-ADM-004` | Office preview feasibility chưa có | Generic media/file placeholder + download fallback annotation | No |

## 7. Low-resource UI principles

- Lists/tables show finite mock rows plus pagination; no infinite list.
- Media uses thumbnail/placeholder and explicit play/preview; no autoplay/preload.
- Quiz shows only current attempt question presentation; no question-bank preload.
- Dashboard has no interval/polling behavior; retry is explicit.
- Admin tables use pagination/filter; mobile table scroll is contained.
- Wireframe contains no external image/font/script/CDN dependency and no background job.

## 8. Interactive prototype contract

`wireframes/P0-interactive-wireframe.html` is the sole standalone interactive source for React handoff.

- Exactly 12 `section[data-screen-id]`, one per catalog P0 ID.
- Every navigation button uses an existing local screen target; P1 module/admin entries are disabled or non-target annotations.
- Mock form/list/dialog behavior is in-memory only and resets on reload.
- No real authentication, registration, question randomization/grading, scoring, persistence, upload or report metric.
- Local HTML must work from `file://` without a server, build, framework or network.

## 9. Implementation Handoff

### 9.1 P0 implementation order

1. Public shell: `SCR-AUTH-001`, `SCR-AUTH-002`.
2. User shell/Home: `SCR-HOME-001` and shared header/navigation.
3. Handbook: `SCR-HAN-002`, `SCR-HAN-003`.
4. Quiz presentation: `SCR-QUIZ-001`, `SCR-QUIZ-003`, `SCR-QUIZ-004` with OI annotations preserved.
5. Competition presentation: `SCR-COMP-002`.
6. Admin shell: `SCR-ADM-001`.
7. Admin operational screens: `SCR-ADM-008`, `SCR-ADM-004`.

Thứ tự dựa trên navigation dependency, không phải module priority sau P0.

### 9.2 Reusable UI patterns

- App/Public/User/Admin Header.
- User Module Card and Banner.
- Content Search/List/Detail and Pagination.
- State Notice (loading/empty/error/disabled/success).
- Quiz Question, Question Navigator, Result State.
- Ranking Filter/List/Table.
- Admin Sidebar/Mobile Menu, Filter Bar, Data Table, Form/Dialog.

Đây là pattern mức wireframe, không khóa React component props/API.

### 9.3 Mock boundaries

- Cho phép mock: login/register response, banner/content, handbook search/page, quiz question/selection/result presentation, ranking rows, dashboard values, Admin CRUD toast/dialog.
- Mock phải nằm sau boundary rõ trong task React và không giả làm production data path.
- Không mock thành business truth: invitation lifecycle, attempt/timeout behavior, score/raw score/ranking/tie-break, popular metric, organization mapping, upload limit/preview technology.

### 9.4 Blocked behavior before integration

- Auth integration: `OI-006`.
- Quiz integration: `OI-007`, `OI-008`, `OI-009`.
- Competition/dashboard integration: `OI-002`, `OI-012`, `OI-013`, `OI-014`.
- File/media integration: `OI-005`, `OI-015`.

## 10. Review gate

Wireframe chỉ được chuyển thành `Review Ready` khi static validation xác nhận 12/12 ID/ref/target và browser verification desktop/mobile xác nhận standalone navigation, responsive layout, form/quiz/ranking/admin usability và không có console error đáng kể.

## 11. Next step

**Implement P0 UI Reporting Prototype in React based on the Review Ready wireframe.**
