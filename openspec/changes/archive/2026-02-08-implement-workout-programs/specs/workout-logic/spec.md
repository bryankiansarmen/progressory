## ADDED Requirements

### Requirement: Start Workout from Program Schedule
The system SHALL support initializing a `WorkoutLog` directly from a specific day in an active program.

#### Scenario: Start Program Workout
- **WHEN** the user selects "Start" on the next scheduled day of an active program
- **THEN** the system SHALL create a `WorkoutLog` record associated with that `Program`
- **AND** populate it with entries from the template assigned to that program day.
