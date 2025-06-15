import React, { createContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { colors, getThemeColors } from './lib/theme';

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  colors: typeof colors.light;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    setIsDark(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const themeColors = getThemeColors(isDark);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        colors: themeColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

