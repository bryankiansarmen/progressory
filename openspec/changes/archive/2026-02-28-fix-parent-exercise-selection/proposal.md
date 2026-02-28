# Proposal: Allow Selection of Parent Exercises

Allow users to select parent exercises (e.g., "Bench Press") even when variations exist, instead of only allowing expansion.

## Problem

In the current exercise picker, exercises with variations are treated as non-selectable folder headers. Clicking a parent exercise only toggles the expansion of its variations list. This prevents users from selecting the base movement itself if they wish to perform the standard version.

## Goal

Decouple exercise selection from variation expansion in the `ExercisePicker` UI. Users should be able to select any exercise in the hierarchy while still being able to expand/collapse variations.

## Impact

- **Affected Components**: `components/exercise/ExercisePicker.tsx`
- **User Experience**: Improved flexibility in exercise selection; closer alignment with the data model where parents are valid exercises.
- **Data Integrity**: No changes to the database schema; better utilization of existing hierarchical data.

## Proposed Requirements

- [NEW] All exercises in the `ExercisePicker` must display a selection button (`+` or `Check`), regardless of whether they have children.
- [NEW] The chevron icon in the `ExercisePicker` must be the sole trigger for expanding/collapsing variations.
- [NEW] Clicking the name or the selection button of a parent exercise must trigger its selection, not its expansion.

## Impact

### Systems
- Frontend UI components (`ExercisePicker`)
- Exercise selection workflow in Workout/Program builders.

### Dependencies
- No new dependencies.
- No changes to existing service layer or database required.
