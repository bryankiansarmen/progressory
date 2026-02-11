## Why

Currently, training programs are immutable once created. Users cannot refine their routines, fix mistakes, or adjust their schedule without deleting and recreating the entire program, which results in a poor user experience and potential data fragmentation.

## What Changes

- **Program Editing**: Users can now modify the name, description, and the sequence/content of workouts within a program.
- **Smart Syncing**: Implementation of a non-destructive update strategy in the service layer that preserves existing workout logs even when program days are reordered or updated.
- **Management UI**: Addition of "Edit" and "Delete" entry points in the program detail view and library.
- **Refactored Builder**: The `ProgramBuilder` component will be updated to support both creation and editing modes.

## Capabilities

### New Capabilities
- `program-modification`: High-level capability for modifying and deleting existing training programs.

### Modified Capabilities
- `workout-programs`: Update the existing program specification to include lifecycle management (Edit/Delete).

## Impact

- **Service Layer**: `services/program.service.ts` will require a new `updateProgram` method using Prisma transactions.
- **Components**: `components/program/ProgramBuilder.tsx` will be refactored to accept optional initial data.
- **Routing**: Addition of `app/programs/[id]/edit/page.tsx`.
- **UI/UX**: `app/programs/[id]/page.tsx` and `components/program/ProgramCard.tsx` will be updated with management actions.
