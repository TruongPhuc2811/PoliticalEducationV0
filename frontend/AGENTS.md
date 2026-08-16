# Frontend Agent Instructions

In addition to root `AGENTS.md`:

- React 19 + TypeScript strict + Vite 8.
- React Router for routing.
- TanStack Query v5 for server state.
- React Hook Form + Zod for non-trivial forms.
- Ant Design 6 for base UI controls.
- Use custom CSS/CSS modules for project-specific visual design.
- Do not add Tailwind/Redux/Axios unless explicitly approved.
- `src/features` follows business modules.
- `src/shared` must stay business-agnostic.
- Mock/demo data must be isolated from production data access.
- Current UI reference is not a pixel-perfect clone target.
- Add loading/empty/error states when real API integration begins.
