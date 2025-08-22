import dbConnect from "@/db/connect";
import Category from "@/db/models/Category";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const categories = await Category.find();
      response.status(200).json(categories);
      return;
    } catch (error) {
      response.status(500).json({ message: "Error finding categories" });
      return;
    }
  }
  response.status(405).json({ message: "Method not allowed" });
}
