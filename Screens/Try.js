import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
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

  // Replace this with your actual API Key
  const API_KEY = "AIzaSyDJ_H0p_9H9mVSj_KBK9qRbrstdhCxiZv8";

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
        `https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5:generateText?key=${API_KEY}`,
        {
          prompt: {
            text: userInput,
          },
        }
      );
  
      const modelResponse = response.data?.candidates?.[0]?.output || "";
  
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
      console.error("Error response data:", error.response?.data || error.message);
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
          style={styles.sendButton}
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

// const ChatBubble = ({ role, text, onSpeech }) => (
//   <View
//     style={[
//       styles.chatBubble,
//       role === "user" ? styles.userBubble : styles.modelBubble,
//     ]}
//   >
//     <Text style={styles.chatText}>{text}</Text>
//     <TouchableOpacity onPress={onSpeech}>
//       <Text style={styles.speakButton}>🔊</Text>
//     </TouchableOpacity>
//   </View>
// );

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
    color: "#333",
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
    marginTop: 10,
  },
  chatBubble: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "75%",
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  userBubble: {
    backgroundColor: "#007AFF",
    alignSelf: "flex-end",
  },
  modelBubble: {
    backgroundColor: "#ddd",
  },
  chatText: {
    color: "#fff",
  },
  speakButton: {
    marginLeft: 10,
    fontSize: 18,
    color: "#333",
  },
});

export default ChatBot;