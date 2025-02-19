import React from 'react';
import {SafeAreaView, Text, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  NavigationContainer,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {Home, Search, User} from 'lucide-react-native';
import {ProfileScreen} from './screens/Profile';
import {IconButton} from './components/IconButton';
import {SettingsScreen} from './screens/Settings';

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

const HomeScreen = (): React.JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>HomeScreen</Text>
      <IconButton
        Icon={Search}
        onPress={() => navigation.navigate('Search')}
        text="Open search"
      />
    </SafeAreaView>
  );
};

const SearchScreen = (): React.JSX.Element => <Text>SearchScreen</Text>;

// Создаем нижнюю навигацию (табы)
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{headerBackButtonDisplayMode: 'minimal'}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarIcon: homeIcon}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{tabBarIcon: profileIcon}}
      />
    </Tab.Navigator>
  );
}

// Создаем стековую навигацию
const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <Stack.Navigator screenOptions={{headerBackButtonDisplayMode: 'minimal'}}>
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{title: 'Search'}}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{title: 'Settings'}}
      />
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}

export default App;
