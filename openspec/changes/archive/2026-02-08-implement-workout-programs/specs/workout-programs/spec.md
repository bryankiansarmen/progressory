## ADDED Requirements

### Requirement: Create Workout Program
The system SHALL allow users to create a training program that groups workout templates into a structured sequence of days.

#### Scenario: Successful creation
- **WHEN** the user provides a name, description, and a list of `ProgramDay` entries (linking templates to specific days)
- **THEN** the system SHALL create a `Program` record and associate it with the user.

### Requirement: View Program Library
The system SHALL provide a view at `/programs` that lists all created programs for the user.

#### Scenario: List programs
- **WHEN** the user navigates to `/programs`
- **THEN** they SHALL see a list of all their training programs with their names and descriptions.

### Requirement: Enroll in Program
The system SHALL allow a user to set one program as "Active".

#### Scenario: Set active program
- **WHEN** the user selects "Start Program" on a specific program
- **THEN** the system SHALL set that program's `isActive` flag to true
- **AND** mark any other active program for that user as inactive.

### Requirement: Program Progress Tracking
The system SHALL track the user's progress through the active program's sequence.

#### Scenario: Progress update
- **WHEN** the user completes a workout session that is linked to a program day
- **THEN** the system SHALL calculate the completion percentage for that program.
