"use client";
import { SessionProvider } from "next-auth/react";

// AuthProvider component to wrap the app with the SessionProvider
export default function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
