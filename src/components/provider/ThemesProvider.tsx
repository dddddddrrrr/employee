"use client";

import { ThemeProvider } from "next-themes";

interface ThemesProviderProps {
  children: React.ReactNode;
}

const ThemesProvider = ({ children }: ThemesProviderProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default ThemesProvider;
