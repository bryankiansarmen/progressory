# Design: Hierarchical Exercise Library

## Context
Improve organization by nesting specific equipment variations under common base movements.

## Decisions

### Decision 1: Self-Referencing Schema
An exercise can optionally have a `parentId`.
- **Top-level**: `parentId` is null. Represents a "General Movement" (e.g., Shoulder Press).
- **Variation**: `parentId` points to a top-level movement. Represents a specific tool (e.g., Dumbbell Shoulder Press).

### Decision 2: Grouped UI Interaction
The `ExercisePicker` will use an Accordion-style or nested list approach.
- Clicking a movement expands its variations.
- If a movement has no variations, it acts as a single selectable item.

## Component Hierarchy
```
ExercisePicker
└── ExerciseGroup (Movement)
    ├── VariationItem (Barbell)
    ├── VariationItem (Dumbbell)
    └── VariationItem (Machine)
```

## Migration Strategy
1. Modify schema.
2. Identify common suffixes/prefixes (e.g., "Dumbbell", "Barbell") and strip them to create parent movements.
3. Link existing variations to new parents.
```
