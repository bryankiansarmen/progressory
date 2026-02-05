# Proposal: Refactor Exercise Hierarchy

## Why
Current exercise list is flat, leading to redundancy (e.g., "Barbell Shoulder Press" and "Dumbbell Shoulder Press" as unrelated items). A hierarchical structure will group variations under a base movement.

## What Changes
- **Database Schema**: Add `parentId` to `Exercise` model for self-referencing parent/child relationship.
- **Seeding/Migration**: Re-organize existing exercises into movements and equipment variations.
- **Service Layer**: Update `exercise.service.ts` to support grouping.
- **UI Components**: Update `ExercisePicker` and Exercise Library page to display movements as collapsible groups.

## Capabilities

### New Capabilities
- `hierarchical-exercise-management`: Support for grouping exercise variations under parent movements.

## Impact
- `prisma/schema.prisma`: Schema change (requires migration).
- `services/exercise.service.ts`: Update fetching logic.
- `components/exercise/ExercisePicker.tsx`: Significant UI update for grouping.
- `app/exercises/page.tsx`: UI update for grouped display.
