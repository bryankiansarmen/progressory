# Design: Core Services Layer

## Context
Following the refinement of the database schema, we need a robust service layer to handle business logic. This layer will abstract Prisma away from our React components.

## Goals / Non-Goals

**Goals:**
- Centralize all CRUD operations for Exercises, Workouts, and Logs.
- Provide a clear API for the "Checkmark" logging flow.
- Support fetching historical performance data for exercises.

**Non-Goals:**
- Implementing UI components (handled in future changes).
- Handling authentication logic (scoped to middleware/auth service later).

## Decisions

### Decision 1: Functional Service Pattern
We will use exported asynchronous functions instead of classes.
- **Rationale**: Simpler to use in Next.js Server Actions and standardizes the API.
- **Example**: `export const getExercises = async () => { ... }`.

### Decision 2: Service Organization
Services will be grouped by domain in the `services/` directory.

#### `exercise.service.ts`
- `getExercises()`: Fetch all exercises (library + custom).
- `createCustomExercise(data: CreateExerciseDTO)`: Add a new custom exercise for a user.

#### `workout.service.ts`
- `getWorkouts(userId: string)`: Fetch all workout templates for a user.
- `getWorkoutById(id: string)`: Get full template with exercise names.

#### `logging.service.ts`
- `startWorkout(userId: string, workoutId: string)`: Initialize a `WorkoutLog` with entries based on a template.
- `completeSet(setId: string, weight: number, reps: number)`: Update a `Set` record to `isDone: true`.
- `getLastPerformance(userId: string, exerciseId: string)`: Fetch the most recent completed set for an exercise.

### Decision 3: Use of DTOs and Shared Interfaces
All services will return types defined in `@/types/index.ts` to ensure consistency across the app.

## Risks / Trade-offs
- **Complexity**: Adding a layer increases the number of files.
- **Benefit**: Much cleaner Server Components and Actions; logic is easily testable in isolation.

## Folder Structure
```
services/
├── index.ts           (Barrel export)
├── exercise.service.ts
├── workout.service.ts
└── logging.service.ts
```
