# Delete Transaction

## Value Proposition

**As a user**

**I want to** delete incorrect transactions,

**so that** I can maintain an accurate and organised transactions list.

## Description

Capstone Group Todo: Add wireframes

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

**Transactions List**
- [ ] Create **"Add Transaction"** <button>
- [ ] Add headline: **"Transactions"**.
- [ ] Display list of existing transactions with:
  - Name ( "Salary").
  - Type - red (expences) green (incomes)
  - Amount ("2000 €").
  - **Delete** create button next to each transaction.
- [ ] If no transactions exist, show text: **"No transactions"**.
- [ ] Add **Add Transaction** button below the list.

**Delete Flow**
- [ ] Clicking **Delete** opens a confirmation modal.
  - [ ] Modal headline: **"Delete Transaction"**.
  - [ ] Modal body text: **"Are you sure you want to delete this transaction?"**
  - [ ] Modal buttons:
    - **Cancel** → closes modal without deleting.
    - **Confirm** → deletes transaction and updates list.
