# Filter Transactions

## Value Proposition

**As a user**

**I want to** filter transactions by category,

**so that** I can quickly find transactions that match my preferences and needs.

## Description

Capstone Group Todo: Add wireframes

## Acceptance Criteria

- The transactions list includes a section with filter options.
- Users can filter transactions by category.
- Only one category filter can be selected at a time.
- Selecting a new category filter automatically deselects the previously selected category filter.
- The applied filter is clearly displayed on the transactions list, allowing users to see which filter is currently active.
- Users can clear all filters with a single click, returning the list to its unfiltered state.
- The transactions list updates in real-time as filters are applied or removed.
- If no transactions match the selected filter criteria, a message is displayed indicating that no transactions were found.
- The filter interface is intuitive and easy to use, ensuring that new users can easily understand how to apply and clear filters.

## Tasks

- [ ] Create feature branch `feature/filter-transactions`
- [ ] Create a `<form>` element
- [ ] Implement drop down picker:
  - [ ] Add `<select>` field with default value "Please select a category"
  - [ ] Loop over `<option>` elements with the category items
- [ ] Add handleFilterCategory to the HomePage
- [ ] Add state : const [filterCategory, setFilterCategory] = useState('')
- [ ] Inside the handleSubmit function of the form call the prop onSubmit and pass the formData to it
- [ ] Implement the filter functionality depending of useState()
- [ ] Fill the list with the filtered data
- [ ] If no results display -> "No results available"
