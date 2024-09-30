import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../t/WhatsApp Image 2024-09-28 at 21.29.25_158d91f3.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome!</Text>
        {/* <Text style={styles.subtitle}> 
          One App, Endless Recommendations. Offering tailored content just for
          you!
        </Text> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
