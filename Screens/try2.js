import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const App = () => {
  return (
    <LinearGradient colors={["#1e3c72", "#2a5298"]} style={styles.container}>
      <Text style={styles.title}>STUDY SMART</Text>

      <Text style={styles.subtitle}>LOGIN</Text>

      <TextInput placeholder="Email Address" style={styles.input} placeholderTextColor="#ccc" />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry placeholderTextColor="#ccc" />

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        New User? <Text style={{ color: "#fff", fontWeight: "bold" }}>Sign up</Text>
      </Text>

      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>Continue with Microsoft</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    color: "#fff",
  },
  loginButton: {
    backgroundColor: "#1e3c72",
    padding: 12,
    width: "80%",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 15,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    color: "#ccc",
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 12,
    width: "80%",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 10,
  },
  socialText: {
    color: "#fff",
  },
});

export default App;
