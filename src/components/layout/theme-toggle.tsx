"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-muted-foreground hover:text-foreground rounded-full"
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-[1.1rem]" />
        ) : (
          <Moon className="size-[1.1rem]" />
        )
      ) : (
        <Moon className="size-[1.1rem] opacity-0" />
      )}
    </Button>
  );
}
