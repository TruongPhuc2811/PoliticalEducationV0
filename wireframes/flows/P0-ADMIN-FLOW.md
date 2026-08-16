# ADMIN FLOW — P0

**Project:** Hệ thống Giáo dục Chính trị  
**Version:** 0.2  
**Date:** 2026-08-16  
**Status:** Review Ready  
**Depends on:** `wireframes/WIREFRAME-SPEC.md`, `docs/v0.2/SCREEN-CATALOG.md`

## 1. Scope

Flow này chỉ dùng đúng 3 Admin screens có Priority P0. Các Admin module còn lại là P1 và chỉ xuất hiện như disabled/annotated navigation labels.

## 2. Portal navigation

```mermaid
flowchart TD
    L[SCR-AUTH-001 Login — Admin context]
    D[SCR-ADM-001 Admin Dashboard]
    Q[SCR-ADM-008 Question Bank]
    H[SCR-ADM-004 Handbook Management]
    P1[Admin P1 items — no P0 target]

    L -->|Mock Admin login/demo navigator| D
    D <--> Q
    D <--> H
    Q <--> H
    D -.-> P1
```

Interactive HTML cho phép mở Dashboard qua demo navigator để không phát minh role-selection field trong Login.

## 3. Dashboard behavior

```mermaid
flowchart LR
    D[SCR-ADM-001 Dashboard]
    M1[Total personnel placeholder]
    M2[Competition score placeholder — OI-002]
    M3[Ranking placeholder — OI-002/OI-014]
    M4[Popular content metric placeholder — OI-013]

    D --> M1
    D --> M2
    D --> M3
    D --> M4
```

- Widget values là dash/mock-labelled, không phải production data.
- Không polling; retry chỉ theo explicit action.
- Popular content không chọn views/likes/plays làm metric.

## 4. Question Bank management

```mermaid
flowchart TD
    Q[SCR-ADM-008 Question Bank]
    F[Search / topic filter / pagination]
    C[Create/Edit panel in same Screen ID]
    V[Validation state]
    S[Mock save success]
    X[Delete confirmation]

    Q --> F --> Q
    Q --> C
    C --> V --> C
    C --> S --> Q
    Q --> X --> Q
```

Không tạo screen ID cho modal/panel; CRUD không persist trong standalone HTML.

## 5. Handbook management

```mermaid
flowchart TD
    H[SCR-ADM-004 Handbook Management]
    F[Search / category filter / pagination]
    C[Create/Edit panel in same Screen ID]
    U[Upload placeholder — OI-005/OI-015]
    P[Mock publish success]
    X[Delete confirmation]

    H --> F --> H
    H --> C --> U --> P --> H
    H --> X --> H
```

- Direct publish reflects `ADM-002`; no approval workflow.
- Editor/storage/upload limit/Office preview mechanism are not designed.

## 6. Responsive admin behavior

- Desktop: sidebar + topbar + content.
- Mobile: accessible expandable menu; filters/actions stack; table is contained in labeled horizontal scroller.
- Admin screen keeps heading and primary action visible before table content.

## 7. Screen coverage

`SCR-ADM-001`, `SCR-ADM-008`, `SCR-ADM-004`: **3/3 P0 Admin screens**.
