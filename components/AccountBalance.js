import styled from "styled-components";

export default function AccountBalance({ transactions }) {
  if (!transactions) return null;

  const balanceTotal = transactions.reduce((acc, transaction) => {
    return acc + Number(transaction.amount);
  }, 0);

  return (
    <StyledAccountBalance balance={balanceTotal}>
      <h2>Account balance</h2>
      <h3>
        {new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(balanceTotal)}
      </h3>
    </StyledAccountBalance>
  );
}

const StyledAccountBalance = styled.div`
  color: ${({ balance }) => (balance > 0 ? "green" : "red")};
  padding: 25px 35px;
  background: whitesmoke;
  border-radius: 25px;
  text-align: center;
  border: 2px solid black;
  max-width: 450px;
  margin-bottom: 1rem;
`;
