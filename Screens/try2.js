import React, { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const UpdateProfilePicture = () => {
  const [imageUri, setImageUri] = useState(null);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert('Please select an image first');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg', // or the appropriate type for your image
      name: 'profile.jpg',
    });

    try {
      const response = await axios.post('https://movieappbackend-hogp.onrender.com/api/register', formData, {
        headers: {
          "Authorization": "Bearer jwt_token", // Ensure this is the correct token
          'key':'file',
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        Alert.alert('Profile picture updated successfully');
      } else {
        Alert.alert('Failed to update profile picture');
      }
    } catch (error) {
      console.error('Error uploading image: ', error);
      if (error.response && error.response.status === 401) {
        Alert.alert('Unauthorized: Please check your JWT token');
      } else {
        Alert.alert('Error uploading image');
      }
    }
  };

  return (
    <View>
      <Button title="Select Image" onPress={selectImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />}
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
};

export default UpdateProfilePicture;