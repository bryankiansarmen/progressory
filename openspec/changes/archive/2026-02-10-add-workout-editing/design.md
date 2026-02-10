## Context

The application currently allows users to create and delete workout templates but not edit them. This forces users to recreate templates from scratch for minor changes. We need to implement an editing workflow that leverages existing components.

## Goals / Non-Goals

**Goals:**
- Enable editing of workout name.
- Enable adding, removing, and reordering exercises in an existing workout.
- Reuse the `WorkoutBuilderContainer` for both create and edit modes.

**Non-Goals:**
- Complex diffing logic for exercise updates (we will use a replace strategy).
- "Save as Copy" functionality (out of scope for now).

## Decisions

### 1. Component Reuse
We will refactor `WorkoutBuilderContainer` to accept an optional `initialData` prop.
- **Why**: The UI for creating and editing is identical. Duplicating code would increase maintenance burden.
- **Implementation**: The component will initialize state from `initialData` if present, otherwise default to empty/new state.

### 2. Update Strategy: Replace-All
For the backend `updateWorkout` function, we will delete all existing `WorkoutExercise` relations for the workout and re-insert them based on the new list.
- **Why**: Implementing a diffing algorithm (detecting moves, inserts, deletes) is complex and error-prone for ordered lists.
- **Trade-off**: Slightly higher database churn, but negligible for the expected small number of exercises per workout (typically < 20).
- **Alternative**: precise diffing. **Rejected** due to unnecessary complexity.

### 3. Route Structure
We will add `app/workouts/[id]/edit/page.tsx`.
- **Why**: Keeps the edit view distinct and linkable.
- **Flow**: Page fetches data -> Passes to Client Component -> User saves -> Redirect to list.

## Risks / Trade-offs

- **Risk**: Losing data if the user navigates away without saving.
    - **Mitigation**: We won't implement a "dirty state" warning in this iteration, but the UI is fast enough that it shouldn't be a major issue.
- **Trade-off**: The "Replace-All" strategy changes IDs of `WorkoutExercise` records. If we ever link logs directly to `WorkoutExercise` (not just `Exercise`), this would break history.
    - **Check**: `WorkoutLogEntry` links to `Exercise`, not `WorkoutExercise`. **Verdict**: Safe.
