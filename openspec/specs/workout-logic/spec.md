# workout-logic Specification

## Purpose
TBD - created by archiving change implement-core-services. Update Purpose after archive.
## Requirements
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

### Requirement: Start Workout from Program Schedule
The system SHALL support initializing a `WorkoutLog` directly from a specific day in an active program.

#### Scenario: Start Program Workout
- **WHEN** the user selects "Start" on the next scheduled day of an active program
- **THEN** the system SHALL create a `WorkoutLog` record associated with that `Program`
- **AND** populate it with entries from the template assigned to that program day.

### Requirement: Barbell Plate Calculation Logic
The system MUST accurately calculate the smallest number of standard plates required to reach a target weight given a specific barbell weight.

#### Scenario: Basic Plate Math
- **WHEN** a target weight is provided (e.g., 100kg) and a bar weight is set (e.g., 20kg)
- **THEN** the system MUST determine the optimal combination of standard plates (e.g., 2x20kg per side) for both Metric and Imperial systems.
- **AND** it MUST allow users to toggle between standard bar weights (15kg, 20kg).

