## 1. Schema and Types

- [x] 1.1 Add `Program` and `ProgramDay` models to `prisma/schema.prisma`
- [x] 1.2 Add `programDayId` optional field to `WorkoutLog` model in `schema.prisma`
- [x] 1.3 Run `npx prisma migrate dev --name add_workout_programs` to apply schema changes
- [x] 1.4 Update `types/index.ts` to include `Program` and `ProgramDay` interfaces

## 2. Service Layer Implementation

- [x] 2.1 Create `services/program.service.ts` with CRUD operations for programs
- [x] 2.2 Implement `enrollInProgram(userId, programId)` logic to toggle `isActive` flags
- [x] 2.3 Implement `getProgramProgress(programId)` calculation logic
- [x] 2.4 Update `services/workout.service.ts` to support linking `WorkoutLog` to a `ProgramDay`
- [x] 2.5 Export new services from `services/index.ts`

## 3. Program Management UI

- [x] 3.1 Create `app/programs/page.tsx` (Program Library view)
- [x] 3.2 Create `components/program/ProgramCard.tsx` for the library list
- [x] 3.3 Create `app/programs/new/page.tsx` with a `ProgramBuilder` component
- [x] 3.4 Create `app/programs/[id]/page.tsx` for program details and day management

## 4. Dashboard and Navigation Integration

- [x] 4.1 Update `components/layout/Sidebar.tsx` and `BottomNav.tsx` to include "Programs"
- [x] 4.2 Create `components/dashboard/ActiveProgramCard.tsx` for dashboard progress
- [x] 4.3 Update `components/dashboard/QuickActions.tsx` to prioritize program workouts
- [x] 4.4 Update `app/page.tsx` (Home Dashboard) to fetch and display active program state
