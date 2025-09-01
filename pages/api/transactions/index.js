import dbConnect from "@/db/connect";
import Transaction from "@/db/models/Transaction";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  const token = await getToken({ req: request });
  

  console.log(token);
  await dbConnect();

  if (request.method === "GET") {
    if (session) {
      const transactions = await Transaction.find({ owner: token.email });
      response.status(200).json(transactions);
      return;
    } else {
      const transactions = await Transaction.find({ owner: "default" });
      response.status(200).json(transactions);
      return;
    }
  }

  if (request.method === "POST") {
    try {
      if (session) {
        const { name, amount, category, type, date } = request.body || {};

        // Validation
        if (!name || !amount || !category || !type || !date) {
          return response
            .status(400)
            .json({ message: "Bitte alle Felder ausfüllen." });
        } else {
          response.status(401).json({ status: "Not authorized" });
        }

        const created = await Transaction.create({
          name: String(name).trim(),
          amount: Number(amount),
          category: String(category).trim(),
          type, // "income" | "expense"
          date,
          owner: token.email,
        });

        return response.status(201).json(created);
      }
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Error creating transaction" });
    }
  }
  return response.status(405).json({ message: "Method not allowed" });
}
