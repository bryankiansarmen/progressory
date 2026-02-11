## Context

The current `ProgramBuilder` uses a native HTML `<select>` element for choosing workouts for each program day. This is visually inconsistent with the app's rich interactive UI and fails to provide users with necessary context (exercise counts, muscle groups) to build balanced training cycles. Additionally, there is no explicit way to mark a day as a "Rest Day" within the schedule.

## Goals / Non-Goals

**Goals:**
- Implement a rich `WorkoutPicker` component with search and metadata visibility.
- Enhance the `SortableProgramDay` UI to show workout summaries.
- Add support for explicit "Rest Days" in training programs.
- Ensure the UI has access to necessary workout details for rendering summaries.

**Non-Goals:**
- Building a full calendar view for programs.
- Real-time validation of program balance (e.g., "too much volume").

## Decisions

### 1. New `WorkoutPicker` Component
Instead of a simple dropdown, we will implement a popover-based picker.
- **Rationale**: Consistent with the `ExercisePicker` UX. Allows for search and detailed metadata (muscle groups, exercise count) that wouldn't fit in a standard `<select>`.
- **Implementation**: Uses a popover pattern. Props will include `onSelect` and `currentWorkoutId`.

### 2. Schema Change for "Rest Day" Support
The `ProgramDay` model's `workoutId` field will be made optional (`String?`).
- **Rationale**: A rest day is semantically a day without a workout. Making the relation optional is the most direct way to represent this in the database.
- **Alternative**: Using a specific "Rest" workout template for every user. This is cumbersome to manage and requires data seeding/maintenance for every user.

### 3. Data Enrichment in `ProgramBuilder`
The `workouts` array passed to `ProgramBuilder` will be enriched to include exercise relations.
- **Rationale**: To show muscle groups and exercise counts, the UI needs to know what's inside each workout template.
- **Implementation**: Update `getWorkouts` or the specific page fetching logic to include `exercises.exercise`.

### 4. Derived Muscle Group Summaries
Muscle groups for a workout will be derived on the fly or passed as a pre-calculated list.
- **Rationale**: Since workouts can change, deriving them ensures the UI is always accurate.

## Risks / Trade-offs

- **[Risk] Schema migration complexity** → **Mitigation**: Making a required field optional is a safe migration in SQLite/Prisma. Existing data will remain valid.
- **[Trade-off] Performance of enriched data** → **Rationale**: Training programs typically have a manageable number of workouts (rarely more than 20-30), so fetching the nested exercise data for these templates is negligible for performance.
