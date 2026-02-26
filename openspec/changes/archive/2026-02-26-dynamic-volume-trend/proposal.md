# Proposal: Dynamic Weekly Volume Trend

## Goal
Replace the hardcoded "12%" effort trend on the dashboard with a dynamic calculation based on real workout data.

## Problem
The dashboard currently shows a hardcoded trend value (`12% Effort`) in `app/page.tsx`. This value does not reflect the user's actual progress, which can be demotivating or confusing.

## Capabilities
- **C1: Multi-Week Volume Calculation**: Internal logic to fetch and sum volume for arbitrary date ranges.
- **C2: Trend Analytics**: Logic to compare two volume totals and return a percentage change.
- **C3: Dashboard Trend Display**: UI update to show the real trend in the `DashboardStatCard`.

## Out of Scope
*   Relative Effort (RPE) logging.
*   Strength Score trends (sum of 1RMs).
*   Historical trends beyond 1 week.

## User Impact
Users will see real feedback on their training volume consistency, encouraging "progressive overload" from week to week.
