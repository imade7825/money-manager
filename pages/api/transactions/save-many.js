import dbConnect from "@/db/connect";
import Transaction from "@/db/models/Transaction";
import { getToken } from "next-auth/jwt";

export default async function handleSaveMany(request, response) {
  //nutzer muss eingeloggt sein
  //gettoken liest die session-info aus dem request
  const token = await getToken({ req: request });
  if (!token?.email) {
    return response.status(401).json({ message: "Unauthorized" });
  }
  const ownerEmail = token.email;
  await dbConnect();

  //erwarten im body: {transactions:[...]}
  const { transactions } = request.body || {};
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return response
      .status(400)
      .json({ message: "Please send {transactions: [...]}" });
  }

  //csv-zeilen in ein sauberes db-format unwandeln
  //fehlende oder ungültige felder aussortieren
  const transactionsToInsert = transactions
    .map((transaction) => {
      const name = String(transaction?.name ?? "").trim();
      const category = String(transaction?.category ?? "").trim();
      const type = String(transaction?.type ?? "")
        .trim()
        .toLowerCase(); // "income" | "expense"
      const amount = Number(transaction?.amount);
      const dateString = String(transaction?.date ?? "").trim(); // erwartet "YYYY-MM-DD"
      const date = dateString ? new Date(`${dateString}T00:00:00.000Z`) : null;

      //pflichfelder schecken
      if (!name || !category || !date || !Number.isFinite(amount)) return null;
      if (type !== "income" && type !== "expense") return null;

      // owner speichern: gehört dieser nutzer
      return { name, category, type, amount, date, owner: ownerEmail };
    })
    // null-Einträge entfernen (alles, was durch die validierung gefallen ist)
    .filter(Boolean);

  // wenn nach der umwandlung nichts Gültiges übrig ist: abbrechen
  if (transactionsToInsert.length === 0) {
    return response.status(400).json({ message: "No valid transactions." });
  }
  //alle datensätze in einem schritt speichern
  try {
    // ordered:false = falls eine zeile fehlschlägt, werden die anderen trotzdem gespeichert
    const inserted = await Transaction.insertMany(transactionsToInsert, {
      ordered: false,
    });

    // erfolg: wie viele wurden gespeichert?
    return response.status(201).json({ inserted: inserted.length });
  } catch (error) {
    console.error("save-many insert error:", error);
    return response
      .status(500)
      .json({ message: "Failed to insert transactions" });
  }
}
