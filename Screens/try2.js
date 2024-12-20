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
        if (!profilePhoto) {
          Alert.alert("Profile Photo Missing", "Please upload a profile photo.");
          setLoading(false);
          return;
        }
  
        const userData = { Name, email, profilePhoto };
  
        try {
          console.log("Sending registration data:", userData);
          const response = await axios.post(`${API_BASE_URL}/register`, {
            username: Name,
            email,
            password,
            profilePhoto,
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
  
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input1}
                placeholder="Set password"
                secureTextEntry={!showPassword}
                onChangeText={validatePassword}
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
  
            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              secureTextEntry
              onChangeText={validateConfirmPassword}
            />
  
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
              By signing in, you agree to our{" "}
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
                !Name ||
                !email ||
                !password ||
                !confirmpassword ||
                !profilePhoto ||
                !!NameError ||
                !!emailError ||
                !!passwordError ||
                !!confirmpasswordError
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
  
  const styles = StyleSheet.create({
    txt: {
      color: "#fff",
      fontSize: 30,
      fontWeight: "bold",
      marginTop: 20,
      textAlign: "center",
    },
    profile: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
    },
    profilePhoto: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
    },
    textButton: {
      color: "#D5F2E3",
      fontSize: 16,
      fontWeight: "bold",
    },
    input: {
      backgroundColor: "#fff",
      borderColor: "#D5F2E3",
      borderWidth: 1,
      borderRadius: 5,
      margin: 10,
      padding: 10,
      fontSize: 16,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    input1: {
      flex: 1,
      backgroundColor: "#fff",
      borderColor: "#D5F2E3",
      borderWidth: 1,
      borderRadius: 5,
      margin: 10,
      padding: 10,
      fontSize: 16,
    },
    iconStyle: {
      color: "#000",
      marginRight: 10,
      fontSize: 20,
    },
    buttonTO: {
      backgroundColor: "#D5F2E3",
      padding: 15,
      borderRadius: 5,
      margin: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    errorText: {
      color: "red",
      marginLeft: 10,
    },
  });
  