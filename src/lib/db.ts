import { MongoClient } from "mongodb";

const DB_URI = process.env.DB_URI;

if (!DB_URI) throw new Error("Database uri is missing");

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

if (!clientPromise) {
  const newClient = new MongoClient(DB_URI);
  clientPromise = newClient.connect().then((connectedClient) => {
    client = connectedClient;
    return connectedClient;
  });
}

const connectDB = async () => {
  if (!client) {
    client = await clientPromise;
  }

  return client.db(process.env.NODE_ENV).collection("users");
};

export default connectDB;
