# name: Sort Transactions by Date (Ascending /Descending)

## Value proposition

As a User
**I want to** sort my transactions
**so that** I can easily see the newest and the oldest ones.

## Description

A sort button allows the user to toggle between ascending and descending transactions order.

## Acceptance criteria

- Sorting works across all transactions, not just the ones shown on the first page.
- Descending order shows the newest transactions first.
- Ascending order shows the oldest transactions first.
- If multiple transactions have the same date, the order remains consistent.
- Sorting respects all filters (category, time range, income/expense).

## Tasks

- [ ] Add sort toggle button to the transaction list UI component with visible states for `ascending`/ `descending`.
- [ ] Add local state + handler to flip sort options.
- [ ] Write a helper function for -> toSorted() compared with id or createdAt
- [ ] Preserve the chosen sort order so it remains after navigation or reload.
