import styled from "styled-components";
import useSWR from "swr";
import { STATE } from "@/constants/state";
import { useState } from "react";
import AccountBalance from "@/components/AccountBalance";
import TransactionItem from "@/components/TransactionItem";
import Form from "@/components/TransactionForm";
import IncomeExpenseView from "@/components/IncomeExpenseView";
import Pagination from "@/components/Pagination";
import FilterBar from "@/components/FilterBar";
import { getFilteredTransactions, getTotals } from "@/lib/home-calcs";
import ImportExportDataInCsv from "@/components/ImportExportDataInCsv";

export default function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

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

  //import data
  const [importedOnly, setImportedOnly] = useState(null);
  const baseTransactions = importedOnly ?? transactions;

  // Helpers
  const filteredTransactions = getFilteredTransactions(
    baseTransactions,
    filters
  );
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
      <AccountBalance transactions={transactions} />

      <FilterBarStyle
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
      <ImportExportDataInCsv
      importedItems={importedOnly}
        onImported={(newItems) => {
          setImportedOnly(newItems);
          setCurrentPage(1);
        }}
      />
      {isFormOpen && (
        <Form
          onSubmit={(data) => handleUpdate(editingTransaction._id, data)}
          defaultValues={editingTransaction}
          onCancel={handleCancelEdit}
        />
      )}

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
  gap: 0.5rem;
  align-items: center;
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
  background: var(--background);
  color: var(--foreground);
`;

const EmptyState = styled.p`
  margin: 0.5rem 20px;
  opacity: 0.8;
`;

const FilterBarStyle = styled(FilterBar)`
  flex: 1;
  min-width: 200px;
`;
