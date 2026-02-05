# Design: Project Structure

## Decisions

### Decision 1: Service Layer Implementation
We will implement the service layer as plain TypeScript functions exported from `services/<domain>.ts`.
- **Reasoning**: Keeps logic pure and testable. Avoids class overhead unless state management is needed (unlikely for data access).

### Decision 2: Barrel Exports
We will uses `index.ts` barrel exports for `components/ui`, `lib/`, and `services/` to simplify imports.
- **Example**: `import { getWorkouts } from "@/services"` instead of `@/services/workouts`.

### Decision 3: Path Aliases
We will assume standard Next.js `@/*` (root) alias is configured.
