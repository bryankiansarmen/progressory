## 1. Setup

- [x] 1.1 Install dependencies: `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`.

## 2. Workout Builder Implementation

- [x] 2.1 Integrate `DndContext` and `SortableContext` into `WorkoutBuilderContainer.tsx`.
- [x] 2.2 Refactor exercise list item in `WorkoutBuilderContainer` to use `useSortable` hook.
- [x] 2.3 Add `GripVertical` icon as a drag handle to the exercise list item.
- [x] 2.4 Implement `handleDragEnd` using `arrayMove` to update `selectedExercises` state.
- [x] 2.5 Remove legacy up/down reordering buttons from the UI.

## 3. Program Builder Implementation

- [x] 3.1 Integrate `DndContext` and `SortableContext` into `ProgramBuilder.tsx`.
- [x] 3.2 Refactor program day list item in `ProgramBuilder` to use `useSortable` hook.
- [x] 3.3 Add `GripVertical` icon as a drag handle to the program day card.
- [x] 3.4 Implement `handleDragEnd` using `arrayMove` to update `days` state.
