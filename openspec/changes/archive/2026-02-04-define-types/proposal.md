# Proposal: Define Exercise Types

## Why
"Maintain type safety throughout the stack" is a key principle of the project. We need to define the core `Exercise` type in `types/index.ts` to ensure consistency across the application.

## What Changes
- Create `types/index.ts` (if empty) or append to it.
- Define the `Exercise` interface based on the "Core Entities" spec.
- Export the type for use in components and services.

## Capabilities

### New Capabilities
- **Type Definitions**: Centralized type definitions for core entities, starting with `Exercise`.

## Impact
- `types/index.ts`: New interface definition.
