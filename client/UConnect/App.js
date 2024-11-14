import * as React from 'react';
import { StatusBar } from 'react-native';
import {
  NavigationContainer,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
} from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Import screen components
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import ChatScreen from './screens/ChatScreen';

// Import services
import { fetchClassCommunityById } from './services/courses.js';
import { fetchJoinedClasses } from './services/user2.js';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Bottom nav
function BottomTabs({ course }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Configure the tab bar icon based on route name
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
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home">
        {props => <HomeScreen {...props} course={course} />}
      </Tab.Screen>
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
const theme = {
    colors: {
      primary: '#BB86FC',
      accent: '#03DAC6',
      background: '#2c2c2c',
      surface: '#1E1E1E',
      text: 'gray',
    }
};

  const [classNames, setClassNames] = React.useState([]);
  React.useEffect(() => {(async () => {
    try {
      const classIds = await fetchJoinedClasses();
      const classData = await Promise.all(classIds.map(async id => await fetchClassCommunityById(id)));
      setClassNames(classData.map(data => `${data.course_subject} ${data.course_name}`));
    } catch (error) {
      console.error(error);
    }
  })()}, [])

  console.log("HAHAHAH", classNames);

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
            name="Home"
            options={{ headerTitle: 'UConnect' }}
          >
            {props => <BottomTabs {...props} course="Class 1" />}
          </Drawer.Screen>
          {classNames.map((className, index) => (
            <Drawer.Screen
              key={index}
              name={className}
              options={{ headerTitle: 'UConnect' }}
            >
              {props => <BottomTabs {...props} course={className} />}
            </Drawer.Screen>
          ))}
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
