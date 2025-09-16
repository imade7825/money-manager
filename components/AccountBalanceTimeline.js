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

function buildBalanceSeries(transactions = [], startDate, endDate) {
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  const filtered = transactions
    .filter((transaction) => {
      const date = new Date(transaction.date);
      if (start && date < start) return false;
      if (end && date > end) return false;
      return true;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  //Sum per day, then running balance

  const byDay = new Map();
  for (const transaction of filtered) {
    const day = new Date(transaction.date).toISOString().slice(0, 10);
    const amount = Number(transaction.amount);
    if (!Number.isFinite(amount)) continue; // falls Wert Mist ist - wird übersprungen
    byDay.set(day, (byDay.get(day) ?? 0) + amount);
  }

  const days = Array.from(byDay.keys()).sort();
  let running = 0;
  const series = [];
  for (const day of days) {
    running += byDay.get(day);
    series.push({ date: day, balance: Number(running.toFixed(2)) });
  }
  return series;
}

export default function AccountBalanceTimeLine({
  transactions = [],
  startDate,
  endDate,
}) {
  const data = buildBalanceSeries(transactions, startDate, endDate);
  return (
    <Wrapper as="figure" aria-labelledby="timeline-title" role="group">
      <Title id="timeline-title">Transactions by Time</Title>
      <CardLike>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray={"3 3"}>
              <XAxis
                dataKey="date"
                minTickGap={24}
                tickFormatter={(value) => new Date(value).toDateString("de-DE")}
              />
              <YAxis width={72} tickFormatter={(value) => euro.format(value)} />
              <ReferenceLine y={0} strokeDasharray={"2 2"} />
              <Tooltip
                labelFormatter={(value) =>
                  new Date(value).toLocaleDateString("de-DE")
                }
                formatter={(value) => [euro.format(value), "Balance"]}
              />
              <Line
                type="monotone"
                dataKey="balance"
                dot={false}
                strokeWidth={2}
                isAnimationActive={false}
              />
            </CartesianGrid>
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

const EmptyState = styled.p`
  text-align: center;
  margin: 12px 0;
  color: var(--muted-foreground, #6b7280);
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
