import { MongoClient } from "mongodb";

const url = process.env.DATABASE_URL;
const client = new MongoClient(url);
const database = await client.connect();
export const db = database.db("app");
