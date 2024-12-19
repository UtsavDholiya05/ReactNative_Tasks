import React, { createContext, useState, useContext, useEffect } from "react";
import { View, Text, TextInput, Button, Image, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@env";

// Create AuthContext
const AuthContext = createContext();

// State for user and token
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      const { token } = response.data;
      setToken(token);
      await AsyncStorage.setItem("jwt_token", token);
      await fetchUserProfile(token);
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error.response?.data?.message || "An error occurred."
      );
    }
  };

  // Registration function
  const register = async (userName, email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        userName,
        email,
        password,
      });
      Alert.alert("Registration Successful", response.data.message);
    } catch (error) {
      Alert.alert(
        "Registration Failed",
        error.response?.data?.message || "An error occurred."
      );
    }
  };

  // Fetch user profile
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

  // Logout function
  const logout = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem("jwt_token");
  };

  // Load token on component mount
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

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Profile picture upload
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

export default AuthProvider;
