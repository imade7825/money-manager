import dbConnect from "@/db/connect";
import Transaction from "@/db/models/Transaction";

export default async function handler(request, response) {
  const { id } = request.query;

  await dbConnect();

  if (request.method === "PUT") {
    try {
      const updated = await Transaction.findByIdAndUpdate(id, request.body, {
        new: true,
      });
      return response.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Update failed" });
    }
  }

  if (request.method === "DELETE") {
    try {
      await Transaction.findByIdAndDelete(id);
      return response.status(204).end();
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Delete failed" });
    }
  }

  response.setHeader("Allow", ["PUT", "DELETE"]);
  response.status(405).end(`Method ${request.method} Not Allowed`);
}
