## Context

The application currently manages workouts as individual templates. Users have no way to organize these templates into a larger training schedule (a "Program"). This design introduces a hierarchical layer above workout templates to support structured training cycles.

## Goals / Non-Goals

**Goals:**
- Implement a `Program` model that can contain multiple `Workout` templates.
- Support a "sequence-based" schedule (Day 1, Day 2, etc.) rather than fixed calendar dates.
- Enable users to track progress through a program.
- Surface "Next Up" workouts and overall program progress on the dashboard.

**Non-Goals:**
- Calendar-based scheduling (e.g., "Every Monday at 9 AM").
- Shared/Public program marketplace (personal use focus for now).
- Automated weight/rep progression rules (to be handled in a future "Smart Templates" change).

## Decisions

### 1. Data Model: Many-to-Many via Join Table
- **Decision**: Use a `ProgramDay` join table to link `Program` and `Workout` templates.
- **Rationale**: This allows the same `Workout` template (e.g., "Leg Day") to be used multiple times within the same program or across different programs without duplication.
- **Alternatives**: 
  - **Option A (One-to-Many)**: Hard-coding workouts to one program. Rejected because it limits template reuse.

### 2. "Active Program" State
- **Decision**: Add an `isActive` boolean flag to the `Program` model.
- **Rationale**: Simplifies dashboard queries. A user can only have one active program at a time. Enrollment involves toggling this flag and clearing it on others for the same user.
- **Alternatives**:
  - **User-level field**: Adding `activeProgramId` to the `User` model. Rejected to keep the `Program` model self-contained and avoid frequent schema updates to the `User` model.

### 3. Progress Tracking Mechanism
- **Decision**: Calculate progress dynamically by comparing completed `WorkoutLog` entries that are linked to a `ProgramDay` against the total days in the program.
- **Rationale**: Avoids maintaining a separate "completion" state table which could get out of sync.
- **Implementation**: `WorkoutLog` will gain an optional `programDayId` field.

## Risks / Trade-offs

- **[Risk] Sequence Complexity** → Users might skip days or do them out of order.
  - **Mitigation**: The "Next Up" logic will suggest the first incomplete day in the sequence, but allow the user to manually select any day from the program view.
- **[Risk] Template Deletion** → Deleting a `Workout` template that is part of a `Program`.
  - **Mitigation**: Implement `onDelete: Cascade` or prevent deletion if the template is part of an active program. (Decision: Cascade for now to keep it simple).

## Migration Plan

1. **Schema Update**: Add `Program` and `ProgramDay` models to `schema.prisma`. Add `programDayId` to `WorkoutLog`.
2. **Service Layer**: Implement `ProgramService` with CRUD and enrollment methods.
3. **UI - Program Management**: Create `/programs` and `/programs/new` pages.
4. **UI - Dashboard**: Update `QuickActions` and add a `ProgramProgress` component.
