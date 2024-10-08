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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { user, setUser } = useContext(UserContext);

  const validateName = (name) => {
    setName(name);
    if (name.length < 3) {
      setNameError("Name must be at least 3 characters long.");
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
        await AsyncStorage.setItem("@user_data", JSON.stringify(userData));
        setUser(userData);
        alert("Sign up Successful!");
        navigation.navigate("Home");
      } catch (e) {
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
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require("../t/WhatsApp Image 2024-09-28 at 21.29.25_158d91f3.jpg")}
        style={styles.backgroundImage}
      >
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Create a new account</Text>

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
            <Text style={styles.textButton}>Upload Your Profile Photo</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.form}>
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
                name={showPassword ? "eye-slash" : "eye"}
                style={styles.iconStyle}
              />
            </TouchableOpacity>
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
          </View>

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

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>By signing in, you agree to our </Text>
          <Text style={styles.termsLink}>Terms & Conditions</Text>
        </View>

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>and </Text>
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </View>

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
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        <View style={styles.loginPrompt}>
          <Text style={styles.promptText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}> Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    alignSelf: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 32,
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    color: "#D5F2E3",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    alignSelf: "center",
  },
  profile: {
    alignSelf: "center",
    marginBottom: 20,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderColor: "white",
    borderWidth: 1.4,
    borderRadius: 50,
    marginBottom: 10,
  },
  textButton: {
    color: "#fff",
    fontSize: 16,
  },
  form: {
    width: "100%",
    borderRadius: 10,
    padding: 20,

  },
  input: {
    height: 50,
    width: "100%",
    backgroundColor: "#f2f2f2",
    color: "#333",
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderColor:"white",
    borderWidth:1,
    
  },
  iconStyle: {
    fontSize: 24,
    color: "#333",
    padding: 10,
  },
  buttonTO: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },
  termsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  termsText: {
    color: "#666",
  },
  termsLink: {
    color: "#3498db",
    fontWeight: "bold",
  },
  loginPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  promptText: {
    color: "#666",
  },
  loginLink: {
    color: "#3498db",
    fontWeight: "bold",
  },
  input1:{
    backgroundColor: "#f2f2f2",
   
    color:"white",
  }
});
