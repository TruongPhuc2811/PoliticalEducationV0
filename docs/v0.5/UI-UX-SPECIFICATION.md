# UI/UX SPECIFICATION — V0.5

**Project:** Hệ thống Giáo dục Chính trị

**Document ID:** PES-UIUX-V0.5

**Version:** 0.5

**Date:** 2026-08-16

**Status:** Accepted — scope/index

**Normative baseline:** `docs/v0.5/UI-GUIDELINE.md`

**Depends on:** V0.2 Screen Catalog, P0 Wireframe Review Ready, P0 UI Reporting Acceptance PASS

## 1. Scope

Tài liệu này là index phạm vi V0.5, không lặp lại toàn bộ guideline. `UI-GUIDELINE.md` là baseline Accepted cho visual language, layout, responsive behavior, component/state pattern, accessibility baseline và resource-conscious UI.

V0.5 dùng P0 React UI đã nghiệm thu làm evidence cho:

- Một product identity với User Portal content-first và Admin Portal operational.
- Màu đỏ/vàng ở mức candidate, semantic colors, typography, spacing và component pattern.
- Desktop `1280×800` và mobile `375×812` đã được validate; breakpoint CSS vẫn implementation-derived.
- Mock/pending boundary, không business API và không business behavior cuối.

## 2. Sources

- `docs/v0.2/FUNCTIONAL-SPECIFICATION.md`
- `docs/v0.2/SCREEN-CATALOG.md`
- `wireframes/WIREFRAME-SPEC.md`
- `wireframes/flows/P0-USER-FLOW.md`
- `wireframes/flows/P0-ADMIN-FLOW.md`
- `docs/00-input/ui-reference/ui-reference-01.png`
- `docs/reports/2026-08-16-P0-UI-ACCEPTANCE-REVIEW.md`
- `docs/v0.5/UI-GUIDELINE.md`

UI reference chỉ định hướng trang trọng, red/gold và module-first; không phải pixel specification.

## 3. Validated P0 boundary

- Exact 12 P0 screens, đúng chín module Home.
- User/Admin responsive patterns, form/list/table/modal/Drawer/quiz/ranking/dashboard states.
- Typecheck/build, desktop/mobile Playwright và browser runtime audit đã PASS theo acceptance report.
- P0 vẫn là UI Reporting Prototype với local mock data; không chứng minh auth, API, persistence, scoring, upload hoặc production deployment.

## 4. Pending

- Organizational logo/official brand assets và exact identity colors cần project-owner approval.
- Contrast ratio/assistive-technology coverage chưa được certify đầy đủ.
- Breakpoint/token naming và font delivery strategy chưa được khóa thành organizational standard.
- `OI-002`, `OI-005`, `OI-006`, `OI-007`, `OI-008`, `OI-009`, `OI-012`, `OI-013`, `OI-014`, `OI-015` tiếp tục chặn behavior/integration tương ứng.

Trạng thái Accepted của scope/index xác nhận guideline là baseline triển khai hiện tại; không xác nhận organizational branding cuối hoặc giải quyết các Pending/OI ở trên.

## 5. Next review

> Start V0.3 System Design for MVP backend/API/integration baseline.
