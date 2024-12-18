import React, { createContext, useState, useContext, useEffect } from "react";
import { View, Text, TextInput, Button, Image, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Base API URL
const API_BASE_URL = "https://movieappbackend-hogp.onrender.com/api";

// Create Authentication Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      const { token } = response.data;
      setToken(token);
      await AsyncStorage.setItem("jwt_token", token);
      await fetchUserProfile(token); // Fetch user details after login
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error.response?.data?.message || "An error occurred"
      );
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        username,
        email,
        password,
      });
      Alert.alert("Registration Successful", response.data.message);
    } catch (error) {
      Alert.alert(
        "Registration Failed",
        error.response?.data?.message || "An error occurred"
      );
    }
  };

  const fetchUserProfile = async (jwtToken) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${jwtToken || token}` },
      });
      setUser(response.data.user);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch user profile");
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem("jwt_token");
  };

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("jwt_token");
      if (storedToken) {
        setToken(storedToken);
        await fetchUserProfile(storedToken);
      }
    };
    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Upload Profile Picture
const uploadProfilePicture = async (imageUri, token) => {
  try {
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      name: "profile.jpg",
      type: "image/jpeg",
    });

    const response = await axios.put(
      `${API_BASE_URL}/user/profilePicture`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    Alert.alert(
      "Error",
      error.response?.data?.message || "Failed to update profile picture"
    );
  }
};

// Main App Component
const App = () => {
  const { login, register, user, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleLogin = () => login(email, password);
  const handleRegister = () => register(username, email, password);

  return (
    <View style={{ padding: 20 }}>
      {user ? (
        <View>
          <Text>Welcome, {user.username}</Text>
          {user.profilePicture && (
            <Image
              source={{ uri: user.profilePicture }}
              style={{ width: 100, height: 100 }}
            />
          )}
          <Button title="Logout" onPress={logout} />
        </View>
      ) : (
        <View>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{ borderWidth: 1, marginBottom: 10 }}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{ borderWidth: 1, marginBottom: 10 }}
          />
          <TextInput
            placeholder="Username (for Register)"
            value={username}
            onChangeText={setUsername}
            style={{ borderWidth: 1, marginBottom: 10 }}
          />
          <Button title="Login" onPress={handleLogin} />
          <Button title="Register" onPress={handleRegister} />
        </View>
      )}
    </View>
  );
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
