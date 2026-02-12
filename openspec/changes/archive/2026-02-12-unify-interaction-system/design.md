## Context

Currently, the application uses native `window.confirm` for critical actions like deletion or archiving and `alert()` for displaying errors. These methods are not styleable, block the browser thread, and create a jarring experience compared to the custom modals used in the workout session flow.

## Goals / Non-Goals

**Goals:**
- Centralize confirmation and alert logic using React Context.
- Provide a promise-based API (`await confirm()`) for cleaner component logic.
- Match the "Progressory" visual language (chunky borders, high blurs, bold typography).
- Ensure a single modal instance is reused globally.

**Non-Goals:**
- Building a complex multi-toast system (focused on high-stakes modal interactions first).
- Supporting custom HTML within confirmation messages (text-only for safety).

## Decisions

### 1. Context-Based Promise API
We will use a Context Provider that stores a "resolver" function in its state.
- **Rationale**: This allows us to call `confirm()` as an async function. When the user clicks a button, we resolve the promise with `true` or `false`, allowing for linear code flow in components.
- **Alternatives**: Using standard `isOpen` state in every component. *Rejected* because it leads to repetitive state management and DOM bloat.

### 2. Semantic Variants
The `confirm` function will accept a `variant` parameter (`destructive`, `warning`, `info`).
- **Rationale**: Different actions require different levels of visual urgency. Deleting a program should look more dangerous than archiving an exercise.

### 3. Portal-Based Rendering
The modal will be rendered via `createPortal` at the root level.
- **Rationale**: Ensures the modal always sits above other UI elements, including existing modals or builder overlays.

## Risks / Trade-offs

- **[Risk] Multiple calls to confirm() simultaneously** → **Mitigation**: The system will only handle one active confirmation at a time. New calls will be ignored or queued if the current one is active.
- **[Trade-off] Component weight** → **Mitigation**: The `InteractionProvider` will be a lightweight wrapper in the layout, and the modal component will only render when active.
