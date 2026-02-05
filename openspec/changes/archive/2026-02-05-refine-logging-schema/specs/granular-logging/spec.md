# Spec: Granular Logging

## ADDED Requirements

### Requirement: Independent Set Logging
The system SHALL support logging individual sets within a workout session.

#### Scenario: Adding a Set
- **WHEN** a user is logging an exercise
- **THEN** they MUST be able to add multiple sets with specific `weight` and `reps`

### Requirement: Set Completion Status
The system SHALL track whether an individual set has been completed.

#### Scenario: Marking a Set Complete
- **WHEN** a user taps the checkmark on a set row
- **THEN** the set MUST be marked as `isDone: true` in the database
- **AND** the UI should reflect the completed status

### Requirement: Historical Context
The system SHALL provide data from previous workouts for comparison.

#### Scenario: Viewing Last Weight/Reps
- **WHEN** a user views a set input for an exercise
- **THEN** the system MUST display the most recent weight and reps performed for that specific exercise
