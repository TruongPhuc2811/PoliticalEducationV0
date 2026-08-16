# TRACEABILITY MATRIX

**Project:** Hệ thống Giáo dục Chính trị  
**Version:** V0.2  
**Date:** 2026-08-15  
**Status:** Review Ready for Requirement → Use Case → Screen  
**Source:** `docs/v0.1/BUSINESS-REQUIREMENTS.md`

API, DB và final Test vẫn là `TBD`; V0.2 không thiết kế endpoint, table/entity hoặc test case final.

| Requirement ID | Functional Spec / Use Case | Screen | API | DB | Test | Status / Notes |
|---|---|---|---|---|---|---|
| `USR-001` | `UC-AUTH-001` | `SCR-AUTH-001` | TBD | TBD | TBD | Review Ready |
| `USR-002` | `UC-AUTH-002` | `SCR-AUTH-002` | TBD | TBD | TBD | Review Ready |
| `USR-003` | `UC-AUTH-002`, `UC-ADM-INV-001` | `SCR-AUTH-002`, `SCR-ADM-003` | TBD | TBD | TBD | Blocked before implementation by `OI-006` |
| `USR-004` | `UC-AUTH-001`, `UC-ADM-USER-001` | `SCR-AUTH-001`, `SCR-ADM-002` | TBD | TBD | TBD | Review Ready |
| `USR-005` | FS §6.1 Technology/resource scale constraint | N/A | TBD | TBD | TBD | No standalone UC |
| `HAN-001` | `UC-ADM-001` | `SCR-ADM-004` | TBD | TBD | TBD | Review Ready |
| `HAN-002` | `UC-ADM-001` | `SCR-ADM-004` | TBD | TBD | TBD | Review Ready |
| `HAN-003` | `UC-ADM-001`, `UC-HAN-002` | `SCR-ADM-004`, `SCR-HAN-003` | TBD | TBD | TBD | Review Ready |
| `HAN-004` | `UC-HAN-001`, `UC-HAN-002` | `SCR-HAN-001`, `SCR-HAN-002`, `SCR-HAN-003` | TBD | TBD | TBD | Review Ready |
| `HAN-005` | `UC-HAN-003` | `SCR-HAN-002`, `SCR-HAN-003` | TBD | TBD | TBD | Review Ready |
| `RES-001` | `UC-ADM-001`, `UC-RES-001` | `SCR-ADM-005`, `SCR-RES-001` | TBD | TBD | TBD | Review Ready |
| `RES-002` | `UC-ADM-001`, `UC-RES-002` | `SCR-ADM-005`, `SCR-RES-002` | TBD | TBD | TBD | Review Ready; file details depend on `OI-005`, `OI-015` |
| `RES-003` | `UC-ADM-001`, `UC-RES-002` | `SCR-ADM-005`, `SCR-RES-002` | TBD | TBD | TBD | Review Ready |
| `RES-004` | `UC-RES-001`, `UC-RES-002` | `SCR-RES-001`, `SCR-RES-002` | TBD | TBD | TBD | Review Ready |
| `RES-005` | FS §5.2; `UC-RES-001`, `UC-RES-002` negative behavior | `SCR-RES-001`, `SCR-RES-002` | TBD | TBD | TBD | No assignment/progress UC |
| `NEWS-001` | `UC-ADM-001`, `UC-NEWS-001` | `SCR-ADM-006`, `SCR-NEWS-001` | TBD | TBD | TBD | Review Ready |
| `NEWS-002` | `UC-ADM-001`, `UC-NEWS-002` | `SCR-ADM-006`, `SCR-NEWS-002` | TBD | TBD | TBD | Review Ready |
| `NEWS-003` | `UC-ADM-001`, `UC-NEWS-001` | `SCR-ADM-006`, `SCR-NEWS-001` | TBD | TBD | TBD | Review Ready |
| `NEWS-004` | `UC-NEWS-003` | `SCR-ADM-006` (future boundary only) | TBD | TBD | TBD | Blocked by `OI-001` |
| `NEWS-005` | FS §5.2; `UC-NEWS-001`, `UC-NEWS-002` negative behavior | `SCR-NEWS-001`, `SCR-NEWS-002` | TBD | TBD | TBD | No reading/listening history |
| `MUS-001` | `UC-ADM-001`, `UC-MUS-001` | `SCR-ADM-007`, `SCR-MUS-001` | TBD | TBD | TBD | Review Ready |
| `MUS-002` | `UC-ADM-001`, `UC-MUS-002` | `SCR-ADM-007`, `SCR-MUS-002` | TBD | TBD | TBD | Upload limit depends on `OI-005` |
| `MUS-003` | `UC-MUS-001`, `UC-MUS-002` | `SCR-MUS-001`, `SCR-MUS-002` | TBD | TBD | TBD | Review Ready |
| `MUS-004` | FS §5.2; `UC-MUS-001`, `UC-MUS-002` negative behavior | `SCR-MUS-001`, `SCR-MUS-002` | TBD | TBD | TBD | No playlist/favorite/listening statistics |
| `QUIZ-001` | `UC-QUIZ-001` | `SCR-ADM-008` | TBD | TBD | TBD | Review Ready |
| `QUIZ-002` | `UC-QUIZ-001` | `SCR-ADM-008` | TBD | TBD | TBD | Review Ready |
| `QUIZ-003` | `UC-QUIZ-001` | `SCR-ADM-008` | TBD | TBD | TBD | Review Ready |
| `QUIZ-004` | `UC-QUIZ-002`, `UC-QUIZ-004` | `SCR-ADM-009`, `SCR-QUIZ-002`, `SCR-QUIZ-003` | TBD | TBD | TBD | Attempt detail blocked by `OI-007` |
| `QUIZ-005` | `UC-QUIZ-002`, `UC-QUIZ-003` | `SCR-ADM-009`, `SCR-QUIZ-001`, `SCR-QUIZ-002` | TBD | TBD | TBD | Timeout behavior blocked by `OI-008` |
| `QUIZ-006` | `UC-QUIZ-004` | `SCR-QUIZ-003` | TBD | TBD | TBD | Review Ready; fixed/resume behavior is `OI-007` |
| `QUIZ-007` | `UC-QUIZ-005` | `SCR-QUIZ-003`, `SCR-QUIZ-004` | TBD | TBD | TBD | Review Ready at auto-grade level |
| `QUIZ-008` | `UC-QUIZ-005` | `SCR-QUIZ-004` | TBD | TBD | TBD | Baseline pass/fail; raw score blocked by `OI-009` |
| `QUIZ-009` | `UC-QUIZ-005`, `UC-COMP-003` | `SCR-QUIZ-004`, `SCR-COMP-001`, `SCR-COMP-002` | TBD | TBD | TBD | Blocked by `OI-002`, `OI-009` |
| `QUIZ-010` | `UC-QUIZ-006` | `SCR-QUIZ-005` | TBD | TBD | TBD | Blocked by `OI-009` |
| `EDU-001` | `UC-EDU-001`; test concept tracked in `OI-011` | `SCR-EDU-001`, `SCR-EDU-002`, `SCR-EDU-003`, `SCR-ADM-010` | TBD | TBD | TBD | Content hierarchy Review Ready; test behavior blocked |
| `EDU-002` | `UC-EDU-002`, `UC-ADM-001` | `SCR-EDU-003`, `SCR-ADM-010` | TBD | TBD | TBD | Preview depends on `OI-015` |
| `EDU-003` | `UC-EDU-001`, `UC-EDU-002` | `SCR-EDU-001`, `SCR-EDU-002`, `SCR-EDU-003` | TBD | TBD | TBD | Review Ready |
| `EDU-004` | FS §5.2; `UC-EDU-001`, `UC-EDU-002` negative behavior | `SCR-EDU-001`, `SCR-EDU-002`, `SCR-EDU-003` | TBD | TBD | TBD | No progress tracking; drives `OI-012` conflict |
| `HCM-001` | `UC-ADM-001`, `UC-HCM-001` | `SCR-ADM-011`, `SCR-HCM-001`, `SCR-HOME-001` | TBD | TBD | TBD | Review Ready |
| `HCM-002` | `UC-ADM-001`, `UC-HCM-002` | `SCR-ADM-011`, `SCR-HCM-002` | TBD | TBD | TBD | Review Ready |
| `HCM-003` | `UC-HCM-001`, `UC-HOME-001` | `SCR-HOME-001`, `SCR-HCM-001` | TBD | TBD | TBD | Review Ready |
| `HCM-004` | FS §5.2; `UC-HCM-002` negative behavior | `SCR-HCM-001`, `SCR-HCM-002` | TBD | TBD | TBD | No advanced search |
| `WEEK-001` | `UC-WEEK-001`, `UC-WEEK-002` | `SCR-ADM-012`, `SCR-WEEK-001` | TBD | TBD | TBD | Lifecycle blocked by `OI-010` |
| `WEEK-002` | `UC-WEEK-001`, `UC-WEEK-002` | `SCR-ADM-012`, `SCR-WEEK-001` | TBD | TBD | TBD | Review Ready at question-type level |
| `WEEK-003` | `UC-WEEK-002` | `SCR-WEEK-001`, `SCR-WEEK-002` | TBD | TBD | TBD | Review Ready at auto-grade level |
| `WEEK-004` | `UC-WEEK-001`, `UC-WEEK-003` | `SCR-ADM-012`, `SCR-WEEK-002` | TBD | TBD | TBD | Reveal timing blocked by `OI-010` |
| `WEEK-005` | `UC-WEEK-002`, `UC-COMP-003` | `SCR-WEEK-001`, `SCR-COMP-001`, `SCR-COMP-002` | TBD | TBD | TBD | Blocked by `OI-002`, `OI-010` |
| `COMP-001` | `UC-COMP-001`, `UC-COMP-002` | `SCR-COMP-001`, `SCR-COMP-002` | TBD | TBD | TBD | Scope conflict tracked in `OI-014` |
| `COMP-002` | `UC-COMP-002` | `SCR-COMP-002` | TBD | TBD | TBD | Hierarchy blocked by `OI-014` |
| `COMP-003` | `UC-COMP-001`, `UC-COMP-003` | `SCR-COMP-001`, `SCR-ADM-013` | TBD | TBD | TBD | Blocked by `OI-002`, `OI-012`, `OI-014` |
| `COMP-004` | `UC-COMP-003` | `SCR-ADM-013`, `SCR-COMP-001` | TBD | TBD | TBD | Completion source conflict `OI-012` |
| `COMP-005` | `UC-COMP-001`, `UC-COMP-002` | `SCR-COMP-001`, `SCR-COMP-002` | TBD | TBD | TBD | Review Ready at period selection level |
| `COMP-006` | `UC-COMP-002` | `SCR-COMP-002`, `SCR-HOME-001` | TBD | TBD | TBD | Review Ready at public display level |
| `COMP-007` | `UC-COMP-004`; FS §25 | `SCR-ADM-013`, `SCR-ADM-015` | TBD | TBD | TBD | Blocked by `OI-002` |
| `HOME-001` | `UC-HOME-001` | `SCR-HOME-001` | TBD | TBD | TBD | Review Ready |
| `HOME-002` | `UC-HOME-001` | `SCR-HOME-001` | TBD | TBD | TBD | Review Ready; content source not finalized |
| `HOME-003` | `UC-HOME-001`, `UC-HCM-001` | `SCR-HOME-001`, `SCR-HCM-001` | TBD | TBD | TBD | Review Ready |
| `HOME-004` | `UC-HOME-001`; FS §6.2 | `SCR-HOME-001` | TBD | TBD | TBD | Visual reference only; no pixel-perfect requirement |
| `HOME-005` | `UC-HOME-001`; FS §6.2 | `SCR-HOME-001` | TBD | TBD | TBD | Review Ready for desktop/mobile wireframe |
| `ADM-001` | `UC-ADM-001`, `UC-ADM-USER-001`, `UC-ADM-INV-001`, `UC-ADM-CFG-001` | `SCR-ADM-001..SCR-ADM-015` | TBD | TBD | TBD | Review Ready at capability level |
| `ADM-002` | `UC-ADM-001` | `SCR-ADM-004..SCR-ADM-012` | TBD | TBD | TBD | Direct publish; no approval workflow |
| `ADM-003` | `UC-ADM-CFG-001`, `UC-COMP-004` | `SCR-ADM-015`, `SCR-ADM-013` | TBD | TBD | TBD | Competition/org groups blocked by `OI-002`, `OI-014` |
| `ADM-004` | FS §5.2; admin UC negative behavior | `SCR-ADM-001..SCR-ADM-015` | TBD | TBD | TBD | Full audit trail not required |
| `REP-001` | `UC-REP-001` | `SCR-ADM-001` | TBD | TBD | TBD | Review Ready |
| `REP-002` | `UC-REP-001` | `SCR-ADM-001` | TBD | TBD | TBD | Blocked by `OI-002` for real metric |
| `REP-003` | `UC-REP-001` | `SCR-ADM-001` | TBD | TBD | TBD | Blocked by `OI-002`, `OI-014` for real metric |
| `REP-004` | `UC-REP-001` | `SCR-ADM-001` | TBD | TBD | TBD | Blocked by `OI-013` |
| `REP-005` | `UC-REP-002` | `SCR-ADM-014` | TBD | TBD | TBD | Review Ready at period-filter level |
| `REP-006` | `UC-REP-003` | `SCR-ADM-014` | TBD | TBD | TBD | Review Ready at on-demand export level |
| `FILE-001` | `UC-FILE-001`, `UC-ADM-001` | `SCR-ADM-004..SCR-ADM-007`, `SCR-ADM-010`, `SCR-ADM-011` | TBD | TBD | TBD | Production validation blocked by `OI-005` |
| `FILE-002` | `UC-FILE-002` | `SCR-HAN-003`, `SCR-RES-002`, `SCR-EDU-003` | TBD | TBD | TBD | Technical decision required: `OI-015` |
| `FILE-003` | `UC-FILE-003` | `SCR-HAN-003`, `SCR-RES-002`, `SCR-EDU-003` | TBD | TBD | TBD | Review Ready |
| `FILE-004` | FS §5.2; `UC-FILE-003` | `SCR-HAN-003`, `SCR-RES-002`, `SCR-EDU-003` | TBD | TBD | TBD | Download remains allowed |
| `FILE-005` | `UC-FILE-001`; FS §25 | Admin upload screens | TBD | TBD | TBD | Blocked by `OI-005` |

## Coverage summary

| Functional requirement group | Count | Mapped |
|---|---:|---:|
| `USR/HAN/RES/NEWS/MUS/QUIZ/EDU/HCM/WEEK/COMP/HOME/ADM/REP/FILE-*` | 74 | 74 |

Business objectives, scope containers, rules, NFR, technical constraints, assumptions, out-of-scope items and Open Issues are inventoried in Functional Specification §4; they are not duplicated here as interaction rows.
