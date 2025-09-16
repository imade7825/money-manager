import styled from "styled-components";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

const euro = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

function buildAccountBalanceSeries(transactions = [], dateFrom, dateTo) {
  const startDate = dateFrom ? new Date(dateFrom) : null;
  const endDate = dateTo ? new Date(dateTo) : null;

  const filteredTransactions = transactions
    .filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      if (startDate && transactionDate < startDate) return false;
      if (endDate && transactionDate > endDate) return false;
      return true;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const sumsByDay = new Map();
  for (const transaction of filteredTransactions) {
    const dayKey = new Date(transaction.date).toISOString().slice(0, 10);
    const transactionAmount = Number(transaction.amount);
    if (!Number.isFinite(transactionAmount)) continue;
    sumsByDay.set(dayKey, (sumsByDay.get(dayKey) ?? 0) + transactionAmount);
  }

  const sortedDays = Array.from(sumsByDay.keys()).sort();
  let runningBalance = 0;
  const balanceSeries = [];
  for (const dayKey of sortedDays) {
    runningBalance += sumsByDay.get(dayKey);
    balanceSeries.push({
      date: dayKey,
      balance: Number(runningBalance.toFixed(2)),
    });
  }

  return balanceSeries;
}

export default function AccountBalanceTimeLine({
  transactions = [],
  startDate,
  endDate,
}) {
  const data = buildAccountBalanceSeries(transactions, startDate, endDate);
  return (
    <Wrapper as="figure" aria-labelledby="timeline-title" role="group">
      <Title id="timeline-title">Transactions by Time</Title>
      <CardLike>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              minTickGap={24}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("de-DE")
              }
              tickMargin={8}
            />
            <YAxis width={96} tickFormatter={(value) => euro.format(value)} />
            <ReferenceLine y={0} strokeDasharray="2 2" />
            <Tooltip
              labelFormatter={(value) =>
                new Date(value).toLocaleDateString("de-DE")
              }
              formatter={(value) => [euro.format(value), "Balance"]}
            />
            <Line
              type="monotone"
              dataKey="balance"
              dot={true}
              strokeWidth={2}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardLike>
      <SrCaption>
        Cumulative account balance per day. Zero line marks negative vs positive
        values
      </SrCaption>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 560px;
  margin: 0 auto;
  padding: 12px;
  background: var(--surface-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
`;

const CardLike = styled.div`
  background: var(--surface);
  border-radius: var(--radius);
  width: 100%;
  height: 300px;
`;

const Title = styled.h2`
  margin: 0 0 12px;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: left;
`;

const SrCaption = styled.figcaption`
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
