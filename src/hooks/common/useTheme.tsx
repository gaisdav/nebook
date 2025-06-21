import {ThemeContext} from '@/ThemeContext';
import {useContext} from 'react';
import {getTabThemeColors} from '@/lib/theme';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Helper hook for tab-specific theming
export const useTabTheme = () => {
  const {isDark} = useTheme();
  return getTabThemeColors(isDark);
};
