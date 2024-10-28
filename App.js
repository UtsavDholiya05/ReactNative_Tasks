import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "./Screens/ProfileScreen";
import FavouriteScreen from "./Screens/FavouriteScreen";
import { UserProvider } from "./Context/Login";
import { FavoritesProvider } from "./Context/EditFavorite";
import EditProfile from "./Screens/EditProfile";
import Welcome from "./Screens/Welcome"
import ChatBot from "./Screens/ChatBot";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Popular Movies") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Favourite") {
            iconName = focused ? "star" : "star-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "ChatBot") {
            iconName = focused ? "chatbox" : "chatbox-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Popular Movies" component={HomeScreen} />
      <Tab.Screen name="Favourite" component={FavouriteScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="ChatBot" component={ChatBot} />
    </Tab.Navigator>
  );
}


function ProfileComponent() {
  return (
    // <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }}/>
      </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default function App() {
  return (
    <UserProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Sign Up" component={SignupScreen} />
            <Stack.Screen name="Welcome" component={Welcome} />
            
            <Stack.Screen
              name="Home"
              component={Tabs}
              options={{ headerShown: false }}
            />

            <Stack.Screen name="ProfileComponent" component={ProfileComponent}/>
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </UserProvider>
  );
}
