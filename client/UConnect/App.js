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

// Import your screen components
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import ChatScreen from './screens/ChatScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  // Combine React Navigation and React Native Paper dark themes
  const CombinedDarkTheme = {
    ...NavigationDarkTheme,
    ...DarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...DarkTheme.colors,
      primary: '#BB86FC',      // Custom primary color
      accent: '#03DAC6',       // Custom accent color
      background: '#212121',   // Background color
      surface: '#1E1E1E',      // Surface color
      text: '#FFFFFF',         // Text color
      // Add or override other colors as needed
    },
  };

  const theme = CombinedDarkTheme; // Always use dark theme

  // Bottom Tabs Navigator with updated screenOptions
  function BottomTabs() {
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
          // Updated tabBarOptions to screenOptions properties
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: theme.colors.card },
          headerShown: false, // Hide header in Bottom Tabs
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <StatusBar barStyle="light-content" backgroundColor={theme.colors.card} />
        <Drawer.Navigator
          screenOptions={({ navigation }) => ({
            headerStyle: { backgroundColor: theme.colors.card },
            headerTintColor: theme.colors.text,
            headerTitleStyle: { fontWeight: 'bold' },
            headerLeft: () => (
              <MaterialIcons
                name="menu"
                size={28}
                color={theme.colors.text}
                style={{ marginLeft: 15 }}
                onPress={() => navigation.toggleDrawer()}
              />
            ),
            drawerActiveTintColor: theme.colors.primary,
            drawerInactiveTintColor: 'gray',
            drawerStyle: { backgroundColor: theme.colors.background },
          })}
        >
          <Drawer.Screen
            name="Main"
            component={BottomTabs}
            options={{ headerTitle: 'UConnect' }} // set header title
          />
          {<Drawer.Screen
            name="Main1"
            component={BottomTabs}
            options={{ headerTitle: 'UConnect' }} // set header title
          />}
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
