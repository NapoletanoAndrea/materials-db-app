import { useEffect, useState } from "react";
import { THEME } from "../../constants";

type Theme = "light" | "dark" | "system";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem(THEME) as Theme) || "system";
  });

  // Sync with system if selected
  useEffect(() => {
    const applyTheme = (themeToSet: Theme) => {
      const root = document.documentElement;
      root.classList.remove("light", "dark");

      if (themeToSet === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        root.classList.add(systemTheme);
      } else {
        root.classList.add(themeToSet);
      }
    };
    
    applyTheme(theme);

    if (theme === "system") {
      const listener = (e: MediaQueryListEvent) => {
        const newSystemTheme = e.matches ? "dark" : "light";
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(newSystemTheme);
      };
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      mql.addEventListener("change", listener);
      return () => mql.removeEventListener("change", listener);
    }
  }, [theme]);

  const updateTheme = (newTheme: Theme) => {
    localStorage.setItem(THEME, newTheme);
    setTheme(newTheme);
  };

  const switchToOppositeTheme = () => {
    let oppositeTheme: Theme = theme === "light" ? "dark" : "light";
    if (theme === "system") {
      oppositeTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "light"
        : "dark";
    }
    updateTheme(oppositeTheme);
  };

  return { theme, updateTheme, switchToOppositeTheme };
};
