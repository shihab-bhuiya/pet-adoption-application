// src/lib/auth-client.js
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",  // ✅ hardcode for now
});

export const { signIn, signUp, useSession } = authClient;