import { STATE } from "@/constants/state";

export function getFilteredTransactions(transactions, filters) {
  return transactions.filter((transaction) => {
    // Kategorie-Filter prüfen
    const matchesCategory =
      !filters.category || transaction.category === filters.category;

    // Typ-Filter prüfen (ALL, INCOME, EXPENSE)
    const matchesType =
      filters.type === STATE.ALL ||
      (filters.type === STATE.INCOME && transaction.type === "income") ||
      (filters.type === STATE.EXPENSE && transaction.type === "expense");

    // Datum von bis

    const txDate = new Date(transaction.date);
    let fromOk = true;

    if (filters.dateFrom) {
      const from = new Date(filters.dateFrom);
      fromOk = txDate >= from;
    }

    let toOk = true;
    if (filters.dateTo) {
      const toExclusive = new Date(filters.dateTo);
      toExclusive.setDate(toExclusive.getDate() + 1); // custom date +1 Tag
      toOk = txDate < toExclusive;
    }

    return matchesCategory && matchesType && fromOk && toOk;
  });
}

export function getTotals(transactions) {
  let income = 0;
  let expense = 0;

  for (let transaction of transactions) {
    const amount = Number(transaction?.amount);
    if (transaction?.type === "income") income += amount;
    else if (transaction?.type === "expense") expense += amount;
  }
  return {
    income,
    expense,
    balance: income + expense,
  };
}
