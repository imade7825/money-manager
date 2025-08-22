import useSWR from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function HomePage() {
  const { data: transactions } = useSWR("/api/transactions", fetcher);
  const { data: categories } = useSWR("/api/categories", fetcher);
  console.log("transaction", transactions);
  console.log("categories", categories);
  return <></>;
}
