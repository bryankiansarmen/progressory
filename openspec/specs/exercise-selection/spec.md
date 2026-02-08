# exercise-selection Specification

## Purpose
TBD - created by archiving change implement-workout-builder. Update Purpose after archive.
## Requirements
### Requirement: Contextual Exercise Picker
The system SHALL provide a searchable picker/modal within the Workout Builder to select exercises from the library. This picker MUST support server-side pagination and search to handle large datasets efficiently.

#### Scenario: Searching for an exercise
- **WHEN** the user types "Bench" into the search input
- **THEN** the system SHALL fetch exercises matching "Bench" from the server
- **AND** update the list display with the results.

#### Scenario: Scrolling for more exercises
- **WHEN** the user reaches the bottom of the exercise list in the picker
- **AND** more exercises are available on the server
- **THEN** the system SHALL fetch the next page of exercises
- **AND** append them to the list.

#### Scenario: Adding Exercise
- **WHEN** the user clicks on an exercise in the picker
- **THEN** that exercise SHALL be added to the current workout template's exercise list.

### Requirement: Reordering
The system SHALL allow users to reorder exercises within a template.

#### Scenario: Change Order
- **WHEN** the user drags an exercise to a new position
- **THEN** the `order` property SHALL be updated to reflect the new sequence.

