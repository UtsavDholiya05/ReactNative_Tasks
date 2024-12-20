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
        confirmpassword &&
        profilePhoto
      ) {
        const userData = { Name, email, profilePhoto };
    
        // Log the data being sent to the API
        console.log("User Data:", userData);
    
        try {
          const formData = new FormData();
          formData.append("username", Name);
          formData.append("email", email);
          formData.append("password", password);
          formData.append("profilePhoto", {
            uri: profilePhoto,
            type: "image/jpeg",
            name: "profile.jpg",
          });
    
          const response = await axios.post(`${API_BASE_URL}/register`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
    
          // Log the API response
          console.log("API Response:", response.data);
    
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

            {/* <TextInput
            style={styles.input}
            placeholder="Contact Number"
            keyboardType="number-pad"
            onChangeText={(text) => {
              setNumber(text);
              setNumberError("");
            }}
            />

            {numberError ? (
              <Text style={styles.errorText}>{numberError}</Text>
            ) : null} */}

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
              // paddingRight: 16,
              // width: "100%",
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
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
      // paddingHorizontal: 20,
      // justifyContent: "center",
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
    input: {
      height: 45,
      width: "90%",
      alignSelf: "center",
      // borderColor: "#ddd",
      backgroundColor: "#fff",
      marginBottom: 15,
      paddingHorizontal: 10,
      marginVertical: 10,
      borderRadius: 100,
    },
    txt: {
      alignSelf: "center",
      color: "#fff",
      fontWeight: "bold",
      fontSize: 30,
      marginTop: 23,
      marginBottom: 12,
    },
    viewButton: {
      justifyContent: "center",
      alignItems: "center",
    },
    buttonTO: {
      backgroundColor: "#3498db",
      paddingVertical: 10,
      marginHorizontal: 20,
      borderRadius: 15,
      width: "90%",
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      textAlign: "center",
    },
    errorText: {
      color: "red",
      textAlign: "center", // Center the error message horizontally
      marginBottom: 10,
      width: "90%",
      alignSelf: "center",
      marginLeft: 17,
    },
    buttonPhoto: {
      backgroundColor: "#fff",
      marginVertical: 10,
      marginHorizontal: 20,
      borderRadius: 100,
    },
    textButton: {
      color: "#fff",
      fontSize: 18,
      marginBottom: 23,
    },
    profilePhoto: {
      width: 100,
      height: 100,
      borderColor: "white",
      borderWidth: 1.4,
      borderRadius: 100,
      marginVertical: 15,
      alignSelf: "center",
    },
    profile: {
      alignSelf: "center",
    },
    iconStyle: {
      fontSize: 22,
      color: "black",
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
  });