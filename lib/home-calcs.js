export function getFilteredTransactions(transactions = [], category = "") {
  if (!category) return transactions;
  return transactions.filter(
    (transaction) => transaction.category === category
  );
}

export function getTotals(transactions = []) {
  let income = 0;
  let expense = 0;

  for (let transaction of transactions) {
    const amount = Number(transaction?.amount) || 0;
    if (transaction?.type === "income") income += amount;
    else if (transaction?.type === "expense") expense += amount;
  }
  return {
    income,
    expense,
    balance: income - expense,
  };
}
