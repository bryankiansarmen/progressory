# Tasks: Implement Exercise Library UI

## 1. Setup & Page Structure

- [x] 1.1 Create `app/exercises/page.tsx` as the main entry point (Server Component).
- [x] 1.2 Implement `ExerciseLibraryContainer` as a Client Component for state management.

## 2. Shared Components

- [x] 2.1 Create `components/exercise/ExerciseCard.tsx` for presenting exercise data.
- [x] 2.2 Create `components/exercise/ExerciseFilters.tsx` (Search + Muscle Group/Category Selects).
- [x] 2.3 Create `components/exercise/CreateExerciseDialog.tsx` with a form for custom exercises.

## 3. Library Implementation

- [x] 3.1 Fetch exercises in `page.tsx` using `getExercises()` and pass to the container.
- [x] 3.2 Implement search (fuzzy) and filtering logic in `ExerciseLibraryContainer`.
- [x] 3.3 Wire up the custom exercise form to the `createCustomExercise` service.

## 4. Polishing

- [x] 4.1 Apply "Rich Aesthetics" (vibrant colors, hover effects, dark mode enhancements).
- [x] 4.2 Add "Empty State" UI when no exercises match filters.

## 5. Verification

- [x] 5.1 Verify search and filtering works as expected.
- [x] 5.2 Verify custom exercise creation persists to the DB.
