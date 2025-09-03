---
about: Mobile-first Multipage Restyle
---

## Value proposition

As a <developer>
I want to <refactor> the existing single page application into a mobile-first multipage application
As a <user>
I want to <see> easier accessibility to implemented features, the page will be more readable with clear navigation on the bottom 

## Description

- Multipage Layout with **Bottom Navigation** 3 Tabs(Home, Charts, New)
  - Home - Account Balance, 2 Filters(Category & Type), Transactions-list
  - Charts - PieChart with toggle Income/Expense
  - New - add new Transaction
  - Theme/Syling **Persian Blue** with light/dark mode support

## Acceptance criteria

- [ ] Home: Account Balance updates correctly when filters change
- [ ] Home: Both filters (Category & Type) work in **AND** combination (both filters)
- [ ] Charts: PieChart responsive also for small screen sizes
- [ ] Charts: Legend readable, (color+ contrast)
- [ ] New Form: Validation prevents empty or invalid entries
- [ ] New Form: On success -> redirecting to Home + SWR revalidate
- [ ] Bottom-Nav: Active state visible, keyboard-accessible
- [ ] Theme: Persian Blue palette applied in dark/light mode

## Tasks

- [ ] Add Persian-Blue CSS tokens to `GlobalStyle`
- [ ] Create wrapper element to add navigation on every page
- [ ] Create `/pages/charts` page with `<CategoryPieChart.js>`component
- [ ] Create `/pages/transactions/new` page with `<TransacionsForm.js.js>`component
- [ ] Implement FilterBar with 2 filters (Category + Type)
- [ ] Make sure that edge cases with empty/loading/errors are covered
- [ ] Add a11y roles/labels for Bottom-Nav, filters, and chart
