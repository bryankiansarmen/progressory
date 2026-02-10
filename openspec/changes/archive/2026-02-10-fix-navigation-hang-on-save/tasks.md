## 1. Server Action Updates

- [x] 1.1 Add `revalidatePath("/workouts")` to `createWorkout`, `updateWorkout`, and `deleteWorkout` in `services/workout.service.ts`.
- [x] 1.2 Add `revalidatePath("/programs")` to `createProgram`, `deleteProgram`, and `enrollInProgram` in `services/program.service.ts`.

## 2. UI Component Refactoring

- [x] 2.1 Remove `router.refresh()` from `handleSave` in `components/workout/WorkoutBuilderContainer.tsx`.
- [x] 2.2 Remove `router.refresh()` from `handleSave` in `components/program/ProgramBuilder.tsx`.
- [x] 2.3 Remove `router.refresh()` from `handleEnroll` in `components/program/ProgramCard.tsx`.
