import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  TouchableOpacity,
  Button,
} from "react-native";
import { useContext, useState } from "react";
import { UserContext } from "../Context/Login";
import * as ImagePicker from "expo-image-picker";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmpasswordError, setconfirmpasswordError] = useState("");
  const [Name, setName] = useState("");
  const [NameError, setNameError] = useState("");
  // const [number, setNumber] = useState("");
  // const [numberError, setNumberError] = useState("");
  const [profilePhoto, setprofilePhoto] = useState(null);



  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateInputs = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");
    setconfirmpasswordError("");
    setNameError("");

    // Email validation
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      valid = false;
    }

    // Password validation
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    }

    //confirm password check
    if (confirmpassword !== password) {
      setconfirmpasswordError("Passwords do not match");
      valid = false;
    }

    if (!Name) {
      setNameError("First name required");
      valid = false;
    }

    // if (number.length !== 10) {
    //   setNumberError(
    //     "Invalid contact number. Please enter a 10-digit contact number"
    //   );
    //   valid = false;
    // }

    return valid;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      alert("Sign up Successful!");
      const userData = { Name, email, profilePhoto };
      setUser(userData);
      navigation.navigate("Home");
    }
  };

  const { user, setUser } = useContext(UserContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      if (!result.canceled) {
        setUser({ ...user, profilePhoto: result.assets[0].uri });
      }
    }
  };

  return (
    <View>
      <ImageBackground
        source={require("../assets/m2.png")}
        style={{ height: "100%", width: "100%" }}
      >
        <Text style={styles.txt}>Sign Up</Text>

        <Text
          style={{
            color: "#D5F2E3",
            fontSize: 19,
            fontWeight: "bold",
            marginBottom: 15,
            marginTop: 10,
            alignSelf: "center",
          }}
        >
          Create a new account
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Your Name"
          onChangeText={(text) => {
            setName(text);
            setNameError("");
          }}
        />

        {NameError ? <Text style={styles.errorText}>{NameError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Email-address"
          keyboardType="email-address"
          onChangeText={(text) => {
            setEmail(text);
            setEmailError("");
          }}
        />

        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

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

        <TextInput
          style={styles.input}
          placeholder="Set password"
          secureTextEntry
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError("");
          }}
        ></TextInput>

        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          secureTextEntry
          onChangeText={(text) => {
            setconfirmpassword(text);
            setconfirmpasswordError("");
          }}
        ></TextInput>

        {confirmpasswordError ? (
          <Text style={styles.errorText}>{confirmpasswordError}</Text>
        ) : null}

        <Button title="Profile Picture" onPress={pickImage} />

        {profilePhoto && <Image source={{ uri: profilePhoto }} style={{ width: 100, height: 100 }} />}
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
            paddingRight: 16,
            width: "100%",
            marginBottom: 20,
            marginHorizontal: 30,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 14 }}>and </Text>
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
            <Text style={styles.buttonText}>Sign up</Text>
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
                color: "#fff",
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
  input: {
    height: 45,
    width: "90%",
    alignSelf: "center",
    borderColor: "#ddd",
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
    marginTop: 30,
    marginBottom: 10,
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
    marginBottom: 10,
    width: "90%",
    alignSelf: "center",
    marginLeft: 17,
  },
});
