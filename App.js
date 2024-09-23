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
import { FavProvider } from "./Context/favorite";
// import EditProfile from "./Screens/EditProfile";

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
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Popular Movies" component={HomeScreen} />
      <Tab.Screen name="Favourite" component={FavouriteScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />

      
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <FavProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Sign Up" component={SignupScreen} />
            {/* <Stack.Screen name="Sign Up" component={SignupScreen} /> */}

            <Stack.Screen
              name="Home"
              component={Tabs}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavProvider>
    </UserProvider>
  );
}
