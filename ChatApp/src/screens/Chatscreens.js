import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";

const ChatScreen = ({ route }) => {
  const { chat } = route.params;
  const [messages, setMessages] = useState(chat.messages);
  const placeholderReplies = [
    "How can I help?",
    "Tell me more!",
    "Interesting...",
    "Let's dive deeper!",
    "Sure, here's my answer.",
  ];

  const sendMessage = (text) => {
    const userMessage = { text, sender: "user" };
    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const reply = {
        text: placeholderReplies[
          Math.floor(Math.random() * placeholderReplies.length)
        ],
        sender: "system",
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View
            className={`p-2 ${
              item.sender === "user" ? "bg-blue-100" : "bg-gray-200"
            } m-2 rounded`}
          >
            <Text>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        placeholder="Type your message..."
        className="border p-2"
        onSubmitEditing={(e) => sendMessage(e.nativeEvent.text)}
      />
    </View>
  );
};

export default ChatScreen;
