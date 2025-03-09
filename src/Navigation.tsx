import {Tabs} from './Tabs.tsx';
import {SearchScreen} from './screens/Search';
import {SettingsScreen} from './screens/Settings';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BookScreen} from '@/screens/Book';
import {RootStackParamList} from '@/types.ts';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{headerBackButtonDisplayMode: 'minimal'}}
      initialRouteName="Tabs">
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
