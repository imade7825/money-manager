import styled from "styled-components";

export default function TransactionItem({ transaction }) {
  return (
    <StyledTransactionItem key={transaction._id}>
      {new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(Number(transaction.amount) || 0)}
      <Amount $type={transaction.type}>
        {transaction.type && `${transaction.type}`}
      </Amount>
      <CategoryBadge>{transaction.category ?? "Uncategorisiert"}</CategoryBadge>
      <DateText>
        {new Date(transaction.date).toLocaleDateString("de-DE")}
      </DateText>
      
    </StyledTransactionItem>
  );
}

const StyledTransactionItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid black;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  text-align: center;
  border-radius: 15px;
  max-width: 450px;
`;

const Amount = styled.span`
  font-weight: bold;
  color: ${({ $type }) =>
    $type?.toLowerCase() === "income" ? "green" : "red"};
`;

const DateText = styled.span`
  font-size: 0.9rem;
`;

const CategoryBadge = styled.span`
  margin-left: 0.5rem;
  padding: 0.1rem 0.5rem;
  border: 1.5px solid black;
  border-radius: 10px;
  background: #fff;
  font-size: 0.85rem;
`;
