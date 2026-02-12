## MODIFIED Requirements

### Requirement: Delete Template
The system SHALL allow users to delete their workout templates using the unified confirmation system.

#### Scenario: Deletion
- **WHEN** the user clicks "Delete" on a workout card
- **THEN** the system SHALL display a confirmation modal
- **WHEN** the user confirms the action in the modal
- **THEN** the system SHALL call the `deleteWorkout` action
- **AND** the UI SHALL show a loading state on the button
- **AND** the template SHALL be removed from the view upon success.
- **AND** the system SHALL revalidate the `/workouts` path on the server.
