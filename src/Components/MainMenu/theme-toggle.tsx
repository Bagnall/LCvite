import { useEffect, useState } from "react";
import moonIcon from "/images/icons/moon.svg";
import sunIcon from "/images/icons/sun.svg";
import { Button } from "@/components/ui/button";
import { Icon } from "./Icon";

type Theme = "light" | "dark";

const STORAGE_KEY = "langcen-theme";

const getPreferredTheme = (): Theme => {
  if (typeof window === "undefined") return "light";

  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;

  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  return prefersDark ? "dark" : "light";
};

const applyTheme = (theme: Theme) => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
};

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const preferred = getPreferredTheme();
    setTheme(preferred);
    applyTheme(preferred);
  }, []);

  const toggle = () => {
    setTheme(prev => {
      const next = prev === "light" ? "dark" : "light";
      applyTheme(next);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, next);
      }
      return next;
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-pressed={theme === "dark"}
      aria-label="Toggle dark mode"
      className="text-foreground"
    >
      <Icon src={sunIcon} className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Icon src={moonIcon} className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
