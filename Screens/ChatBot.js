import { GEMINI_API_KEY } from "@env";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import * as Speech from "expo-speech";
import axios from "axios";
import ChatBubble from "./ChatBubble";

const ChatBot = () => {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const API_KEY = GEMINI_API_KEY;

  const handleUserInput = async () => {
    if (!userInput.trim()) return;

    let updatedChat = [
      ...chat,
      {
        role: "user",
        parts: [{ text: userInput }],
      },
    ];
    setChat(updatedChat);
    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
        {
          contents: updatedChat,
        }
      );
     

      const modelResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (modelResponse) {
        const updatedChatWithModel = [
          ...updatedChat,
          {
            role: "model",
            parts: [{ text: modelResponse }],
          },
        ];
        setChat(updatedChatWithModel);
        setUserInput("");
      } else {
        setError("No response received from the model.");
      }
    } catch (error) {
      console.error(
        "Error response data:",
        error.response?.data || error.message
      );
      setError("Oops! Something went wrong. Please try again.");
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

  const renderChatItem = ({ item }) => (
    <ChatBubble
      role={item.role}
      text={item.parts[0].text}
      onSpeech={() => handleSpeech(item.parts[0].text)}
    />
  );

  return (
    <View>
      <ImageBackground
        source={require("../t/WhatsApp Image 2024-09-28 at 21.29.25_158d91f3.jpg")}
        style={{ height: "100%", width: "100%" }}
      >
        <Text style={styles.title}>ChatBot</Text>

        <FlatList
          data={chat}
          renderItem={renderChatItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.chatContainer}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message"
            placeholderTextColor="#aaa"
            value={userInput}
            onChangeText={setUserInput}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleUserInput}
            disabled={loading || !userInput}
          >
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator style={styles.loading} color="#fff" />}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 10,
    elevation: 3,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 45,
    paddingLeft: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 25,
    color: "#333",
    backgroundColor: "#fff",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  loading: {
    marginVertical: 10,
  },
});

export default ChatBot;
