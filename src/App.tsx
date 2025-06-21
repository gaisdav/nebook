import React from 'react';
import Toast from 'react-native-toast-message';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {Navigation} from './Navigation.tsx';
import {StatusBar, useColorScheme} from 'react-native';
import {useTheme} from '@/hooks/useTheme';
import {ThemeProvider} from './ThemeContext.tsx';
import {GlobalAlert} from './components/GlobalAlert';

function AppContent(): React.JSX.Element {
  const {colors, isDark} = useTheme();
  const systemColorScheme = useColorScheme();

  // Create custom themes for NavigationContainer
  const customLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.background,
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
  };

  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.background,
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={isDark ? customDarkTheme : customLightTheme}>
      <StatusBar
        animated={true}
        backgroundColor={colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <Navigation />
      <Toast
        config={{
          swipeable: () => true,
        }}
      />
      <GlobalAlert />
    </NavigationContainer>
  );
}

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
