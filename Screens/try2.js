// viedo accessing through api
import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VideoUploader = () => {
  const [videos, setVideos] = useState([]);
  const storageKey = 'user_videos'; // Key to store video paths in AsyncStorage

  // Load saved videos when the app starts
  useEffect(() => {
    const loadVideos = async () => {
      try {
        const storedVideos = await AsyncStorage.getItem(storageKey);
        if (storedVideos) {
          setVideos(JSON.parse(storedVideos));
        }
      } catch (error) {
        console.error('Error loading videos:', error);
      }
    };
    loadVideos();
  }, []);

  // Pick a video
  const pickVideo = () => {
    const options = {
      mediaType: 'video',
      quality: 1,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.errorCode) {
        console.error('Error picking video:', response.errorMessage);
      } else {
        const video = response.assets[0];
        saveVideoUri(video.uri);
      }
    });
  };

  // Save the video URI and update the state
  const saveVideoUri = async (uri) => {
    try {
      const updatedVideos = [...videos, uri];
      setVideos(updatedVideos);
      await AsyncStorage.setItem(storageKey, JSON.stringify(updatedVideos));

      Alert.alert('Success', 'Video saved successfully!');
    } catch (error) {
      console.error('Error saving video URI:', error);
      Alert.alert('Error', 'Failed to save video.');
    }
  };

  // Render each video item
  const renderVideoItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => Alert.alert('Video Path', item)}
      style={styles.videoItem}
    >
      <Text style={styles.videoText}>{item.split('/').pop()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button title="Pick a Video" onPress={pickVideo} />
      {videos.length > 0 ? (
        <FlatList
          data={videos}
          renderItem={renderVideoItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.videoList}
        />
      ) : (
        <Text style={styles.noVideosText}>No videos saved yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  videoList: {
    marginTop: 20,
    width: '100%',
  },
  videoItem: {
    padding: 15,
    backgroundColor: '#eaeaea',
    borderRadius: 8,
    marginBottom: 10,
  },
  videoText: {
    color: '#333',
  },
  noVideosText: {
    marginTop: 20,
    color: '#888',
    fontSize: 16,
  },
});

export default VideoUploader;
