## Context

The application allows users to create workout templates and training programs. While the UI provides a delete button (trash icon) on the cards for these entities, clicking them currently has no effect because the `onDelete` handler is either not passed down from the parent or not implemented within the card components themselves. We have existing server actions (`deleteWorkout` and `deleteProgram`) that handle the database operations and revalidation.

## Goals / Non-Goals

**Goals:**
- Connect the existing delete buttons to their respective server actions.
- Provide immediate feedback to the user via a confirmation dialog.
- Show a loading state during the deletion process to prevent multiple clicks and improve UX.
- Leverage server-side revalidation to automatically update the list after deletion.

**Non-Goals:**
- Creating a custom modal for confirmation (using native `window.confirm` for simplicity).
- Batch deletion.

## Decisions

### 1. Direct Server Action Calls from Client Components
We will import and call the server actions (`deleteWorkout`, `deleteProgram`) directly within the `WorkoutCard` and `ProgramCard` components.
- **Rationale**: Since these are client components that already handle user interactions, calling the server actions directly is the most straightforward approach in Next.js 15.
- **Alternative**: Passing a handler from the parent page. **Rejected** because it adds unnecessary prop drilling for a self-contained action.

### 2. Native Confirmation
We will use `window.confirm()` before executing the deletion.
- **Rationale**: Provides a reliable, cross-platform confirmation mechanism without adding new UI complexity or dependencies.

### 3. Local Loading State
We will manage an `isDeleting` state within each card component.
- **Rationale**: Allows us to disable the button and potentially show a spinner/loading icon during the async server call, providing clear feedback to the user.

## Risks / Trade-offs

- **Risk**: Deletion is permanent and irreversible.
  - **Mitigation**: The confirmation dialog is a mandatory step before any action is taken.
- **Trade-off**: `window.confirm` is not styleable.
  - **Verdict**: Acceptable for the current phase of the project; a custom dialog can be implemented later if branding requirements change.
