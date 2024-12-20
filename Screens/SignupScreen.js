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
  ActivityIndicator,
} from "react-native";
import { useContext, useState, createContext } from "react";
import { UserContext } from "../Context/Login";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { API_BASE_URL } from "@env";

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
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState("");
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

  const validateNumber = (number) => {
    setNumber(number);
    if (!/^\d{10}$/.test(number)) {
      setNumberError("Please enter a valid 10-digit phone number.");
    } else {
      setNumberError("");
    }
  };

  const handleSubmit = async () => {
    validateName(Name);
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(confirmpassword);
    validateNumber(number);

    setLoading(true);
    if (
      !NameError &&
      !emailError &&
      !passwordError &&
      !confirmpasswordError &&
      !numberError &&
      Name &&
      email &&
      password &&
      confirmpassword &&
      number &&
      profilePhoto
    ) {
      const userData = { Name, email, profilePhoto, number };

      // Log the data being sent to the API
      console.log("User Data:", userData);

      try {
        const response = await axios.post(`${API_BASE_URL}/register`, {
          username: Name,
          email,
          password,
          phoneNumber: number,
        });
        Alert.alert("Registration Successful", response.data.message);

        // Save user data to AsyncStorage
        await AsyncStorage.setItem("@user_data", JSON.stringify(userData));

        // Update context with the new user data
        setUser(userData);
        setTimeout(() => {
          Alert.alert("Sign up Successful!");
          setLoading(false);
          navigation.navigate("Home");
        }, 1000);
      } catch (error) {
        console.log(
          "Registration Error:",
          error.message,
          error.response?.data || "No additional data available."
        );
        Alert.alert(
          "Registration Failed",
          error.response?.data?.message || "An error occurred."
        );
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
    <ScrollView keyboardShouldPersistTaps="handled">
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
              <Image source={{ uri: profilePhoto }} style={styles.profilePhoto} />
            ) : (
              <Image source={require("../t/ProfileLogo.png")} style={styles.profilePhoto} />
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

          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            keyboardType="number-pad"
            onChangeText={validateNumber}
          />

          {numberError ? <Text style={styles.errorText}>{numberError}</Text> : null}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input1}
              placeholder="Set password"
              secureTextEntry={!showPassword}
              onChangeText={validatePassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Icon name={showPassword ? "eye" : "eye-slash"} style={styles.iconStyle} />
            </TouchableOpacity>
          </View>

          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry
            onChangeText={validateConfirmPassword}
          />

          {confirmpasswordError ? <Text style={styles.errorText}>{confirmpasswordError}</Text> : null}
        </View>
        <View style={{ display: "flex", flexDirection: "row", paddingRight: 16, width: "100%", justifyContent: "center" }}>
          <Text style={{ color: "#fff", fontSize: 14, fontWeight: "bold", marginTop: 4 }}>By sigining in, you agree to our </Text>
          <Text style={{ color: "red", fontSize: 14, fontWeight: "bold", marginTop: 4 }}>Terms & Conditions</Text>
        </View>

        <View style={{ display: "flex", flexDirection: "row", marginBottom: 20, marginHorizontal: 27 }}>
          <Text style={{ color: "#fff", fontSize: 14, fontWeight: "bold" }}>and </Text>
          <Text style={{ color: "red", fontSize: 14, fontWeight: "bold" }}>Privacy Policy</Text>
        </View>

        <View>
          <TouchableOpacity
            style={styles.buttonTO}
            onPress={handleSubmit}
            disabled={!Name || !email || !password || !confirmpassword || !profilePhoto || !number || !!NameError || !!emailError || !!passwordError || !!confirmpasswordError || !!numberError}
          >
            {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Sign up</Text>}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={styles.txt2}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.txt3}> Sign in</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  txt: {
    marginTop: 50,
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  profile: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 50,
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 15,
    marginTop: 40,
  },
  profilePhoto: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  textButton: {
    color: "blue",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10,
  },
  input: {
    height: 50,
    marginHorizontal: 20,
    marginVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#D5F2E3",
    fontSize: 16,
  },
  input1: {
    height: 50,
    marginHorizontal: 20,
    marginVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#D5F2E3",
    fontSize: 16,
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  iconStyle: {
    fontSize: 20,
    color: "grey",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 20,
  },
  buttonTO: {
    marginHorizontal: 50,
    marginVertical: 30,
    backgroundColor: "#07C",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  txt2: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  txt3: {
    color: "#07C",
    fontSize: 16,
    fontWeight: "bold",
  },
});
