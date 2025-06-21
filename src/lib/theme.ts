import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const colors = {
  light: {
    // Primary colors
    primary: '#007AFF',
    primaryDark: '#0056B3',
    primaryLight: '#4DA3FF',

    // Background colors
    background: '#FFFFFF',
    backgroundSecondary: '#F9F9F9',
    backgroundTertiary: '#F0F0F0',

    // Text colors
    text: '#1A1A1A',
    textSecondary: '#666666',
    textTertiary: '#999999',
    textInverse: '#FFFFFF',

    // Border colors
    border: '#DDDDDD',
    borderLight: '#EEEEEE',
    borderDark: '#CCCCCC',

    // Status colors
    success: '#34C759',
    error: '#FF3B30',
    warning: '#FF9500',
    info: '#5856D6',

    // Overlay colors
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.2)',

    // Input colors
    inputBackground: '#F9F9F9',
    inputBorder: '#DDDDDD',
    inputPlaceholder: '#999999',

    // Tab colors
    tabBar: '#FFFFFF',
    tabBarBorder: '#DDDDDD',
    tabActive: '#007AFF',
    tabInactive: '#999999',
    tabLabel: '#666666',
    tabLabelActive: '#007AFF',
  },
  dark: {
    // Primary colors
    primary: '#0A84FF',
    primaryDark: '#0066CC',
    primaryLight: '#4DA3FF',

    // Background colors
    background: '#000000',
    backgroundSecondary: '#1C1C1E',
    backgroundTertiary: '#2C2C2E',

    // Text colors
    text: '#FFFFFF',
    textSecondary: '#EBEBF5',
    textTertiary: '#8E8E93',
    textInverse: '#000000',

    // Border colors
    border: '#38383A',
    borderLight: '#48484A',
    borderDark: '#2C2C2E',

    // Status colors
    success: '#30D158',
    error: '#FF453A',
    warning: '#FF9F0A',
    info: '#5E5CE6',

    // Overlay colors
    overlay: 'rgba(0, 0, 0, 0.7)',
    overlayLight: 'rgba(0, 0, 0, 0.4)',

    // Input colors
    inputBackground: '#1C1C1E',
    inputBorder: '#38383A',
    inputPlaceholder: '#8E8E93',

    // Tab colors
    tabBar: '#1C1C1E',
    tabBarBorder: '#38383A',
    tabActive: '#0A84FF',
    tabInactive: '#8E8E93',
    tabLabel: '#EBEBF5',
    tabLabelActive: '#0A84FF',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
    xxxl: 40,
  },
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,
};

export const shadows = {
  light: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
    },
  },
  dark: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.4,
      shadowRadius: 6,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 6,
    },
  },
};

export const layout = {
  screenWidth: width,
  screenHeight: height,
  isSmallDevice: width < 375,
};

export const animation = {
  timing: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeInOut: 'ease-in-out',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
  },
};

// Helper function to get theme colors based on color scheme
export const getThemeColors = (isDark: boolean) => {
  return isDark ? colors.dark : colors.light;
};

// Helper function to get tab-specific theme colors
export const getTabThemeColors = (isDark: boolean) => {
  const themeColors = getThemeColors(isDark);
  return {
    tabBar: themeColors.tabBar,
    tabBarBorder: themeColors.tabBarBorder,
    tabActive: themeColors.tabActive,
    tabInactive: themeColors.tabInactive,
    tabLabel: themeColors.tabLabel,
    tabLabelActive: themeColors.tabLabelActive,
  };
}; 