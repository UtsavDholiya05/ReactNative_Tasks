import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import * as Speech from "expo-speech";
import axios from "axios";
import { useSafeAreaFrame } from "react-native-safe-area-context";

const ChatBot = () => {
  const [chat, setChat] = useState([]); // [] empty array that will hold chat messages
  const [userInput, setUserInput] = useState(""); // "" empty string to hold user input
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const API_KEY = "AIzaSyAdudW--AGSvnD59Uo6YNRvKIDL5Qj-Tq0";

  const handleUserInput = async () => {
    // Add user input to chat
    let updatedChat = [
      ...chat,
      {
        role: "user",
        parts: [{ text: userInput }],
      },
    ];
    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/vlbeta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: updatedChat, // corrected from 'contets' to 'contents'
        }
      );

      console.log("Gemini Pro API Response:", response.data);

      const modelResponse = response.data?.[0]?.content?.parts?.[0]?.text || "";

      if (modelResponse) {
        // Add model response to chat
        const updatedChatWithModel = [
          ...updatedChat,
          {
            role: "model",
            parts: [{ text: modelResponse }],
          },
        ];

        setChat(updatedChatWithModel);
        setUserInput("");
      }
    } catch (error) {
      console.error("Error while calling Gemini Pro API:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = async (text) => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      if (!(await Speech.isSpeakingAsync())) {
        Speech.speak(text);
        setIsSpeaking(true);
      }
    }
  };

  const renderChatItem = ({ item }) => {
    return (
      <ChatBubble
        role={item.role}
        text={item.parts[0].text}
        onSpeech={() => handleSpeech(item.parts[0].text)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gemini Chatbox</Text>

      <FlatList
        data={chat}
        renderItem={renderChatItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.chatContainer}
      />
      {/* <TextInput
        style={styles.input}
        value={userInput}
        onChangeText={setUserInput}
        placeholder="Type your message..."
      />
      <Button title="Send" onPress={handleUserInput} disabled={loading || !userInput} /> */}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message"
          placeholderTextColor="#aaa"
          value={userInput}
          onChangeText={setUserInput}
        />
      </View>

      <TouchableOpacity style={styles.loading} color="#333">
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator style={styles.loading} color="#333" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

// Define your styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignContent: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 50,
    marginRight: 10,
    padding: 8,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 25,
    color: "#333",
    backgroundColor: "#fff",
  },
  button: {
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    color: "black",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  loading: {
    marginTop: 10,
  },
});

export default ChatBot;
