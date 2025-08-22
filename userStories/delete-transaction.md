# Delete Transaction

## Value Proposition

**As a user**

**I want to** delete incorrect transactions,

**so that** I can maintain an accurate and organised transactions list.

## Description

<img width="402" height="688" alt="Image" src="https://github.com/user-attachments/assets/51d3919c-a28a-4ec0-a546-f6846069c238" />

## Acceptance Criteria

- Each transaction in the transactions list includes an easily accessible delete option.
- Clicking the delete option triggers a confirmation dialog.
- The dialog serves to prevent accidental deletions by asking the user to confirm their intention.
- The dialog includes options for both confirming the deletion and cancelling the action.
- The cancellation option allows the user to back out of the deletion process if selected by mistake or if they change their mind.
- Upon confirming the deletion, the transaction is removed from the transactions list, and a success message is displayed.
- If all transactions are deleted, a message appears indicating that there are no transactions and providing an option to add new ones.

## Tasks

## Tasks for Transactions List & Delete Confirmation

- [ ] Create feature branch `feature/delete-transaction`
- [ ] Create delete `<button>` next to each transaction.
- [ ] Research: Implementing Modal
- [ ] Make the modal visible by clicking on the delete `<button>`
- [ ] Implement cancel and delete functionality
- [ ] Implement the API route:
  - [ ] Create a handleDelete() function to manage deleting
  - [ ] Create a API route in directory `"pages/api/transactions/[id].js"`
  - [ ] Inside the delete functionality send a DELETE request to API route `"/api/transactions/:id"`
