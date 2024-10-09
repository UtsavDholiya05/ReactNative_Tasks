import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import {useState} from "react";
import Icon from "react-native-vector-icons/FontAwesome";

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

    if (emailError === "" && passwordError === "" && email && password) {
      setLoading(true); // loading true when login process

      setTimeout(() => {
        alert("Login Successful!");
        setLoading(false);
        navigation.navigate("Home");
      }, 1000);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            onChangeText={validateEmail}
          />
        </View>

        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input1}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            onChangeText={validatePassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.touch}>
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
            style={[styles.buttonTO]}
            onPress={handleSubmit}
            disabled={
              !email || !password || emailError || passwordError || loading
            }
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
    flex: 1,  // Take up most of the width
  },
  iconStyle: {
    fontSize: 22,
    color: "black",
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
