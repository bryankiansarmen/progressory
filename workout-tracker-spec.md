Workout Tracker - Project Specification

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

  Database          PostgreSQL 15+

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

The database schema is designed to be normalized, relational, and
scalable. Even in single-user mode, all data is properly scoped to
support multi-user expansion.

**1. User**

-   id: String (UUID or CUID)

-   email: String (unique)

-   name: String (optional)

-   createdAt: DateTime

-   updatedAt: DateTime

**2. Workout**

-   id: String (UUID)

-   userId: String (foreign key to User)

-   name: String (e.g., \'Push Day\', \'Leg Day\')

-   date: DateTime

-   notes: String (optional, text field)

-   duration: Int (minutes, optional)

-   createdAt: DateTime

-   updatedAt: DateTime

**3. Exercise**

-   id: String (UUID)

-   name: String (e.g., \'Bench Press\', \'Squat\')

-   category: String (e.g., \'Chest\', \'Legs\', \'Back\')

-   muscleGroup: String (primary muscle targeted)

-   equipment: String (optional, e.g., \'Barbell\', \'Dumbbell\')

-   isCustom: Boolean (true if user-created, false if from default
    library)

-   userId: String (nullable, null for default exercises)

-   createdAt: DateTime

-   updatedAt: DateTime

**4. WorkoutExercise**

*Join table linking Workouts to Exercises with ordering*

-   id: String (UUID)

-   workoutId: String (foreign key to Workout)

-   exerciseId: String (foreign key to Exercise)

-   order: Int (position in workout sequence)

-   notes: String (optional, exercise-specific notes)

-   createdAt: DateTime

**5. Set**

-   id: String (UUID)

-   workoutExerciseId: String (foreign key to WorkoutExercise)

-   setNumber: Int (1, 2, 3, etc.)

-   reps: Int (number of repetitions)

-   weight: Decimal (weight lifted, nullable)

-   weightUnit: String (kg or lbs, default: kg)

-   rpe: Decimal (Rate of Perceived Exertion, optional, 1-10 scale)

-   isWarmup: Boolean (default: false)

-   completed: Boolean (default: true)

-   createdAt: DateTime

Critical Indexes

-   Workout: index on userId, date (for user workout history queries)

-   WorkoutExercise: index on workoutId (for fetching all exercises in a
    workout)

-   Set: index on workoutExerciseId (for fetching all sets for an
    exercise)

-   Exercise: index on userId for custom exercises, index on isCustom

Core Features

Phase 1 - MVP (Personal Use)

**Workout Logging**

-   Create new workout sessions with name and date

-   Add exercises from a predefined library or create custom exercises

-   Log sets with reps, weight, and optional RPE

-   Reorder exercises within a workout via drag-and-drop

-   Add notes to workouts and individual exercises

**Exercise Library**

-   Browse exercises by category or muscle group

-   Search exercises by name

-   Create and manage custom exercises

-   View exercise history (previous sets, weights, dates)

**Workout History**

-   View past workouts in chronological order

-   Filter workouts by date range

-   Edit or delete past workouts

-   Duplicate previous workouts as templates

**Progress Tracking**

-   View progress charts for individual exercises (weight over time,
    volume over time)

-   Track personal records (1RM, max reps at weight, total volume)

-   View workout frequency statistics (workouts per week/month)

**Dashboard**

-   Quick stats overview (total workouts, recent PRs, workout streak)

-   Recent workout history (last 5-7 workouts)

-   Quick action buttons (Log New Workout, View Exercise Library)

Phase 2 - Multi-User Scaling (Future)

-   User authentication and authorization (Clerk or NextAuth)

-   User profile management

-   Rate limiting and request throttling

-   Data privacy and user data isolation

-   Optional: Social features (share workouts, follow users)

-   Optional: Workout templates and programs

Application Architecture

Project Structure

*Recommended Next.js App Router structure:*

workout-tracker/

├── app/

│ ├── (auth)/ \# Auth routes (future)

│ ├── api/ \# API routes

│ ├── dashboard/ \# Dashboard page

│ ├── workouts/ \# Workout pages

│ ├── exercises/ \# Exercise library pages

│ ├── progress/ \# Progress tracking pages

│ ├── layout.tsx

│ └── page.tsx

├── components/

│ ├── ui/ \# shadcn/ui components

│ ├── workout/ \# Workout-specific components

│ ├── exercise/ \# Exercise-specific components

│ └── charts/ \# Chart components

├── lib/

│ ├── db/ \# Database utilities

│ ├── validations/ \# Zod schemas

│ ├── utils/ \# Helper functions

│ └── constants/ \# Constants and enums

├── prisma/

│ ├── schema.prisma

│ └── seed.ts \# Seed data (default exercises)

├── types/ \# TypeScript type definitions

└── hooks/ \# Custom React hooks

Data Flow

1.  Client sends request to Next.js API route or Server Action

2.  Request validated using Zod schemas

3.  Prisma ORM queries/mutates PostgreSQL database

4.  Data returned to client via API response or Server Component

5.  React Query manages caching, invalidation, and optimistic updates

State Management Strategy

-   Server State: React Query (TanStack Query) for all data fetching

-   Form State: React Hook Form for complex forms

-   URL State: Next.js searchParams for filters and pagination

-   Local UI State: React useState/useReducer or Context API

Coding Standards and Best Practices

TypeScript Guidelines

-   Use strict mode in tsconfig.json

-   Prefer interfaces for object shapes, types for unions/intersections

-   Avoid \'any\' type; use \'unknown\' if type is truly dynamic

-   Generate types from Prisma schema, do not duplicate manually

-   Use discriminated unions for complex state

React/Next.js Best Practices

-   Default to Server Components unless client interaction is needed

-   Use Server Actions for mutations when appropriate

-   Colocate components with their usage when possible

-   Extract reusable logic into custom hooks

-   Use dynamic imports for large client components

-   Implement loading and error states for all async operations

Database and Prisma Guidelines

-   Always scope queries by userId (even in single-user mode)

-   Use transactions for operations affecting multiple tables

-   Implement soft deletes for user data (add deletedAt field)

-   Use include/select to fetch only needed fields

-   Run migrations in order; never edit existing migrations

-   Seed database with default exercise library

Validation and Error Handling

-   Define Zod schemas for all API inputs and form data

-   Validate data at API boundaries (before database operations)

-   Return consistent error response format from API routes

-   Display user-friendly error messages in UI

-   Log errors server-side for debugging (console.error in dev, proper
    logging in prod)

UI/UX Guidelines

-   Use shadcn/ui components as base, customize as needed

-   Implement loading skeletons for data fetching states

-   Provide immediate feedback for user actions (toast notifications)

-   Make the app responsive (mobile-first approach)

-   Use optimistic updates for better perceived performance

-   Ensure accessibility (semantic HTML, ARIA labels, keyboard
    navigation)

Code Organization

-   Keep files under 300 lines; split into smaller modules if exceeded

-   Use barrel exports (index.ts) for clean imports

-   Name files and components using PascalCase for components,
    kebab-case for utilities

-   Group related functionality (e.g., workout CRUD in workout module)

-   Document complex logic with comments; use JSDoc for public functions

API Design and Endpoints

RESTful API Structure

All API routes follow REST conventions with consistent response formats.

  ----------------- ---------------------------- -----------------------------------
  **Method**        **Endpoint**                 **Description**

  GET               /api/workouts                List all workouts for user

  POST              /api/workouts                Create new workout

  GET               /api/workouts/:id            Get single workout with exercises

  PATCH             /api/workouts/:id            Update workout

  DELETE            /api/workouts/:id            Delete workout

  GET               /api/exercises               List all exercises

  POST              /api/exercises               Create custom exercise

  GET               /api/exercises/:id/history   Get exercise performance history

  POST              /api/sets                    Create new set

  PATCH             /api/sets/:id                Update set details

  GET               /api/stats/dashboard         Get dashboard statistics
  ----------------- ---------------------------- -----------------------------------

Response Format

**Success Response:**

{

\"success\": true,

\"data\": { \... }

}

**Error Response:**

{

\"success\": false,

\"error\": \"Error message\",

\"code\": \"ERROR_CODE\"

}

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

-   Integration tests for API routes

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
