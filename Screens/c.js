import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    const newMessage = { id: Date.now(), text: inputText, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);

    // Call Google Gemini API here with inputText
    const response = await getBotResponse(inputText); // Placeholder function
    const botMessage = { id: Date.now() + 1, text: response, sender: "bot" };
    setMessages((prev) => [...prev, botMessage]);
    setInputText("");
  };

  const getBotResponse = async (userText) => {
    // Implement your Google Gemini API call and response handling
    // For example:
    // const response = await fetch(API_URL, { headers: { Authorization: `Bearer ${API_KEY}` }, body: JSON.stringify({ userText }) });
    // return response.message;
    return "This is a bot response"; // Placeholder
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={
              item.sender === "user" ? styles.userMessage : styles.botMessage
            }
          >
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#d3f8d3",
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f1f1",
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  inputContainer: { flexDirection: "row", alignItems: "center" },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  sendButton: { padding: 10, backgroundColor: "#007bff", borderRadius: 8 },
});

export default Chatbot;
