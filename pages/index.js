import useSWR from "swr";
import styled from "styled-components";
import AccountBalance from "@/components/AccountBalance";
import TransactionItem from "@/components/TransactionItem";

export default function HomePage() {
  const { data: transactions, error, isLoading } = useSWR("/api/transactions");

  if (error) return <div>failed to load</div>;
  if (isLoading) return <p>is Loading...</p>;

  return (
    <>
      <AccountBalance transactions={transactions} />

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
