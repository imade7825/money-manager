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

### Account-Balance

- [ ] Create feature branch `feature/account-balance`
- [ ] Create a Header <h1>
- [ ] Create a component for the balance
  - [ ] Compute account balance
  - [ ] Money formatting (in Euro-Format)
  - Implement in format Euro(cents) the currency -new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
    number,) to show format like € 1 000,00
  - [ ] Display title and amount

### Transactions-List

- [ ] Create a list 3th last transactions <ul>
- [ ] <li> elements should contains 
          - [ ] name
          - [ ] amount
          - [ ] type (as colored field red/green)
          - [ ] date

### Navigation

- [ ] Create a <nav> component at the bottom of the page -[ ] Home -[ ] Categories -[ ] Transactions-list
