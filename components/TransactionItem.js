import styled from "styled-components";

export default function TransactionItem({ transaction, onEdit, onDelete }) {
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
      <button onClick={() => onEdit(transaction)}>Edit</button>
      <button onClick={() => onDelete(transaction._id)}>Delete</button>
    </StyledTransactionItem>
  );
}

const StyledTransactionItem = styled.li`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  gap: 6px 10px;
  background: var(--surface-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 10px 12px;
`;

const Amount = styled.span`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  align-self: start;
  font-weight: 700;
  color: ${({ $type }) =>
    $type?.toLowerCase() === "income" ? "var(--positive)" : "var(--negative)"};
`;

const DateText = styled.span`
  grid-column: 1/2;
  grid-row: 2/3;
  font-size: 0.85rem;
  color: var(--muted-foreground);
`;

const CategoryBadge = styled.span`
  grid-column: 1/2;
  grid-row: 1/2;
  justify-self: start;
  padding: 2px 8px;
`;
