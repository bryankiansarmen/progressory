## Why

In Next.js 15+, `params` and `searchParams` in Server Components are now Promises that must be awaited before their properties can be accessed. Accessing them synchronously results in `undefined` values, which causes Prisma database queries (like `findUnique`) to fail when they receive an undefined ID.

## What Changes

- **Update Program Details Page**: Refactor `app/programs/[id]/page.tsx` to await the `params` prop.
- **Update Program Edit Page**: Refactor `app/programs/[id]/edit/page.tsx` to await the `params` prop.
- **TypeScript Update**: Ensure the component props interfaces correctly reflect that `params` is a Promise.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `workout-programs`: Update technical requirement to align with Next.js 15 routing patterns for program management.

## Impact

- `app/programs/[id]/page.tsx`: Component signature and data fetching logic.
- `app/programs/[id]/edit/page.tsx`: Component signature and data fetching logic.
- Potential runtime errors in program-related views are resolved.
