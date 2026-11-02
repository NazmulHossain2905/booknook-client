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
  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
