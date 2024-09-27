import React, { useContext } from "react";
import { View, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { UserContext } from "../Context/Login";

const EditProfile = () => {
  const { user, setUser } = useCont-ext(UserContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUser({ ...user, profilePhoto: result.uri });
    }
  };

  return (
    <View>
      <Image
        source={{ uri: user.profilePhoto }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <Button title="Change Profile Picture" onPress={pickImage} />
    </View>
  );
};

export default EditProfile;
