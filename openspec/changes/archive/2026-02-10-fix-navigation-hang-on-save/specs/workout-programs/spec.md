## MODIFIED Requirements

### Requirement: Create Workout Program
The system SHALL allow users to create a training program that groups workout templates into a structured sequence of days.

#### Scenario: Successful creation
- **WHEN** the user provides a name, description, and a list of `ProgramDay` entries (linking templates to specific days)
- **THEN** the system SHALL create a `Program` record and associate it with the user
- **AND** the system SHALL revalidate the `/programs` path on the server.

### Requirement: Enroll in Program
The system SHALL allow a user to set one program as "Active".

#### Scenario: Set active program
- **WHEN** the user selects "Start Program" on a specific program
- **THEN** the system SHALL set that program's `isActive` flag to true
- **AND** mark any other active program for that user as inactive
- **AND** the system SHALL revalidate the `/programs` path on the server.
