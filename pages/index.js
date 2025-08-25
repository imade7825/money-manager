import useSWR from "swr";
import styled from "styled-components";

export default function HomePage() {
  const {
    data: transactions,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/transactions");

  if (error) return <div>failed to load</div>;
  if (isLoading) return <p>is Loading...</p>;

  const incomeTotal = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expenseTotal = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc - transaction.amount, 0);
  const balanceTotal = incomeTotal - expenseTotal;

  return (
    <>
      <StyledAccountBalance balance={balanceTotal}>
        <p>Account balance</p>
        {balanceTotal}
      </StyledAccountBalance>

      <TransactionsList>
        {transactions.map((transaction) => {
          return (
            <TransactionItem key={transaction._id}>
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
              }).format(Number(transaction.amount) || 0)}
              <Amount $type={transaction.type}>
                {transaction.type && `${transaction.type}`}
              </Amount>
              <CategoryBadge>
                {transaction.category ?? "Uncategorisiert"}
              </CategoryBadge>
              <DateText>
                {new Date(transaction.date).toLocaleDateString("de-DE")}
              </DateText>
            </TransactionItem>
          );
        })}
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

const TransactionItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid black;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  text-align: center;
  border-radius: 15px;
`;

const Amount = styled.span`
  font-weight: bold;
  color: ${({ $type }) =>
    $type?.toLowerCase() === "income" ? "green" : "red"};
`;

const DateText = styled.span`
  font-size: 0.9rem;
`;

const StyledAccountBalance = styled.h2`
  color: ${({ balance }) => (balance > 0 ? "green" : "red")};
  padding: 25px 35px;
  background: whitesmoke;
  border-radius: 25px;
  text-align: center;
  border: 2px solid black;
  max-width: 450px;
`;

const CategoryBadge = styled.span`
  margin-left: 0.5rem;
  padding: 0.1rem 0.5rem;
  border: 1.5px solid black;
  border-radius: 10px;
  background: #fff;
  font-size: 0.85rem;
`;
