import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://ying285:Klkmo123@cluster0.cd8mj.mongodb.net/alisablog?retryWrites=true&w=majority"
    );
    const db = client.db();
    const alisablogCollection = db.collection("alisablog");
    const result = await alisablogCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "new blog" });
  }
}

export default handler;
