## 1. Schema and Types

- [x] 1.1 Update `ProgramDay` model in `schema.prisma` to make `workoutId` optional
- [x] 1.2 Run `npx prisma migrate dev` to apply schema changes
- [x] 1.3 Update `ProgramDay` interface in `types/index.ts` to reflect optional `workoutId`

## 2. Infrastructure & Data Fetching

- [x] 2.1 Update `getWorkouts` or relevant service/page logic to include exercises for metadata derivation
- [x] 2.2 Create a utility function to derive primary muscle groups from a list of exercises

## 3. UI Components

- [x] 3.1 Create `WorkoutPicker` component with search and metadata display
- [x] 3.2 Implement "Rest Day" selection logic in `WorkoutPicker`
- [x] 3.3 Refactor `SortableProgramDay` to use `WorkoutPicker` instead of `<select>`
- [x] 3.4 Update `SortableProgramDay` to display workout summary (exercises, muscle groups)

## 4. Program Builder Integration

- [x] 4.1 Update `ProgramBuilder` to handle null `workoutId` (Rest Day) during save
- [x] 4.2 Update `ProgramBuilder` to handle enriched workout data
- [x] 4.3 Style the "Rest Day" card variant in the schedule list

## 5. Verification

- [ ] 5.1 Verify creating a program with a mix of workouts and rest days
- [ ] 5.2 Verify editing a program maintains rest day status
- [ ] 5.3 Verify workout picker search and metadata display
