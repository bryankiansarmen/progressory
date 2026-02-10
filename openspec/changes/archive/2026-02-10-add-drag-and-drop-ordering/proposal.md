## Why

Current workout and program builders rely on static lists or cumbersome arrow-based reordering. This results in poor UX when organizing long routines or complex training schedules. Implementing drag-and-drop provides a modern, intuitive way for users to manage the sequence of their workouts and training days.

## What Changes

- Introduce `@dnd-kit` as the core dependency for drag-and-drop functionality.
- Implement a sortable exercise list in `WorkoutBuilderContainer`.
- Implement a sortable day list in `ProgramBuilder`.
- Add visual "grip" handles to exercise and program day cards.
- Remove legacy up/down reordering buttons in the Workout Builder.

## Capabilities

### New Capabilities
- `drag-and-drop-ordering`: Core requirement for intuitive list reordering across the application.

### Modified Capabilities
- `workout-template-management`: Update requirements for reordering exercises to specify drag-and-drop interaction.
- `workout-programs`: Update requirements for reordering program days to specify drag-and-drop interaction.

## Impact

- **Dependencies**: New dependency on `@dnd-kit/core`, `@dnd-kit/sortable`, and `@dnd-kit/utilities`.
- **UI Components**: Significant updates to `WorkoutBuilderContainer` and `ProgramBuilder`.
- **UX**: Significant improvement in routine and program organization speed.
