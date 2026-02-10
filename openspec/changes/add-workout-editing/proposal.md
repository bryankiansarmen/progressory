## Why

Currently, users cannot modify existing workout templates. If they want to change a single exercise or adjust the order, they must delete the entire template and recreate it from scratch. This is a poor user experience and discourages iterative improvement of workout routines.

## What Changes

- Add backend support for updating workout templates (name and exercises).
- Update the workout builder UI to support "edit mode," pre-filling with existing data.
- Add a new route `/workouts/[id]/edit` for editing templates.
- Add an "Edit" action to workout cards on the dashboard.

## Capabilities

### New Capabilities
*(None)*

### Modified Capabilities
- `workout-template-management`: Add requirement for modifying existing templates.

## Impact

- **Services**: `workout.service.ts` needs a new `updateWorkout` function.
- **UI Components**: 
    - `WorkoutBuilderContainer` needs refactoring to handle initial data.
    - `WorkoutCard` needs an Edit button.
- **Routes**: New page `app/workouts/[id]/edit/page.tsx`.
