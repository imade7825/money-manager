import dbConnect from "@/db/connect";
import Transaction from "@/db/models/Transaction";
import { getToken } from "next-auth/jwt";
import { parse } from "csv-parse/sync";

const Required_Columns = ["name", "category", "date", "amount", "type"];

function normalizeHeader(header) {
  return String(header).trim().toLowerCase();
}
//read raw request as utf-8
function readRawBody(request) {
  return new Promise((resolve, reject) => {
    let data = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => (data += chunk));
    request.on("end", () => resolve(data));
    request.on("error", reject);
  });
}
//api route: POST
export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    //read token. requires valid NEXTAUTH_SECRET.
    const token = await getToken({ req: request });
    if (!token?.email) {
      return response.status(401).json({ message: "Unauthorized" });
    }
    const ownerEmail = token.email;
    //read csv as raw
    const csvText =
      typeof request.body === "string"
        ? request.body
        : await readRawBody(request);
    if (!csvText?.trim()) {
      return response.status(400).json({ message: "Empty CSV content" });
    }

    //parse csv into array of objects
    const allRows = parse(csvText, {
      columns: (header) => header.map(normalizeHeader),
      skip_empty_lines: true,
      bom: true,
      trim: true,
      relax_column_count: true,
    });

    if (!allRows.length) {
      return response.status(400).json({
        message: "CSV must include a header row and at least one data row",
      });
    }

    //header validation ensure required set exists
    const headerRow = Object.keys(allRows[0]);
    for (const coloumn of Required_Columns) {
      if (!headerRow.includes(coloumn)) {
        return response
          .status(400)
          .json({ message: `Missing required column:${coloumn}` });
      }
    }

    //build data to insert
    const transactionsToInsert = [];
    for (const row of allRows) {
      const name = String(row.name ?? "").trim();
      const category = String(row.category ?? "").trim();
      const dateISO = String(row.date ?? "").trim();
      const type = String(row.type ?? "")
        .trim()
        .toLowerCase();
      const amountValue = Number(String(row.amount ?? "").replace(",", "."));

      if (
        !name ||
        !category ||
        !dateISO ||
        !type ||
        !Number.isFinite(amountValue)
      )
        continue;

      //convert dateIso to date
      const parsedDate = new Date(`${dateISO}T00:00:00.000Z`);
      if (type !== "income" && type !== "expense") continue;
      //push data with owner
      transactionsToInsert.push({
        name,
        category,
        date: parsedDate,
        amount: amountValue,
        type,
        owner: ownerEmail,
      });
    }
    if (transactionsToInsert.length === 0) {
      return response
        .status(400)
        .json({ message: "No valid rows found in CSV" });
    }
    await dbConnect();
    const insertedData = await Transaction.insertMany(transactionsToInsert);
    return response.status(200).json({
      message: `Imported ${transactionsToInsert.length} transaction(s) successfully`,
      imported: insertedData.length,
      items: insertedData,
    });
  } catch (error) {
    console.error("Import error:", error);
    return response.status(500).json({ message: "Failed to import CSV" });
  }
}

export const config = { api: { bodyParser: false } };
