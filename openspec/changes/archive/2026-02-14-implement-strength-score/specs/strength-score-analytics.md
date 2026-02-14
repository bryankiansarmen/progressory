# strength-score-analytics Specification

## Summary
Specify the logic and requirements for the dynamic Strength Score and 1RM tracking.

## Requirements

### Requirement: 1RM Estimation (Brzycki)
The system MUST calculate the estimated One-Rep Max for every logged set.

#### Scenario: 1RM Calculation Logic
- **GIVEN** a performed set with `weight` W and `reps` R
- **WHEN** R is between 1 and 12 (inclusive)
- **THEN** the estimated 1RM is calculated as: `W * (36 / (37 - R))`
- **ELSE** if R > 12, the 1RM estimation SHOULD be ignored for strength scoring purposes.

### Requirement: Exercise PR (Best 1RM)
The system MUST identify the highest estimated 1RM for a specific exercise over all historical logs.

#### Scenario: Finding the Max 1RM
- **WHEN** querying for an exercise's PR
- **THEN** it MUST return the single highest value calculated from the Brzycki formula across all user sessions.

### Requirement: Strength Score Calculation
The system MUST provide a cumulative metric representing the user's total strength.

#### Scenario: Aggregate Score
- **WHEN** requested for a user
- **THEN** it MUST identify the 4 "Core Lifts" (Squat, Deadlift, Bench, OHP)
- **AND** for each, retrieve the current Max 1RM
- **AND** return the sum of these 4 values as the "Strength Score".
- **AND** if an exercise has no logged history, its contribution is `0`.
