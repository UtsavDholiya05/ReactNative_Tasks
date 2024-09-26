import {
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../Context/Login"; 
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
  const { user, setUser } = useContext(UserContext); 
  const navigation = useNavigation();

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
        profilePhoto: result.assets[0].uri, // Use result.assets[0].uri if you're using the latest Expo ImagePicker API
      }));
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/m2.png")}
        style={styles.backgroundImage}
      >
        <TextInput style={styles.input} placeholder="User Profile" />

        {user.profilePhoto ? (
          <Image
            source={{ uri: user.profilePhoto }}
            style={styles.profilePhoto}
          />
        ) : (
          <Text style={styles.input}>No profile photo selected</Text>
        )}

        <Text style={styles.input}>Name: {user.Name}</Text>
        <Text style={styles.input}>Email: {user.email}</Text>
        
        <Button title="Change Profile Picture" onPress={pickImage} />

        <TouchableOpacity
          style={styles.buttonTO}
          onPress={() => navigation.navigate("ProfileComponent")}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
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
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginVertical: "auto",
    borderRadius: 100,
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
    fontWeight: "bold",
    backgroundColor: "#fff",
    color: "black",
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 10,
  },
});
