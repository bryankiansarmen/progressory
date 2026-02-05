# Spec: Database Schema

## ADDED Requirements

### Requirement: User Model
The system MUST store user information.

#### Scenario: User Fields
- **WHEN** a user is created
- **THEN** it MUST have `id`, `email` (unique), `name`, `createdAt`, `updatedAt`
- **AND** it MUST be able to have related `Workout`s and `WorkoutLog`s

### Requirement: Exercise Model
The system MUST store exercise definitions.

#### Scenario: Exercise Fields
- **WHEN** an exercise is defined
- **THEN** it MUST have `id`, `name`, `category`, `muscleGroup`
- **AND** it MAY have `equipment` and `userId` (for custom exercises)

### Requirement: Workout Model
The system MUST store workout templates/plans.

#### Scenario: Workout Fields
- **WHEN** a workout is created
- **THEN** it MUST have `id`, `name`, `userId`
- **AND** it MUST have a relation to `WorkoutLog`s

### Requirement: WorkoutLog Model
The system MUST store completed workout sessions.

#### Scenario: Log Fields
- **WHEN** a workout is logged
- **THEN** it MUST have `id`, `userId`, `workoutId`, `date`, `duration`
- **AND** it MUST store sets/reps data (details TBD, stored as relation or JSON)
