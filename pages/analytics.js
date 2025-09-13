import useSWR from "swr";
import styled from "styled-components";
import CategoryPieChart from "@/components/CategoryPieChart";
import { Card } from "@/components/ui/Primitives";
export default function PieChart() {
  const {
    data: transactions = [],
    error,
    isLoading,
  } = useSWR("/api/transactions");
  if (error) return <StatusMessage>Failed to load transactions</StatusMessage>;
  if (isLoading) return <StatusMessage>Loading transactions...</StatusMessage>;

  return (
    <ChartWrapper as="figure" aria-labelledby="chart-title" role="group" data-tour="analytics-chart">
      <ChartTitle id="chart-title">Transactions by Category</ChartTitle>
      <Card>
        <CategoryPieChart transactions={transactions} aria-hidden />
      </Card>
      <ScreenReaderfigcaption>
        <p role="note" aria-label="Pie chart summary">
          Pie chart showing expenses by category.Largest category is Food (350€).
        </p>
      </ScreenReaderfigcaption>
    </ChartWrapper>
  );
}

const ChartWrapper = styled.section`
  max-width: 560px;
  margin: 0 auto;
  padding: 12px;
  background: var(--surface-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
`;

const ChartTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: left;
`;

const StatusMessage = styled.p`
  margin: 16px 20px;
  font-size: 0.95rem;
  color: var(--muted-foreground, #6b7280);
`;

const ScreenReaderfigcaption = styled.figcaption`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 1px, 1px);
  white-space: nowrap;
  border: 0;
`