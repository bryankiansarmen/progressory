## MODIFIED Requirements

### Requirement: Archiving Custom Exercises
The system SHALL allow users to archive exercises they have created, requiring confirmation to prevent accidental data modification.

#### Scenario: Successful Archiving
- **WHEN** a user selects "Archive" for an exercise they own
- **THEN** a confirmation modal SHALL appear with a warning
- **WHEN** the user confirms the action
- **THEN** the exercise SHALL be marked as archived
- **AND** it SHALL no longer appear in the active exercise library
