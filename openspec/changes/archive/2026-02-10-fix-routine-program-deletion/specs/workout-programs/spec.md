## ADDED Requirements

### Requirement: Delete Program
The system SHALL allow users to delete their training programs with a confirmation step.

#### Scenario: Deletion Flow
- **WHEN** the user clicks "Delete" on a program card
- **AND** they confirm the action in the browser dialog
- **THEN** the system SHALL call the `deleteProgram` action
- **AND** the UI SHALL show a loading state on the button
- **AND** the program SHALL be removed from the view upon success.
