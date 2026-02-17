# Prediction Specification

## Purpose
Simplify workout logging by predicting intended weights/reps based on historical data and nudging the user towards progressive overload.

## Requirements

### Requirement: Session Pre-filling (Zero-State)
When starting a workout without an existing draft, the system SHALL populate the session with predicted values.

#### Scenario: First session of a rotation
- **GIVEN** a user has historically performed "Bench Press" at 100kg for 5 reps (Sets 1-3)
- **WHEN** the user starts a new session containing "Bench Press"
- **THEN** the session SHALL initialize with 3 sets of 100kg x 5 reps.

### Requirement: Progression Nudges (Goals)
The system SHALL display "Goal" indicators when a predicted increase in performance is recommended.

#### Scenario: Progressive Overload Recommendation
- **GIVEN** the user successfully completed all sets of "Squats" at 60kg in the last session
- **WHEN** the user views the current session
- **THEN** the system SHALL display a "Goal" badge recommending 62.5kg (base + default increment).

### Requirement: Hydration Precedence
Predicted data MUST NOT overwrite an active draft session.

#### Scenario: Resuming a draft
- **GIVEN** a draft session exists with 50kg logged
- **WHEN** the user resumes the session
- **THEN** the system SHALL load the 50kg draft
- **AND** MUST NOT apply predictive defaults.

### Requirement: One-Tap Completion
Users SHALL be able to mark a predicted set as "done" with a single interaction, accepting the prediction as the actual value.
