# Proposal: Implement Core Services

## Why
We need a clean abstraction between our Prisma database and our Next.js UI. Implementing a Service Layer centralizes our business logic, making it reusable, maintainable, and easier to test.

## What Changes
- Create `services/exercise.service.ts` for library management.
- Create `services/workout.service.ts` for template management.
- Create `services/logging.service.ts` for the set-by-set "Checkmark" flow.
- implement barrel exports in `services/index.ts`.

## Capabilities

### New Capabilities
- **Service Layer Pattern**: Formalizing how business logic is organized and called within the app.
- **Workout Logic**: Specific functions for starting, logging, and completing workout sessions.

## Impact
- `services/`: populated with functional TypeScript services.
- `lib/db/index.ts`: utilized by the new services.
