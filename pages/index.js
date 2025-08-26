import useSWR from "swr";
import styled from "styled-components";
import AccountBalance from "@/components/AccountBalance";
import TransactionItem from "@/components/TransactionItem";
import Form from "@/components/CreateTransaction";
import { useState } from "react";

export default function HomePage() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  function handleToggle() {
    setIsFormVisible(!isFormVisible);
    if (isFormVisible) setEditingTransaction(null);
  }

  function handleCancel() {
    setEditingTransaction(null);
    setIsFormVisible(false);
  }

  const {
    data: transactions = [],
    error,
    isLoading,
    mutate,
  } = useSWR("/api/transactions");

  if (error) return <div>failed to load</div>;
  if (isLoading) return <p>Loading...</p>;

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

  async function handleUpdate(id, formData) {
    const response = await fetch(`/api/transactions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      console.error("Update Failed");
      return;
    }
    await response.json();
    setEditingTransaction(null);
    setIsFormVisible(false);
    await mutate();
  }

  function handleEdit(transaction) {
    setEditingTransaction(transaction);
    setIsFormVisible(true);
  }

  async function handleDelete(id) {
    const confirm = window.confirm(
      "Are you sure that you want to delete this transaction?"
    );

    if (!confirm) return;

    const response = await fetch(`/api/transactions/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error("Delete failed");
      return;
    }
    await mutate();
  }

  return (
    <>
      <AccountBalance transactions={transactions} />
      <ToggleButton onClick={handleToggle}>
        {isFormVisible ? `Hide Form` : "Show Form"}
      </ToggleButton>
      {isFormVisible && (
        <Form
          onSubmit={
            editingTransaction
              ? (data) => handleUpdate(editingTransaction._id, data)
              : handleSubmit
          }
          defaultValues={editingTransaction}
          transactions={transactions}
          onCancel={handleCancel}
        />
      )}
      <TransactionsList>
        {(transactions ?? []).map((transaction) => (
          <TransactionItem
            onEdit={handleEdit}
            onDelete={handleDelete}
            transaction={transaction}
            key={transaction._id}
          />
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
  margin: 15px 20px;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 2px solid #000;
  background: #000;
  color: #fff;
  font-weight: bold;
`;
