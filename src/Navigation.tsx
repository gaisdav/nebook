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
import {useTheme} from '@/hooks/common/useTheme.tsx';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Unauthenticated stack for login/register
function UnauthenticatedStack() {
  const {colors} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// Authenticated stack for all other screens
function AuthenticatedStack() {
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
      }}>
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: true,
        }}
      />
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

export function Navigation() {
  const {isAuthenticated} = useAuthStore();

  console.log('isAuthenticated', isAuthenticated);

  // Conditionally render authenticated or unauthenticated stack
  return isAuthenticated ? <AuthenticatedStack /> : <UnauthenticatedStack />;
}
