import styled from "styled-components";

export default function Form({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data.amount = Number(data.amount);
    onSubmit(data);
    form.reset();
  }

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
        ></Input>
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          placeholder="Please add amount"
          required
        ></Input>
        <select id="category" name="category" required defaultValue="">
          <option value="" disabled>
            --choose category--
          </option>
          <option>Education</option>
          <option>Entertainment</option>
          <option>Groceries</option>
          <option>Health</option>
          <option>Insurance</option>
          <option>Investment</option>
          <option>Miscellaneous</option>
          <option>Rent</option>
          <option>Restaurants</option>
          <option>Salary</option>
          <option>Savings</option>
          <option>Transportation</option>
          <option>Utilities</option>
        </select>
        <Label htmlFor="option1">Income</Label>
        <Input
          id="option1"
          value="income"
          name="type"
          type="radio"
          required
        ></Input>
        <Label htmlFor="option2">Expense</Label>
        <Input
          id="option2"
          value="expense"
          name="type"
          type="radio"
          required
        ></Input>
        <Label htmlFor="date">Date</Label>
        <Input id="date" name="date" type="date" required></Input>
        <button type="submit">Add</button>
        <button type="reset">Cancel</button>
      </FormContainer>
    </>
  );
}

const HeaderForm = styled.h2``;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 2px solid black;
  border-radius: 10px;
`;

const Label = styled.label`
  font-weight: bold;
`;
