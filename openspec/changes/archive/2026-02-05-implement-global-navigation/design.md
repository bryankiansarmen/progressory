# Design: Global Navigation

## Context
The navigation system must feel premium and "native" on mobile while leveraging desktop real estate.

## Decisions

### Decision 1: Hybrid Navigation Structure
We will use a Sidebar for Desktop (≥ 768px) and a Bottom Tab Bar for Mobile (< 768px).
- **Rationale**: Best practice for ergonomics and information density.

### Decision 2: Glassmorphic Aesthetic
The navigation elements will use high-blur backgrounds (`backdrop-blur-md`) and subtle borders.
- **Rationale**: Maintains the modern, premium aesthetic established in the Player and Dashboard.

### Decision 3: Lucide React Icons
Consistent use of icons for all navigation items.
- **Rationale**: Improves scan-ability and visual balance.

## Component Hierarchy
```
RootLayout (layout.tsx)
└── AppShell
    ├── DesktopSidebar (Visible on md+)
    ├── MobileBottomNav (Visible on sm-)
    └── MainContent (Scrollable)
```

## Navigation Mapping
- `app/page.tsx` -> **Home** (`Home` icon)
- `app/exercises/page.tsx` -> **Library** (`Dumbbell` icon)
- `app/workouts/page.tsx` -> **Templates** (`ClipboardList` icon)
- `app/history/page.tsx` -> **History** (`History` icon)
```
