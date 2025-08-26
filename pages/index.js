import useSWR from "swr";
import styled from "styled-components";
import AccountBalance from "@/components/AccountBalance";
import TransactionItem from "@/components/TransactionItem";
import Form from "@/components/CreateTransaction";
import { useState } from "react";

export default function HomePage() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  function handleToggle() {
    setIsFormVisible(!isFormVisible);
  }

  const {
    data: transactions,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/transactions");

  if (error) return <div>failed to load</div>;
  if (isLoading) return <p>is Loading...</p>;

  async function handleSubmit(formData) {
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      console.error("POST failed");
      return;
    }

    await response.json();
    await mutate();
  }

  return (
    <>
      <AccountBalance transactions={transactions} />
      <ToggleButton onClick={handleToggle}>
        {isFormVisible ? `Hide Form` : "Show Form"}
      </ToggleButton>
      {isFormVisible && (
        <Form onSubmit={handleSubmit} transactions={transactions} />
      )}
      <TransactionsList>
        {transactions.map((transaction) => (
          <TransactionItem transaction={transaction} key={transaction._id} />
        ))}
      </TransactionsList>
    </>
  );
}

const TransactionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ToggleButton = styled.button`
  display: block;
  margin-left: auto;
  margin-right: 20px;
  margin-bottom: 10px;
`;
