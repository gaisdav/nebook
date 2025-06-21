import React, {useCallback} from 'react';
import {useNavigation} from '@/hooks/useNavigation';
import {IconButton} from './components/IconButton';
import {Home, Search, Settings, User} from 'lucide-react-native';
import {HomeScreen} from './screens/Home';
import {ProfileScreen} from './screens/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme, useTabTheme} from '@/hooks/useTheme';

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
  const navigation = useNavigation();
  const {colors} = useTheme();
  const tabColors = useTabTheme();

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
    <Tab.Navigator
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
        tabBarStyle: {
          backgroundColor: tabColors.tabBar,
          borderTopColor: tabColors.tabBarBorder,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: tabColors.tabActive,
        tabBarInactiveTintColor: tabColors.tabInactive,
        tabBarLabelStyle: {
          color: tabColors.tabLabel,
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          color: colors.text,
          fontWeight: '600',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: homeIcon,
          headerRight: headerSearch,
          tabBarLabel: 'My Books',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: profileIcon,
          headerRight: headerSettings,
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}
