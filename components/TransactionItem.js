import styled from "styled-components";

export default function TransactionItem({ transaction, onEdit, onDelete }) {
  return (
    <StyledTransactionItem key={transaction._id}>
      <TransactionsName title={transaction.name ?? ""}>
        {transaction.name}
      </TransactionsName>
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
        <button
          onClick={() => onEdit(transaction)}
          data-tour="edit-transaction"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(transaction._id)}
          data-tour="delete-transaction"
        >
          Delete
        </button>
      </Actions>
    </StyledTransactionItem>
  );
}

const StyledTransactionItem = styled.li`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto auto;
  gap: 6px 10px;
  background: var(--surface-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 10px 12px;
`;

const TransactionsName = styled.h3`
  grid-column: 1 / -1;
  grid-row: 1 / 2;
  margin: 0;
  padding-bottom: 3px;
  font-size: 1rem;
  font-weight: 600;
  color: var(--foreground);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const CategoryBadge = styled.span`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  justify-self: start;
  padding: 5px 8px;
  border-radius: 999px;
  background: var(--pb-100);
  color: var(--pb-800);
  font-size: 0.8rem;
  font-weight: 600;
`;
const Amount = styled.span`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  align-self: start;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ $type }) =>
    $type?.toLowerCase() === "income" ? "var(--positive)" : "var(--negative)"};
`;

const DateText = styled.span`
  grid-column: 1 / 2;
  grid-row: 3 / 4;
  font-size: 0.85rem;
  padding-top: 9px;
  color: var(--muted-foreground);
`;

const Actions = styled.div`
  grid-column: 2 / 3;
  grid-row: 3 / 4;
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
