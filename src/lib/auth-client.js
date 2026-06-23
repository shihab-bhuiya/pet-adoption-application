// src/lib/auth-client.js
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://pet-adoption-application-chi.vercel.app",  // ✅ hardcode for now
});

export const { signIn, signUp, useSession } = authClient;