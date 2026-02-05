# Spec: Workout Logic

## ADDED Requirements

### Requirement: Log Set Performance
The system MUST allow users to log individual sets with weight and reps.

#### Scenario: Successful Set Logging
- **WHEN** the `completeSet` service function is called with `setId`, `weight`, and `reps`
- **THEN** the system MUST update the corresponding `Set` record
- **AND** set `isDone` to `true`

### Requirement: Start Workout from Template
The system MUST be able to initialize a new `WorkoutLog` based on a predefined `Workout` template.

#### Scenario: Initialize Session
- **WHEN** a user starts a workout
- **THEN** the system MUST create a `WorkoutLog` record
- **AND** it MUST create `WorkoutLogEntry` records for each exercise in the template

### Requirement: Exercise History Retrieval
The system MUST be able to fetch the most recent performance data for a specific exercise for a user.

#### Scenario: Fetch Last Performance
- **WHEN** a user begins an exercise in a session
- **THEN** the system MUST provide the `weight` and `reps` from the most recent completed `Set` for that exercise
