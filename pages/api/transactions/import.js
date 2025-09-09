import dbConnect from "@/db/connect";
import Transaction from "@/db/models/Transaction";
import { getToken } from "next-auth/jwt";

const Required_Columns = ["name", "category", "date", "amount", "type"];

//csv parser, handles commas, and escape quotes
function parseCsvText(csvText) {
  const rows = [];
  let i = 0;
  let field = "";
  let row = [];
  let inQuotes = false;

  const pushField = () => {
    row.push(field);
    field = "";
  };
  const pushRow = () => {
    rows.push(row);
    row = [];
  };

  while (i < csvText.length) {
    const character = csvText[i];

    if (inQuotes) {
      if (character === '"') {
        if (csvText[i + 1] === '"') {
          field += '"';
          i += 2;
        } else {
          inQuotes = false;
          i += 1;
        }
      } else {
        field += character;
        i += 1;
      }
    } else {
      if (character === '"') {
        inQuotes = true;
        i += 1;
      } else if (character === ",") {
        pushField();
        i += 1;
      } else if (character === "\r") {
        i += 1;
      } else if (character === "\n") {
        pushField();
        pushRow();
        i += 1;
      } else {
        field += character;
        i += 1;
      }
    }
  }

  pushField();
  pushRow();

  return rows;
}
//map header names to their column indices
function mapHeaderToIndex(headerRow) {
  const indexMap = {};
  headerRow.forEach((cell, index) => {
    indexMap[cell.trim().toLowerCase()] = index;
  });
  return indexMap;
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
    const allRows = parseCsvText(csvText);
    if (allRows.length < 2) {
      return response.status(400).json({
        message: "CSV must include a header row and at least one data row",
      });
    }
    //header validation ensure required set exists
    const headerRow = allRows[0].map((header) => header.trim().toLowerCase());
    for (const coloumn of Required_Columns) {
      if (!headerRow.includes(coloumn)) {
        return response
          .status(400)
          .json({ message: `Missing required column:${coloumn}` });
      }
    }
    //build column index map for fast lookups
    const columnIndexMap = mapHeaderToIndex(allRows[0]);
    //build data to insert
    const transactionsToInsert = [];
    for (let row = 1; row < allRows.length; row++) {
      const values = allRows[row];
      if (values.length === 1 && values[0] === "") continue;

      const name = (values[columnIndexMap.name] || "").trim();
      const category = (values[columnIndexMap.category] || "").trim();
      const dateISO = (values[columnIndexMap.date] || "").trim();
      const type = (values[columnIndexMap.type] || "").trim().toLowerCase();
      const amountValue = Number(
        String(values[columnIndexMap.amount] || "").replace(",", ".")
      );

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
    await Transaction.insertMany(transactionsToInsert);

    return response.status(200).json({
      message: `Imported ${transactionsToInsert.length} transaction(s) successfully`,
      imported: transactionsToInsert.length,
    });
  } catch (error) {
    console.error("Import error:", error);
    return response.status(500).json({ message: "Failed to import CSV" });
  }
}

export const config = { api: { bodyParser: false } };
