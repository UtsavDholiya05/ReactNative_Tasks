import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://movieappbackend-hogp.onrender.com/api/register"; 

const App = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem("@jwt_token");
      if (storedToken) {
        setToken(storedToken);
      }
    };
    getToken();
  }, []);

  const handleInputChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const register = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/register`, {
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
        Alert.alert("Error", data.message || "Registration failed");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem("@jwt_token", data.token);
        setToken(data.token);
        Alert.alert("Success", "Logged in successfully!");
      } else {
        Alert.alert("Error", data.message || "Login failed");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/data`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      Alert.alert("Data Retrieved", JSON.stringify(data));
    } catch (error) {
      Alert.alert("Error", "Failed to fetch data.");
    }
  };

  const createData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ key: "value" }),
      });
      const data = await response.json();
      console.log(data);
      Alert.alert("Success", "Data created successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to create data.");
    }
  };

  const updateData = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/data/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ key: "new value" }),
      });
      const data = await response.json();
      console.log(data);
      Alert.alert("Success", "Data updated successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to update data.");
    }
  };

  const patchData = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/data/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ key: "partial update" }),
      });
      const data = await response.json();
      console.log(data);
      Alert.alert("Success", "Data patched successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to patch data.");
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/data/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        Alert.alert("Success", "Data deleted successfully");
      } else {
        Alert.alert("Error", "Failed to delete data");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to delete data.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>JWT Authentication Demo</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={userData.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userData.email}
        onChangeText={(text) => handleInputChange("email", text)}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={userData.password}
        onChangeText={(text) => handleInputChange("password", text)}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={register}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={getData}>
            <Text style={styles.buttonText}>Get Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={createData}>
            <Text style={styles.buttonText}>Create Data</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "#007bff",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default App;
