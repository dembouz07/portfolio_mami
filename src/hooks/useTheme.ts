import { useCallback, useEffect, useState } from "react";

import type { Theme } from "../types/portfolio";

export const THEME_STORAGE_KEY = "mame-fatou-faye-theme";
const THEME_CHANGE_EVENT = "portfolio:theme-change";

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

function readStoredTheme(): Theme | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(value) ? value : null;
  } catch {
    return null;
  }
}

function getSystemTheme(): Theme {
  if (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  return "light";
}

function applyTheme(theme: Theme): void {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

function persistTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Le thème reste appliqué pour la session si le stockage est indisponible.
  }
}

function broadcastTheme(theme: Theme): void {
  window.dispatchEvent(
    new CustomEvent<Theme>(THEME_CHANGE_EVENT, { detail: theme }),
  );
}

export interface UseThemeResult {
  readonly theme: Theme;
  readonly isDark: boolean;
  readonly setTheme: (theme: Theme) => void;
  readonly toggleTheme: () => void;
}

export function useTheme(): UseThemeResult {
  const [theme, setThemeState] = useState<Theme>(
    () => readStoredTheme() ?? getSystemTheme(),
  );
  const [followsSystem, setFollowsSystem] = useState(
    () => readStoredTheme() === null,
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (
      !followsSystem ||
      typeof window.matchMedia !== "function"
    ) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (event: MediaQueryListEvent) => {
      const nextTheme: Theme = event.matches ? "dark" : "light";
      setThemeState(nextTheme);
      applyTheme(nextTheme);
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [followsSystem]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) {
        return;
      }

      if (isTheme(event.newValue)) {
        setFollowsSystem(false);
        setThemeState(event.newValue);
        return;
      }

      setFollowsSystem(true);
      setThemeState(getSystemTheme());
    };

    const handleThemeChange = (event: Event) => {
      const nextTheme = (event as CustomEvent<unknown>).detail;
      if (isTheme(nextTheme)) {
        setFollowsSystem(false);
        setThemeState(nextTheme);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    };
  }, []);

  const setTheme = useCallback((nextTheme: Theme) => {
    setFollowsSystem(false);
    setThemeState(nextTheme);
    applyTheme(nextTheme);
    persistTheme(nextTheme);
    broadcastTheme(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  return {
    theme,
    isDark: theme === "dark",
    setTheme,
    toggleTheme,
  };
}
