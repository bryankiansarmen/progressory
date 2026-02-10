## Why

Currently, the delete buttons on the workout routines and training programs pages are non-functional. The UI includes the buttons, but the underlying logic to trigger the deletion and update the state is missing or incorrectly implemented, leading to a poor user experience where users cannot remove unwanted templates or programs.

## What Changes

- Implement deletion logic in the `WorkoutCard` component to call the `deleteWorkout` server action.
- Implement deletion logic in the `ProgramCard` component to call the `deleteProgram` server action.
- Add user confirmation (e.g., using `window.confirm`) before proceeding with deletion.
- Add loading states to the delete buttons to provide visual feedback during the process.
- Ensure the UI correctly reflects the deletion by leveraging existing server-side revalidation (`revalidatePath`).

## Capabilities

### New Capabilities
- (None)

### Modified Capabilities
- `workout-template-management`: Ensure deletion requirement is fully functional in the UI.
- `workout-programs`: Ensure deletion requirement is fully functional in the UI.

## Impact

- **UI Components**: `WorkoutCard.tsx` and `ProgramCard.tsx` will be updated to handle user interactions and call server services.
- **UX**: Restores expected functionality for removing data, improving management of routines and programs.
