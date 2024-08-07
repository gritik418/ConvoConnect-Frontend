"use client";
import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";

export const useCustomTheme = () => useContext(ThemeContext);

const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  const changeTheme = () => {
    const currentTheme = theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
    localStorage.setItem("theme", currentTheme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
      setTheme(currentTheme as typeof theme);
    }
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;
