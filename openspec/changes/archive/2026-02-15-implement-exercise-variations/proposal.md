# Proposal: Exercise Variations Engine

## Problem
Currently, Progressory treats all exercises as isolated entities. If a user performs "Goblet Squats" instead of "Back Squats," the application fails to recognize their shared lineage. This results in missing history context during workouts and fragmented progress analytics for major movement patterns.

## Solution
Implement a **Variation Engine** that activates the hierarchical relationships in the database (`parentId`). This allows for seamless exercise "swaps" during sessions and provides a unified view of performance across exercise families.

### Proposed Changes

#### New Capabilities
- **Intelligent Variation Swapping**: Allow users to replace any exercise in an active session with one of its recognized variations.
- **Family-Aware History**: Display shared history from parent/sibling movements when a specific variation has limited data.
- **Movement Family Trends**: Aggregate analytics across an entire hierarchy (e.g., "The Squat Family") in the Analytics Hub.

#### UI Integration
- **Workout Player**: Add a "Swap" button to exercise cards that opens a variation modal.
- **Exercise Library**: Update the browser to clearly show parents and their nested variations.

### Impact
- **Data Model**: Leverages existing `parentId` in the `Exercise` table.
- **Logic**: New service layer functions for recursive history fetching.
