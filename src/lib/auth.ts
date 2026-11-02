import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";

const DATABASE_URI = process.env.MONGODB_URI;

if (!DATABASE_URI) {
  throw new Error("MONGODB_URI is not defined");
}

const client = new MongoClient(DATABASE_URI);
const db = client.db("booknook");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  database: mongodbAdapter(db, { client }),
});
