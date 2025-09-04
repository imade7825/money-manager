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
  if (error) return <Msg>Failed to load transactions</Msg>;
  if (isLoading) return <Msg>Loading transactions...</Msg>;

  return (
    <>
      <Pad />
      <header>Transactions by Category</header>
      <Section>
        <CategoryPieChart transactions={transactions} />
      </Section>
      <BottomNav />
    </>
  );
}

const Pad = styled.div`
  height: 72px;
`;
const Header = styled.h2`
  margin: 16px 20px;
`;
const Section = styled.section`
  padding: 0 12px 24px;
`;
const Msg = styled.p`
  margin: 16px 20px;
`;
