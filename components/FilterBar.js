import styled from "styled-components";

export default function FilterBar({
  value,
  categories = [],
  onChangeCategory,
  onClearCategory,
  dateFrom,
  dateTo,
  onChangeDates,
  onPreset,
}) {
  function handleFrom(event) {
    onChangeDates({ dateFrom: event.target.value });
  }

  function handleTo(event) {
    onChangeDates({ dateTo: event.target.value });
  }
  return (
    <>
      <div>
        <select
          value={value}
          onChange={(event) => onChangeCategory(event.target.value)}
        >
          <option value="">All Categories </option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {value && (
          <button type="button" onClick={onClearCategory}>
            Clear Filter
          </button>
        )}
      </div>
      <PresetsContainer>
        <button type="button" onClick={() => onPreset("today")}>
          Today
        </button>
        <button type="button" onClick={() => onPreset("7")}>
          Last 7 Days
        </button>
        <button type="button" onClick={() => onPreset("30")}>
          Last 30 Days
        </button>
        <button type="button" onClick={() => onPreset("month")}>
          This Month
        </button>
        <button type="button" onClick={() => onPreset("all")}>
          All
        </button>
      </PresetsContainer>
      <CustomRangeContainer>
        <label>
          From:
          <input type="date" value={dateFrom ?? ""} onChange={handleFrom} />
        </label>
        <label>
          To:
          <input type="date" value={dateTo ?? ""} onChange={handleTo} />
        </label>
      </CustomRangeContainer>
    </>
  );
}

const PresetsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
`;

const CustomRangeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;
