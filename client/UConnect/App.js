// App.js

import * as React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme, DarkTheme } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Import your screen components
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotificationsScreen from './screens/NotificationsScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const colorScheme = useColorScheme();

  // Combine React Navigation and React Native Paper themes
  const CombinedDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
    },
  };

  const CombinedDarkTheme = {
    ...NavigationDarkTheme,
    ...DarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...DarkTheme.colors,
    },
  };

  const theme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;

  // Bottom Tabs Navigator
  function BottomTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Profile':
                iconName = 'person';
                break;
              case 'Notifications':
                iconName = 'notifications';
                break;
              case 'Settings':
                iconName = 'settings';
                break;
              default:
                iconName = 'circle';
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: theme.colors.primary,
          inactiveTintColor: 'gray',
          style: { backgroundColor: theme.colors.card },
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
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
          })}
        >
          <Drawer.Screen name="Main" component={BottomTabs} />
          {/* Add more drawer screens here if needed */}
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
