## 1. Service Layer Improvements

- [x] 1.1 Implement `updateProgram` in `services/program.service.ts` using a Prisma transaction.
- [x] 1.2 Implement the "Smart Sync" logic to diff and update `ProgramDay` records without orphaning logs.
- [x] 1.3 Add error handling for cases where a user attempts to delete a day that has active workout logs.

## 2. Component Refactoring

- [x] 2.1 Refactor `components/program/ProgramBuilder.tsx` to accept `initialData` as a prop.
- [x] 2.2 Update `ProgramBuilder` state initialization to handle existing program data.
- [x] 2.3 Modify the `handleSave` function in `ProgramBuilder` to call `updateProgram` when an ID is present.

## 3. UI and Routing

- [x] 3.1 Create the edit route at `app/programs/[id]/edit/page.tsx`.
- [x] 3.2 Implement server-side fetching of program data for the edit page.
- [x] 3.3 Add "Edit" button to `app/programs/[id]/page.tsx` (Program Details view).
- [x] 3.4 Add "Edit" action to `components/program/ProgramCard.tsx` (Program Library view).

## 4. Verification

- [x] 4.1 Verify that updating a program's name and description works correctly.
- [x] 4.2 Verify that reordering days in an existing program preserves workout logs.
- [x] 4.3 Verify that adding and removing days from an existing program works as expected.
