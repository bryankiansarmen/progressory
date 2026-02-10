## Why

Users experience a UI hang ("rendering..." state with Next.js icon) after saving a new or updated workout routine or training program. This is caused by a race condition between `router.push()` and `router.refresh()` in the client-side builder components, which conflicts with how Next.js 15 handles navigation and data refreshing.

## What Changes

- Remove redundant `router.refresh()` calls in `WorkoutBuilderContainer.tsx` and `ProgramBuilder.tsx`.
- Implement server-side cache invalidation using `revalidatePath` in `workout.service.ts` and `program.service.ts`.
- Ensure consistent data freshness across the application without manual client-side refreshes.

## Capabilities

### New Capabilities
- `cache-invalidation-strategy`: Requirements for consistent server-side data revalidation.

### Modified Capabilities
- `workout-template-management`: Update implementation requirements to use server-side revalidation.
- `workout-programs`: Update implementation requirements to use server-side revalidation.

## Impact

- **Services**: `workout.service.ts` and `program.service.ts` will now import `revalidatePath` from `next/cache`.
- **UI Components**: `WorkoutBuilderContainer.tsx`, `ProgramBuilder.tsx`, and `ProgramCard.tsx` will have simplified navigation logic.
- **Performance**: Improved navigation speed and elimination of the "rendering hang" bug.
