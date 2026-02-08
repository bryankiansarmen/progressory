## Why

Workout routines are currently standalone templates, making it difficult for users to follow structured training cycles or multi-week programs. This change introduces a higher-level "Program" entity to organize workouts into sequences, enabling macro-level training management and better progress tracking over time.

## What Changes

- **New Data Models**: Introduction of `Program` and `ProgramDay` entities to the database schema.
- **Program Management**: Ability to create, view, and enroll in training programs.
- **Active Program Tracking**: Support for an "Active Program" state, guiding users through their next scheduled workout.
- **Enhanced Dashboard**: Integration of program progress and "Next Up" workouts on the main dashboard.
- **Program Library**: A new view at `/programs` to manage and browse structured training plans.

## Capabilities

### New Capabilities
- `workout-programs`: Management of training programs, including creation, scheduling (days/weeks), and enrollment.

### Modified Capabilities
- `workout-logic`: Enable starting workout sessions from a program schedule rather than just standalone templates.
- `dashboard-stats-aggregation`: Include program completion metrics and "Next Up" guidance in the dashboard statistics.

## Impact

- `prisma/schema.prisma`: Add `Program` and `ProgramDay` models.
- `services/workout.service.ts`: Add methods for program CRUD and enrollment logic.
- `app/workouts/page.tsx`: Update to distinguish between standalone templates and program-linked routines.
- `components/dashboard/QuickActions.tsx`: Add "Resume Program" or "Next Program Workout" action.
- `types/index.ts`: Add TypeScript definitions for Program entities.
