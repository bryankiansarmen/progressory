# Tasks: Implement Exercise Variations Engine

## 1. Service Layer Expansion
- [x] 1.1 Implement `getExerciseFamily(exerciseId)` in `exercise.service.ts` to fetch parent and all siblings.
- [x] 1.2 Implement `getFamilyVolumeTrend(familyId)` in `stats.service.ts`.
- [x] 1.3 Add a "Variation Swap" helper logic (client-side state management).

## 2. UI Components
- [x] 2.1 Create `VariationSwapModal` for the Workout Player.
- [x] 2.2 Update `ExerciseLibraryContainer` to support nested/expandable variations.
- [x] 2.3 Create a "Family Reference" card to show bests of other family members.

## 3. Workflow Integration
- [x] 3.1 Link the "Swap" action in the `ExerciseLoggingCard`.
- [x] 3.2 Update `getDashboardStats` or `Analytics` to optionally group by families.

## 4. Verification
- [x] 4.1 Verify that swapping an exercise correctly preserves existing set data in the database.
- [x] 4.2 Validate that family analytics correctly aggregate data from both parent and children.
- [x] 4.3 Smoke test: Navigate hierarchy in Exercise Library.
