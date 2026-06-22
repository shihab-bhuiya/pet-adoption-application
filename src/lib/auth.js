import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const db = client.db('pet-adoption');

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,           // ✅ add secret
  baseURL: process.env.BETTER_AUTH_URL,             // ✅ add baseURL
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});