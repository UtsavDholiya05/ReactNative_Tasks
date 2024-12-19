import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@env";
import React, { createContext, useEffect } from "react";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email) => {
    setEmail(email);
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    setPassword(password);
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async () => {
    validateEmail(email);
    validatePassword(password);

    if (emailError || passwordError || !email || !password) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });

      const { token } = response.data;

      // Save token to AsyncStorage
      await AsyncStorage.setItem("jwt_token", token);
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error.response?.data?.message || "An error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // Properly toggle the boolean state
  };

  // Create AuthContext
  const AuthContext = createContext();

  // State for user and token
  const AuthProvider = ({ children }) => 
  {
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

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ImageBackground
        source={require("../t/WhatsApp Image 2024-09-28 at 21.29.25_158d91f3.jpg")}
        style={{ height: "100%", width: "100%" }}
      >
        <Text
          style={{
            fontSize: 40,
            color: "white",
            fontWeight: "bold",
            marginBottom: 5,
            alignSelf: "center",
            marginTop: 50,
          }}
        >
          Welcome Back
        </Text>

        <Text
          style={{
            color: "#D5F2E3",
            fontSize: 19,
            fontWeight: "bold",
            marginBottom: 37,
            alignSelf: "center",
          }}
        >
          Login to your account
        </Text>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter your Email address"
            keyboardType="email-address"
            onChangeText={validateEmail}
            value={email}
          />
        </View>

        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input1}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            onChangeText={validatePassword}
            value={password}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon
              name={showPassword ? "eye" : "eye-slash"}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>

        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        <View
          style={{
            alignItems: "flex-end",
            paddingRight: 16,
            marginBottom: 150,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            Forgot Password?
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={[
              styles.buttonTO,
              { justifyContent: "center", alignItems: "center" },
            ]} // Centering the button
            onPress={handleSubmit}
            disabled={!email || !password || !!emailError || !!passwordError}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "bold",
              marginVertical: 20,
            }}
          >
            Don't have an account?
          </Text>

          <TouchableOpacity>
            <Text
              style={{
                color: "red",
                fontSize: 16,
                fontWeight: "bold",
                marginLeft: 3,
                marginVertical: 20,
              }}
              onPress={() => navigation.navigate("Sign Up")}
            >
              Signup
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  input: {
    height: 50,
    width: "90%",
    alignSelf: "center",
    borderColor: "#ddd",
    backgroundColor: "#fff",
    marginBottom: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 100,
  },
  errorText: {
    color: "red",
    textAlign: "center", // Center the error message horizontally
    marginBottom: 10,
    width: "90%",
    alignSelf: "center",
    marginLeft: 17,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",
    marginBottom: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 100,
    justifyContent: "space-between", // Ensure space between input and icon
  },
  input1: {
    flex: 1, // Take up most of the width
  },
  iconStyle: {
    fontSize: 22,
    color: "black",
  },
  buttonTO: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 5,
    borderRadius: 15,
    width: "90%", // Ensure responsiveness
    alignSelf: "center", // Center align the button
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
});
