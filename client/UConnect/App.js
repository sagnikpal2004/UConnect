import * as React from 'react';
import { StatusBar } from 'react-native';
import {
  DarkTheme,
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Import screen components
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import ChatScreen from './screens/ChatScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tabs Navigator Component
function BottomTabs({ course }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Configure the tab bar icon based on the route name
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Discover':
              iconName = 'explore';
              break;
            case 'Chat':
              iconName = 'chat';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'circle';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        // Tab bar styling
        tabBarActiveTintColor: '#BB86FC',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#1E1E1E' },
        headerShown: false, // Hide header in Bottom Tabs
      })}
    >
      <Tab.Screen
        name="Home"
        // Use children prop to pass 'course' to HomeScreen
      >
        {props => <HomeScreen {...props} course={course} />}
      </Tab.Screen>
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  // Combine React Navigation and React Native Paper dark themes
  const CombinedDarkTheme = {
    ...NavigationDarkTheme,
    ...DarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...DarkTheme.colors,
      primary: '#BB86FC',
      accent: '#03DAC6',
      background: '#2c2c2c',
      surface: '#1E1E1E',
      text: 'gray',
    },
  };

  const theme = CombinedDarkTheme; // Always use dark theme

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <StatusBar barStyle="light-content" backgroundColor="#1E1E1E" />
        <Drawer.Navigator
          screenOptions={({ navigation }) => ({
            headerStyle: { backgroundColor: '#1E1E1E' },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: 'bold' },
            headerLeft: () => (
              <MaterialIcons
                name="menu"
                size={28}
                color="#FFFFFF"
                style={{ marginLeft: 15 }}
                onPress={() => navigation.toggleDrawer()}
              />
            ),
            drawerActiveTintColor: '#BB86FC',
            drawerInactiveTintColor: 'gray',
            drawerStyle: { backgroundColor: '#121212' },
          })}
        >
          <Drawer.Screen
            name="Class 1"
            options={{ headerTitle: 'UConnect' }}
          >
            {props => <BottomTabs {...props} course="Class 1" />}
          </Drawer.Screen>

          <Drawer.Screen
            name="Class 2"
            options={{ headerTitle: 'UConnect' }}
          >
            {props => <BottomTabs {...props} course="Class 2" />}
          </Drawer.Screen>

          <Drawer.Screen
            name="Class 3"
            options={{ headerTitle: 'UConnect' }}
          >
            {props => <BottomTabs {...props} course="Class 3" />}
          </Drawer.Screen>

          <Drawer.Screen
            name="Class 4"
            options={{ headerTitle: 'UConnect' }}
          >
            {props => <BottomTabs {...props} course="Class 4" />}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
