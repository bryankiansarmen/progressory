## ADDED Requirements

### Requirement: Dynamic Trend Visibility
The dashboard's "Weekly Volume" card must display the computed trend instead of hardcoded data.

#### Scenario: Positive Trend
- **WHEN** the trend is +15%
- **THEN** the UI should show a green "▲ 15% Effort" badge

#### Scenario: Negative Trend
- **WHEN** the trend is -5%
- **THEN** the UI should show a red "▼ 5% Effort" badge

#### Scenario: No Trend Available
- **WHEN** no previous week data exists
- **THEN** the trend badge should be hidden or show "New"
