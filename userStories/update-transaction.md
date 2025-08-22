# Update Transaction

## Value Proposition

**As a user**

**I want to** update the details of existing transactions,

**so that** they reflect the most accurate and relevant information.

## Description

<img width="909" height="688" alt="Image" src="https://github.com/user-attachments/assets/53923849-446c-44af-9afa-438d2b8e30e8" />

## Acceptance Criteria

- Each transaction in the transactions list includes an easily accessible edit option.
- Clicking the edit option opens a form pre-filled with the transaction’s existing details for modification.
- The form allows for edits to all transaction details, including:
  - Transaction Amount
  - Transaction Category
  - Transaction Type
  - Transaction Date
- All fields are mandatory.
- All fields has to be filled with previous transactions values
- The form section includes options for both saving and cancelling the action.
- The cancellation option allows the user to back out of the edit process if selected by mistake or if they change their mind
- Submissions with empty mandatory fields are blocked, with validation messages indicating the missing required fields
- Upon confirming the save, the updated transaction is saved and reflected in the transactions list.

## Tasks

- [ ] Create feature branch `feature/update-transaction`
- [ ] Add a link to the each transaction list item with href="/edit/:id"
- [ ] Create dynamic edit page `"/pages/edit/[id].js"``
- [ ] Reuse transaction form on a edit page
- [ ] Update transaction form:
  - [ ] Add the props onSubmit, defaultValue, editMode
  - [ ] if defaultValue is present, use its value as default values for the inputs
  - [ ] Move create logic from the form into a new function handleAddTransaction on the HomePage
  - [ ] Pass down this new function as the prop onSubmit to the form
  - [ ] Depending on the boolean editMode display fitting text for the title and the submit button of the form
  - [ ] Inside the handleSubmit function of the form call the prop onSubmit and pass the formData to it
- [ ] Inside the edit page create a function handleEdit
- [ ] Take the formData and send to the PUT request to the endpoint /api/transactions/id
- [ ] If the response was successful send the user to the HomePage with router.push("/")
- [ ] Use useSWR("/transactions/id") Hook to GET the data from transaction to update the form
- [ ] Use the Hook useRouter() to get the id of transaction
