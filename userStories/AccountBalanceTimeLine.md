# Account Balance Time Line Graph -Rechats

## Value Proposition

**As a user**

**I want to** see how my account balance changes over time.

**so that** I can recognize trends, peaks, and drops in my finances.

## Description

A line chart shows the account balance as a running total per day.
The chart is filterable by time ranges (e.g last week, month, 3 months, year or custom range)
Tapping/Clicking shows the exact balance on graph
If no data exists, page shows a prompt - "no transactions available"

## Acceptance Criteria

- Time range presets are available: last week, month, 3 months, year or custom range
- The line shows your daily balance (incomes add, expenses subtract)
- Empty state "no transactions available"
- Chart is wrapped with a figure and accessible title and caption
- The negative balance is displayed correctly. A zero reference line is visible.

## Tasks

- [ ] Create a new branch `feature/analytics-time-graph`.
- [ ] Add a new component `AccountBalanceTimeLine.js`.
- [ ] Write a helper function to build a daily balance series from transactions.
- [ ] Render the chart witch Recharts(LineChart) inside a styled card.
- [ ] Add loading, error and empty states with ARIA-roles.
- [ ] Integrate into Analytics page, either as new tab next to the PieChart or a separate page **(RESEARCH)**
- [ ] Add time range presets (last week, month, 3 months, year or custom range)
