---
name: Refactoring -DeveloperStory
---

## Value proposition

As a <Developer>
I want to <The HomePage> code to be easier to read, and maintain(especially for beginners)
So that <future changes are safer and fester> without altering behavior or design

## Description

- Primary: `/pages/index.js` (HomePage) - tidy, clarify and extract low-risk helper-functions

## Acceptance criteria

- [ ] Single source of truth - HomePage only used the components ex. to compute `sumOfTotal' and used `filter-Functions`.
- [ ] Clear data flow - Filtering and totals are computed in clearly named helper-Functions ex. getFilteredTransactions, getTotals. Placet near top of the component or in a small local unit.
- [ ] Currency and date formatting are ien /lib/format.js and are used consistently through the page.
- [ ] UI extractions `<FilterBar>`, `<TotalsBar>`, `<PieChartSection>` are extracted to `/components` and reached out witch props to the parents ex. HomePage.
- [ ] Beginner-friendly names ex. `handleCategoryChange`.
- [ ] Early returns for loading/error.
- [ ] No changes on visual surface of the app - UI and flows remain same.

## Tasks

- [ ] Fix the endpoints - change to useSWR("/api/categories")
- [ ] Add folder **utils** `/lib/format.js` to collect helpers toCurrecyEUR() and toDateDE() and utilize them on HomePage
- [ ] Consistency in naming - rename in HomePage `ìsChartVisible` to is `isChartOpen`, `handleToogle` to `handleToggleForm` usw.
- [ ] Extracting helper-functions to `/lib/home-calcs.js`
- [ ] Extracting small parts like FilterBar, TotalsBar, PieChart to `/components/FilterBar.js` `/components/TotalsBar.js` ...
