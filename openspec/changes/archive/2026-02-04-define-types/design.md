# Design: Exercise Type

## Context
We are establishing the core data models for the application. The `Exercise` entity is fundamental to workout logging.

## Goals / Non-Goals

**Goals:**
- Define a reusable `Exercise` interface.
- Ensure compatibility with future Prisma schema.

**Non-Goals:**
- Implementing the database schema (Prisma) for now.
- Creating validation logic (Zod) - this is just the TS type.

## Decisions

### Decision 1: Shared Types Directory
We will place the definition in `types/index.ts`.
- **Reasoning**: Centralized location for shared types makes imports cleaner and easier to manage across client and server components.

### Decision 2: Interface over Type Alias
We will use an `interface` for `Exercise`.
- **Reasoning**: Interfaces are more extensible and generally preferred for defining object shapes in TypeScript.
