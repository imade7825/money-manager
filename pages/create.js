import { useRouter } from "next/router";
import Form from "@/components/TransactionForm";
import { notify } from "@/lib/toast";

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
      console.error("Please try again.");
      return;
    }
    await response.json();
    notify.saved();
    router.push("/");
  }

  return (
    <main role="main">
      <h2 style={{ margin: "16px 12px" }}>Create Transaction</h2>
      <Form onSubmit={handleSubmit} onCancel={() => router.back()} />
    </main>
  );
}
