# Accessibility Improvements

## Value Proposition

**As a user** with diverse accessibility needs

**I want to** follow accessibility best practices(WCAG, ARIA)

**so that** I can navigate, read, and interact with all features without barriers

## Description

- Check all tags and make sure to use them with semantic meaning ( ex. headings, labels, buttons)
- Add ARIA attributes where needed
- Provide focus states for interactive elements (keyboard navigation)
- Improve color contrasts in light/dark mode
- Provide accessible names for icons ex. - ThemeToggle in DarkMode
- Provide PieChart with alt="" text input

## Acceptance Criteria

- All form `inputs` have associated `<label>` elements or `aria-label`
- Buttons and toggles have meaningful `aria-label` text
- Keyboard users can tab through interactive elements
- Contrast ratio meets contrast AA from WCAG in both modes (light/dark)
- Non-text elements (DarkMode Toggle) have text alternatives or description

## Tasks

- [ ] Review all components (AuthButtons, FilterBar, TransactionForm, TransactionItem, ThemeToggle, Pagination, CategoryPieChart) for missing accessibility attributes
- [ ] Add `aria-label` to buttons like Sing in / Sing- out, ThemeToggle, Edit/Delete
- [ ] Create a component for the balance
- [ ] Check `<label htmlFor` is used for all form inputs
- [ ] Add keyboard focus styles in styled-components
- [ ] Verify color contrast with tools (Chrome - Lighthouse )
- [ ] Provide summary text for PieChart - pageReader does't read .SVG charts ex. `<p role="note" aria-label="Pie chart summary">`
