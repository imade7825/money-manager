# User Story: Filter Transactions by Time Range

## Value Proposition

**As a user**

**I want to** filter my transactions by a specific time range e.g. last week.

**So that** I can focus only on the transactions relevant for that period.

## Description

- Add a time filter option to the existing FilterBar.
- User can choose form quick presets e.g. Today, last Week, Last 30 Days.
- When a filter is applied, only transactions within the selected time frame will appear.
- If no transactions match the selected range, show a placeholder message - "no transaction in this time period".
- Filter works in combination with existing filters (Category, Type).

## Acceptance Criteria

- A time filter is visible alongside other filters on the HomePage.
- Presets like "Last Week" and "Last Month" are available.
- User can manually select a custom start and end data.
- Transactions list updates immediately after selecting a time range.
- Combined filtering - the filter Type, Category **and** Date work together.
- If no transactions exist for chosen range, display message "No transactions found for this time period".
- Time filter state persists while navigating through pages until reset and reloads.

## Tasks

- [ ] Create branch `feature/time-filter`
- [ ] Extend `FilterBar`component to include time range options (presets + custom).
- [ ] Add logic to filter transactions based on date field.
- [ ] Combine time filter with existing filter (Category & Type).
- [ ] Add placeholder message for empty results.
- [ ] Write unit test for filter logic.
