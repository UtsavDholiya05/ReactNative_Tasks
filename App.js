import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
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
// import Welcome from "./Screens/Welcome";
import ChatBot from "./Screens/ChatBot";
import jwt from "./Screens/jwt";
// import { AuthProvider } from "./Screens/jwt";
import HomePage from "./Screens/HomePage";
import try2 from "./Screens/try2";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: styles.tabBar, // Add custom styling for the tab bar
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
          } else if (route.name === "jwt") {
            iconName = focused ? "chatbox" : "chatbox-outline";
          }

          return (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <Ionicons
                name={iconName}
                size={size}
                color={focused ? "#fff" : color}
              />
            </View>
          );
        },
        tabBarLabelStyle: styles.tabLabel, // Custom label styling
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#aaa",
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
    <Stack.Navigator>
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    // <AuthProvider>
    <UserProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Sign Up" component={SignupScreen} />
            {/* <Stack.Screen name="Welcome" component={Welcome} /> */}
            <Stack.Screen name="HomePage" component={HomePage} />

            <Stack.Screen
              name="Home"
              component={Tabs}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ProfileComponent"
              component={ProfileComponent}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </UserProvider>
    //  </AuthProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#000", // Black background for the tab bar
    height: 60,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: "absolute",
    borderTopWidth: 0,
  },
  iconContainer: {
    backgroundColor: "#333", // Icon circle background
    justifyContent: "center",
    borderRadius:25,
    width: 35,
    height: 35,
    alignItems: "center",
  },
  activeIcon: {
    backgroundColor: "#00bcd4", // Active icon background color
  },
  tabLabel: {
    fontSize: 12, // Adjust label size
    marginBottom: 5,
  },
});