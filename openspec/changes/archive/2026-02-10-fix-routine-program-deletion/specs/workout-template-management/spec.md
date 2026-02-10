## MODIFIED Requirements

### Requirement: Delete Template
The system SHALL allow users to delete their workout templates with a confirmation step.

#### Scenario: Deletion
- **WHEN** the user clicks "Delete" on a workout card
- **AND** they confirm the action in the browser dialog
- **THEN** the system SHALL call the `deleteWorkout` action
- **AND** the UI SHALL show a loading state on the button
- **AND** the template SHALL be removed from the view upon success.
