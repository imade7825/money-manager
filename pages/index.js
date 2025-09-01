import styled from "styled-components";
import { STATE } from "@/constants/state";
import AccountBalance from "@/components/AccountBalance";
import TransactionItem from "@/components/TransactionItem";
import Form from "@/components/TransactionForm";
import IncomeExpenseView from "@/components/IncomeExpenseView";
import ThemeToggle from "@/components/ThemeToggle";
import CategoryPieChart from "@/components/CategoryPieChart";
import AuthButtons from "@/components/AuthButtons";
import useSWR from "swr";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState(STATE.ALL);
  const [isChartVisible, setIsChartVisible] = useState(false);

  const { data: session, status } = useSession();



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

  const { data: categories = [] } = useSWR("api/categories");

  // filter Logik

  function handleFilterCategoryChange(event) {
    setFilterCategory(event.target.value); //<-- realtime active Filter
  }

  function handleClearFilter() {
    setFilterCategory("");
  }

  const filteredTransactions = useMemo(() => {
    let result = transactions;

    //ctegory filter
    if (filterCategory) {
      result = result.filter(
        (transaction) => transaction.category === filterCategory
      );
    }

    if (filterType != STATE.ALL) {
      result = result.filter((transaction) => transaction.type === filterType);
    }
    return result;
  }, [transactions, filterCategory, filterType]);

  //calculations
  const sumIncome = filteredTransactions
    .filter((transaction) => transaction.type === STATE.INCOME)
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const sumExpense = filteredTransactions
    .filter((transaction) => transaction.type === STATE.EXPENSE)
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const sumTotal = sumIncome - sumExpense;

  let filterBalance = 0;

  for (const transaction of filteredTransactions) {
    const amount = Number(transaction.amount) || 0;
    filterBalance += amount;
  }

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
    <AuthButtons/>
      <ThemeToggle />
      <AccountBalance transactions={transactions} />
      {filteredTransactions.length}{" "}
      {filteredTransactions.length === 1 ? "Result" : "Results"}, Balance:{" "}
      <BalanceAmount $isPositive={filterBalance >= 0}>
        {new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(filterBalance)}
      </BalanceAmount>
      <FilterBar>
        <label htmlFor="filterCategory">Filter by category:</label>
        <select
          id="filterCategory"
          name="filterCategory"
          value={filterCategory}
          onChange={handleFilterCategoryChange}
        >
          <option value="">Please select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <ClearButton
          type="button"
          onClick={handleClearFilter}
          disabled={!filterCategory}
          aria-disabled={!filterCategory}
        >
          Clear Filter
        </ClearButton>
      </FilterBar>
      <ActiveFilterRow>
        <span>Active filter:</span>
        <ActiveBadge>{filterCategory || "None"}</ActiveBadge>
      </ActiveFilterRow>
      <IncomeExpenseView
        filteredTransactions={filteredTransactions}
        sumIncome={sumIncome}
        sumExpense={sumExpense}
        sumTotal={sumTotal}
        onFilter={setFilterType}
      />
      <ToggleButton onClick={handleToggle} disabled={editingTransaction}>
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
        <CollapsedPieChart $open={isChartVisible}>
          <CategoryPieChart transactions={transactions}></CategoryPieChart>
        </CollapsedPieChart>
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
const FilterBar = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 20px 10px;
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

