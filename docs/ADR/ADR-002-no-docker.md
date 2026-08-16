# ADR-002 — No Docker

**Status:** Accepted  
**Date:** 2026-08-14

## Decision

Không sử dụng Docker, Docker Compose hoặc Testcontainers trong baseline hiện tại.

## Consequences

- Development chạy trực tiếp Java, Node.js và MySQL trên máy.
- Integration test sử dụng MySQL test database riêng.
- CI phải chuẩn bị môi trường MySQL theo cách không phụ thuộc Docker.
- Tài liệu cài đặt local phải nêu rõ Java/Node/MySQL versions cần thiết.
