# Spec: Database Schema (Refinement)

## MODIFIED Requirements

### Requirement: WorkoutLog Model
The system MUST store completed workout sessions.

#### Scenario: Log Fields
- **WHEN** a workout is logged
- **THEN** it MUST have `id`, `userId`, `workoutId`, `date`, `duration`
- **AND** it MUST have a relation to `WorkoutLogEntry` records (normalized structure)

## ADDED Requirements

### Requirement: WorkoutLogEntry Model
The system MUST store the exercise-specific portion of a workout log.

#### Scenario: Entry Fields
- **WHEN** an exercise is logged within a workout
- **THEN** it MUST link a `WorkoutLog` to an `Exercise`
- **AND** it MUST contain multiple `Set` records

### Requirement: Set Model
The system MUST store individual performance data.

#### Scenario: Set Fields
- **WHEN** a set is performed
- **THEN** it MUST have `weight`, `reps`, and `isDone` status
- **AND** it MUST link back to a `WorkoutLogEntry`
