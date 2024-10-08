"use client";

import * as React from "react";
import { Header } from "~/components/Header";

const UIProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex min-h-screen flex-col bg-muted/50">
      <Header />
      {children}
    </main>
  );
};

export default UIProvider;
