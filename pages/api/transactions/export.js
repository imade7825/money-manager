import dbConnect from "@/db/connect";
import Transaction from "@/db/models/Transaction";


const Csv_Headers = ["name", "category", "date", "amount", "type"];

//csv help function
function escapeCsvField(value) {
  const text = String(value ?? "");
  const mustQuote = /[",\n\r"]/.test(text);
  const escaped = text.replace(/"/g, `""`);
  return mustQuote ? `"${escaped}"` : escaped;
}
function buildCsvString(rows) {
  const lines = [Csv_Headers.join(",")];

  for (const row of rows) {
    lines.push(
      [
        escapeCsvField(row.name),
        escapeCsvField(row.category),
        escapeCsvField(new Date(row.date).toISOString().slice(0, 10)),
        escapeCsvField(row.amount),
        escapeCsvField(row.type),
      ].join(",")
    );
  }
  return lines.join("\r\n");
}

export default async function exportHandler(request, response) {
  if (request.method !== "GET") {
    return response.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    await dbConnect();
    const transactions = await Transaction.find({});

    const csvRows = transactions.map((transaction) => ({
      name: transaction.name ?? "",
      category: transaction.category ?? "",
      date: transaction.date ?? "",
      amount: Number(transaction.amount ?? 0),
      type: transaction.type ?? "",
    }));
    const csv = buildCsvString(csvRows);

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
{
}
