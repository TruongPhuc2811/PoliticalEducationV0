# TRACEABILITY MATRIX

**Project:** Hệ thống Giáo dục Chính trị
**Version:** V0.2 + V0.3 System Design supplement + V0.4 Business Decision traceability + V0.4 Database Design physical tables
**Date:** 2026-08-18
**Status:** V0.3 architecture/module/API domain boundary Accepted; V0.4 Business Decisions Approved/Applied (2026-08-18); V0.4 Database Design Accepted (2026-08-18, `V0.4_DATABASE_DESIGN_ACCEPTED`); V0.2 Requirement → Use Case → Screen remains Review Ready; P0 UI prototype implementation/test linked
**Source:** `docs/v0.1/BUSINESS-REQUIREMENTS.md`

V0.3 đã Accepted module ownership và **conceptual API domain boundary** với namespace `/api/v1`; vẫn không tạo endpoint/DTO final. DB column V0.4 Database Design Accepted (2026-08-18) — physical tables mapped below; final Test là `TBD — V0.6/implementation`. Các test `E2E-P0-UI-*` bên dưới chỉ xác minh prototype UI local-mock, không phải business E2E hoặc acceptance test cuối.

**V0.4 Database Design:** 50 physical tables designed (after final correction: `comp_quiz_source_selections` added to guarantee one canonical Quiz source per period/user/test). See `docs/v0.4/DATABASE-DESIGN.md` for full column dictionary, constraints, indexes, ERDs and Flyway implementation order.

**V0.4 Business Decision traceability (2026-08-18):** `OI-002`, `OI-006`, `OI-007`, `OI-008`, `OI-009`, `OI-010`, `OI-011`, `OI-012`, `OI-013`, `OI-014` resolved by Project Owner. Governing document: `docs/decisions/V0.4-BLOCKING-BUSINESS-DECISIONS.md`. Resolution details in `docs/v0.2/FUNCTIONAL-SPECIFICATION.md` §25.1. `OI-001`, `OI-003`, `OI-004`, `OI-005`, `OI-015` remain open.

**Owner Clarification 1A (2026-08-18 — Competition Unit Attribution):** One user maps to exactly one Tiểu đội per period based on assignment effective at `period.ends_at`. Resolved by introducing `comp_member_attributions` table. See `docs/v0.1/BUSINESS-REQUIREMENTS.md` §19.12.

**Owner Clarification 2A (2026-08-18 — Quiz/Weekly Source Semantics):** Only PASSED Quiz result may produce a competition contribution; only correct Weekly submission may produce a competition contribution. Competition module owns eligibility derivation; no `is_competition_eligible` flag in Quiz/Weekly modules. See `docs/v0.1/BUSINESS-REQUIREMENTS.md` §19.13.

## V0.3 System Design supplement (non-final API/DB)

| Requirement / Use Case group | Owning module(s) | Conceptual API/application boundary | DB | Final test | Decision dependency |
|---|---|---|---|---|---|
| `USR-001..USR-003`; `UC-AUTH-001`, `UC-AUTH-002`, `UC-ADM-INV-001` | `auth`, `user` | Authentication, registration and invitation capabilities under `/api/v1` | `accounts`, `invitations`, `user_assignments`, `user_assignment_history` | TBD | `OI-006` **Resolved `BD-V04-006`**; `TD-001` Approved by ADR-004; `TD-003` partially Approved/Deferred |
| `USR-004`; `UC-ADM-USER-001` | `user` | Account/profile-lite and role administration capability; classification is fixed `CAN_BO`/`CHIEN_SI` inline column, NOT Admin-extensible | `accounts` (classification inline CK), `positions`, `ranks`, `org_units`, `school_years`, `learning_phases` | TBD | `OI-014` **Resolved `BD-V04-014`**; Owner Clarification 2026-08-18: removed `user_classifications` table |
| `HAN-001..HAN-005`; `UC-HAN-001..003`, `UC-ADM-001` | `handbook` | Handbook browse/search/detail/admin capability | `handbook_categories`, `handbook_articles`, `file_metadata` | TBD | `OI-005`, `OI-015` for file behavior |
| `RES-001..RES-005`; `UC-RES-001..002`, `UC-ADM-001` | `resolution` | Resolution browse/detail/admin capability | `resolutions`, `resolution_topics`, `resolution_documents`, `file_metadata` | TBD | `OI-005`, `OI-015` |
| `NEWS-001..NEWS-005`; `UC-NEWS-001..003`, `UC-ADM-001` | `news` | News browse/detail/admin and provider normalization boundary | `news_categories`, `news_articles`, `file_metadata` | TBD | `OI-001`, `OI-005` |
| `MUS-001..MUS-004`; `UC-MUS-001..002`, `UC-ADM-001` | `music` | Music browse/play-metadata/admin capability | `music_categories`, `music_items`, `file_metadata` | TBD | `OI-005` |
| `QUIZ-001..QUIZ-010`; `UC-QUIZ-001..006` | `quiz` | Question Bank, test configuration, attempt, submission, result and ranking boundaries; immutable option snapshot model for historical correctness | `quiz_questions`, `quiz_question_options`, `quiz_configs`, `quiz_config_snapshot`, `quiz_test_types`, `quiz_attempts`, `quiz_attempt_questions`, `quiz_attempt_question_options`, `quiz_attempt_answers`, `quiz_results` | TBD | `OI-002` **Resolved `BD-V04-002`**, `OI-007` **Resolved `BD-V04-007`**, `OI-008` **Resolved `BD-V04-008`**, `OI-009` **Resolved `BD-V04-009`**; Owner Clarification 2A 2026-08-18: Quiz ranking independent of Competition |
| `EDU-001..EDU-004`; `UC-EDU-001..002`, `UC-ADM-001` | `politicaleducation` | Program/topic/lecture/document capability; Test association: EDU reuses Quiz (BD-V04-011) | `edu_programs`, `edu_topics`, `edu_lectures`, `edu_documents`, `edu_lecture_quiz_ref` | TBD | `OI-005`, `OI-011` **Resolved `BD-V04-011`**, `OI-012` **Resolved `BD-V04-012`**, `OI-015` |
| `HCM-001..HCM-004`; `UC-HCM-001..002`, `UC-HOME-001`, `UC-ADM-001` | `hochiminh` | Today/detail/admin capability | `hcm_teachings`, `file_metadata` | TBD | `OI-005` where media applies |
| `WEEK-001..WEEK-005`; `UC-WEEK-001..003` | `weeklyquestion` | Configure/current/submit/grade/reveal capability; calendar-week lifecycle (BD-V04-010) | `weekly_questions`, `weekly_question_options`, `weekly_submissions` | TBD | `OI-002` **Resolved `BD-V04-002`**, `OI-010` **Resolved `BD-V04-010`** |
| `COMP-001..COMP-007`; `UC-COMP-001..004` | `competition` | Admin-configurable policy; sources: Quiz (PASS-only canonical selection) + Weekly (correct-only) + manual adjustment; unit aggregation normalized average; periods weekly/monthly/yearly (BD-V04-002); period-end attribution snapshot | `comp_policies`, `comp_criteria`, `comp_periods`, `comp_quiz_source_selections`, `comp_contributions`, `comp_manual_adjustments`, `comp_corrections`, `comp_individual_outcomes`, `comp_unit_outcomes`, `comp_member_attributions` | TBD | `OI-002` **Resolved `BD-V04-002`**, `OI-012` **Resolved `BD-V04-012`**, `OI-014` **Resolved `BD-V04-014`**; Owner Clarifications 1A/2A preserved |
| `REP-001..REP-006`; `UC-REP-001..003` | `dashboard` | Widget/report query and on-demand export boundary; popular-content metric = aggregate detail-view count (BD-V04-013) | `popular_view_daily` (reads from content module tables) | TBD | `OI-002` **Resolved `BD-V04-002`**, `OI-013` **Resolved `BD-V04-013`**, `OI-014` **Resolved `BD-V04-014`**, `TD-005` |
| `FILE-001..FILE-005`; `UC-FILE-001..003` | `file` | `StorageService` metadata/store/open/delete and authorized delivery capability | `file_metadata` | TBD | `OI-005`, `OI-015`, `TD-004` |
| `HOME-001..HOME-005`; `UC-HOME-001` | content modules + `dashboard` query composition | User Portal composition consumes public/query capabilities; no cross-module repository access | reads `hcm_teachings`, `popular_view_daily` via module capabilities | TBD | `OI-013` only if popular content is added |
| `ADM-001..ADM-004`; Admin UCs | owning feature modules; `auth`/`user`; `dashboard` | Role-protected Admin capabilities; no separate generic business repository | all domain tables via owning modules | TBD | Domain OIs above; no granular permission matrix |
| `NFR-001..NFR-010`, `TECH-001..TECH-012` | `common` technical support + all modules | Spring MVC/Security/JPA/Flyway/OpenAPI/Actuator and no-Docker runtime conventions | N/A at requirement level; V0.4 MySQL/Flyway/50-table schema applies | TBD | `OI-003`; `TD-001` Approved; remaining `TD-*` statuses in V0.3 |

## P0 UI prototype implementation trace (non-final)

| Screen ID | React route | UI implementation | Prototype UI test |
|---|---|---|---|
| `SCR-AUTH-001` | `/login` | `frontend/src/pages/auth/LoginPage.tsx` | `E2E-P0-UI-001` |
| `SCR-AUTH-002` | `/register` | `frontend/src/pages/auth/RegisterPage.tsx` | `E2E-P0-UI-001` |
| `SCR-HOME-001` | `/home` | `frontend/src/pages/home/HomePage.tsx` | `E2E-P0-UI-001` |
| `SCR-HAN-002` | `/handbook` | `frontend/src/pages/handbook/HandbookListPage.tsx` | `E2E-P0-UI-002` |
| `SCR-HAN-003` | `/handbook/:contentId` | `frontend/src/pages/handbook/HandbookDetailPage.tsx` | `E2E-P0-UI-002` |
| `SCR-QUIZ-001` | `/quizzes` | `frontend/src/pages/quiz/QuizListPage.tsx` | `E2E-P0-UI-003` |
| `SCR-QUIZ-003` | `/quizzes/:quizId/attempt` | `frontend/src/pages/quiz/QuizAttemptPage.tsx` | `E2E-P0-UI-003` |
| `SCR-QUIZ-004` | `/quizzes/:quizId/result` | `frontend/src/pages/quiz/QuizResultPage.tsx` | `E2E-P0-UI-003` |
| `SCR-COMP-002` | `/competition/ranking` | `frontend/src/pages/competition/CompetitionRankingPage.tsx` | `E2E-P0-UI-004` |
| `SCR-ADM-001` | `/admin` | `frontend/src/pages/admin/AdminDashboardPage.tsx` | `E2E-P0-UI-005`, `E2E-P0-UI-006` (navigation only) |
| `SCR-ADM-008` | `/admin/question-bank` | `frontend/src/pages/admin/QuestionBankPage.tsx` | `E2E-P0-UI-005` |
| `SCR-ADM-004` | `/admin/handbook` | `frontend/src/pages/admin/AdminHandbookPage.tsx` | `E2E-P0-UI-006` |

| Requirement ID | Functional Spec / Use Case | Screen | API | DB | Test | Status / Notes |
|---|---|---|---|---|---|---|
| `USR-001` | `UC-AUTH-001` | `SCR-AUTH-001` | TBD | `accounts` | TBD | Review Ready |
| `USR-002` | `UC-AUTH-002` | `SCR-AUTH-002` | TBD | `accounts`, `invitations` | TBD | Review Ready |
| `USR-003` | `UC-AUTH-002`, `UC-ADM-INV-001` | `SCR-AUTH-002`, `SCR-ADM-003` | TBD | `invitations`, `user_assignments`, `user_assignment_history` | TBD | `OI-006` **Resolved `BD-V04-006`** — scoped single-use invitation tied to Tiểu đội |
| `USR-004` | `UC-AUTH-001`, `UC-ADM-USER-001` | `SCR-AUTH-001`, `SCR-ADM-002` | TBD | `accounts.classification`, `positions`, `ranks` | TBD | Review Ready; fixed CAN_BO/CHIEN_SI classification |
| `USR-005` | FS §6.1 Technology/resource scale constraint | N/A | TBD | — (NFR; no DB table) | TBD | No standalone UC |
| `HAN-001` | `UC-ADM-001` | `SCR-ADM-004` | TBD | `handbook_categories` | TBD | Review Ready |
| `HAN-002` | `UC-ADM-001` | `SCR-ADM-004` | TBD | `handbook_articles` | TBD | Review Ready |
| `HAN-003` | `UC-ADM-001`, `UC-HAN-002` | `SCR-ADM-004`, `SCR-HAN-003` | TBD | `handbook_articles`, `file_metadata` | TBD | Review Ready |
| `HAN-004` | `UC-HAN-001`, `UC-HAN-002` | `SCR-HAN-001`, `SCR-HAN-002`, `SCR-HAN-003` | TBD | `handbook_categories`, `handbook_articles` | TBD | Review Ready |
| `HAN-005` | `UC-HAN-003` | `SCR-HAN-002`, `SCR-HAN-003` | TBD | `handbook_articles` (FULLTEXT index) | TBD | Review Ready |
| `RES-001` | `UC-ADM-001`, `UC-RES-001` | `SCR-ADM-005`, `SCR-RES-001` | TBD | `resolutions` | TBD | Review Ready |
| `RES-002` | `UC-ADM-001`, `UC-RES-002` | `SCR-ADM-005`, `SCR-RES-002` | TBD | `resolution_documents`, `file_metadata` | TBD | Review Ready; file details depend on `OI-005`, `OI-015` |
| `RES-003` | `UC-ADM-001`, `UC-RES-002` | `SCR-ADM-005`, `SCR-RES-002` | TBD | `resolution_topics` | TBD | Review Ready |
| `RES-004` | `UC-RES-001`, `UC-RES-002` | `SCR-RES-001`, `SCR-RES-002` | TBD | `resolutions`, `resolution_topics`, `resolution_documents` | TBD | Review Ready |
| `RES-005` | FS §5.2; `UC-RES-001`, `UC-RES-002` negative behavior | `SCR-RES-001`, `SCR-RES-002` | TBD | — (no progress table) | TBD | No assignment/progress UC; BD-V04-012 |
| `NEWS-001` | `UC-ADM-001`, `UC-NEWS-001` | `SCR-ADM-006`, `SCR-NEWS-001` | TBD | `news_articles`, `news_categories` | TBD | Review Ready |
| `NEWS-002` | `UC-ADM-001`, `UC-NEWS-002` | `SCR-ADM-006`, `SCR-NEWS-002` | TBD | `news_articles`, `file_metadata` | TBD | Review Ready |
| `NEWS-003` | `UC-ADM-001`, `UC-NEWS-001` | `SCR-ADM-006`, `SCR-NEWS-001` | TBD | `news_categories` | TBD | Review Ready |
| `NEWS-004` | `UC-NEWS-003` | `SCR-ADM-006` (future boundary only) | TBD | `news_articles.source_origin` (extensibility column) | TBD | Blocked by `OI-001` |
| `NEWS-005` | FS §5.2; `UC-NEWS-001`, `UC-NEWS-002` negative behavior | `SCR-NEWS-001`, `SCR-NEWS-002` | TBD | — (no reading history table) | TBD | No reading/listening history |
| `MUS-001` | `UC-ADM-001`, `UC-MUS-001` | `SCR-ADM-007`, `SCR-MUS-001` | TBD | `music_categories`, `music_items` | TBD | Review Ready |
| `MUS-002` | `UC-ADM-001`, `UC-MUS-002` | `SCR-ADM-007`, `SCR-MUS-002` | TBD | `music_items`, `file_metadata` | TBD | Upload limit depends on `OI-005` |
| `MUS-003` | `UC-MUS-001`, `UC-MUS-002` | `SCR-MUS-001`, `SCR-MUS-002` | TBD | `music_items` | TBD | Review Ready |
| `MUS-004` | FS §5.2; `UC-MUS-001`, `UC-MUS-002` negative behavior | `SCR-MUS-001`, `SCR-MUS-002` | TBD | — (no playlist/listening history table) | TBD | No playlist/favorite/listening statistics; BD-V04-013 |
| `QUIZ-001` | `UC-QUIZ-001` | `SCR-ADM-008` | TBD | `quiz_questions`, `quiz_question_options` | TBD | Review Ready |
| `QUIZ-002` | `UC-QUIZ-001` | `SCR-ADM-008` | TBD | `quiz_questions.question_type`, `quiz_question_options` | TBD | Review Ready |
| `QUIZ-003` | `UC-QUIZ-001` | `SCR-ADM-008` | TBD | `quiz_questions.topic_tag` | TBD | Review Ready |
| `QUIZ-004` | `UC-QUIZ-002`, `UC-QUIZ-004` | `SCR-ADM-009`, `SCR-QUIZ-002`, `SCR-QUIZ-003` | TBD | `quiz_configs`, `quiz_attempts`, `quiz_attempt_questions`, `quiz_config_snapshot` | TBD | `OI-007` **Resolved `BD-V04-007`** — limited attempts, resume, fixed set |
| `QUIZ-005` | `UC-QUIZ-002`, `UC-QUIZ-003` | `SCR-ADM-009`, `SCR-QUIZ-001`, `SCR-QUIZ-002` | TBD | `quiz_configs.duration_seconds`, `quiz_attempts.expires_at` | TBD | `OI-008` **Resolved `BD-V04-008`** — backend auto-finalize on timeout |
| `QUIZ-006` | `UC-QUIZ-004` | `SCR-QUIZ-003` | TBD | `quiz_attempt_questions.position`, `quiz_attempt_answers` | TBD | `OI-007` **Resolved `BD-V04-007`** — fixed question/answer order; resume confirmed |
| `QUIZ-007` | `UC-QUIZ-005` | `SCR-QUIZ-003`, `SCR-QUIZ-004` | TBD | `quiz_results`, `quiz_attempt_question_options.is_correct_snapshot`, `quiz_attempt_questions.question_type_snapshot` | TBD | Review Ready; auto-grade confirmed from immutable snapshot |
| `QUIZ-008` | `UC-QUIZ-005` | `SCR-QUIZ-004` | TBD | `quiz_results.is_passed` (exposed); `quiz_results.raw_score` (internal) | TBD | `OI-009` **Resolved `BD-V04-009`** — USER sees Đạt/Không đạt; raw score internal only |
| `QUIZ-009` | `UC-QUIZ-005`, `UC-COMP-003` | `SCR-QUIZ-004`, `SCR-COMP-001`, `SCR-COMP-002` | TBD | `quiz_results.is_passed` gates Competition only; `comp_quiz_source_selections`; one `comp_contributions.quiz_source_selection_id` per canonical selection | TBD | `OI-002` **Resolved `BD-V04-002`**, `OI-009` **Resolved `BD-V04-009`**; Owner Clarification 2A preserved |
| `QUIZ-010` | `UC-QUIZ-006` | `SCR-QUIZ-005` | TBD | `quiz_results` + `idx_quiz_results_account_config_score`; Quiz ranking does NOT depend on Competition processing or PASS/FAIL | TBD | `OI-009` **Resolved `BD-V04-009`** — highest valid final graded attempt, raw score descending |
| `EDU-001` | `UC-EDU-001`; test concept tracked in `OI-011` | `SCR-EDU-001`, `SCR-EDU-002`, `SCR-EDU-003`, `SCR-ADM-010` | TBD | `edu_programs`, `edu_topics`, `edu_lectures`, `edu_documents`, `edu_lecture_quiz_ref` | TBD | `OI-011` **Resolved `BD-V04-011`** — EDU reuses Quiz; 0..1 Quiz per Lecture |
| `EDU-002` | `UC-EDU-002`, `UC-ADM-001` | `SCR-EDU-003`, `SCR-ADM-010` | TBD | `edu_documents`, `file_metadata` | TBD | Preview depends on `OI-015` |
| `EDU-003` | `UC-EDU-001`, `UC-EDU-002` | `SCR-EDU-001`, `SCR-EDU-002`, `SCR-EDU-003` | TBD | `edu_programs`, `edu_topics`, `edu_lectures`, `edu_documents` | TBD | Review Ready |
| `EDU-004` | FS §5.2; `UC-EDU-001`, `UC-EDU-002` negative behavior | `SCR-EDU-001`, `SCR-EDU-002`, `SCR-EDU-003` | TBD | — (no progress/completion table) | TBD | No progress tracking; BD-V04-012 |
| `HCM-001` | `UC-ADM-001`, `UC-HCM-001` | `SCR-ADM-011`, `SCR-HCM-001`, `SCR-HOME-001` | TBD | `hcm_teachings` | TBD | Review Ready |
| `HCM-002` | `UC-ADM-001`, `UC-HCM-002` | `SCR-ADM-011`, `SCR-HCM-002` | TBD | `hcm_teachings`, `file_metadata` | TBD | Review Ready |
| `HCM-003` | `UC-HCM-001`, `UC-HOME-001` | `SCR-HOME-001`, `SCR-HCM-001` | TBD | `hcm_teachings.relevance_date` + `idx_hcm_teachings_date_status` | TBD | Review Ready |
| `HCM-004` | FS §5.2; `UC-HCM-002` negative behavior | `SCR-HCM-001`, `SCR-HCM-002` | TBD | — (no search history table) | TBD | No advanced search |
| `WEEK-001` | `UC-WEEK-001`, `UC-WEEK-002` | `SCR-ADM-012`, `SCR-WEEK-001` | TBD | `weekly_questions` + `uq_weekly_questions_opens_at` (authoritative boundary); no ISO-8601 week assumption | TBD | `OI-010` **Resolved `BD-V04-010`** — calendar-week lifecycle; BD-V04-010 RESOLVED; exact timezone/boundary deferred to implementation |
| `WEEK-002` | `UC-WEEK-001`, `UC-WEEK-002` | `SCR-ADM-012`, `SCR-WEEK-001` | TBD | `weekly_question_options` | TBD | Review Ready at question-type level |
| `WEEK-003` | `UC-WEEK-002` | `SCR-WEEK-001`, `SCR-WEEK-002` | TBD | `weekly_submissions.is_correct` | TBD | Review Ready at auto-grade level |
| `WEEK-004` | `UC-WEEK-001`, `UC-WEEK-003` | `SCR-ADM-012`, `SCR-WEEK-002` | TBD | `weekly_questions.correct_explanation` revealed after `period_closes_at`; mandatory business rule, not configurable toggle | TBD | `OI-010` **Resolved `BD-V04-010`** — reveal after period closes |
| `WEEK-005` | `UC-WEEK-002`, `UC-COMP-003` | `SCR-WEEK-001`, `SCR-COMP-001`, `SCR-COMP-002` | TBD | `weekly_submissions.is_correct`; `comp_contributions.weekly_submission_id`; `uq_comp_contributions_period_weekly`; no `is_competition_eligible` in Weekly module | TBD | `OI-002` **Resolved `BD-V04-002`**; Owner Clarification 2A 2026-08-18: correct-only Weekly source; Competition owns eligibility derivation |
| `COMP-001` | `UC-COMP-001`, `UC-COMP-002` | `SCR-COMP-001`, `SCR-COMP-002` | TBD | `comp_individual_outcomes`, `comp_unit_outcomes`, `comp_member_attributions`, `org_units` | TBD | `OI-014` **Resolved `BD-V04-014`**; Owner Clarification 1A 2026-08-18: one attribution per user per period at period.ends_at |
| `COMP-002` | `UC-COMP-002` | `SCR-COMP-002` | TBD | `comp_unit_outcomes`, `org_units.unit_type`, `comp_member_attributions` (aggregation from unique attributed members) | TBD | `OI-014` **Resolved `BD-V04-014`**; Owner Clarification 1A 2026-08-18: no double-counting |
| `COMP-003` | `UC-COMP-001`, `UC-COMP-003` | `SCR-COMP-001`, `SCR-ADM-013` | TBD | `comp_contributions`, `comp_criteria`, `comp_policies` | TBD | `OI-002` **Resolved `BD-V04-002`**, `OI-012` **Resolved `BD-V04-012`**, `OI-014` **Resolved `BD-V04-014`** |
| `COMP-004` | `UC-COMP-003` | `SCR-ADM-013`, `SCR-COMP-001` | TBD | — (no learning completion table; BD-V04-012) | TBD | `OI-012` **Resolved `BD-V04-012`** — learning completion excluded from MVP scoring |
| `COMP-005` | `UC-COMP-001`, `UC-COMP-002` | `SCR-COMP-001`, `SCR-COMP-002` | TBD | `comp_periods.period_type` WEEKLY/MONTHLY/YEARLY | TBD | Review Ready at period selection level |
| `COMP-006` | `UC-COMP-002` | `SCR-COMP-002`, `SCR-HOME-001` | TBD | `comp_individual_outcomes`, `comp_unit_outcomes` | TBD | Review Ready at public display level |
| `COMP-007` | `UC-COMP-004`; FS §25 | `SCR-ADM-013`, `SCR-ADM-015` | TBD | `comp_policies`, `comp_criteria` | TBD | **Resolved `BD-V04-002`** — Admin-configurable policy design ready |
| `HOME-001` | `UC-HOME-001` | `SCR-HOME-001` | TBD | reads from module capability tables | TBD | Review Ready |
| `HOME-002` | `UC-HOME-001` | `SCR-HOME-001` | TBD | — (content source not finalized) | TBD | Review Ready; content source not finalized |
| `HOME-003` | `UC-HOME-001`, `UC-HCM-001` | `SCR-HOME-001`, `SCR-HCM-001` | TBD | `hcm_teachings` | TBD | Review Ready |
| `HOME-004` | `UC-HOME-001`; FS §6.2 | `SCR-HOME-001` | TBD | — | TBD | Visual reference only; no pixel-perfect requirement |
| `HOME-005` | `UC-HOME-001`; FS §6.2 | `SCR-HOME-001` | TBD | — | TBD | Review Ready for desktop/mobile wireframe |
| `ADM-001` | `UC-ADM-001`, `UC-ADM-USER-001`, `UC-ADM-INV-001`, `UC-ADM-CFG-001` | `SCR-ADM-001..SCR-ADM-015` | TBD | all domain tables via owning modules | TBD | Review Ready at capability level |
| `ADM-002` | `UC-ADM-001` | `SCR-ADM-004..SCR-ADM-012` | TBD | `publish_status` columns on content tables | TBD | Direct publish; no approval workflow |
| `ADM-003` | `UC-ADM-CFG-001`, `UC-COMP-004` | `SCR-ADM-015`, `SCR-ADM-013` | TBD | `positions`, `ranks`, `org_units`, `comp_policies`, `comp_criteria`, `school_years`, `learning_phases`, `quiz_test_types` | TBD | `OI-002` **Resolved `BD-V04-002`**, `OI-014` **Resolved `BD-V04-014``; classification removed from Admin config (fixed CAN_BO/CHIEN_SI) |
| `ADM-004` | FS §5.2; admin UC negative behavior | `SCR-ADM-001..SCR-ADM-015` | TBD | — (no full audit trail table) | TBD | Full audit trail not required; created_by/updated_by on content tables only |
| `REP-001` | `UC-REP-001` | `SCR-ADM-001` | TBD | `accounts` count | TBD | Review Ready |
| `REP-002` | `UC-REP-001` | `SCR-ADM-001` | TBD | `comp_individual_outcomes`, `comp_unit_outcomes` | TBD | `OI-002` **Resolved `BD-V04-002`** — competition scoring metric approved |
| `REP-003` | `UC-REP-001` | `SCR-ADM-001` | TBD | `comp_individual_outcomes`, `comp_unit_outcomes` | TBD | `OI-002` **Resolved `BD-V04-002`**, `OI-014` **Resolved `BD-V04-014`** — ranking scopes confirmed |
| `REP-004` | `UC-REP-001` | `SCR-ADM-001` | TBD | `popular_view_daily` | TBD | `OI-013` **Resolved `BD-V04-013`** — popular content = aggregate detail-view count |
| `REP-005` | `UC-REP-002` | `SCR-ADM-014` | TBD | period filters on all reporting tables | TBD | Review Ready at period-filter level |
| `REP-006` | `UC-REP-003` | `SCR-ADM-014` | TBD | on-demand query from all reporting tables | TBD | Review Ready at on-demand export level |
| `FILE-001` | `UC-FILE-001`, `UC-ADM-001` | `SCR-ADM-004..SCR-ADM-007`, `SCR-ADM-010`, `SCR-ADM-011` | TBD | `file_metadata` | TBD | Production validation blocked by `OI-005` |
| `FILE-002` | `UC-FILE-002` | `SCR-HAN-003`, `SCR-RES-002`, `SCR-EDU-003` | TBD | `file_metadata.content_type` (OI-015 preview method) | TBD | Technical decision required: `OI-015` |
| `FILE-003` | `UC-FILE-003` | `SCR-HAN-003`, `SCR-RES-002`, `SCR-EDU-003` | TBD | `file_metadata` | TBD | Review Ready |
| `FILE-004` | FS §5.2; `UC-FILE-003` | `SCR-HAN-003`, `SCR-RES-002`, `SCR-EDU-003` | TBD | — | TBD | Download remains allowed |
| `FILE-005` | `UC-FILE-001`; FS §25 | Admin upload screens | TBD | `file_metadata.file_size_bytes` (limit enforced at app layer; OI-005) | TBD | Blocked by `OI-005` |

## Coverage summary

| Functional requirement group | Count | Mapped |
|---|---:|---:|
| `USR/HAN/RES/NEWS/MUS/QUIZ/EDU/HCM/WEEK/COMP/HOME/ADM/REP/FILE-*` | 74 | 74 |

Business objectives, scope containers, rules, NFR, technical constraints, assumptions, out-of-scope items and Open Issues are inventoried in Functional Specification §4; they are not duplicated here as interaction rows.
