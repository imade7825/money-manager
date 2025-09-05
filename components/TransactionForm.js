import { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";

export default function Form({ onSubmit, defaultValues, onCancel }) {
  const { data: categories, isLoading, error } = useSWR("/api/categories");

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    let amount = Math.abs(Number(data.amount));
    if (data.type === "expense") {
      amount = -amount;
    }
    data.amount = amount;

    setIsButtonDisabled(true);
    await onSubmit(data);
    setIsButtonDisabled(false);

    form.reset();
    form.elements.name.focus();
  }

  function handleReset() {
    onCancel?.();
  }

  const today = new Date().toISOString().slice(0, 10);
  if (error) return <p>Failed to load categories</p>;
  if (isLoading) return <p>Loading categories...</p>;
  return (
    <>
      <HeaderForm>Please fill out all fields</HeaderForm>
      <FormContainer onSubmit={handleSubmit}>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Please add your name"
          required
          defaultValue={defaultValues?.name}
        />
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          name="amount"
          min="1"
          type="number"
          placeholder="Please add amount"
          required
          defaultValue={defaultValues?.amount}
        />
        <select
          id="category"
          name="category"
          defaultValue={defaultValues?.category}
          required
        >
          <option value="" disabled>
            Choose category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <Label htmlFor="option1">Income</Label>
        <Input id="option1" value="income" name="type" type="radio" required />
        <Label htmlFor="option2">Expense</Label>
        <Input id="option2" value="expense" name="type" type="radio" required />
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          name="date"
          type="date"
          required
          defaultValue={
            defaultValues?.date
              ? new Date(defaultValues.date).toISOString().slice(0, 10)
              : today
          }
        />
        <AddButton type="submit" disabled={isButtonDisabled}>
          Add
        </AddButton>
        <CancelButton
          type="reset"
          onClick={handleReset}
          disabled={isButtonDisabled}
        >
          Cancel
        </CancelButton>
      </FormContainer>
    </>
  );
}

const HeaderForm = styled.h3`
  margin: 0 0 0.25rem;
`;

const FormContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;
const Input = styled.input`
  background: var(--surface-elevated);
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
`;

const Label = styled.label`
  grid-column: 1/1;
  font-weight: 600;
`;

const AddButton = styled.button`
  grid-column: 1/-1;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--primary);
  color: var(--primary);
`;
const CancelButton = styled.button`
  grid-column: 1/-1;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--primary);
  color: var(--primary);
`;
