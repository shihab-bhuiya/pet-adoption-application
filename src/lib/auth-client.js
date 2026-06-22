// src/lib/auth-client.js
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://pet-adoption-application-chi.vercel.app",  // ✅ hardcode for now
});

export const { signIn, signUp, useSession } = authClient;