# Transactions List

## Value Proposition

**As a user**

**I want to** browse a list of transactions,

**so that** I can easily track my spending and income to manage my finances.

## Description

Capstone Group Todo: Add wireframes

## Acceptance Criteria

- The homepage displays a list of transactions.
- The transactions list is headlined with its purpose.
- Each transaction listing includes:
  - Transaction Amount
  - Transaction Category
  - Transaction Type (income or expense)
  - Transaction Date
- Income and expense transactions are visually differentiated (e.g., using different colours or icons).
- The list supports vertical scrolling to accommodate multiple entries.

## Tasks

- [ ] Create feature branch `feature/transactions-list`
- [ ] Create a component Transactions-list
- [ ] Add prop transactions to the component
- [ ] In the Transactions-list component loop over the transactions-data (name, category, date, amount, type) and create `<ul>`-list
- [ ] `<li>` elements contains: - [ ] category - [ ] amount - [ ] type (as colored field red/green) - [ ] date

- [ ] Receive the transactions from the useSWR() Hook
- [ ] Render Transactions-List component underneath account balance component
- [ ] If no data available display text - "No data available!"
