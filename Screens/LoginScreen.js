import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useState } from "react";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateInputs = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    // Email validation
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    // Password validation
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      valid = false;
    }

    return valid;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      alert("Log in Successful!");
      navigation.navigate("Home");
    }
  };

  return (
    <View>
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
          {" "}
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
            keyboardType={"email-address"}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError("");
            }}
          />
        </View>

        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError("");
          }}
        ></TextInput>

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
            Forgot Password ?
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={[styles.buttonTO]}
            onPress={handleSubmit}
            // disabled={!email || !password || emailError || passwordError}
          >
            {/* emailempty,passwordempty,any email error,any passwword errod */}

            <Text style={styles.buttonText}>Login</Text>
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
            style={{ color: "#fff", fontSize: 16, fontWeight: "bold", marginVertical: 20 }}
          >
            Dont't have an account?
          </Text>

          <TouchableOpacity>
            <Text
              style={{ color: "#fff", fontSize: 16, fontWeight: "bold", marginLeft: 3 , marginVertical: 20 }}
              onPress={() => navigation.navigate("Sign Up")}
            >
              {" "}
              Signup
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  form: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
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
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 50,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    width: "90%",
    alignSelf: "center",
    marginLeft: 17,
  },
  viewButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTO: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    marginBottom: 5,
    marginHorizontal: 20,
    borderRadius: 15,
    width: "90%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
});
