 # Tasks: Fix Parent Exercise Selection

This document outlines the tasks required to implement the decoupled selection and expansion logic in the `ExercisePicker` component.

## 1. UI Component Updates

- [x] 1.1 Update `ExercisePicker.tsx` to always render the selection button (`Plus`/`Check`) even when `hasVariations` is true.
- [x] 1.2 Modify the `onClick` handler of the main exercise row to always trigger selection.
- [x] 1.3 Update the chevron icon to be an independent button that handles expansion without bubbling the selection event.
- [x] 1.4 Adjust CSS/Tailwind classes to ensure clear hover states and visual distinction between selection and expansion triggers.

## 2. Verification & Testing

- [x] 2.1 Verify that parent exercises can be selected in the "New Workout" template builder.
- [x] 2.2 Verify that parent exercises can be selected in the "New Program" builder.
- [x] 2.3 Verify that clicking the chevron still correctly expands/collapses variations without adding the exercise.
- [x] 2.4 Test multi-select mode to ensure parents and variations can be batch-added.
