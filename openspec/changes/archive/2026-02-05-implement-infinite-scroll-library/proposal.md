# Proposal: Implement Infinite Scroll for Exercise Library

## Why
Loading all exercises at once can become slow as the library grows. Infinite scroll provides a smoother UX and better performance.

## What Changes
- **Service Layer**: Update `getExercises` to support `limit` and `offset`.
- **UI Components**:
    - Update `ExerciseLibraryContainer` to manage paginated state.
    - Implement a `Sentinel` component using `IntersectionObserver`.
    - Handle filter/search resets for pagination.
- **Loading States**: Add a "Loading more..." indicator.

## Capabilities
- `paginated-exercise-fetching`: Support for fetching specific slices of the exercise library.

## Impact
- `services/exercise.service.ts`: API change to support take/skip.
- `components/exercise/ExerciseLibraryContainer.tsx`: Significant logic change for state management.
- `app/exercises/page.tsx`: Pass initial page size.
