# Design: Decoupled Exercise Selection and Expansion

This design outlines the changes to `ExercisePicker.tsx` to allow both exercise selection and variation expansion for hierarchical exercises.

## Goals

- Allow the user to select the parent exercise (e.g., "Bench Press") even if it has variations.
- Modernize the interaction pattern so that clicking the chevron handles expansion and clicking the row/selection button handles selection.

## Decisions

### 1. Unified Selection Button Visibility
The selection button (the circle containing a `Plus` or `Check` icon) will be visible for all exercise rows, regardless of whether they have children. 

### 2. Event Routing
- **Row Interaction**: Clicking the exercise name or any part of the row (excluding the chevron and multi-select area) will trigger the exercise selection logic.
- **Chevron Interaction**: A dedicated, stop-propagated button for the chevron icon will handle the `expandedId` toggling.

### 3. Visual Separation
We will ensure that the "folder" state (expanded) is visually distinct but still functionally selectable. The "Selected" state will take visual precedence over the "Expanded" state to provide clear feedback.

## Risks / Trade-offs

- **Click target size**: By shrinking the expansion trigger to just the chevron, we must ensure it remains accessible.
- **Selection Confusion**: Users might accidentally select a parent when they intend to expand. We will mitigate this with clear visual hover states and a small, dedicated chevron trigger.
