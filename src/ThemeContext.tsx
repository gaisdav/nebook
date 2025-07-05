import React, {createContext, useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {colors, getThemeColors} from './lib/theme';
import {cache} from './lib/cache/CacheService';

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  setSystemTheme: () => void;
  colors: typeof colors.light;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved theme preference on startup
  useEffect(() => {
    const loadSavedTheme = () => {
      const savedTheme = cache.getItem<'dark' | 'light' | 'system'>(
        'theme',
        'preference',
      );

      if (savedTheme === 'dark') {
        setIsDark(true);
      } else if (savedTheme === 'light') {
        setIsDark(false);
      } else if (savedTheme === 'system' || savedTheme === null) {
        // Use system preference
        setIsDark(systemColorScheme === 'dark');
      }

      setIsLoaded(true);
    };

    loadSavedTheme();
  }, [systemColorScheme]);

  // Update theme when system color scheme changes (only if using system preference)
  useEffect(() => {
    if (!isLoaded) {return;}

    const savedTheme = cache.getItem<'dark' | 'light' | 'system'>(
      'theme',
      'preference',
    );
    if (savedTheme === 'system' || savedTheme === null) {
      setIsDark(systemColorScheme === 'dark');
    }
  }, [systemColorScheme, isLoaded]);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    // Save the theme preference
    const themePreference = newIsDark ? 'dark' : 'light';
    cache.setItem('theme', 'preference', themePreference);
  };

  const setSystemTheme = () => {
    const newIsDark = systemColorScheme === 'dark';
    setIsDark(newIsDark);

    // Save the system preference
    cache.setItem('theme', 'preference', 'system');
  };

  const themeColors = getThemeColors(isDark);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        setSystemTheme,
        colors: themeColors,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
