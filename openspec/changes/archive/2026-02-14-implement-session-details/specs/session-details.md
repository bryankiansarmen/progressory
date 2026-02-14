# session-details Specification

## Summary
Define requirements for the granular drill-down view of historical workout logs, ensuring data integrity and navigational ease.

## Requirements

### Requirement: Meta-Data Summary
The Session Detail page MUST display a high-level summary of the workout at the top of the page.

#### Scenario: View Session Header
- **GIVEN** a user opens a session detail page for a completed Squat day
- **THEN** the header MUST display the workout name ("Squat Day")
- **AND** the date (e.g., "Monday, Oct 14")
- **AND** the total volume (e.g., "1,200 KG")
- **AND** the session duration (e.g., "45 MIN").

### Requirement: Exercise Log Breakdown
The system MUST display a list of all exercises performed during the session, with a detailed breakdown of sets.

#### Scenario: Detailed Set List
- **GIVEN** a session with "Bench Press" (3 sets) and "Pushups" (2 sets)
- **WHEN** the user views the session details
- **THEN** both exercises MUST be listed as distinct cards
- **AND** each card MUST show a table of sets including weight and reps for each.

### Requirement: Navigation Linkage
The system MUST provide an intuitive way to enter the detail view from the history feed and exit back to the feed.

#### Scenario: Navigation Loop
- **WHEN** viewing the History Feed
- **THEN** clicking a session card MUST navigate the user to `/history/[logId]`
- **AND** on the detail page, a "Back to History" button MUST be visible and functional.
