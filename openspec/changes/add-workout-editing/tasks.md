## 1. Backend Implementation

- [x] 1.1 Add `updateWorkout` function to `services/workout.service.ts` with "replace-all" logic for exercises.

## 2. UI Updates

- [x] 2.1 Refactor `WorkoutBuilderContainer` to accept `initialData` (workout with exercises).
- [x] 2.2 Update `WorkoutBuilderContainer` logic to switch between `createWorkout` and `updateWorkout` based on presence of ID.
- [x] 2.3 Add "Edit" button to `WorkoutCard` linking to `/workouts/[id]/edit`.

## 3. New Route

- [x] 3.1 Create `app/workouts/[id]/edit/page.tsx` to fetch workout and render `WorkoutBuilderContainer`.
