# Account Balance Time Line Graph -Rechats

## Value Proposition

**As a user**

**I want to** see how my account balance changes over time.

**so that** I can recognize trends, peaks, and drops in my finances.

## Description

The chart shown inside the  Charts tab (see wireframe).
The chart is filterable by time ranges (e.g last week, month, 3 months, year or custom range)
Tapping/Clicking shows the exact balance on graph
If no data exists, page shows a prompt - "no transactions available"

## Acceptance Criteria

- Time range presets are available: last week, month, 3 months, year or custom range.
- The line shows your daily balance (incomes add, expenses subtract).
- Empty state "no transactions available".
- Chart is wrapped with a figure and accessible title and caption.
- Tooltip shows date + exact balance.
- The negative balance is displayed correctly. A zero reference line is visible.

## Tasks

- [ ] Create a new branch `feature/analytics-time-graph`.
- [ ] Add a new component `AccountBalanceTimeLine.js`.
- [ ] Write a helper function to build a daily balance series from transactions.
- [ ] Implement custom range selection - with date pickers for start and end
- [ ] Store current range in local component state (`useState`).
- [ ] Render the chart with Recharts inside a styled card.
- [ ] Integrate into Analytics page, as new tab next to the PieChart 
- [ ] Add time range presets (last week, month, 3 months, year or custom range)
    - [ ] Create small buttons for presets above or below chart
    - [ ] When clicked, update the selected `timeRange`state
