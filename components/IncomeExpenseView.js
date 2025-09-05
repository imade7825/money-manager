import { STATE } from "@/constants/state";
import styled from "styled-components";

export default function IncomeExpenseView({
  filteredTransactions,
  sumIncome,
  sumExpense,
  sumTotal,
  onFilter,
  filterType,
}) {
  // const [filterType, setFilterType] = useState(STATE.ALL);

  //Change radio button
  const handleFilterType = (event) => {
    const filterValue = event.target.value;
    onFilter(filterValue);
  };

  const totalLabel =
    filterType === STATE.INCOME
      ? `Total Income: €${sumIncome}`
      : filterType === STATE.EXPENSE
      ? `Total Expense: €${sumExpense}`
      : `Total Balance: €${sumTotal}`;

  const formatLabel = (key) => key.charAt(0) + key.slice(1).toLowerCase();

  return (
    <form>
      {Object.entries(STATE).map(([key, value]) => (
        <RadioLabel key={key}>
          <input
            type="radio"
            name="state"
            value={value}
            checked={filterType === value}
            onChange={handleFilterType}
          />
          {formatLabel(key)}
        </RadioLabel>
      ))}
    </form>
  );
}

const RadioLabel = styled.label`
  margin-right: 10px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  input {
    margin-right: 5px;
  }
`;
