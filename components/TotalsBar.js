import { toCurrencyEUR } from "@/lib/format";

export default function TotalsBar({ totals }) {
  const { income, expense, balance } = totals || {};
  return (
    <section aria-label="Totals">
      <div>Income: {toCurrencyEUR(income)}</div>
      <div>Expense: {toCurrencyEUR(expense)}</div>
      <div>Income: {toCurrencyEUR(balance)}</div>
    </section>
  );
}
