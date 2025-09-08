import styled from "styled-components";
import useSWR from "swr";
import { STATE } from "@/constants/state";
import { useState } from "react";
import AccountBalance from "@/components/AccountBalance";
import TransactionItem from "@/components/TransactionItem";
import IncomeExpenseView from "@/components/IncomeExpenseView";
import Pagination from "@/components/Pagination";
import FilterBar from "@/components/FilterBar";
import { getFilteredTransactions, getTotals } from "@/lib/home-calcs";
import { Card } from "@/components/ui/Primitives";
import AuthButtons from "@/components/AuthButtons";
import ThemeToggle from "@/components/ThemeToggle";
import TransactionForm from "@/components/TransactionForm.js";

export default function HomePage() {
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  //pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [filters, setFilters] = useState({ category: "", type: STATE.ALL });

  //Data
  const {
    data: transactions = [],
    error,
    isLoading,
    mutate,
  } = useSWR("/api/transactions");
  const { data: categories = [] } = useSWR("/api/categories");

  // Helpers
  const filteredTransactions = getFilteredTransactions(transactions, filters);
  const {
    income: sumIncome,
    expense: sumExpense,
    balance: sumTotal,
  } = getTotals(filteredTransactions);

  const start = (currentPage - 1) * pageSize;
  const paginatedTransactions = filteredTransactions.slice(
    start,
    start + pageSize
  );

  //Early returns
  if (error) return <div>failed to load</div>;
  if (isLoading) return <p>Loading...</p>;

  // Handler
  function handleCancelEdit() {
    setEditingTransaction(null);
    setIsFormOpen(false);
  }

  //Filter section
  function setFilterCategory(value) {
    setFilters((filter) => ({ ...filter, category: value }));
  }

  function setFilterType(value) {
    setFilters((filter) => ({ ...filter, type: value }));
  }
  function handleFilterClear() {
    setFilterCategory("");
  }

  //pagination and values
  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / pageSize)
  );

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
      <CardControls>
        <AuthButtons />
        <ThemeToggle></ThemeToggle>
      </CardControls>
      <Card>
        <AccountBalance transactions={filteredTransactions} />
      </Card>
      <CardFilter>
        {isFormOpen && editingTransaction && (
          <TransactionForm
            key={editingTransaction._id}
            defaultValues={editingTransaction}
            onSubmit={(data) => handleUpdate(editingTransaction._id, data)}
            onCancel={handleCancelEdit}
          />
        )}
        <FilterBar
          value={filters.category}
          categories={categories}
          onChangeCategory={setFilterCategory}
          onClearCategory={handleFilterClear}
        />

        <ActiveFilterRow>
          <span>Active filter:</span>
          <ActiveBadge>{filters.category || "None"}</ActiveBadge>
        </ActiveFilterRow>

        <IncomeExpenseView
          filteredTransactions={filteredTransactions}
          sumIncome={sumIncome}
          sumExpense={sumExpense}
          sumTotal={sumTotal}
          filterType={filters.type}
          onFilter={setFilterType}
        />
      </CardFilter>

      <TransactionsList>
        {filteredTransactions.length === 0 ? (
          <EmptyState>No Results available</EmptyState>
        ) : (
          paginatedTransactions.map((transaction) => (
            <TransactionItem
              onEdit={handleEdit}
              onDelete={handleDelete}
              transaction={transaction}
              key={transaction._id}
              onFilter={setFilterType}
            />
          ))
        )}

        {
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        }
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
  gap: 0.6rem;
  align-items: stretch;
  max-width: 480px;
  margin-inline: auto;
`;

const ActiveFilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin: 0 12px 8px;
  font-size: 0.95rem;
`;

const ActiveBadge = styled.span`
  padding: 0.2rem 0.6rem;
  border: 2px solid #000;
  border-radius: 999px;
  background: var(--pb-100);
  color: var(--pb-700);
  border: 1px solid var(--pb-200);
`;

const EmptyState = styled.p`
  margin: 0.5rem 12px;
  opacity: 0.8;
  text-align: center;
`;

const CardControls = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardFilter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  background: var(--surface-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 12px;
  margin-bottom: 10px;
`;
