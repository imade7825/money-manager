//Standard-Kategorien einmal in MongoDB schreiben
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" }); //lädt .env.local (mongoDB-uri verfügbar)
import mongoose from "mongoose"; //DB-Treiber
import Category from "../db/models/Category.js";

//Verbindung-URI aus .env holen
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MongoDB_uri fehlt. env.local prüfen");
  process.exit(1);
}
try {
  await mongoose.connect(uri, { bufferCommands: false });
  console.log("Verbunden mit MongoDB");

  //Kategorien-Liste
  const names = [
    "Rent",
    "Groceries",
    "Salary",
    "Entertainment",
    "Utilities",
    "Health",
    "Transportation",
    "Insurance",
    "Savings",
    "Investment",
    "Education",
    "Restaurants",
  ];

  //Anlegen
  for (const name of names) {
    await Category.findOneAndUpdate(
      { name }, //suchen nach gleichem Namen
      { name }, //Daten falls neu
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }
  console.log("Kategorien erfolgreich eingetragen");
} catch (error) {
  console.error("Seed fehlgeschlagen:", error.message);
} finally {
  //Verbindung sauber schließen
  await mongoose.disconnect();
  process.exit(0);
}
