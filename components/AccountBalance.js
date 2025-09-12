import styled from "styled-components";
import { toCurrencyEUR } from "@/lib/format";

export default function AccountBalance({ transactions }) {
  if (!transactions) return null;

  const balance = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  return (
    <BalanceContainer>
      <h2>Account Balance</h2>
      <BalanceValue
        $isNegative={balance < 0}
        aria-live="polite"
        aria-label={`Account is ${toCurrencyEUR(balance)}`}
      >
        {toCurrencyEUR(balance)}
      </BalanceValue>
    </BalanceContainer>
  );
}

const BalanceContainer = styled.div`
  background: linear-gradient(135deg, var(--pb-700), var(--pb-500));
  color: #fff;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 16px 18px;
  text-align: center;
`;

const BalanceValue = styled.h2`
  margin: 6px 0 0;
  font-size: 1.6rem;
  color: ${({ $isNegative }) =>
    $isNegative ? "var(--pb-50)" : "var(--pb-950)"};
`;
