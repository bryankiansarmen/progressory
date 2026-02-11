## ADDED Requirements

### Requirement: Rest Day Support
The training program system SHALL support explicit "Rest Days" in the schedule sequence.

#### Scenario: Adding a rest day
- **WHEN** the user selects "Rest Day" for a program day
- **THEN** the system SHALL allow saving the program with that day marked as a rest period (no linked workout template)
- **AND** the UI SHALL visually distinguish the rest day from workout days.
