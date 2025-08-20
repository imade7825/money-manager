# Create Transaction

## Value Proposition

**As a user**

**I want to** create and store new transactions,

**so that** I can keep track of my expenses and income effectively.

## Description

Capstone Group Todo: Add wireframes

## Acceptance Criteria

- A form for adding transactions is displayed at the top of the homepage.
- The form is headlined with its purpose.
- The form must include labelled fields for:
  - Transaction Amount
  - Transaction Category
  - Transaction Type
  - Transaction Date
- All fields are mandatory.
- The category is selected from the existing categories list via a dropdown menu.
- The categories dropdown must include a default option, "Please select a category", and necessitates a selection.
- The type must be selected by the user using radio buttons, allowing the choice between “Income” and “Expense”.
- The date field defaults to the current date.
- Form submission with any empty mandatory fields is blocked, and clear validation messages indicate the fields that need completion.
- Upon form submission, the new transaction is added to the top of the transactions list.

## Tasks

- [ ] Create feature branch `feature/create-transaction`
- [ ] Create a component for create transaction
- [ ] Create a <form>
- [ ] Create a <label> "name" to <input> - field with type="text" (required)
- [ ] Create a <label> "Amount" to <input> - field with type="text" (required)
- [ ] Create a <label> "Category" to <select> - field as dropdown menu (required)
  - [ ] As a default value - placeholder "please select a category"
- [ ] Create a <label> "Type" to <input> - field with type="radio" (required)
  - [ ] <input> - field with type="radio" <label> income
  - [ ] <input> - field with type="radio" <label> expense
- [ ] Create a <label> "Date" to <input> - field with type="date" by default current date (required)
- [ ] Create <button> type="submit" with button text "Add"
  -[ ]
- [ ] Create <button> type="reset" with button text "Cancel"
