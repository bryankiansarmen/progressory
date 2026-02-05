# Spec: Exercise Browsing

## ADDED Requirements

### Requirement: Search Functionality
The system SHALL allowing users to filter the exercise list by name using a search input.

#### Scenario: Name Filtering
- **WHEN** the user types "bench" in the search box
- **THEN** only exercises with "bench" in their name SHALL be displayed

### Requirement: Categorical Filtering
The system SHALL allow users to filter exercises by Category (e.g., Strength, Cardio) and Muscle Group.

#### Scenario: Muscle Group Filtering
- **WHEN** the user selects "Chest" from the muscle group filter
- **THEN** only exercises targeted at the chest SHALL be displayed

### Requirement: Rich Visual Cards
Each exercise SHALL be displayed with its name, category, and muscle group clearly visible.

#### Scenario: Card Display
- **WHEN** the list is rendered
- **THEN** each card SHALL show `name`, `category`, and `muscleGroup`
- **AND** it SHALL indicate if it is a "Custom" exercise
