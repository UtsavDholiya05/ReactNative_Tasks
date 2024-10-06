import {
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../Context/Login";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const { user, setUser } = useContext(UserContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUser((prevUser) => ({
        ...prevUser,
        profilePhoto: result.assets[0].uri, //result.assets[0].uri for latest Expo ImagePicker API
      }));
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../t/WhatsApp Image 2024-09-28 at 21.29.25_158d91f3.jpg")}
        style={styles.backgroundImage}
      >
        {/* <TextInput style={styles.input} placeholder="User Profile" /> */}

        {/* {user.profilePhoto ? (
          <Image
            source={{ uri: user.profilePhoto }}
            style={styles.profilePhoto}
          />
        ) : (
          <Text style={styles.input}>No profile photo selected</Text>
        )} */}
        <View style={styles.photo}>
          {user.profilePhoto ? (
            <Image
              source={{ uri: user.profilePhoto }}
              style={styles.profilePhoto}
            />
          ) : (
            // <Text style={styles.input}>No profile photo selected</Text>
            <Image
              source={require("../t/ProfileLogo.png")}
              style={styles.profilePhoto}
            />
          )}
        </View>

        <View style={styles.input}>
          <Text style={{ color: "black" , fontWeight:"bold" }}>Name: </Text>
          <Text>{user.Name}</Text>
        </View>

        <View style={styles.input}>
          <Text style={{ color: "black" , fontWeight:"bold" }}>Email: </Text>
          <Text>{user.email}</Text>
        </View>

        {/* <Button title="Change Profile Picture" onPress={pickImage} /> */}
        <View>
          <TouchableOpacity
            style={styles.buttonTO}
            title="Change Profile Picture"
            onPress={pickImage}
          >
            <Text style={styles.buttonText}>Edit Profile Photo</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 50,
    width: "90%",
    alignSelf: "center",
    // alignContent: "center",
    // justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingLeft: 9,
    marginVertical: 20,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderColor: "white",
    borderWidth: 1.4,
    borderRadius: 50,
    marginVertical: 15,
  },
  buttonTO: {
    paddingVertical: 20,
  },
  buttonText: {
    height: 40,
    width: "50%",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#3498db",
    color: "#fff",
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 10,
  },
  photo: {
    alignSelf: "center",
    marginTop: 40,
  },
});
