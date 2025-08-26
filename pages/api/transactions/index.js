import dbConnect from "@/db/connect";
import Transaction from "@/db/models/Transaction";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    try {
      const transactions = await Transaction.find();
      response.status(200).json(transactions);
      return;
    } catch (error) {
      response.status(500).json({ message: "Error finding transactions" });
      return;
    }
  }

 if (request.method === "POST") {
    try {
      const { name, amount, category, type, date } = request.body || {};

     // Validation 
      if (!name || !amount || !category || !type || !date) {
        return response.status(400).json({ message: "Bitte alle Felder ausfüllen." });
      }

      const created = await Transaction.create({
        name: String(name).trim(),
        amount: Number(amount),
        category: String(category).trim(),
        type,             // "income" | "expense"
        date,             
      });

      return response.status(201).json(created);
    } catch (error) {
      return response.status(500).json({ message: "Error creating transaction" });
    }
  }
  return response.status(405).json({ message: "Method not allowed" });
}
