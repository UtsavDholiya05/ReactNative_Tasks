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

const ChatBot = () => {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const API_KEY = "AIzaSyAdudW--AGSvnD59Uo6YNRvKIDL5Qj-Tq0";

  const handleUserInput = async () => {
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
          contents: updatedChat,
        }
      );

      const modelResponse = response.data?.[0]?.content?.parts?.[0]?.text || "";

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
      }
    } catch (error) {
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
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message"
          placeholderTextColor="#aaa"
          value={userInput}
          onChangeText={setUserInput}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleUserInput}
          disabled={loading || !userInput}
        >
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator style={styles.loading} color="#333" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const ChatBubble = ({ role, text, onSpeech }) => {
  const isUser = role === "user";
  return (
    <View
      style={[
        styles.chatBubble,
        isUser ? styles.userBubble : styles.modelBubble,
      ]}
    >
      <TouchableOpacity onPress={onSpeech}>
        <Text style={[styles.chatText, isUser ? styles.userText : styles.modelText]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: 16,
  },
  chatBubble: {
    padding: 12,
    marginVertical: 8,
    borderRadius: 20,
    maxWidth: "80%",
    alignSelf: "flex-start",
  },
  userBubble: {
    backgroundColor: "#007AFF",
    alignSelf: "flex-end",
  },
  modelBubble: {
    backgroundColor: "#e5e5ea",
  },
  chatText: {
    fontSize: 16,
  },
  userText: {
    color: "#fff",
  },
  modelText: {
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 50,
    marginRight: 10,
    paddingHorizontal: 15,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loading: {
    marginTop: 10,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default ChatBot;
