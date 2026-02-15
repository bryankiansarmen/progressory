# exercise-variations Specification

## Summary
The Exercise Variations Engine enables hierarchical movement organization, allowing users to treat groups of exercises as related "families" for swapping and analytics.

## Requirements

### Requirement: Exercise Family Scope
The system MUST identify all exercises sharing the same `parentId` or `id` (if parent) as a single family.

#### Scenario: Family Identification
- **GIVEN** "Squat" is a parent and "Goblet Squat" has `parentId` of "Squat"
- **WHEN** fetching the family for "Goblet Squat"
- **THEN** BOTH "Squat" and "Goblet Squat" MUST be returned.

### Requirement: Mid-Workout Variation Swapping
Users MUST be able to swap an exercise in an active session for any other exercise in the SAME family.

#### Scenario: Swapping Exercises
- **GIVEN** an active session with "Bench Press"
- **WHEN** the user selects "Swap for Variation"
- **THEN** they MUST see "Dumbbell Bench Press" and "Incline Bench Press" (if linked) as options.
- **AND** the session log MUST update to the new exercise without deleting already completed sets.

### Requirement: Hierarchical Browsing
The Exercise Library MUST visually group variations under their parent movement.

#### Scenario: Tree View
- **GIVEN** the Exercise Library page
- **WHEN** viewing a parent exercise
- **THEN** its variations SHOULD be visible in a nested list (e.g., an accordion).
