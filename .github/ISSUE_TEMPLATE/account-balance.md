# Account Balance

## Value Proposition

**As a user**

**I want to** see the total balance of my transactions,

**so that** I can quickly understand my overall financial situation.

## Description

Capstone Group Todo: Add wireframes

## Acceptance Criteria

- The account balance is displayed at the top of the transactions list.
- The balance includes the sum of all incomes and expenses.
- The balance updates in real-time as transactions are added, edited, or deleted.
- The account balance has a visual distinction based on its value (positive or negative).
- Display the income and expense for the current day

## Tasks

- [ ] Create feature branch `feature/account-balance`
- [ ] Capstone Group Todo: Add tasks
- [ ] Create a Header <h1>
- [ ] Create a component for the balance
- [ ] Create a <nav> component at the bottom of the page
- [ ] Create a H3 heading with current date

---

- [ ] Money formatting
  - Implement in format Euro(cents) the currency -new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
  number,) to show format like € 1 000,00
  
- [ ] Implement using now Date(today) the current day
- [ ] Display in <h3> income if >= 0 "Keine"
- [ ] Display in <h3> expenses if 0 - "Keine"
- [ ] Create function and use SWR("/api/transactions") to fetch the data from database(MongoDB)
- [ ] if there's an error throw an error
- [ ] Bound the navigation to subppages


