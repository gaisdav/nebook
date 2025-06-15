import React from 'react';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from './Navigation.tsx';
import {StatusBar, useColorScheme} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { ThemeProvider } from './ThemeContext.tsx';

function AppContent(): React.JSX.Element {
  const {colors, isDark} = useTheme();
  const systemColorScheme = useColorScheme();

  return (
    <NavigationContainer>
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
