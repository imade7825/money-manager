import { STATE } from "@/constants/state";
import styled from "styled-components";

export default function IncomeExpenseView({

  sumIncome,
  sumExpense,
  sumTotal,
  onFilter,
  filterType,
}) {


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
    <form aria-labelledby="type-legend">
      <fieldset>
      <Legend id="type-legend">Filter by type</Legend>
      <Pills>
      {Object.entries(STATE).map(([key, value]) => (
        <PillLabel key={key}>
          <input
            type="radio"
            name="state"
            value={value}
            checked={filterType === value}
            onChange={handleFilterType}
          />
          {formatLabel(key)}
        </PillLabel>

      ))}
      </Pills>
    </fieldset>
    </form>
  );
}

const PillLabel = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  border-radius: 25px;
  cursor: pointer;
  user-select: none;

  > span {
    display: inline-block;
    padding: 8px 14px;
    border-radius: 25px;
    font-weight: 700;
    line-height: 1;
  }
  &:hover > span {
    background: color-mix(in oklab, var(--pb-100, #d4eeff) 60%, transparent);
  }
  input:focus-visible + span {
    outline: 3px solid var(--focus-ring, #0b43ff);
    outline-offset: 2px;
  }
  input:checked + span {
    background: var(--pb-100, #d4eeff);
    color: var(--pb-900, #0f34a0);
    box-shadow: 0 0 0 1px var(--pb-400, #559aff) inset;
  }
`;


const Legend = styled.legend`
  position: absolute;
  width: 1px; height: 1px; overflow: hidden;
  clip: rect(0 0 0 0); white-space: nowrap; border: 0; padding: 0; margin: -1px;
`;

const Pills = styled.div`
  display: inline-flex;
  gap: 6px;
  padding: 6px;
  border-radius: 999px;
  background: var(--surface, #f7f9fc);
  box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--pb-200, #b3dcff) 60%, transparent);
`;

const HiddenRadio = styled.input`
  position: absolute;
  opacity: 0;
  width: 1px; height: 1px;
  margin: 0;
  pointer-events: none;
`;

const Hint = styled.p`
  margin: 6px 2px 0;
  font-size: 0.85rem;
  color: var(--muted-foreground, #6b7280);
`;

const Total = styled.p`
  margin: 10px 0 0;
  font-weight: 600;
`;