import { useRouter } from "next/router";
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
     
      <h2 style={{margin:"24px 0"}}>Create Transaction</h2>
      <Form onSubmit={handleSubmit} onCancel={() => router.back()} />
      
    </>
  );
}


