## Why

When lifting heavy weights on a barbell, especially when fatigue sets in, performing the mental math to figure out which plates to load on each side can be error-prone and distracting. Providing a simple utility to calculate plate combinations directly in the workout player enhances the user experience and reduces cognitive load during meaningful training.

## What

Implement a Barbell Plate Calculator utility within the `WorkoutPlayerContainer`. This feature will allow users to tap a "Plate" icon next to weight inputs to see exactly which plates (e.g., 20kg, 10kg, 5kg, etc.) should be added to each side of a standard 20kg (or 45lb) barbell to reach the target weight.

## Scope

**In-Scope:**
- A "Plate" icon/button next to each weight input in `SetLoggingRow.tsx`.
- A small popover or modal that shows the plate breakdown (e.g., 2x20kg, 1x5kg per side).
- Configurable "Standard Barbell" weight (defaults to 20kg/45lbs).
- Support for both Metric (kg) and Imperial (lbs) units based on project constants.

**Out-of-Scope:**
- Customizing the available plate inventory (assume a standard gym set: 25, 20, 15, 10, 5, 2.5, 1.25).
- Persistent storage of bar weight per exercise (can be added in a future phase if needed).

## Impact

- **`SetLoggingRow.tsx`**: UI addition of the calculator button.
- **`PlateCalculator`**: A new utility component/hook to handle the math and visualization.
- **`WorkoutPlayerContainer.tsx`**: Integration point for the calculator.
