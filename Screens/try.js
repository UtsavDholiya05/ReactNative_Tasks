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
    const [imageUri, setImageUri] = useState(null);
  
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
        const userData = { Name, email, password };
    
        try {
          const formData = new FormData();
          formData.append("username", Name);
          formData.append("email", email);
          formData.append("password", password);
    
          if (profilePhoto) {
            formData.append("profilePhoto", {
              uri: profilePhoto,
              type: "image/jpeg", // Use appropriate mime type based on the image format
              name: "profile.jpg", // Use appropriate file name
            });
    
            // Use PUT request for profile picture update
            const response = await axios.put(
              `${API_BASE_URL}/user/profilePicture`, // Replace with your API endpoint
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${jwt_token}`, // Replace with the user's JWT token
                },
              }
            );
    
            Alert.alert("Profile Updated", response.data.message);
          } else {
            // Use POST request for user registration
            const response = await axios.post(`${API_BASE_URL}/register`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${jwt_token}`, // Replace with the user's JWT token
              },
            });
    
            Alert.alert("Registration Successful", response.data.message);
    
            // Save user data to AsyncStorage
            await AsyncStorage.setItem("@user_data", JSON.stringify(userData));
    
            // Update context with the new user data
            setUser(userData);
            setTimeout(() => {
              alert("Sign up Successful!");
              setLoading(false);
              navigation.navigate("Home");
            }, 1000);
          }
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
        setImageUri(result.uri);
  
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
                <Text style={styles.textButton}>Sign Up</Text>
              )}
            </TouchableOpacity>
          </View>
  
          <View>
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
                marginTop: 8,
                alignSelf: "center",
              }}
            >
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  color: "red",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: 4,
                  alignSelf: "center",
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    txt: {
      marginTop: 80,
      fontSize: 40,
      color: "#D5F2E3",
      fontWeight: "bold",
      alignSelf: "center",
    },
    profile: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: 8,
      width: 150,
      height: 150,
      borderRadius: 80,
      marginTop: 20,
    },
    profilePhoto: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    input: {
      margin: 12,
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      color: "#D5F2E3",
      borderRadius: 5,
      paddingLeft: 10,
    },
    input1: {
      flex: 1,
      margin: 12,
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      color: "#D5F2E3",
      borderRadius: 5,
      paddingLeft: 10,
    },
    iconStyle: {
      color: "#D5F2E3",
      fontSize: 20,
      marginRight: 10,
      marginLeft: 5,
    },
    buttonTO: {
      alignItems: "center",
      backgroundColor: "#FF5733",
      padding: 10,
      width: "90%",
      borderRadius: 5,
      margin: 10,
    },
    textButton: {
      fontSize: 18,
      color: "white",
      fontWeight: "bold",
    },
    errorText: {
      color: "red",
      marginLeft: 14,
    },
  });
  