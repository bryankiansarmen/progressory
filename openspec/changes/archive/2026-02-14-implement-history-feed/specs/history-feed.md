# history-feed Specification

## Summary
Define the requirements for the Training History Feed, focusing on data presentation and chronological integrity.

## Requirements

### Requirement: Reverse Chronological Ordering
The system MUST display training logs with the most recent entries appearing first in the list.

#### Scenario: Most Recent First
- **GIVEN** a user has logs on "2024-02-01" and "2024-02-05"
- **WHEN** the user views the History page
- **THEN** the entry for "2024-02-05" MUST appear above "2024-02-01".

### Requirement: Session metadata
Each log entry MUST display the high-level metrics calculated from the session.

#### Scenario: Metadata Display
- **WHEN** viewing a log entry
- **THEN** it SHOULD show the total weight lifted (Weight * Reps across all sets)
- **AND** it SHOULD show the name of the workout template used.
- **AND** it SHOULD show the total duration in minutes.

### Requirement: No History State
The system MUST provide a helpful empty state when the user has not yet completed any sessions.

#### Scenario: Empty History
- **WHEN** a user with 0 completed logs views the history page
- **THEN** a "Get Started" call-to-action SHOULD be displayed.
