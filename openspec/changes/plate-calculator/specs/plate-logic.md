# ADDED Requirements

### Requirement: Barbell Plate Calculation Logic
The system MUST accurately calculate the smallest number of standard plates required to reach a target weight given a specific barbell weight.

#### Scenario: Basic Plate Math
- **WHEN** a target weight is provided (e.g., 100kg) and a bar weight is set (e.g., 20kg)
- **THEN** the system MUST subtract the bar weight from the total (80kg)
- **AND** it MUST divide the remainder by 2 to find the weight per side (40kg)
- **AND** it MUST determine the optimal combination of standard plates (e.g., 2x20kg) for that side weight.

### Requirement: Standard Plate Denominations
The system MUST support standard plate increments for both Metric and Imperial systems.

#### Scenario: Unit Support
- **WHEN** units are Metric (kg)
- **THEN** it MUST use denominations: 25, 20, 15, 10, 5, 2.5, 1.25.
- **WHEN** units are Imperial (lbs)
- **THEN** it MUST use denominations: 55, 45, 35, 25, 10, 5, 2.5.

### Requirement: Interactive UI Trigger
The system MUST provide an intuitive way to access the calculator from the workout logging interface.

#### Scenario: Feature Accessibility
- **WHEN** logging a set in `WorkoutPlayerContainer`
- **THEN** it MUST display a "Plate" icon button next to the weight input.
- **AND** tapping this button MUST open a Popover displaying the necessary plates for the weight currently entered in the input.
- **AND** the Popover MUST allow users to toggle the bar weight between standard sizes (20kg/45lbs or 15kg/33lbs).
