import { Db, MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const DB_NAME = process.env.MONGODB_DB_NAME || "whatsapp";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectMongoDb(): Promise<Db> {
  if (db) return db;

  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log("connected to MongoDB");
    return db;
  } catch (e) {
    console.log("error connecting to mongodb", e);
    throw e;
  }
}

export async function disconnectMongoDb(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log("Disconnected from MongoDb");
  }
}

export function getMongoDB(): Db {
  if (!db) {
    throw new Error("Mongodb not connected.");
  }
  return db;
}
