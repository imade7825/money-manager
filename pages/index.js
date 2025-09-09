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

  const isFiltered = Boolean(filters.category) || filters.type !== STATE.ALL;

  const start = (currentPage - 1) * pageSize;
  const paginatedTransactions = filteredTransactions.slice(
    start,
    start + pageSize
  );

  //Early returns
  if (error)
    return (
      <Status role="status" aria-live="polite">
        failed to load
      </Status>
    );
  if (isLoading)
    return (
      <Status role="status" aria-live="polite">
        Loading...
      </Status>
    );

  // Handler
  function handleCancelEdit() {
    setEditingTransaction(null);
    setIsFormOpen(false);
  }

  //Filter section
  function setFilterCategory(value) {
    setFilters((filter) => ({ ...filter, category: value }));
    setCurrentPage(1);
  }

  function setFilterType(value) {
    setFilters((filter) => ({ ...filter, type: value }));
    setCurrentPage(1);
  }

  function handleFilterClear() {
    setFilterCategory("");
  }

  function handleFilterReset() {
    setFilters({ category: "", type: STATE.ALL });
    setCurrentPage(1);
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
    <Main aria-label="Finance dashboard">
      <CardControls>
        <AuthButtons />
      </CardControls>
      <Card>
        <AccountBalance transactions={transactions} />
      </Card>
      <CardFilter>
        {isFiltered && (
          <FilteredBalanceRow>
            <FilteredBalance
              $neg={sumTotal < 0}
              title="Filtered Balance:"
              aria-live="polite"
              aria-label={`Filtered balance is ${sumTotal.toFixed(2)} euros`}
            >
              Filtered Balance: {sumTotal.toFixed(2)} €
            </FilteredBalance>
          </FilteredBalanceRow>
        )}
        <FilterBar
          value={filters.category}
          categories={categories}
          onChangeCategory={setFilterCategory}
          onClearCategory={handleFilterClear}
        />

        <ActiveFilterRow>
          <span role="label">Active filter:</span>
          <ActiveBadge role="label">{filters.category || "None"}</ActiveBadge>
        </ActiveFilterRow>

        <IncomeExpenseView
          filteredTransactions={filteredTransactions}
          sumIncome={sumIncome}
          sumExpense={sumExpense}
          sumTotal={sumTotal}
          filterType={filters.type}
          onFilter={setFilterType}
        />
        {(filters.category || filters.type !== STATE.ALL) && (
          <ClearFilterButton
            onClick={handleFilterReset}
            aria-label="Reset all filters"
          >
            Reset
          </ClearFilterButton>
        )}
      </CardFilter>

      <TransactionsList aria-labelledby="transactions-title">
        <ScreenReaderH2 id="transactions-title">Transactions</ScreenReaderH2>
        {filteredTransactions.length === 0 ? (
          <EmptyState>No Results Available</EmptyState>
        ) : (
          paginatedTransactions.map((transaction) => (
            <TransactionsListItem key={transaction._id}>
              <TransactionItem
                onEdit={handleEdit}
                onDelete={handleDelete}
                transaction={transaction}
                onFilter={setFilterType}
              />
              {isFormOpen && editingTransaction?._id === transaction._id && (
                <InlineEdit>
                  <TransactionForm
                    key={`edit-${transaction._id}`}
                    defaultValues={editingTransaction}
                    onSubmit={(data) => handleUpdate(transaction._id, data)}
                    onCancel={handleCancelEdit}
                  />
                </InlineEdit>
              )}
            </TransactionsListItem>
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
    </Main>
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
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 0 12px 8px;
  min-width: 0;
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

const ClearFilterButton = styled.button`
  margin-left: auto;
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--pb-300);
  background: var(--surface);
  color: var(--pb-700);
  cursor: pointer;
`;

const FilteredBalance = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid var(--pb-200);
  background: var(--surface);
  font-weight: 700;
  white-space: nowrap;
  color: ${({ $neg }) => ($neg ? "#b91c1c" : "#166534")};
  min-width: 100%;
  overflow: hidden;
`;

const FilteredBalanceRow = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  margin: 0 12px 8px;
  min-width: 0;
`;
const InlineEdit = styled.div`
  margin: 6px 0 10px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  padding: 8px 0;
`;

/* a11y */

const Main = styled.main`
  display: block;
`;

const Status = styled.p`
  margin: 16px 20px;
`;

const TransactionsListItem = styled.li`
  list-style: none;
`;

const ScreenReaderH2 = styled.h2`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 1px, 1px);
  white-space: nowrap;
  border: 0;
`;
