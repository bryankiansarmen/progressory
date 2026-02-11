## Why

The current program schedule UI uses a basic HTML select dropdown, which is visually inconsistent with the app's modern aesthetic and lacks the contextual information (exercise counts, muscle groups) needed for effective program planning. Improving this UI will provide users with better feedback when building multi-week routines and bring the experience in line with the rest of the application's rich interactive components.

## What Changes

- **New Component: `WorkoutPicker`**: Implement a searchable, rich selection popover for workout templates, modeled after the existing `ExercisePicker`.
- **Enhanced Schedule Items**: Update the program day cards in `ProgramBuilder` to display workout summaries, including exercise counts and primary muscle groups.
- **Rest Day Support**: Introduce an explicit "Rest Day" option in the schedule builder that visually distinguishes itself from active workout days.
- **Data Enrichment**: Update the `ProgramBuilder` and relevant services to ensure that full workout template data (including exercise lists) is available to the UI for rendering summaries.

## Capabilities

### New Capabilities
- `workout-selection-ui`: Provides a searchable, metadata-rich interface for selecting workout templates within the program builder.

### Modified Capabilities
- `workout-programs`: Update the requirements for program schedule visualization to include workout summaries and explicit rest day representation.

## Impact

- **Components**: `ProgramBuilder.tsx`, `SortableProgramDay` (internal to ProgramBuilder), new `WorkoutPicker.tsx`.
- **Services**: `program.service.ts` (to handle rest day persistence if necessary, or ensure data fetching includes required relations).
- **Types**: Potential updates to `ProgramDay` to support explicit rest states.
