import { useRouter } from "next/router";
import styled from "styled-components";
import BottomNav from "@/components/BottomNav";
import Form from "@/components/TransactionForm";

export default function CreatePage() {
  const router = useRouter();

  async function handleSubmit(formData) {
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      console.log("POST failed");
      return;
    }
    await response.json();
    router.push("/");
  }

  return (
    <>
      <Pad />
      <Header>Create Transaction</Header>
      <Form onSubmit={handleSubmit} onCancel={() => router.back()} />
      <BottomNav />
    </>
  );
}

const Pad = styled.div`
  height: 72px;
`;
const Header = styled.h2`
  margin: 16px 20 px;
`;
