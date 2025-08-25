import styled from "styled-components";
import Form from "@/components/CreateTransaction";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function CreateTransaction() {
  const router = useRouter();

  const { mutate } = useSWR("/api/transactions");
  async function createTransaction(transactionData) {
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    });
    if (response.ok) {
      const newTransaction = await response.json();
      mutate((transactions) => [...transactions, newTransaction]);
      router.push("/");
    }
    return <Form onSubmit={createTransaction} />;
  }
}
