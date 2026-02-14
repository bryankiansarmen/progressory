# dashboard-analytics Delta Specification

## Summary
Update the dashboard to display the dynamic Strength Score instead of the hardcoded placeholder.

## Requirements

### Requirement: Dynamic Strength Score Display
The dashboard SHALL show the real-time calculated Strength Score.

#### Scenario: Dashboard Refresh
- **WHEN** the dashboard page is loaded
- **THEN** it SHALL call the analytics engine to compute the current Strength Score
- **AND** replace the hardcoded "248 Pts" with the calculated value.

### Requirement: Consistency & PR Feed
The dashboard SHALL remain consistent with the new PR logic.

#### Scenario: Recent PR List
- **WHEN** displaying the Hall of Fame
- **THEN** the values shown MUST correspond to the highest 1RM-equivalent for that exercise.
