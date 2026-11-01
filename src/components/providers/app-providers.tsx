"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { MotionConfig } from "framer-motion";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
