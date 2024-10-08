"use client";

import { SessionProvider } from "next-auth/react";
import AuthModal from "~/components/AuthDialog";
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthModal /> {children}
    </SessionProvider>
  );
}
