# User Story: Notifications (Toaster)

## Value Proposition

**As a user** 

**I want to** I want to see a small toaster notification for every action I perform (e.g. adding, updating, or deleting a transaction )

**So that** I get immediate feedback and know whether my action was successful or not. 

## Description

- Show toaster notifications on actions in App
- Toaster has success and error states
- Toaster disappears automatically after a few seconds
- User can dismiss toaster manually
- Toasters stack and disappear if multiple actions happen quickly - in a chain


## Acceptance Criteria

- When user adds/edits a transaction, a success toaster appears with text e.g. "Transaction saved" 
- When user removes a transaction, a success toaster appears with text e.g. "Transaction deleted"
- When an action fails e.g. network error, an toaster appears with text e.g. "Network problem, please try again"
- After a few seconds toasters disappears automatically
- Every toaster can be dismissed manually by clicking an "x" button
- If multiple actions happen quickly, toasters stack on each other without overlapping 


## Tasks

- [ ] Create a branch `feature/toast-notifications`
- [ ] Create reusable `Toaster`component with "success" and "error" states  
- [ ] Define default styles (colors, icons, animation) for success, error and info toasters
- [ ] Integrate `Toaster` into action handlers (Add/Edit/Delete - transactions)
- [ ] Ensure auto-dismiss functionality after (3-5 sec.)
- [ ] Add manual close option with `aria-label` for closing button

