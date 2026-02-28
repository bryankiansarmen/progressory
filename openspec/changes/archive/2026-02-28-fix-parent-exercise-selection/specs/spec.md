# Specs: Parent Exercise Selection

This document defines the requirements and scenarios for the parent exercise selection fix.

## ADDED Requirements

### Requirement: Selectable Parent Exercises
All exercises, including those with child variations, must be selectable by the user.

#### Scenario: Selection of base movement
- **WHEN** the user searches for "Bench Press"
- **THEN** the core "Bench Press" entry should show a `+` button and be selectable.
- **AND** clicking the "Bench Press" entry should add it to the routine.

### Requirement: Dedicated Expansion Toggle
Expansion of variations must be triggered by a specific UI element, not the entire row.

#### Scenario: Toggling variations without selecting parent
- **WHEN** the user clicks the chevron next to "Barbell Shrug"
- **THEN** the list of variations (Dumbbell Shrug, etc.) should toggle visibility.
- **AND** the "Barbell Shrug" parent should NOT be automatically selected.

### Requirement: Consistent Multi-select Behavior
In multi-select mode, parents should behave exactly like variations.

#### Scenario: Batch selection of parent and variations
- **WHEN** in multi-select mode
- **THEN** the user should be able to check the checkbox for "Deadlift" (parent) AND "Sumo Deadlift" (variation).
- **AND** both should appear in the "Add Selected" count.
