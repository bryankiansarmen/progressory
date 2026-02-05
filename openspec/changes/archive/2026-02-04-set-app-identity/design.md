# Design: Set App Identity

## Context

The application currently uses the default Next.js starter template metadata ("Create Next App").

## Goals / Non-Goals

**Goals:**
- Update the global application name to "Progressory".
- Update the default description to match the project spec.

**Non-Goals:**
- Creating a logo or favicons (will be done in a separate change).
- altering visual branding (colors, fonts).

## Decisions

### Decision 1: Use Root Layout Metadata

We will modify the `metadata` export in `app/layout.tsx`. This is the standard Next.js App Router method for defining site-wide SEO tags.

- **Alternative:** `head.tsx` (Deprecated in Next.js 13+).
- **Rationale:** `layout.tsx` is the canonical place for root metadata in Next.js 15.
