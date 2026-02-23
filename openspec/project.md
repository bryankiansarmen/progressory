Progressory - Project Specification

*Comprehensive Technical Documentation*

Executive Summary

A modern, full-stack workout tracking application built with Next.js 15,
TypeScript, and PostgreSQL. Designed initially for personal use with a
clear path to multi-user scaling. The application provides comprehensive
workout logging, progress tracking, analytics, and visualization
capabilities.

Project Overview

Purpose

Enable users to track workouts, monitor progress over time, and analyze
performance metrics through an intuitive web interface.

Development Philosophy

-   Build for personal use first, validate the concept

-   Design with multi-user scalability in mind from day one

-   Maintain clean architecture and proper separation of concerns

-   Prioritize developer experience and maintainability

-   Keep the tech stack modern but proven

Core Tech Stack

  ----------------- -----------------------------------------------------
  **Category**      **Technology**

  Framework         Next.js 15 (App Router)

  Language          TypeScript 5+

  Database          SQLite (Development) / PostgreSQL (Production target)

  ORM               Prisma 5+

  Styling           Tailwind CSS 3+ with shadcn/ui components

  Data Viz          Recharts

  Deployment        Vercel (app) + Neon or Vercel Postgres (database)
  ----------------- -----------------------------------------------------

Additional Dependencies

-   React Query (TanStack Query) - Server state management

-   Zod - Runtime type validation and schema validation

-   date-fns - Date manipulation and formatting

-   React Hook Form - Form state management

-   Zustand (optional) - Client state if Context API becomes
    insufficient

Database Schema Design

Core Entities

The database schema uses a template-instance pattern for workouts, allowing users to define routines and then log specific sessions.

**1. User**

-   id: String (CUID)

-   email: String (unique)

-   name: String (optional)

-   createdAt: DateTime

-   updatedAt: DateTime

**2. Exercise**

-   id: String (CUID)

-   name: String (e.g., \'Bench Press\', \'Squat\')

-   category: String (e.g., \'Chest\', \'Legs\')

-   muscleGroup: String (primary muscle targeted)

-   equipment: String (optional)

-   isArchived: Boolean (soft-delete)

-   parentId: String (nullable, for exercise variations)

-   userId: String (nullable, for user-created custom exercises)

**3. Workout (Template)**

-   id: String (CUID)

-   userId: String (foreign key to User)

-   name: String (e.g., \'Push Day\')

-   createdAt: DateTime

-   updatedAt: DateTime

**4. WorkoutExercise**

*Join table linking Workout Templates to Exercises with ordering*

-   id: String (CUID)

-   workoutId: String (foreign key to Workout)

-   exerciseId: String (foreign key to Exercise)

-   order: Int (position in sequence)

**5. WorkoutLog (Session)**

*An instance of a completed or active workout session*

-   id: String (CUID)

-   userId: String (foreign key to User)

-   workoutId: String (foreign key to Workout)

-   date: DateTime (session start/completion date)

-   duration: Int (minutes, optional)

**6. WorkoutLogEntry**

*Links a specific exercise to a workout session log*

-   id: String (CUID)

-   workoutLogId: String (foreign key to WorkoutLog)

-   exerciseId: String (foreign key to Exercise)

**7. Set**

-   id: String (CUID)

-   logEntryId: String (foreign key to WorkoutLogEntry)

-   reps: Int

-   weight: Float

-   isDone: Boolean (completion status)

Critical Indexes

-   Workout: index on userId

-   WorkoutLog: index on userId, date (for history queries)

-   Exercise: index on parentId (for variations), userId

Core Features

Phase 1 - MVP (Personal Use)

**Workout Logging**

-   Create and manage workout templates

-   Start active workout sessions based on templates

-   Add exercises to active sessions on-the-fly

-   Log sets with reps and weight

-   Reorder exercises within a workout

-   Track active session duration with a live timer
-   **Automated Rest Timer:** Automatically triggers a customizable rest interval after marking a set as done
-   **Gym-Proof Offline Sync:** Hybrid synchronization using Cloud (Server Actions) and LocalStorage to ensure no data loss in poor connectivity
-   **Smart Pre-filling:** Automatically predicts next-session weight and reps based on historical performance trends

**Exercise Library**

-   Browse exercises by category or muscle group

-   Search exercises by name (including variations)

-   **Exercise Hierarchy:** Manage parent movements and their variations (e.g., Squat -> Goblet Squat)

-   **Exercise Archiving:** Soft-delete custom exercises to keep the library clean

-   Create and manage custom exercises

-   View exercise history and performance trends

**Workout History**

-   View past workout sessions in chronological order

-   Filter sessions by date range

-   View detailed summaries of completed workouts

**Progress Tracking**

-   View progress charts for individual exercises

-   Track personal records (PRs)

-   Visualize workout consistency and frequency

**Dashboard**

-   Quick stats overview (total volume, recent PRs, consistency)

-   Recent activity feed

-   Quick actions for starting workouts and managing exercises

Phase 2 - Multi-User Scaling (Future)

-   User authentication and authorization (Clerk or NextAuth)

-   User profile management

-   Rate limiting and request throttling

-   Data privacy and user data isolation

-   Optional: Social features (share workouts, follow users)

-   Optional: Workout templates and programs

Application Architecture

Project Structure

*Current Next.js App Router structure with Service Layer:*

workout-tracker/

├── app/

│ ├── (auth)/ \# Auth routes (future)

│ ├── dashboard/ \# Dashboard page

│ ├── workouts/ \# Workout templates and active sessions

│ ├── exercises/ \# Exercise library and management

│ ├── history/ \# Workout history and logs

│ ├── layout.tsx

│ └── page.tsx

├── components/

│ ├── ui/ \# shadcn/ui components

│ ├── workout/ \# Workout-specific components

│ ├── exercise/ \# Exercise-specific components

│ └── charts/ \# Chart components

├── services/ \# Business logic (Server Actions)

│ ├── exercise.service.ts

│ ├── workout.service.ts

│ ├── logging.service.ts

│ └── stats.service.ts

├── lib/

│ ├── db/ \# Prisma client and DB utilities

│ ├── validations/ \# Zod schemas

│ ├── utils/ \# Helper functions

│ └── constants/ \# Constants and enums

├── prisma/

│ ├── schema.prisma

│ └── seed.ts \# Seed data

├── types/ \# TypeScript type definitions

└── hooks/ \# Custom React hooks

Data Flow

1.  Client interacts with UI components

2.  Components invoke **Server Actions** (defined in services/)

3.  Actions validate inputs using **Zod** schemas

4.  Services interact with the database via **Prisma ORM**

5.  Data is returned directly to the component or managed via **React Query** for caching and optimistic updates

State Management Strategy

-   Server State: React Query (TanStack Query) for managing data fetched via Server Actions

-   Form State: React Hook Form for complex forms

-   URL State: Next.js searchParams for filters, pagination, and active session state

-   Local UI State: React useState/useReducer or Context API for ephemeral UI state
-   **Active Session State:** Persisted via hybrid LocalStorage + DraftSession DB model for high-reliability workout logging

Coding Standards and Best Practices

TypeScript Guidelines

-   Use strict mode in tsconfig.json

-   Prefer interfaces for object shapes, types for unions/intersections

-   Avoid \'any\' type; use \'unknown\' if type is truly dynamic

-   Generate types from Prisma schema or define shared types in types/

-   Use discriminated unions for complex state

React/Next.js Best Practices

-   Default to Server Components for data fetching (calling services directly)

-   Use Server Actions for all mutations and client-side data fetching needs

-   Colocate components with their usage when possible

-   Extract reusable logic into custom hooks

-   Implement loading and error states for all async operations

Database and Prisma Guidelines

-   Always scope queries by userId (even in single-user mode)

-   Use transactions for operations affecting multiple tables (e.g., creating a log with entries)

-   Implement soft deletes for exercises (isArchived)

-   Use include/select to fetch only needed fields

-   Run migrations in order; never edit existing migrations

Validation and Error Handling

-   Define Zod schemas for all service inputs and form data

-   Validate data at service boundaries (before database operations)

-   Return structured error objects from Server Actions

-   Display user-friendly error messages in UI using toast notifications

UI/UX Guidelines

-   Use shadcn/ui components as base, customize as needed

-   Implement loading skeletons for data fetching states

-   Provide immediate feedback for user actions (toast notifications)

-   Make the app responsive (mobile-first approach)

-   Use optimistic updates for better perceived performance

Code Organization

-   Keep files under 300 lines; split into smaller modules if exceeded

-   Use barrel exports (index.ts) for clean imports in the services directory

-   Name files and components using PascalCase for components, kebab-case for utilities

-   Group related functionality in dedicated service files

Service Layer Design

The application uses a Service Layer pattern with Next.js Server Actions to encapsulate business logic and database interactions.

**Exercise Service**

-   `getExercises(params)`: Fetch paginated, filtered list of exercises.

-   `getExerciseById(id)`: Fetch single exercise with variations.

-   `createCustomExercise(data)`: Persist new user-defined exercise.

-   `updateExercise(id, userId, data)`: Update exercise details.

-   `archiveExercise(id, userId)`: Soft-delete an exercise.

**Workout Service**

-   `getWorkouts(userId)`: Fetch all workout templates for a user.

-   `getWorkoutById(id)`: Fetch template with exercise sequence.

-   `createWorkout(data)`: Create a new workout template.

-   `deleteWorkout(id)`: Remove a workout template.

**Logging Service**

-   `startWorkoutLog(workoutId, userId)`: Initialize a new workout session log.

-   `addLogEntry(logId, exerciseId)`: Add an exercise entry to an active log.

-   `updateSet(setId, data)`: Update reps/weight for a specific set.

-   `completeWorkoutLog(logId)`: Mark session as finished and record duration.

**Stats Service**

-   `getDashboardStats(userId)`: Aggregate PRs, frequency, and volume for dashboard.

-   `getExerciseHistory(exerciseId, userId)`: Fetch performance trends for a specific movement.

Testing Strategy

Testing Approach

For MVP phase, focus on manual testing and TypeScript type safety.
Expand to automated testing before multi-user scaling.

Phase 1 Testing (MVP)

-   Manual testing of all user flows

-   TypeScript strict mode for compile-time error prevention

-   Zod validation for runtime data integrity

Phase 2 Testing (Pre-Scaling)

-   Unit tests for utility functions and critical logic (Vitest)

-   Integration tests for Server Actions and Services

-   E2E tests for critical user flows (Playwright)

-   Load testing before public launch

Performance Considerations

Database Optimization

-   Add indexes on frequently queried fields (userId, date, workoutId)

-   Use connection pooling (Prisma handles this)

-   Paginate large data sets (workout history, exercise library)

Frontend Optimization

-   Implement React Query caching with stale-while-revalidate

-   Use optimistic updates for immediate UI feedback

-   Lazy load chart components

-   Minimize client-side JavaScript bundle size

Caching Strategy

-   React Query cache for frequently accessed data

-   Next.js data cache for stable data (exercise library)

-   When scaling: Add Redis for session storage and frequently accessed
    aggregations

Deployment and DevOps

Initial Deployment (Phase 1)

-   Deploy Next.js app to Vercel (automatic preview and production
    deployments)

-   Database: Neon or Vercel Postgres free tier

-   Environment variables managed via Vercel dashboard

CI/CD Pipeline

-   Automatic deployments on push to main branch

-   Preview deployments for pull requests

-   Run database migrations as part of deployment

Scaling Preparation (Phase 2)

-   Upgrade database plan (increase connection limits, storage)

-   Add monitoring and error tracking (Sentry, Vercel Analytics)

-   Implement rate limiting (Upstash Rate Limit)

-   Set up backup strategy for production database

Security Considerations

Phase 1 (Personal Use)

-   Use environment variables for sensitive data (database URL)

-   Enable HTTPS via Vercel (automatic)

-   Validate all user inputs with Zod

Phase 2 (Multi-User)

-   Implement proper authentication (Clerk/NextAuth with JWT)

-   Add CSRF protection

-   Implement rate limiting per user/IP

-   Use parameterized queries (Prisma does this automatically)

-   Add Content Security Policy headers

-   Regular dependency updates and security audits

Future Enhancements and Roadmap

Short-term (Post-MVP)

-   Workout templates and programs

-   Export workout data to CSV or PDF

-   Advanced analytics (volume trends, muscle group balance)

-   Rest timer functionality

Medium-term

-   Progressive web app (PWA) with offline capability

-   Mobile app (React Native with Expo)

-   Social features (share workouts, follow friends)

-   Integration with fitness wearables

Long-term

-   AI-powered workout recommendations

-   Video exercise demonstrations

-   Nutrition tracking integration

-   Marketplace for workout programs

Development Workflow

Getting Started

6.  Clone repository and install dependencies (npm install)

7.  Set up environment variables (.env.local)

8.  Run database migrations (npx prisma migrate dev)

9.  Seed database with default exercises (npx prisma db seed)

10. Start development server (npm run dev)

Daily Development Flow

-   Create feature branch from main

-   Develop feature with regular commits

-   Test manually in development

-   Create pull request for review (self-review in Phase 1)

-   Merge to main, automatic deployment to production

Database Migrations

-   Make schema changes in schema.prisma

-   Generate migration: npx prisma migrate dev \--name migration_name

-   Review generated SQL before committing

-   Migrations auto-run on production deployment

Conclusion

This specification provides a comprehensive foundation for building a
workout tracker application. The chosen tech stack balances modern best
practices with proven reliability. The architecture is designed to start
simple for personal use while maintaining a clear path to multi-user
scaling. By following these guidelines and standards, the application
will be maintainable, performant, and ready to grow as needed.

**Key Principles to Remember:**

-   Build for your current needs, design for future scale

-   Maintain type safety throughout the stack

-   Scope all data properly from day one

-   Prioritize user experience and performance

-   Keep the codebase clean and well-documented

*Ready to start building! 🏋️*
