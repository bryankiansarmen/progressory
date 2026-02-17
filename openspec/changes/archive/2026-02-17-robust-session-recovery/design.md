# Design: Robust Session Recovery

## Context
Progressory currently stores active workout sessions in `localStorage`. If a user starts a different template, the current session is overwritten. If `localStorage` is cleared, the session is lost. There is no server-side backup for in-progress sessions.

## Objectives
- Prevent data loss during session context switches.
- Enable cross-device recovery for active sessions.
- Provide a clear UI for handling session conflicts.

## Proposed Design

### 1. Data Model Changes
**Prisma Schema**: Add a `DraftSession` model to store serialized session state.
```prisma
model DraftSession {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id])
  templateId String
  data      String   // JSON serialized ExerciseSession[]
  seconds   Int      // Current timer value
  activeExerciseIndex Int
  updatedAt DateTime @updatedAt
}
```

### 2. Service Layer
**Logging Service**: Add `syncDraftSession` and `getDraftSession` actions.
- `syncDraftSession`: Upserts a `DraftSession` for the user.
- `discardDraftSession`: Deletes the `DraftSession`.

### 3. Frontend Logic
**WorkoutPlayerContainer**:
- **On Mount**: Check both `localStorage` and server-side `DraftSession`. Introduce a "Context Resolver" step.
- **Heartbeat**: Every 30 seconds (or on set completion), trigger `syncDraftSession` Server Action.
- **Conflict UI**: If a mismatch is detected (different template or existing draft), show a `ConflictResolutionModal`.

## Risks / Trade-offs
- **DB Write Load**: Frequent heartbeats could increase load. Solution: Throttle heartbeats or only sync on significant changes (set completion, exercise addition).
- **Stale Data**: Server-side draft might conflict with `localStorage` if multiple tabs are open. Solution: Use `updatedAt` timestamps to favor the newer state.
