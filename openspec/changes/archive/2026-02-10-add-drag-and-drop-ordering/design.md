## Context

The current workout and program builders use static lists or arrow-based reordering, which is less intuitive for users managing multiple items. We need a modern drag-and-drop (DND) solution that is accessible, performant, and integrates well with our existing React/Next.js stack.

## Goals / Non-Goals

**Goals:**
- Provide a smooth, animated drag-and-drop experience for reordering exercises in the Workout Builder.
- Provide the same experience for reordering days in the Program Builder.
- Ensure the solution is accessible via keyboard and screen readers.
- Use a dedicated drag handle to prevent accidental drags during scrolling or selection.

**Non-Goals:**
- Implement drag-and-drop between different lists (e.g., from library to builder).
- Implement complex nesting (e.g., reordering sets within an exercise via DND in this phase).

## Decisions

### 1. Library Selection: @dnd-kit
We will use `@dnd-kit` over `react-beautiful-dnd` or `react-dnd`.
- **Rationale**: `@dnd-kit` is modern, modular, and optimized for performance. It has excellent support for hooks, which aligns with our functional component architecture. It also provides better out-of-the-box accessibility than most alternatives.

### 2. Implementation Pattern: SortableContext
We will utilize the `@dnd-kit/sortable` package to implement reorderable lists.
- **Why**: The `SortableContext` provides optimized strategies for list reordering (like `verticalListSortingStrategy`) and simplifies the logic for moving items in a state array.

### 3. Reusable Sortable Item Hook
Instead of creating a single "SortableCard" component, we will implement the `useSortable` hook within a wrapper or directly in the item components to maintain maximum flexibility for styling exercise cards vs. program day cards.
- **Why**: Exercise cards and program day cards have different layouts and internal actions. Using the hook directly allows us to attach the drag handle to the `GripVertical` icon specifically.

### 4. State Management: arrayMove
We will use the `arrayMove` utility from `@dnd-kit/sortable` within the `onDragEnd` handler to update the local state.
- **Why**: It handles the logic of removing and inserting items at the correct indices cleanly, reducing the risk of off-by-one errors.

## Risks / Trade-offs

- **Risk**: Touch interactions on mobile might conflict with page scrolling.
  - **Mitigation**: Using a dedicated drag handle (`GripVertical` icon) as the only activation point for the drag sensor will prevent accidental drags while scrolling.
- **Trade-off**: Adding `@dnd-kit` increases the bundle size.
  - **Mitigation**: We will only install the specific modules needed (`@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`) to minimize the impact.
