import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator
} from "react-native";
import { useContext, useState } from "react";
import { UserContext } from "../Context/Login";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmpasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Name, setName] = useState("");
  const [NameError, setNameError] = useState("");
  const [profilePhoto, setprofilePhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { user, setUser } = useContext(UserContext);

  const validateName = (name) => {
    setName(name);
    if (name.length < 2) {
      setNameError("Name must be at least 2 characters long.");
    } else {
      setNameError("");
    }
  };

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

  const validateConfirmPassword = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async () => {
    validateName(Name);
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(confirmpassword);

    setLoading(true);
    if (
      !NameError &&
      !emailError &&
      !passwordError &&
      !confirmpasswordError &&
      Name &&
      email &&
      password &&
      confirmpassword
    ) {
      const userData = { Name, email, profilePhoto };

      try {
        // Save user data to AsyncStorage
        await AsyncStorage.setItem("@user_daxta", JSON.stringify(userData));

        // Update context with the new user data
        setUser(userData);
        setTimeout(() => {
          alert("Sign up Successful!");
          setLoading(false);
          navigation.navigate("Home");
        }, 1000);
      } 
      catch (e) 
      {
        console.error("Failed to save user data.", e);
      }
    }
  };


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setprofilePhoto(result.assets[0].uri);

      Alert.alert(
        "Photo Uploaded",
        "Your profile picture has been successfully uploaded!",
        [{ text: "OK" }]
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require("../t/WhatsApp Image 2024-09-28 at 21.29.25_158d91f3.jpg")}
        style={{ height: "100%", width: "100%" }}
      >
        <Text style={styles.txt}>Sign Up</Text>

        <Text
          style={{
            color: "#D5F2E3",
            fontSize: 19,
            fontWeight: "bold",
            marginBottom: 4,
            marginTop: 4,
            alignSelf: "center",
          }}
        >
          Create a new account
        </Text>

        <TouchableOpacity onPress={pickImage}>
          <View style={styles.profile}>
            {profilePhoto ? (
              <Image
                source={{ uri: profilePhoto }}
                style={styles.profilePhoto}
              />
            ) : (
              <Image
                source={require("../t/ProfileLogo.png")}
                style={styles.profilePhoto}
              />
            )}
            <Text style={styles.textButton}> Upload Your Profile Photo</Text>
          </View>
        </TouchableOpacity>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            onChangeText={validateName}
          />

          {NameError ? <Text style={styles.errorText}>{NameError}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Email-address"
            keyboardType="email-address"
            onChangeText={validateEmail}
          />

          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          {/* Password field with LoginScreen's styling */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input1}  // Use input1 from LoginScreen
              placeholder="Set password"
              secureTextEntry={!showPassword}
              onChangeText={validatePassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Icon
                name={showPassword ? "eye" : "eye-slash"}
                style={styles.iconStyle}  // Use iconStyle from LoginScreen
              />
            </TouchableOpacity>
          </View>

          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry
            onChangeText={validateConfirmPassword}
          ></TextInput>

          {confirmpasswordError ? (
            <Text style={styles.errorText}>{confirmpasswordError}</Text>
          ) : null}
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            paddingRight: 16,
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 14,
              fontWeight: "bold",
              marginTop: 4,
            }}
          >
            By sigining in, you agree to our{" "}
          </Text>
          <Text
            style={{
              color: "red",
              fontSize: 14,
              fontWeight: "bold",
              marginTop: 4,
            }}
          >
            Terms & Conditions
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 20,
            marginHorizontal: 27,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 14, fontWeight: "bold" }}>
            and{" "}
          </Text>
          <Text style={{ color: "red", fontSize: 14, fontWeight: "bold" }}>
            Privacy Policy
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={styles.buttonTO}
            onPress={handleSubmit}
            disabled={
              !email ||
              !password ||
              !confirmpassword ||
              !Name ||
              emailError ||
              passwordError ||
              confirmpasswordError ||
              NameError
            }
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign up</Text>
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
              marginVertical: 15,
            }}
          >
            Already have an account?
          </Text>

          <TouchableOpacity>
            <Text
              style={{
                color: "red",
                fontSize: 16,
                fontWeight: "bold",
                marginLeft: 3,
                marginVertical: 15,
              }}
              onPress={() => navigation.navigate("Login")}
            >
              {" "}
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

// Styles for password from LoginScreen
const styles = StyleSheet.create({
  txt: {
    alignSelf: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 23,
    marginBottom: 12,
  },
  input: {
    height: 45,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",
    marginBottom: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 100,
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
    justifyContent: "space-between",
  },
  input1: {
    flex: 1,
  },
  iconStyle: {
    fontSize: 24,
    color: "gray",
  },
  errorText: {
    color: "red",
    alignSelf: "center",
    fontSize: 12,
  },
  buttonTO: {
    backgroundColor: "#D5F2E3",
    height: 45,
    width: "90%",
    alignSelf: "center",
    marginVertical: 20,
    borderRadius: 100,
  },
  buttonText: {
    alignSelf: "center",
    color: "#000",
    fontSize: 19,
    fontWeight: "bold",
    padding: 10,
  },
  profile: {
    alignItems: "center",
  },
  profilePhoto: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  textButton: {
    color: "blue",
    marginTop: 8,
  },
});
