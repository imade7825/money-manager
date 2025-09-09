import dbConnect from "@/db/connect";
import Transaction from "@/db/models/Transaction";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const Csv_Headers = ["name", "category", "date", "amount", "type"];

//Escape a single CSV field so commas/quotes/newlines can't break the format
function escapeCsvField(value) {
  const text = String(value ?? "");
  const mustQuote = /[",\n\r]/.test(text);
  const escaped = text.replace(/"/g, '""');
  return mustQuote ? `"${escaped}"` : escaped;
}

//convert array into a single csv string
function buildCsvString(rows) {
  //first line header
  const lines = [Csv_Headers.join(",")];
  //push one csv line per row
  for (const row of rows) {
    lines.push(
      [
        escapeCsvField(row.name),
        escapeCsvField(row.category),
        escapeCsvField(new Date(row.date || 0).toISOString().slice(0, 10)),
        escapeCsvField(row.amount),
        escapeCsvField(row.type),
      ].join(",")
    );
  }
  return lines.join("\r\n");
}
//api route: GET /api/transactions/export
export default async function exportHandler(request, response) {
  if (request.method !== "GET") {
    return response.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    //auth step read the server session
    const session = await getServerSession(request, response, authOptions);
    if (!session?.user?.email) {
      return response.status(401).json({ message: "Unauthorized" });
    }
    const ownerEmail = session.user.email;

    await dbConnect();
    //data step fetch current user transaction
    const transactions = await Transaction.find({ owner: ownerEmail }).lean();
    //map DB into CSV builder
    const csvRows = transactions.map((transaction) => ({
      name: transaction.name ?? "",
      category: transaction.category ?? "",
      date: transaction.date ?? "",
      amount: Number(transaction.amount ?? 0),
      type: transaction.type ?? "",
    }));
    const csv = buildCsvString(csvRows);
    //set download headers and stream csv back
    response.setHeader("Content-Type", "text/csv; charset=utf-8");
    response.setHeader(
      "Content-Disposition",
      `attachment; filename="transactions.csv"`
    );
    return response.status(200).send(csv);
  } catch (error) {
    console.error("Export error:", error);
    return response.status(500).json({ message: "Failed to export CSV" });
  }
}
