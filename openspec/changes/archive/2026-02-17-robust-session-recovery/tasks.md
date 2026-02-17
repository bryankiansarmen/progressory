# Implementation Tasks: Robust Session Recovery

## 1. Database & Schema
- [x] 1.1 Add `DraftSession` model to `prisma/schema.prisma` with `userId`, `templateId`, `data` (JSON), and `seconds` fields.
- [x] 1.2 Run database migration to apply schema changes.

## 2. Service Layer Implementation
- [x] 2.1 Implement `syncDraftSession` Server Action in `logging.service.ts` to upsert session state.
- [x] 2.2 Implement `getDraftSession` Server Action to retrieve server-side recovery data.
- [x] 2.3 Implement `discardDraftSession` to clear the draft after workout completion or explicit abandonment.

## 3. UI Components
- [x] 3.1 Create `ConflictResolutionModal` to handle template mismatches and resume/discard decisions.
- [x] 3.2 Add "Sync Status" indicator to the `PlayerHeader` (e.g., "Saved to cloud").

## 4. Workout Player Orchestration
- [x] 4.1 Update `WorkoutPlayerContainer` to check for drafts on mount (merging `localStorage` with server-side data).
- [x] 4.2 Implement the "Heartbeat" effect to trigger `syncDraftSession` every 30s or on set completion.
- [x] 4.3 Integrate `ConflictResolutionModal` to gate-start the workout session if a conflict exists.

## 5. Verification
- [x] 5.1 Verify that refreshing the page restores the timer and exercise state from the server.
- [x] 5.2 Verify that starting a new workout while a draft exists triggers the conflict modal.
- [x] 5.3 Verify that finishing a workout clears both `localStorage` and the server-side `DraftSession`.
