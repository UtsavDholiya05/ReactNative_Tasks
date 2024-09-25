import {
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  Button,
  TouchableOpacity
} from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../Context/Login"; 
import { useNavigation } from "@react-navigation/native"; 


export default function ProfileScreen() {
  const { profilePhoto, name, email } = useContext(UserContext); 
  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/m2.png")}
        style={styles.backgroundImage}
      >
        <TextInput style={styles.input} placeholder="User Profile" />
        <Image source={{ uri: profilePhoto }} style={styles.profilePicture} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>

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
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "white",
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
    color:"black",
    // paddingTop: "25%",
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 10,
  },
});
