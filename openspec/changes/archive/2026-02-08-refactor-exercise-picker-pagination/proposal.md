## Why

The current `ExercisePicker` component in the Workout Builder receives a static list of exercises which is limited to the default page size (20 items) by the backend service. This prevents users from accessing or selecting any exercises beyond the first 20 alphabetically, creating a broken user experience for users with larger exercise libraries.

## What Changes

- Refactor `ExercisePicker` to implement server-side search and pagination, replacing the current client-side filtering of a static list.
- Update `WorkoutBuilderContainer` to remove the dependency on the initial `allExercises` prop, allowing the picker to manage its own data fetching state.
- Implement an infinite scroll or "load more" mechanism within the picker to support browsing large exercise libraries.
- Maintain existing functionality including multi-selection, exclusion logic, and variation grouping.

## Capabilities

### New Capabilities
<!-- Capabilities being introduced. -->

### Modified Capabilities
- `exercise-selection`: Update the requirements for exercise selection to mandate support for large datasets through server-side pagination and search, ensuring scalability beyond the initial default limit.

## Impact

- **Components**: 
  - `components/exercise/ExercisePicker.tsx`: Significant refactor to handle async data loading.
  - `components/workout/WorkoutBuilderContainer.tsx`: Simplified to remove initial data fetching.
- **Pages**:
  - `app/workouts/new/page.tsx`: Remove server-side fetching of all exercises.
- **Services**:
  - No changes expected to `exercise.service.ts` as it already supports the necessary pagination parameters.
