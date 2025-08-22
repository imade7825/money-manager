# Income/Expense View

## Value Proposition

**As a user**

**I want to** view my transactions separated by income and expenses,

**so that** I can better analyse my financial activities.

## Description

<img width="419" height="707" alt="Image" src="https://github.com/user-attachments/assets/23a7f5b7-cb12-4da5-adea-1a0554aa7536" />

## Acceptance Criteria

- The transactions list includes a section with filter options.
- Users can filter transactions by:
  - Income
  - Expense
  - All transactions (default view)
- Only one filter option can be selected at a time.
- Selecting a new filter automatically deselects the previously selected filter.
- The applied filter is clearly displayed on the transactions list, allowing users to see which filter is currently active.
- Users can clear all filters with a single click by selecting “All transactions”, returning the list to its unfiltered state.
- The transactions list updates in real-time as filters are applied or removed.
- The account balance updates in real-time to reflect the sum of the filtered transactions:
  - Sum of all incomes when filtered by income.
  - Sum of all expenses when filtered by expense.
  - Total balance when showing all transactions.
- If no transactions match the selected filter criteria, a message is displayed indicating that no transactions were found.
- The filter interface is intuitive and easy to use, ensuring that new users can easily understand how to apply and clear filters.

## Tasks

- [ ] Create feature branch `feature/income-expense-view`
- [ ] Create enum with STATE = all/expense/income
- [ ] Create a `<form>`
  - [ ] Create a `<label>` "All" to `<input>` - field with type="radio"
  - [ ] Create a `<label>` "Income" to `<input>` - field with type="radio"
  - [ ] Create a `<label>` "Expense" to `<input>` - field with type="radio"
- [ ] Add handleFilterType function to the HomePage
- [ ] Add state: const [filterType, setFilterType] = useState(STATE.all).
- [ ] Inside the handleSubmit function of the form call the prop onSubmit and pass the formData to it
  - [ ] Implement the filter functionality depending of useState()
  - [ ] Add function to calculate the sum of expense/income transactions
- [ ] Fill the list with the filtered data
