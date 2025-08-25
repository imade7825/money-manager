import useSWR from "swr";
import styled from "styled-components";

export default function HomePage() {
  const {
    data: transactions,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/transactions");
  //const { data: categories } = useSWR("/api/categories", fetcher);

  if (error) return;
  if (isLoading) return <p>is Loading..</p>;

  const incomeTotal = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expenseTotal = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc - transaction.amount, 0);
  const balanceTotal = incomeTotal - expenseTotal;
  console.log(balanceTotal);

  return (
    <>
     <StyledAccountBalance balance={balanceTotal}>
        <p>Account balance</p>
        {balanceTotal}
      </StyledAccountBalance>
    
     
    </>
  );
}

const StyledAccountBalance = styled.h2`
  color: ${({ balance }) =>
    balance > 0 ? "green" :  "red" };
  padding: 25px 35px;
  background: whitesmoke;
  border-radius: 25px;
  text-align: center;
  border: 2px solid black;
  max-width: 450px;
`;
