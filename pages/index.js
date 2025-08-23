import useSWR from "swr";



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
      <ul>
        {transactions.map((transaction) => {
          return <li key={transaction._id}>{transaction.amount}</li>;
        })}
      </ul>
      <h2>total Balance: {balanceTotal}</h2>
    </>
  );
}
