import React, {useCallback} from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IconButton} from './components/IconButton';
import {Home, Search, Settings, User} from 'lucide-react-native';
import {HomeScreen} from './screens/Home';
import {ProfileScreen} from './screens/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

type IconProps = {
  focused: boolean;
  color: string;
  size: number;
};

const homeIcon = ({color, size}: IconProps) => (
  <Home color={color} size={size} />
);
const profileIcon = ({color, size}: IconProps) => (
  <User color={color} size={size} />
);

const Tab = createBottomTabNavigator();

export function Tabs() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const headerSettings = useCallback(
    () => (
      <IconButton
        Icon={Settings}
        onPress={() => navigation.navigate('Settings')}
      />
    ),
    [navigation],
  );

  const headerSearch = useCallback(
    () => (
      <IconButton Icon={Search} onPress={() => navigation.navigate('Search')} />
    ),
    [navigation],
  );

  return (
    <Tab.Navigator screenOptions={{headerBackButtonDisplayMode: 'minimal'}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarIcon: homeIcon, headerRight: headerSearch}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{tabBarIcon: profileIcon, headerRight: headerSettings}}
      />
    </Tab.Navigator>
  );
}
