import styled from "styled-components";

export default function TransactionItem({ transaction, onEdit, onDelete }) {
  return (
    <StyledTransactionItem key={transaction._id}>
      <CategoryBadge>{transaction.category ?? "Uncategorisiert"}</CategoryBadge>
      <Amount $type={transaction.type}>
        {new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(Number(transaction.amount) || 0)}
      </Amount>

      <DateText>
        {new Date(transaction.date).toLocaleDateString("de-DE")}
      </DateText>
      <Actions>
        <button onClick={() => onEdit(transaction)}>Edit</button>
        <button onClick={() => onDelete(transaction._id)}>Delete</button>
      </Actions>
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
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  justify-self: start;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--pb-100);
  color: var(--pb-800);
  font-size: 0.8rem;
  font-weight: 600;
`;

const Actions = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: flex;
  gap: 8px;
  justify-self: end;
  & > button {
    padding: 4px 8px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--surface);
  }
`;
