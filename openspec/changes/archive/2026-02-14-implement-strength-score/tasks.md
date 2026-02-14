# Tasks - Strength Score & Analytics Engine

## 1. Database & Infrastructure

- [x] 1.1 Add `isCoreLift` field to `Exercise` model in `prisma/schema.prisma`.
- [x] 1.2 Run `npx prisma migrate dev --name add_is_core_lift`.
- [x] 1.3 Update `prisma/seed.ts` to tag Squat, Bench, Deadlift, and OHP as core lifts.
- [x] 1.4 Re-run seed: `npx prisma db seed`.

## 2. Analytics Engine (Service Layer)

- [x] 2.1 Implement Brzycki 1RM formula utility in `lib/utils/analytics.ts`.
- [x] 2.2 Enhance `stats.service.ts` with `getStrengthScore(userId)` logic.
- [ ] 2.3 Add unit tests for 1RM calculation in `services/__tests__/stats.test.ts`.

## 3. UI Implementation

- [x] 3.1 Update `DashboardStatCard` to handle dynamic "Strength Score" values.
- [x] 3.2 Refactor `app/page.tsx` (Dashboard) to fetch and display the real Strength Score.
- [x] 3.3 Ensure "Recent PRs" on the dashboard uses the new 1RM-based PR logic.

## 4. Verification

- [x] 4.1 Verify database migration and seed data.
- [x] 4.2 Validate Strength Score accurately sums the max 1RMs of core lifts.
- [x] 4.3 Manual smoke test: Log a new session with a core lift and observe the score update.
