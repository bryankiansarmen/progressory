# Design: Exercise Variations Engine

## Context
Exercises are linked via `parentId`. We need to use this relationship to power both mid-workout logic (swapping) and long-term analytics (family trends).

## Goals
- Allow users to pivot their training on-the-fly without losing data continuity.
- Provide a "Family Tree" view of performance.
- Ensure 1RM estimations can be intelligently suggested across a movement family.

## Decisions

### 1. The "Family" Definition
A movement family is defined as a parent exercise and all its immediate children (`parentId === parent.id`). We will not support multi-level deep nesting for simplicity in the first iteration.

### 2. Variation-Aware 1RM (Progression Logic)
When suggesting weights for a new variation, the system will use a **Multiplication Factor** (defined optionally in the `Exercise` model or defaulted to a safe value) relative to the Parent's 1RM.
- Example: *Front Squat* 1RM ≈ 80% of *Back Squat* 1RM.

### 3. Swapping State (Workout Player)
The `WorkoutPlayerContainer` state will be updated to support replacing an `exerciseId` in an active session log entry while preserving the `sets` recorded thus far (with a confirmation prompt if weights are likely to differ significantly).

### 4. Hierarchy Visualization
The Exercise Library will move from a flat list to an expandable tree structure.

## Risks / Trade-offs
- **Complexity of Data Fetching**: Recursive queries (finding all siblings/parents) can be slow. We will optimize by fetching the "Family ID" (the root parent's ID) as a primary reference.
- **Weight Accuracy**: Movement factors are subjective. Users will always have the final say on suggested weights.
