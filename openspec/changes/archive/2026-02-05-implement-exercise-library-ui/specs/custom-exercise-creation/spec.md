# Spec: Custom Exercise Creation

## ADDED Requirements

### Requirement: Creation Form
The system SHALL provide a form to create a new custom exercise.

#### Scenario: Successful Creation
- **WHEN** the user submits the form with valid `name`, `category`, and `muscleGroup`
- **THEN** the system SHALL call the `createCustomExercise` service
- **AND** the new exercise SHALL appear in the library

### Requirement: Validation
The system SHALL validate that `name`, `category`, and `muscleGroup` are provided before submission.

#### Scenario: Empty Name
- **WHEN** the user attempts to submit the form without a name
- **THEN** the system SHALL display a validation error
- **AND** SHALL NOT call the service
