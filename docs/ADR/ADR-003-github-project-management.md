# ADR-003 — GitHub Project Management

**Status:** Accepted  
**Date:** 2026-08-14

## Decision

GitHub là nền tảng quản lý chính cho:
- Source code.
- Documentation.
- Issues.
- Project board.
- Pull Requests.
- CI/CD.
- Releases/Tags.

## Workflow

Issue → Branch → Implementation → Pull Request → CI → Review → Merge main.

## Branch naming

- `feature/<REQ-ID>-short-name`
- `fix/<REQ-ID>-short-name`
- `docs/<DOC-ID>-short-name`
- `test/<REQ-ID>-short-name`

## Requirement traceability

GitHub Issue phải tham chiếu Requirement ID từ bộ tài liệu dự án.
