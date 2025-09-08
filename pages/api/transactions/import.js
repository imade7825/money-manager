import dbConnect from "@/db/connect";
import Transaction from "@/db/models/Transaction";
import { PageNotFoundError } from "next/dist/shared/lib/utils";
import { DefaultTooltipContent } from "recharts";

const Required_Columns = ["name", "category", "date", "amount", "type"];

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

function mapHeaderToIndex(headerRow) {
  const indexMap = {};
  headerRow.forEach(cell, (index) => {
    indexMap[cell.trim().toLowerCase()] = index;
  });
  return indexMap;
}

function readRawBody(request) {
  return new Promise((resolve, reject) => {
    let data = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => (data += chunk));
    request.on("end", () => resolve(data));
    request.on("error", reject);
  });
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ message: "Method Not Allowed" });
  }
  try {
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

    const headerRow = allRows[0].map((header) => header.trim().toLowerCase());
    for (const coloumn of Required_Columns) {
      if (!headerRow.includes(coloumn)) {
        return response
          .status(400)
          .json({ message: `Missing required column:${coloumn}` });
      }
    }

    const columnIndexMap = mapHeaderToIndex(allRows[0]);

    const transactionsToInsert = [];
    for (let row = 1; row < allRows.length; row++) {
      const values = allRows[row];
      if (values.length === 1 && values[0] === "") continue;

      const name = (values[columnIndexMap.name] || "").trim();
      const category = (values[columnIndexMap.category] || "").trim();
      const dateISO = (values[columnIndexMap.date] || "").trim();
      const type = (values[columnIndexMap.type] || "").trim().toLowerCase();
      const amountValue = Number(
        values[columnIndexMap.amount] || "".replace(",", ".")
      );

      if (
        !nem ||
        !category ||
        !dateISO ||
        !type ||
        !Number.isFinite(amountValue)
      )
        continue;

      if (type !== "income" && type !== "expense") continue;

      transactionsToInsert.push({
        name,
        category,
        date: parsedDate,
        amount,
        type,
      });
    }
    if (transactionsToInsert.length === 0) {
      return response
        .status(400)
        .json({ message: "No valid rows forund in CSV" });
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
