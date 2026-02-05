# Tasks: Refactor Exercise Hierarchy

## 1. Database & Core
- [x] 1.1 Update `prisma/schema.prisma` with self-referencing relationship.
- [x] 1.2 Create and run migration.
- [x] 1.3 Create a migration script to sanitize and group existing exercises.
- [x] 1.4 Update `exercise.service.ts` to support hierarchical queries.

## 2. UI Updates
- [x] 2.1 Refactor `ExercisePicker.tsx` to handle grouped exercises.
- [x] 2.2 Update `app/exercises/page.tsx` for the new hierarchical layout.

## 3. Verification
- [ ] 3.1 Verify that children are correctly nested under parents.
- [ ] 3.2 Verify that logging still works correctly for specific variations.
- [ ] 3.3 Verify PR tracking still works (and optionally aggregates by parent).
