# Tasks: Implement Core Services

## 1. Exercise Service

- [x] 1.1 Implement `services/exercise.service.ts`.
- [x] 1.2 Add `getExercises` to fetch library and custom exercises.
- [x] 1.3 Add `createCustomExercise` to persist new exercises.

## 2. Workout Service

- [x] 2.0 Update `schema.prisma` to include `WorkoutExercise` (template exercises) and run migration.
- [x] 2.1 Implement `services/workout.service.ts`.
- [x] 2.2 Add `getWorkouts` to fetch user templates.
- [x] 2.3 Add `getWorkoutById` to fetch a specific template with details.

## 3. Logging Service

- [x] 3.1 Implement `services/logging.service.ts`.
- [x] 3.2 Add `startWorkout` logic to initialize logs/entries from a template.
- [x] 3.3 Add `completeSet` to update performance and mark `isDone: true`.
- [x] 3.4 Add `getLastPerformance` to retrieve historical data for hints.

## 4. Wiring

- [x] 4.1 Create `services/index.ts` and export all functions from the new services.

## 5. Verification

- [x] 5.1 Verify TypeScript types match correctly.
- [x] 5.2 (Optional) create a temporary test script to verify database interactions.
