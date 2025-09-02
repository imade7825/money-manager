import styled from "styled-components";
import { STATE } from "@/constants/state";
import AccountBalance from "@/components/AccountBalance";
import TransactionItem from "@/components/TransactionItem";
import Form from "@/components/TransactionForm";
import IncomeExpenseView from "@/components/IncomeExpenseView";
import ThemeToggle from "@/components/ThemeToggle";
import AuthButtons from "@/components/AuthButtons";
import useSWR from "swr";
import { useState } from "react";
import FilterBar from "@/components/FilterBar";
import TotalsBar from "@/components/TotalBar";
import PieChartSection from "@/components/PieChartSection";
import { getFilteredTransactions, getTotals } from "@/lib/home-calcs";
import { toCurrencyEUR, toDateDE } from "@/lib/format";

export default function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filters, setFilters] = useState({ category: "", type: STATE.ALL });
  const [isChartOpen, setIsChartOpen] = useState(false);

  //Data
  const {
    data: transactions = [],
    error,
    isLoading,
    mutate,
  } = useSWR("/api/transactions");
  const { data: categories = [] } = useSWR("/api/categories");

  //Early returns
  if (error) return <div>failed to load</div>;
  if (isLoading) return <p>Loading...</p>;

  // Helpers
  const filtered = getFilteredTransactions(transactions, filters);
  const { sumIncome, sumExpense, sumTotal, filterBalance } =
    getTotals(filteredTransactions);

  // Handler
  function handleToggleForm() {
    setIsFormOpen(!isFormOpen);
    if (isFormOpen) setEditingTransaction(null);
  }

  function handleCancelEdit() {
    setEditingTransaction(null);
    setIsFormOpen(false);
  }

  //Filter section
  function setFilterCategory(value) {
    setFilters((filter) => ({ ...filter, category: value }));
  }

  function handleFilterClear() {
    setFilterCategory("");
  }

  function setFilterType(value) {
    setFilters((filter) => ({ ...filter, type: value }));
  }

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

    response.json();
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
    response.json();
    setEditingTransaction(null);
    setIsFormOpen(false);
    await mutate();
  }

  function handleEdit(transaction) {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
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
      <AuthButtons />
      <ThemeToggle />
      <AccountBalance transactions={transactions} />
      <main>
        <TotalsBar
          count={filteredTransactions.length}
          balance={filterBalance}
        />
        <FilterBar
          value={filters.category}
          options={categories}
          onChange={setFilterCategory}
          onClear={() => setFilterCategory}
        >
          <button type="button" onClick={() => setIsChartOpen(!isChartOpen)}>
            {isChartOpen ? "Hide chart" : "Show chart"}
          </button>
          <PieChartSection open={isChartOpen} data={data} />
          <ul>
            {filtered.map((transaction) => (
              <li key={transaction._id}>
                <strong>{transaction.name}</strong> -{" "}
                {toCurrencyEUR(transaction.amount)} -{" "}
                {toDateDE(transaction.date)}
              </li>
            ))}
          </ul>
        </FilterBar>
      </main>
      <ActiveFilterRow>
        <span>Active filter:</span>
        <ActiveBadge>{filterCategory || "None"}</ActiveBadge>
      </ActiveFilterRow>
      <IncomeExpenseView
        filteredTransactions={filteredTransactions}
        sumIncome={sumIncome}
        sumExpense={sumExpense}
        sumTotal={sumTotal}
        filterType={filters.type}
        onFilter={(value) =>
          setFilters((filter) => ({ ...filter, type: value }))
        }
      />
      <ToggleButton onClick={handleToggleForm} disabled={editingTransaction}>
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
        {filteredTransactions.length === 0 ? (
          <EmptyState>No Results available</EmptyState>
        ) : (
          filteredTransactions.map((transaction) => (
            <TransactionItem
              onEdit={handleEdit}
              onDelete={handleDelete}
              transaction={transaction}
              key={transaction._id}
              onFilter={setFilterType}
            />
          ))
        )}
      </TransactionsList>
      <section>
        <ToggleButton
          type="button"
          onClick={() => setIsChartVisible(!isChartVisible)}
        >
          {isChartVisible ? "Hide Pie Chart" : "Show Pie Chart"}
        </ToggleButton>
      </section>
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
  border: 2px solid ${({ disabled }) => (disabled ? "#ccc" : "#000")};
  background: ${({ disabled }) => (disabled ? "#f8f9fa" : "#000")};
  color: ${({ disabled }) => (disabled ? "#6c757d" : "#fff")};
  font-weight: bold;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  transition: all 0.2s ease;
`;

const CollapsedPieChart = styled.div`
  margin-top: 12px;
  display: ${({ $open }) => ($open ? "block" : "none")};
`;

const ClearButton = styled.button`
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  border: 2px solid #000;
  background: transparent;
`;

const ActiveFilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 20px 10px;
  font-size: 0.95rem;
`;

const ActiveBadge = styled.span`
  padding: 0.1rem 0.5rem;
  border: 2px solid #000;
  border-radius: 999px;
  background: #fff;
`;

const EmptyState = styled.p`
  margin: 0.5rem 20px;
  opacity: 0.8;
`;

const BalanceAmount = styled.span`
  color: ${({ $isPositive }) => ($isPositive ? "#22c55e" : "#ef4444")};
  font-weight: bold;
`;
