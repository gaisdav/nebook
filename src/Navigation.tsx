import {Tabs} from './Tabs.tsx';
import {SearchScreen} from './screens/Search';
import {SettingsScreen} from './screens/Settings';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BookScreen} from '@/screens/Book';
import {RootStackParamList} from '@/types.ts';
import {LoginScreen} from './screens/Login';
import {RegisterScreen} from './screens/Register';
import {useAuthStore} from './data/auth/store/useAuthStore.tsx';
import {useTheme} from '@/hooks/useTheme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  const {isAuthenticated} = useAuthStore();
  const {colors} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          color: colors.text,
          fontWeight: '600',
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
      initialRouteName={isAuthenticated ? 'Tabs' : 'Login'}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{title: 'Settings'}}
      />
      <Stack.Screen
        name="Book"
        component={BookScreen}
        options={{title: 'Book'}}
      />
    </Stack.Navigator>
  );
}
