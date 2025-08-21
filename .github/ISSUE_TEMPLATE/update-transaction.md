# Update Transaction

## Value Proposition

**As a user**

**I want to** update the details of existing transactions,

**so that** they reflect the most accurate and relevant information.

## Description

Capstone Group Todo: Add wireframes

## Acceptance Criteria

- Each transaction in the transactions list includes an easily accessible edit option.
- Clicking the edit option opens a form pre-filled with the transaction’s existing details for modification.
- The form allows for edits to all transaction details, including:
  - Transaction Amount
  - Transaction Category
  - Transaction Type
  - Transaction Date
- All fields are mandatory.
- The form section includes options for both saving and cancelling the action.
- The cancellation option allows the user to back out of the edit process if selected by mistake or if they change their mind
- Submissions with empty mandatory fields are blocked, with validation messages indicating the missing required fields
- Upon confirming the save, the updated transaction is saved and reflected in the transactions list.

## Tasks
- [ ] Create feature branch `feature/update-transaction`
- [ ] Display <h2> Edit Transaction
- [ ] All fields has to be filled with previous transactions values 
- [ ] Create a component for update transaction
- [ ] Create a <form>
- [ ] Create a <label> "name" to <input> - field with type="text" (required)
- [ ] Create a <label> "Amount" to <input> - field with type="text" (required)
- [ ] Create a <label> "Category" to <select> - field as dropdown menu (required)
  - [ ] As a default value - placeholder "please select a category"
- [ ] Create a <label> "Type" to <input> - field with type="radio" (required)
  - [ ] <input> - field with type="radio" <label> income
  - [ ] <input> - field with type="radio" <label> expense
- [ ] Create a <label> "Date" to <input> - field with type="date" (required)
- [ ] Create <button> type="submit" with button text "Update" 
- [ ] Create <button> type="reset" with button text "Cancel"
