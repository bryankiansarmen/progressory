# Workout Log - Session Experience Upgrade

## New Requirements

### Requirement: History Context
#### Scenario: Logging a set with previous history
- **GIVEN** a user is logging a set for an exercise
- **AND** they have performed this exercise in a previous workout
- **WHEN** the set row is displayed
- **THEN** the "reps" and "weight" from the most recent completed log for that exercise should be visible as a hint (e.g., "Last: 100kg x 5")

#### Scenario: Logging a set without history
- **GIVEN** a user is logging a set for a new exercise
- **WHEN** the set row is displayed
- **THEN** no history hint should be shown

### Requirement: Audio Feedback
#### Scenario: Timer completion
- **GIVEN** a rest timer is running
- **WHEN** the timer reaches 0
- **THEN** a distinctive "beep" or "chime" sound should play

### Requirement: Haptic Feedback
#### Scenario: Set completion
- **GIVEN** a user taps the "check" button to mark a set as done
- **THEN** the device should vibrate briefly (e.g., 50ms)

#### Scenario: Timer completion
- **GIVEN** a rest timer reaches 0
- **THEN** the device should vibrate in a distinct pattern (e.g., 200ms, pause, 200ms)

### Requirement: Celebration
#### Scenario: Workout completion
- **GIVEN** the user completes a workout session
- **WHEN** the "Session Complete" summary modal appears
- **THEN** a confetti animation should play on the screen
