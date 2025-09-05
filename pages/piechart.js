import useSWR from "swr";
import styled from "styled-components";
import CategoryPieChart from "@/components/CategoryPieChart";

export default function PieChart() {
  const {
    data: transactions = [],
    error,
    isLoading,
  } = useSWR("/api/transactions");
  if (error) return <StatusMessage>Failed to load transactions</StatusMessage>;
  if (isLoading) return <StatusMessage>Loading transactions...</StatusMessage>;

  return (
    <ChartWrapper>
      <ChartTitle>Transactions by Category</ChartTitle>
      <CategoryPieChart transactions={transactions} />
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
