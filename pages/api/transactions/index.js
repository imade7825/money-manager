import dbConnect from "@/db/connect";
import Transaction from "@/db/models/Transaction";

export default async function handler(request, response) {
  
  if (request.method === "GET") {
   
    
    try {
      await dbConnect();
      const transactions = await Transaction.find().populate("category");
      response.status(200).json(transactions);
      return;
    } catch (error) {
      response.status(500).json({ message: "Error finding transactions" });
      return;
    }
    
  }
  return response.status(405).json({ message: "Method not allowed" });
}
