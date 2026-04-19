import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeMode = "light" | "dark";

type ThemeColors = {
  bg: string;
  text: string;
  subText: string;
  card: string;
  primary: string;
};

type ThemeContextType = {
  theme: ThemeColors;
  mode: ThemeMode;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

const COLORS: Record<ThemeMode, ThemeColors> = {
  light: {
    bg: "#F9FAFB",
    text: "#111827",
    subText: "#6B7280",
    card: "#FFFFFF",
    primary: "#22C55E",
  },
  dark: {
    bg: "#0F172A",
    text: "#F1F5F9",
    subText: "#94A3B8",
    card: "#1E293B",
    primary: "#22C55E",
  },
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem("theme");
      if (saved) setMode(saved as ThemeMode);
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    await AsyncStorage.setItem("theme", newMode);
  };

  return (
    <ThemeContext.Provider value={{ theme: COLORS[mode], mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeContext must be used inside ThemeProvider");
  return context;
};