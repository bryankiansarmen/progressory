# Progressory

A modern, full-stack workout tracking application built with **Next.js 15+**, **TypeScript**, and **SQLite**. Designed for efficiency and ease of use, it allows users to plan workouts, log sessions in real-time, and track progress over time.

## Features

### Dashboard & Analytics
- **Consistency Tracking**: Visualize your workout frequency with activity charts.
- **Recent PRs**: Automatically track and display personal records for specific exercises.
- **Quick Actions**: Quickly start a new workout or browse the exercise library.

### Workout Management
- **Workout Builder**: Create and customize workout templates with specific exercises and ordering.
- **Real-time Player**: Log your active sessions with a dedicated interface including rest timers and set tracking.
- **Session Summaries**: Review your performance immediately after finishing a workout.

### Exercise Library
- **Comprehensive Database**: Browse exercises by muscle group, category, and equipment.
- **Custom Exercises**: Create your own exercises to fit your specific routine.
- **Exercise Variations**: Support for hierarchical exercise management (e.g., variations of a base exercise).
- **Archiving**: Keep your library clean by archiving exercises you no longer use.

### History & Progress
- **Workout History**: View a chronological list of all past sessions.
- **Granular Logging**: Detailed breakdown of every set, rep, and weight lifted.

## Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [SQLite](https://www.sqlite.org/) (via [Prisma ORM](https://www.prisma.io/))
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

## Getting Started

### Prerequisites
- Node.js 20+ 
- npm / yarn / pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd progressory
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```text
├── app/              # Next.js App Router (pages and layouts)
├── components/       # Reusable UI and feature-specific components
│   ├── dashboard/    # Dashboard widgets and charts
│   ├── exercise/     # Exercise library and picker components
│   ├── layout/       # AppShell, Sidebar, and Navigation
│   ├── ui/           # Base shadcn/ui components
│   └── workout/      # Workout builder and player containers
├── hooks/            # Custom React hooks (timers, routing)
├── lib/              # Utilities, constants, and database client
├── prisma/           # Database schema and migration files
├── services/         # Business logic layer (Exercise, Logging, Stats, Workout)
└── types/            # TypeScript type definitions
```

## Development Workflow

This project uses the **OpenSpec** methodology for structured feature development. Changes are tracked as "delta specs" in `openspec/changes/`, ensuring that every modification is documented and verified.

- **Specs**: Located in `openspec/specs/`
- **Archived Changes**: Detailed history of implemented features in `openspec/changes/archive/`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details (or private use).
