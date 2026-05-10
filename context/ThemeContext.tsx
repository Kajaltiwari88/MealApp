import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/theme';

type ThemeMode = 'light' | 'dark';

type ThemeContextType = {
  theme: typeof Colors.light;
  mode: ThemeMode;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');

      if (
        savedTheme &&
        (savedTheme === 'light' || savedTheme === 'dark')
      ) {
        setMode(savedTheme);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newMode =
      mode === 'light'
        ? 'dark'
        : 'light';

    setMode(newMode);

    await AsyncStorage.setItem(
      'theme',
      newMode
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: Colors[mode],
        mode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useThemeContext must be used inside ThemeProvider'
    );
  }

  return context;
};