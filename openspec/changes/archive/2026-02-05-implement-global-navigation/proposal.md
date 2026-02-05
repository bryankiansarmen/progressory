# Proposal: Implement Global Navigation UI

## Why
Currently, Progressory lacks a cohesive navigation system. Users are forced to navigate via the dashboard cards, making the app feel like a collection of disjointed pages. A persistent navigation shell is required to improve discoverability and flow.

## What Changes
- **Responsive App Shell**: A global component in `layout.tsx` that provides a consistent frame for the application.
- **Desktop Sidebar**: A permanent left-side navigation for large screens.
- **Mobile Bottom Nav**: A thumb-friendly navigation bar for smaller screens.
- **Active Navigation States**: Visual highlighting of the current route.
- **Navigation Items**: Home, Exercise Library, Workout Templates, and History.

## Capabilities

### New Capabilities
- `responsive-app-navigation`: Support for different navigation structures based on viewport size.
- `navigation-state-management`: Logic to detect and highlight active routes across the app.

## Impact
- `app/layout.tsx`: Modified to wrap `children` in the new Shell.
- `components/layout/`: New subsystem for `AppShell`, `Sidebar`, and `BottomNav`.
- `hooks/useActiveRoute.ts`: Helper for identifying the current page.
