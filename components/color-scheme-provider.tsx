"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

interface ColorSchemeProviderProps {
  children: ReactNode;
}

export function ColorSchemeProvider({ children }: ColorSchemeProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
