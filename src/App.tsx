import React from 'react';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from './Navigation.tsx';
import {StatusBar} from 'react-native';
import {theme} from './commonStyles.ts';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor={theme.light.cardBg}
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
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

export default App;
