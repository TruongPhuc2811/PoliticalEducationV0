# P0 WIREFRAME FINALIZATION REPORT

**Project:** Hệ thống Giáo dục Chính trị  
**Date:** 2026-08-16  
**Task type:** UI/UX Analysis + Wireframe  
**Result:** `P0_WIREFRAME_REVIEW_READY`  
**Artifact status:** Review Ready, not Accepted

## 1. Mức độ hiểu task

Mức độ hiểu: **100%**. Phạm vi chắc chắn là khóa hierarchy, flow, state, responsive behavior và mock boundary cho đúng 12 P0 Screen ID lấy từ Screen Catalog V0.2. Không thiếu dữ kiện để hoàn thành prototype wireframe. Các business rule chưa chốt vẫn là Open Issues; report và wireframe không biến chúng thành quyết định.

## 2. Tóm tắt yêu cầu

Đối chiếu V0.2 Functional Specification, Screen Catalog, traceability, Accepted ADR và UI reference; hoàn thiện đặc tả 12 P0 screens, User/Admin flows và standalone interactive HTML; kiểm tra tham chiếu tĩnh cùng browser desktop/mobile; chỉ cập nhật status theo evidence. Task không triển khai React, backend, API, database hay business logic.

## 3. Scope

- Xác lập exact P0 inventory từ `docs/v0.2/SCREEN-CATALOG.md`.
- Hoàn thiện `WIREFRAME-SPEC.md`, P0 User flow và P0 Admin flow.
- Bổ sung `SCR-AUTH-002` Register.
- Hoàn thiện standalone HTML dùng mock data/interaction không cần backend.
- Ghi rõ responsive, state, low-resource, accessibility và Open Issue treatment.
- Cập nhật wireframe status, project gate, changelog và report sau validation.

## 4. Out of scope

- Không sửa frontend/backend/E2E source, package, CI hay runtime config.
- Không implement auth, quiz lifecycle, scoring, competition formula hoặc dashboard metric.
- Không tạo API/DTO, DB entity/table/migration hay business test.
- Không khóa V0.5 visual token/branding; không clone UI reference 1:1.
- Không quyết định Open Issue; không mark artifact Accepted; không push/mutate remote.

## 5. Trạng thái đầu vào

- Gate: `V0.2_REVIEW_READY`.
- Catalog: 41 screens, P0 12 và P1 29.
- Draft low-fidelity: 11/12 P0; `SCR-AUTH-002` Not started.
- Có User flow draft và interactive HTML; chưa có Admin flow riêng.
- V0.2 mapping: 74/74 functional requirements, 40 Use Cases, 15 canonical Open Issues.
- UI reference chỉ là visual reference; V0.5 vẫn Placeholder.

## 6. Exact P0 Screen inventory

| # | Screen ID | Screen | Actor | Use Case chính |
|---:|---|---|---|---|
| 1 | `SCR-AUTH-001` | Đăng nhập | All roles | `UC-AUTH-001` |
| 2 | `SCR-AUTH-002` | Đăng ký bằng mã giới thiệu | Người chưa có tài khoản | `UC-AUTH-002` |
| 3 | `SCR-HOME-001` | Trang chủ 9 phân hệ | USER, ADMIN | `UC-HOME-001`, `UC-HCM-001`, `UC-COMP-002` |
| 4 | `SCR-HAN-002` | Danh sách bài Cẩm nang | USER, ADMIN | `UC-HAN-001`, `UC-HAN-003` |
| 5 | `SCR-HAN-003` | Chi tiết Cẩm nang | USER, ADMIN | `UC-HAN-002`, `UC-FILE-002`, `UC-FILE-003` |
| 6 | `SCR-QUIZ-001` | Danh sách kỳ kiểm tra | USER, ADMIN | `UC-QUIZ-003` |
| 7 | `SCR-QUIZ-003` | Làm bài kiểm tra | USER, ADMIN tham gia | `UC-QUIZ-004`, `UC-QUIZ-005` |
| 8 | `SCR-QUIZ-004` | Kết quả kiểm tra | USER, ADMIN tham gia | `UC-QUIZ-005` |
| 9 | `SCR-COMP-002` | Bảng xếp hạng thi đua | USER, ADMIN | `UC-COMP-002` |
| 10 | `SCR-ADM-001` | Admin Dashboard | ADMIN | `UC-REP-001` |
| 11 | `SCR-ADM-008` | Ngân hàng câu hỏi | ADMIN | `UC-QUIZ-001` |
| 12 | `SCR-ADM-004` | Quản lý Cẩm nang | ADMIN | `UC-ADM-001`, `UC-FILE-001` |

Nguồn: 12 catalog rows có `Priority = P0`; không promote/demote screen.

## 7. Gap của wireframe cũ

| Gap xác nhận từ source | Impact | Treatment |
|---|---|---|
| Chỉ 11/12 P0; thiếu `SCR-AUTH-002` | Auth flow và AC-WF-04 chưa đủ | Bổ sung full Register spec + HTML interaction |
| Spec cũ chưa đủ contract nhất quán cho từng screen | Handoff React không audit được theo cùng checklist | Chuẩn hóa actor/requirements/UC/purpose/entry/exit/zones/actions/data/states/responsive/OI/mock boundary |
| User flow chưa thể hiện đầy đủ các nhánh và pending rule | Có nguy cơ ngầm quyết quiz/invitation/competition behavior | Viết lại flow với `Pending OI-*` |
| Chưa có Admin P0 flow riêng | 3 Admin screens chưa thể hiện operational navigation rõ | Thêm một file flow nhỏ, đúng 3 P0 Admin screens |
| HTML chưa có 12 `data-screen-id` audit markers | Không thể đối chiếu tự động 12/12 | Rebuild standalone HTML với đúng 12 markers |
| Mock/rule boundary và responsive behavior chưa đủ rõ | UI report có thể bị hiểu là production rule | Label mock/placeholder và browser-check hai viewport |

## 8. Open Issues ảnh hưởng P0

| OI | Screen | UI impact | Wireframe treatment | Blocks prototype? |
|---|---|---|---|---|
| `OI-002` | Quiz result, Competition, Dashboard | Scoring/formula chưa chốt | Không hiển thị công thức/raw score; metric placeholder | No |
| `OI-005` | Handbook detail/admin | Upload limit chưa chốt | Media/upload placeholder, không đặt limit giả | No |
| `OI-006` | Register | Invitation lifecycle chưa chốt | Generic valid/invalid state; không expiration/one-time/quota | No |
| `OI-007` | Quiz list/attempt | Attempt, unanswered submit, fixed/resume chưa chốt | Annotation tại start/submit/attempt | No |
| `OI-008` | Quiz attempt | Timeout auto-submit chưa chốt | Timer area tĩnh; không countdown/auto-submit | No |
| `OI-009` | Quiz result | Raw score/ranking metric/tie-break chưa chốt | Chỉ presentation Đạt/Không đạt mock | No |
| `OI-012` | Competition | Completion-source conflict | Mock ranking label; không encode source/formula | No |
| `OI-013` | Home/Dashboard | Popular-content metric chưa chốt | Metric placeholder, không chọn views/likes/plays | No |
| `OI-014` | Competition/Dashboard | Organization hierarchy chưa chốt | Neutral scope label/filter placeholder | No |
| `OI-015` | Handbook detail/admin | Office preview feasibility chưa chốt | Explicit preview/download fallback placeholder | No |

Các OI không chặn prototype báo cáo vì đều có neutral placeholder; chúng chặn backend integration/behavior tương ứng.

## 9. Chiến lược wireframe

- Screen Catalog quyết định inventory; Functional Spec quyết định flow/state; Business Requirements quyết định functional data.
- User Portal content-first/card-based; Admin Portal operational/sidebar/table/form.
- Chỉ đưa state có ý nghĩa; mọi interaction không có backend được gắn `mock` hoặc `placeholder`.
- Quiz ưu tiên flow, không giả lập random/scoring/lifecycle.
- Dùng pagination, thumbnail, explicit media play/export và không polling để phù hợp môi trường tài nguyên hạn chế.
- Diff giới hạn vào wireframe/docs trực tiếp liên quan.

## 10. File đã đọc

| Path | Mục đích | Kết luận quan trọng |
|---|---|---|
| `AGENTS.md` | Governance/read order/baseline | Documentation-first, traceability, no speculative rule |
| `docs/PROJECT-STATUS.md` | Gate/status | Input gate V0.2 Review Ready; wireframe draft 11/12 |
| `docs/prompts/PROMPT-PRINCIPLES.md` | Execution/report convention | Evidence-first, minimal diff, report bắt buộc |
| `.cursor/rules/*.mdc` (11 files) | Project, traceability, workflow, Git, backend/DB/frontend/UI/testing/docs constraints | Không đổi baseline/source; UI reference không phải final spec |
| `docs/v0.1/BUSINESS-REQUIREMENTS.md` | Requirement source | Functional data/actions và Requirement IDs |
| `docs/v0.2/FUNCTIONAL-SPECIFICATION.md` | Use Case/state/OI source | 40 UCs; `OI-001..OI-015`; unresolved behavior giữ mở |
| `docs/v0.2/SCREEN-CATALOG.md` | P0 source of truth | Exact P0 12, P1 29 |
| `docs/TRACEABILITY-MATRIX.md` | Cross-reference check | Không có cột wireframe cần cập nhật; API/DB/Test vẫn TBD |
| `docs/ADR/ADR-001-technology-baseline.md` | Accepted architecture baseline | Không đổi technology |
| `docs/ADR/ADR-002-no-docker.md` | Accepted deployment constraint | Không Docker/Compose/Testcontainers |
| `docs/ADR/ADR-003-github-project-management.md` | Accepted workflow constraint | Không mutate remote |
| `wireframes/WIREFRAME-SPEC.md` | Existing P0 spec | Cần full 12-screen contract và handoff |
| `wireframes/flows/P0-USER-FLOW.md` | Existing User flow | Cần exact P0 branches/OI boundary |
| `wireframes/P0-interactive-wireframe.html` | Existing clickable draft | Cần 12 audit markers và Register |
| `docs/00-input/ui-reference/ui-reference-01.png` | Visual-reference inspection | Portal trang trọng, large entry cards; không dùng làm final tokens |
| `docs/reports/2026-08-15-S0-BOOTSTRAP-VALIDATION.md` | Skeleton evidence | Static baseline result/blockers tại S0 |
| `docs/reports/2026-08-15-S0B-BOOTSTRAP-RUNTIME-VALIDATION.md` | Runtime/tool evidence | Node/Playwright shell đã được chuẩn bị; không phải business E2E |
| `docs/reports/2026-08-15-V0.2-FUNCTIONAL-SPEC-FINALIZATION.md` | V0.2 gate evidence | 74/74 requirements, 40 UCs, 41 screens, 15 OIs |
| `CHANGELOG.md` | Change history | Cần entry mới theo kết quả thực sự |

Không đọc React shell để suy ra business behavior.

## 11. File đã sửa

| Path | Lý do | Lớp ảnh hưởng |
|---|---|---|
| `wireframes/WIREFRAME-SPEC.md` | Full 12-screen spec + handoff/OI/responsive | docs / ui |
| `wireframes/flows/P0-USER-FLOW.md` | Exact 9-screen User/Public P0 flow | docs / ui |
| `wireframes/flows/P0-ADMIN-FLOW.md` | Exact 3-screen Admin P0 flow | docs / ui |
| `wireframes/P0-interactive-wireframe.html` | Portable clickable 12-screen representation | ui / test |
| `docs/v0.2/SCREEN-CATALOG.md` | Cập nhật wireframe status đã verify; không đổi behavior/count | docs |
| `docs/PROJECT-STATUS.md` | Gate/status/next task theo evidence | docs |
| `CHANGELOG.md` | Lưu change/verification thực tế | docs |
| `docs/reports/2026-08-16-P0-WIREFRAME-FINALIZATION.md` | Execution audit | docs |

Không sửa `docs/TRACEABILITY-MATRIX.md`: matrix hiện không có cột Wireframe và các Screen references không đổi; thêm diff sẽ không có giá trị traceability.

## 12. Diff từng file

Repository không có `.git`; không init Git chỉ để sinh diff. Các khối dưới là before/after audit ở mức semantic.

### `wireframes/WIREFRAME-SPEC.md`

```diff
- Draft 11-screen low-fidelity specification
+ Review Ready specification for exact 12 P0 screens
+ Per-screen actor, requirements, UCs, entry/exit, zones, actions, data, states, responsive, OI and mock behavior
+ Open Issues Affecting UI + low-resource principles + Implementation Handoff
```

### `wireframes/flows/P0-USER-FLOW.md`

```diff
- Partial draft flow
+ Review Ready flow for 9 User/Public P0 screens
+ Register -> mock success -> Login; Home 9 modules; Handbook; Quiz; Competition
+ OI-006/OI-007/OI-008/OI-009/OI-002/OI-012/OI-014 annotations
```

### `wireframes/flows/P0-ADMIN-FLOW.md`

```diff
- File did not exist
+ Review Ready exact three-screen Admin flow
+ Dashboard -> Question Bank Management / Handbook Management
+ Mobile navigation and mock CRUD/form boundaries
```

### `wireframes/P0-interactive-wireframe.html`

```diff
- 11-screen draft without auditable data-screen-id coverage
+ 12 unique <section data-screen-id="SCR-..."> representations
+ Register, nine Home modules, Handbook, Quiz, Competition and Admin interactions
+ Responsive CSS, semantic forms/buttons/dialogs, focus and labels
+ No framework, CDN, network call, formula, random quiz or backend
```

File size: 46,075 bytes. SHA-256: `F17EA7446C5EC96BDB3C7E70D54D7E2B33D59E7A2A922C547E226B104859E3A0`.

### `docs/v0.2/SCREEN-CATALOG.md`

```diff
- P0 wireframe: Draft 11 / Not started 1
+ P0 wireframe: Review Ready 12 / Not started 0
- Next: review/finalize P0 wireframe
+ Next: implement React P0 UI Reporting Prototype from Review Ready wireframe
```

No P0/P1, Requirement, UC, state or functional behavior changed.

### `docs/PROJECT-STATUS.md`

```diff
- Current gate: V0.2_REVIEW_READY
- Wireframe Spec/Interactive: Draft
+ Current gate: P0_WIREFRAME_REVIEW_READY
+ Wireframe Spec/Interactive: Review Ready with static/browser evidence
```

### `CHANGELOG.md`

```diff
+ 2026-08-16 P0 Wireframe Finalization entry
+ Lists scope, affected OIs, static/browser evidence and Review Ready boundary
```

### Report này

```diff
- File did not exist
+ Required 26-section execution/audit report
```

## 13. User flow summary

- Authentication: Login → Home; Login ↔ Register; Register success returns to Login in mock, matching V0.2 output without auto-login.
- Home: exact nine module entries. Handbook, Quiz and Competition lead to P0 targets; six remaining modules are visible and labelled P1/no P0 target.
- Handbook: Home → List/search/category/page → Detail/media on demand → List/Home.
- Quiz: Home → List → confirmation → Attempt/question navigation/answer → submit confirmation → Result Đạt/Không đạt presentation → Home/list/Competition.
- Competition: Home/result → Ranking/filter/page → Home.

Result: **PASS**, 9/9 User/Public P0 screens covered.

## 14. Admin flow summary

- Admin Login context → Admin Dashboard.
- Dashboard → Question Bank Management → Dashboard/Handbook.
- Dashboard → Handbook Management → Dashboard/Question Bank.
- Only three Admin P0 screens are actionable; other Admin modules remain P1 labels/placeholders.

Result: **PASS**, 3/3 Admin P0 screens covered.

## 15. 12-screen wireframe inventory

| Screen ID | Spec | HTML | Main states represented/specified | Result |
|---|---|---|---|---|
| `SCR-AUTH-001` | Yes | Yes | default, validation, loading/disabled, error | PASS |
| `SCR-AUTH-002` | Yes | Yes | default, generic invalid code, submitting, success | PASS |
| `SCR-HOME-001` | Yes | Yes | region loading/error/empty, unauthorized | PASS |
| `SCR-HAN-002` | Yes | Yes | loading, default, no result, error | PASS |
| `SCR-HAN-003` | Yes | Yes | loading, media error, not found | PASS |
| `SCR-QUIZ-001` | Yes | Yes | loading, empty, open, closed/disabled, error | PASS |
| `SCR-QUIZ-003` | Yes | Yes | loading, active, answer indicator, submit confirm/error | PASS |
| `SCR-QUIZ-004` | Yes | Yes | loading, pass, fail, error/not found | PASS |
| `SCR-COMP-002` | Yes | Yes | loading, mock data, empty, blocked metric, error | PASS |
| `SCR-ADM-001` | Yes | Yes | per-widget loading/data/empty/placeholder/error | PASS |
| `SCR-ADM-008` | Yes | Yes | loading, empty, form/delete/save/unauthorized | PASS |
| `SCR-ADM-004` | Yes | Yes | loading, empty, form/upload/save/delete/unauthorized | PASS |

## 16. Responsive review

- Desktop design: Home supports three columns; content list/detail has useful two-column regions; Admin uses sidebar + main workspace; ranking/admin tables use contained scroll regions.
- Mobile design: Home collapses to one column at 375 px; auth fields and quiz actions remain usable; Admin sidebar is replaced by a mobile details menu; tables scroll within labelled regions rather than overflowing the document.
- Browser evidence: 1280×800 and 375×812 both passed no-global-horizontal-overflow checks across key screens.
- Breakpoints remain wireframe validation choices, not final V0.5 tokens.

## 17. Interactive HTML behavior

- Opens directly using `file://`; no server/build required.
- Exact 12 screen sections and an audit navigation panel.
- Mock login/register validation and transitions.
- Handbook search/reset, pagination presentation, detail/media-on-demand placeholder.
- Quiz start and submit dialogs, answer selection and static timer region; no countdown or auto-submit.
- Competition filters/pagination and neutral mock table; no score formula.
- Admin dashboard/navigation/table/form dialogs; no persistence.
- 12-screen flows were reachable in headless Chromium; no console/page errors.

## 18. Mock/placeholder boundaries

- All sample user/content/ranking/question data is non-sensitive and marked mock.
- Forms do not send requests or persist data.
- Login/register do not authenticate/create accounts.
- Quiz does not randomize, score, enforce attempts, resume or timeout.
- Competition does not calculate score or tie-break.
- Dashboard metrics use dashes/placeholders; popular-content metric is pending.
- Upload, preview, download, publish, delete and export are presentation-only.

## 19. Resource/performance considerations

- Lists/tables show pagination controls; no load-all or infinite polling pattern.
- Media list uses thumbnail placeholders; detail uses explicit on-demand play; no autoplay/preload.
- Question bank is not preloaded into attempt; prototype only renders one sample question.
- Dashboard explicitly has no polling; export/upload actions are explicit.
- Standalone HTML has no network request/background job and a small fixed mock dataset.
- No DB/query/business workload exists in this task to assess N+1/full scan/CPU/RAM at business level.

## 20. Accessibility considerations

- Inputs have explicit labels; actions use buttons; tables use headings.
- Screen headings use `h1` and receive focus on navigation.
- Dialogs have accessible names; table scroll regions are keyboard-focusable.
- Status uses text labels (`Đạt`, pending OI, mock), not color alone.
- `prefers-reduced-motion` is respected; basic keyboard flow remains native.
- Đây không phải full accessibility audit.

## 21. Traceability impact

- Requirement IDs, Use Case IDs và Screen IDs được giữ nguyên.
- Static validation found no unknown Requirement/UC/Screen/OI references.
- `docs/TRACEABILITY-MATRIX.md` không đổi vì không có Wireframe column và Screen mappings không đổi.
- API, DB và final Test vẫn TBD; task không tạo `API-*` hoặc `DB-*`.

## 22. Static validation

Command: `node tmp\wf-static-validation.mjs` (temporary, not committed).  
Result: **PASS — 24/24 assertions**.

Verified:

- Catalog P0 12, P1 29; no P0 duplicate.
- Spec 12/12; HTML exact 12/12; Register present; no duplicate/non-P0 HTML screen.
- No unknown Screen/Use Case/Requirement/Open Issue references.
- Unique HTML IDs; all navigation/dialog targets exist.
- Home exact nine unique required modules.
- No external CDN/dependency, network call, hardcoded secret pattern, Docker/Testcontainers runtime reference, final API/DB design or module import.

Temporary validation scripts were removed after use.

## 23. Browser verification

Prerequisite command: `npx playwright install chromium` in `e2e/` — PASS; installed official Playwright Chromium revision 1234 into the user cache, without changing package files. Initial browser launch had honestly failed because that revision was absent; it was rerun after official installation.

Validation command: `node tmp\wf-browser-validation.cjs` (temporary, not committed).

| Browser/profile | Viewport | Coverage | Result |
|---|---:|---|---|
| Desktop Chromium | 1280×800 | 12-screen inventory; auth, handbook, quiz, competition, admin; overflow; console/page errors | PASS |
| Mobile Chromium | 375×812 | Same flow coverage; mobile Admin menu; overflow; console/page errors | PASS |

This verifies the standalone wireframe, not production React UI or business E2E.

## 24. Acceptance Criteria matrix

| AC | Evidence | Result |
|---|---|---|
| AC-WF-01 | Inventory parsed from Screen Catalog | PASS |
| AC-WF-02 | P0 count 12 | PASS |
| AC-WF-03 | Spec inventory 12/12 | PASS |
| AC-WF-04 | `SCR-AUTH-002` spec + HTML | PASS |
| AC-WF-05 | User flow 9/9 P0 screens | PASS |
| AC-WF-06 | Admin flow 3/3 P0 screens | PASS |
| AC-WF-07 | HTML exact 12 representations | PASS |
| AC-WF-08 | All nav/dialog targets exist + browser traversal | PASS |
| AC-WF-09 | Chromium 1280×800 | PASS |
| AC-WF-10 | Chromium 375×812 | PASS |
| AC-WF-11 | Home exact nine module entries | PASS |
| AC-WF-12 | OI-007/008/009 pending; no rule encoded | PASS |
| AC-WF-13 | Mock ranking; no scoring formula | PASS |
| AC-WF-14 | Popular metric placeholder pending OI-013 | PASS |
| AC-WF-15 | Generic invitation state pending OI-006 | PASS |
| AC-WF-16 | Ten affecting OIs annotated | PASS |
| AC-WF-17 | Pagination/on-demand media/no polling | PASS |
| AC-WF-18 | No application/backend/frontend/E2E/DB source changed | PASS |
| AC-WF-19 | No final API/DB design | PASS |
| AC-WF-20 | Static reference validation 24/24 | PASS |
| AC-WF-21 | Desktop/mobile Chromium browser verification | PASS |
| AC-WF-22 | Status Review Ready, not Accepted | PASS |
| AC-WF-23 | Status/changelog updated after evidence | PASS |
| AC-WF-24 | This report exists | PASS |

## 25. Remaining risks

- `OI-002`, `OI-005`, `OI-006`, `OI-007`, `OI-008`, `OI-009`, `OI-012`, `OI-013`, `OI-014`, `OI-015` must be resolved before affected backend integration/final behavior.
- V0.5 remains Placeholder, so final colors, typography, tokens and branding are not verified.
- Standalone mock behavior is not evidence of production auth, API, data, performance or business E2E.
- Repository has no `.git`; audit used source inspection and explicit before/after reporting rather than `git diff`.

## 26. Một next best task duy nhất

> Implement P0 UI Reporting Prototype in React based on the Review Ready wireframe.

Task tiếp theo chưa được chạy.
