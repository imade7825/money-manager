import useSWR from "swr";
import styled from "styled-components";
import BottomNav from "@/components/BottomNav";
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
    <>
      <PagePadding />
      <ChartWrapper>
        <ChartTitle>Transactions by Category</ChartTitle>
        <CategoryPieChart transactions={transactions} />
      </ChartWrapper>
      <BottomNav />
    </>
  );
}

const PagePadding = styled.div`
  height: 72px;
`;

const ChartWrapper = styled.section`
  max-width: 560px;
  margin: 0 auto;
  padding: 12px;
  background: var(--surface, #fff);
  border: 1px solid var(--border, #e5e7eb);
  border-radius: 16px;
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
