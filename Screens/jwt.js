import React, { createContext, useState, useContext, useEffect } from "react";
import { View, Text, Image, Button, Alert, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@env";

// Create Authentication Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register User
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Registration successful! Please log in.");
      } else {
        Alert.alert("Error", data.message || "Registration failed.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch User Data
  const fetchUserProfile = async (jwtToken) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${jwtToken || token}` },
      });
      console.log("Fetched User Profile:", response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.log("Error fetching user profile:", error);
      Alert.alert("Error", "Failed to fetch user profile.");
    }
  };

  // Upload Profile Picture
  const uploadProfilePicture = async (imageUri) => {
    if (!token) {
      Alert.alert("Error", "Authentication token is missing.");
      return;
    }
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
          },
        }
      );
      await fetchUserProfile(); // Refresh user data after updating
      Alert.alert("Success", "Profile picture updated successfully.");
      console.log("Updated User Data:", response.data.user);
    } catch (error) {
      console.log("Error updating profile picture:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to update profile picture."
      );
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("jwt_token");

      setUser(null);
      setToken(null);
      Alert.alert("Success", "You have been logged out.");
    } catch (error) {
      Alert.alert("Error", "Failed to log out.");
    }
  };

  // Load Token from AsyncStorage
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("jwt_token");
        if (storedToken) {
          setToken(storedToken);
          await fetchUserProfile(storedToken);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load token.");
      } finally {
        setLoading(false);
      }
    };
    loadToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, uploadProfilePicture, logout, loading, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Main App Component
const App = () => {
  const { user, uploadProfilePicture, logout, loading } = useAuth();

  const handleUploadPhoto = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Denied",
        "You need to grant permissions to upload a photo."
      );
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      uploadProfilePicture(pickerResult.assets[0].uri);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {user ? (
        <View style={styles.profileContainer}>
          <Text style={styles.greeting}>Welcome, {user.username}</Text>
          {user.profilePicture ? (
            <Image
              source={{ uri: user.profilePicture }}
              style={styles.profileImage}
            />
          ) : (
            <Image
              source={require("../t/ProfileLogo.png")}
              style={styles.profileImage}
            />
          )}
          <Button
            title="Upload New Profile Picture"
            onPress={handleUploadPhoto}
            color="#6200ee"
          />
          <Text style={styles.infoText}>Email: {user.email}</Text>
          <Button title="Logout" onPress={logout} color="red" />
        </View>
      ) : (
        <Text style={styles.errorText}>No user logged in. Please log in again.</Text>
      )}
    </ScrollView>
  );
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    marginTop: 10,
    color: "#333",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
