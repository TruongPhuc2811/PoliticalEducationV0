# ADR-001 — Technology Baseline

**Status:** Accepted  
**Date:** 2026-08-14

## Decision

Sử dụng:
- Java 21
- Spring Boot 4.1.x
- Modular Monolith
- REST API
- Spring Security
- Spring Data JPA / Hibernate
- Flyway
- Maven Wrapper
- MySQL 8.4 LTS
- React + TypeScript
- Vite
- React Router
- TanStack Query
- React Hook Form
- Zod
- Ant Design
- OpenAPI 3 / Swagger UI
- Playwright + TypeScript
- Nginx
- Spring Boot Actuator

## Rationale

Stack đủ ổn định cho MVP, phù hợp quy mô hiện tại và vẫn cho phép mở rộng sau này mà không tạo gánh nặng microservices/hạ tầng phân tán ngay từ đầu.

## Consequences

- Backend phải giữ ranh giới module rõ ràng.
- API theo REST.
- Frontend sử dụng TypeScript.
- Schema DB thay đổi qua Flyway.
- Critical flows phải có automated tests.
