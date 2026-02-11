## ADDED Requirements

### Requirement: Edit Program Lifecycle
The system SHALL support the full lifecycle of a training program, allowing it to be updated after initial creation.

#### Scenario: Editing an existing program
- **WHEN** a user navigates to the Edit route for a program
- **THEN** the system SHALL load the existing program data into the `ProgramBuilder`
- **AND** allowing the user to save changes to the existing record instead of creating a new one.
