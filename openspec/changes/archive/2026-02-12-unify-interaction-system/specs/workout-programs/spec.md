## MODIFIED Requirements

### Requirement: Delete Program
The system SHALL allow users to delete their training programs using the unified confirmation system.

#### Scenario: Deletion Flow
- **WHEN** the user clicks "Delete" on a program card
- **THEN** the system SHALL display a confirmation modal
- **WHEN** the user confirms the action in the modal
- **THEN** the system SHALL call the `deleteProgram` action
- **AND** the UI SHALL show a loading state on the button
- **AND** the program SHALL be removed from the view upon success.
- **AND** the system SHALL revalidate the `/programs` path on the server.
