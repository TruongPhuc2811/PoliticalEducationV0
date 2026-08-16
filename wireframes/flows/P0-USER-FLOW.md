# USER FLOW — P0

**Project:** Hệ thống Giáo dục Chính trị  
**Version:** 0.2  
**Date:** 2026-08-16  
**Status:** Review Ready  
**Depends on:** `wireframes/WIREFRAME-SPEC.md`, `docs/v0.2/SCREEN-CATALOG.md`

## 1. Scope

Flow này chỉ dùng 9 P0 User/Public screens. Sáu Home module không có P0 detail vẫn hiện đủ trên Home nhưng được ghi `P1 — chưa có target trong P0`.

## 2. Authentication

```mermaid
flowchart TD
    L[SCR-AUTH-001 Login]
    R[SCR-AUTH-002 Register]
    H[SCR-HOME-001 Home]
    E[Generic validation/error state]
    S[Mock registration success]

    L -->|Đăng ký| R
    R -->|Hủy / Đã có tài khoản| L
    R -->|Invalid input/code| E
    E --> R
    R -->|Valid mock submit| S
    S -->|Về đăng nhập| L
    L -->|Mock login success| H
```

- Register không auto-login.
- Invalid invitation chỉ là generic validation presentation.
- Expiration, one-time/multi-use, quota và owner chờ `OI-006`.
- Login không mô tả JWT/session.

## 3. Home navigation

```mermaid
flowchart TD
    H[SCR-HOME-001 Home — đúng 9 module cards]
    HB[SCR-HAN-002 Handbook List]
    QL[SCR-QUIZ-001 Quiz List]
    CR[SCR-COMP-002 Competition Ranking]
    P1[6 module entries — P1 detail]

    H -->|Cẩm nang| HB
    H -->|Kiểm tra trắc nghiệm| QL
    H -->|Chấm điểm thi đua| CR
    H -.->|Nghị quyết / Tin / Âm nhạc / GDCT / Lời Bác / Câu hỏi tuần| P1
```

P1 marker không phải screen và không có navigation target trong interactive P0.

## 4. Handbook

```mermaid
flowchart LR
    H[SCR-HOME-001 Home] -->|Chọn Cẩm nang| L[SCR-HAN-002 List]
    L -->|Tìm / lọc / đổi trang| L
    L -->|Chọn bài| D[SCR-HAN-003 Detail]
    D -->|Quay lại danh sách| L
    L -->|Về Home| H
    D -->|Về Home| H
```

- Search/pagination là mock presentation trong HTML.
- Media chỉ mở theo action; không preload/autoplay.

## 5. Quiz

```mermaid
flowchart TD
    H[SCR-HOME-001 Home] --> QL[SCR-QUIZ-001 Quiz List]
    QL -->|Kỳ mở + xác nhận bắt đầu| QA[SCR-QUIZ-003 Quiz Attempt]
    QL -->|Kỳ đóng| DS[Disabled state]
    QA -->|Chọn đáp án / đổi câu| QA
    QA -->|Nộp bài| CF[Submit confirmation]
    CF -->|Hủy| QA
    CF -->|Xác nhận mock| QR[SCR-QUIZ-004 Quiz Result]
    QR -->|Danh sách kỳ| QL
    QR -->|Về Home| H
    QR -->|Mở thi đua| CR[SCR-COMP-002 Competition Ranking]
```

- `SCR-QUIZ-002` là P1; P0 dùng confirmation trong Quiz List, không tạo Screen ID mới.
- Không hiển thị số attempt, không quyết định submit câu trống, fixed/resume (`OI-007`).
- Timer là vùng hiển thị tĩnh; không countdown/auto-submit (`OI-008`).
- Result chỉ là mock Đạt/Không đạt; không raw score/ranking metric/tie-breaker (`OI-009`).
- JavaScript không random câu hỏi hoặc chấm điểm thật.

## 6. Competition ranking

```mermaid
flowchart LR
    H[SCR-HOME-001 Home] -->|Chấm điểm thi đua| R[SCR-COMP-002 Ranking]
    R -->|Đổi phạm vi / chu kỳ / trang| R
    R -->|Về Home| H
```

Ranking dùng neutral mock rows và bắt buộc hiển thị: `Mock UI data — business formula pending OI-002/OI-012/OI-014`.

## 7. Critical UI-report demo

```mermaid
sequenceDiagram
    actor U as Người dùng demo
    participant W as Standalone wireframe
    participant M as In-memory mock only

    U->>W: Mở Login
    U->>W: Mở Register, submit mock
    W-->>U: Success state + action về Login
    U->>W: Login mock
    W-->>U: Home với 9 module cards
    U->>W: Cẩm nang → List → Detail → Back
    U->>W: Quiz List → Attempt
    U->>W: Chọn answer → explicit submit
    W->>M: Chọn mock result presentation
    M-->>W: Đạt/Không đạt mock, không raw score
    U->>W: Competition Ranking
    W-->>U: Mock-labelled ranking + OI annotation
```

## 8. Screen coverage

`SCR-AUTH-001`, `SCR-AUTH-002`, `SCR-HOME-001`, `SCR-HAN-002`, `SCR-HAN-003`, `SCR-QUIZ-001`, `SCR-QUIZ-003`, `SCR-QUIZ-004`, `SCR-COMP-002`: **9/9 P0 User/Public screens**.
