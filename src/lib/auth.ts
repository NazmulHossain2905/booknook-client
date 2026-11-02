import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const DATABASE_URI = process.env.MONGODB_URI as string;

const client = new MongoClient(DATABASE_URI);
const db = client.db("booknook");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),

  emailAndPassword: { enabled: true, autoSignIn: false },
});
