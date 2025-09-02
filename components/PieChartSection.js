import CategoryPieChart from "./CategoryPieChart";

export default function PieChartSection({ data, open }) {
  if (!open) return null;
  return <div>{<CategoryPieChart data={data} />}</div>;
}
