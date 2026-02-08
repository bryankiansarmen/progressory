## 1. Refactor ExercisePicker

- [x] 1.1 Update `ExercisePickerProps` to remove `allExercises` and add support for async loading
- [x] 1.2 Implement internal state for `exercises`, `isLoading`, `hasMore`, and `offset`
- [x] 1.3 Add `loadMore` function using `getExercises` from services
- [x] 1.4 Implement search debouncing for the `searchQuery` input
- [x] 1.5 Add `IntersectionObserver` sentinel for infinite scrolling
- [x] 1.6 Integrate variation grouping and filtering with the new async data flow

## 2. Update Workout Builder

- [x] 2.1 Update `WorkoutBuilderContainer` to remove `allExercises` prop and related logic
- [x] 2.2 Update `app/workouts/new/page.tsx` to stop fetching all exercises server-side

## 3. Verification

- [x] 3.1 Verify that searching for "Back" exercises returns more than 5 results
- [x] 3.2 Verify that infinite scroll loads additional items in the picker
- [x] 3.3 Verify that multi-selection still works correctly with paginated results
- [x] 3.4 Verify that search query resets pagination and fetches from start
