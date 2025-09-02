export default function FilterBar({ value, options = [], onChange, onClear }) {
  return (
    <div>
      <select value={value} onChange={(event) => event.target.value}>
        <option value="">All Categories </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {value && <button type="button" onClick={onClear}>Clear Filter</button>}
    </div>
  );
}
