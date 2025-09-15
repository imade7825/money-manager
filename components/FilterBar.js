import { useState } from "react";
import styled from "styled-components";

export default function FilterBar({
  value,
  categories = [],
  onChangeCategory,
  dateFrom,
  dateTo,
  preset,
  onChangeDates,
  onPreset,
}) {
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customFrom, setCustomFrom] = useState(dateFrom ?? "");
  const [customTo, setCustomTo] = useState(dateTo ?? "");

  function handleTimeFilterChange(event) {
    const value = event.target.value;
    if (value === "custom") {
      setCustomFrom(dateFrom ?? "");
      setCustomTo(dateTo ?? "");
      setShowCustomModal(true);
      return;
    }

    onPreset(value);
  }

  function applyCustomRange() {
    onChangeDates({ dateFrom: customFrom || "", dateTo: customTo || "" });
    setShowCustomModal(false);
  }

  function closeModal() {
    setShowCustomModal(false);
  }

  return (
    
      <Bar data-tour="filter-bar">
       
          <label>
            Category
            <select
              value={value}
              onChange={(event) => onChangeCategory(event.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        
        <Field>
          <label htmlFor="time-filter">Time Filter</label>
          <TimeSelect
            id="time-filter"
            onChange={handleTimeFilterChange}
            value={preset}
            data-tour="time-filter"
          >
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="month">This Month</option>
            <option value="custom">Custom...</option>
          </TimeSelect>
        </Field>
        {showCustomModal && (
          <Backdrop onClick={closeModal} aria-modal="true" role="dialog">
            <ModalCard onClick={(event) => event.stopPropagation()}>
              <h3>Custom range</h3>
              <div>
                <label>
                  From
                  <input
                    type="date"
                    value={customFrom}
                    onChange={(event) => setCustomFrom(event.target.value)}
                  />
                </label>
                <label>
                  To
                  <input
                    type="date"
                    value={customTo}
                    onChange={(event) => setCustomTo(event.target.value)}
                  />
                </label>
              </div>
              <ModalActions>
                <button type="button" onClick={closeModal}>
                  Cancel
                </button>
                <button type="button" onClick={applyCustomRange}>
                  Apply
                </button>
              </ModalActions>
            </ModalCard>
          </Backdrop>
        )}
      </Bar>
    
  );
}

const Bar = styled.section`
  display: grid;
  gap: 12px;
  background: var(--surface);
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  input[type="date"]::-webkit-calendar-picker-indicator {
    background: var(gray);
    
  }
`;

const Field = styled.div`
  display: grid;
  gap: 6px;
`;

const TimeSelect = styled.select`
  width: 100%;
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface-elevated);
  color: var(--foreground);
`;
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
  z-index: 50;
`;

const ModalCard = styled.div`
  width: min(520px, 92vw);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-elevated);
  color: var(--foreground);
  padding: 16px;
  box-shadow: var(--shadow);
`;
const ModalActions = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;
