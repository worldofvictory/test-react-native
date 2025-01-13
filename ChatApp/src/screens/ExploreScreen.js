import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";

const ExploreScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const createChat = (type, content) => {
    const newChat = {
      id: Date.now(),
      type,
      content,
      messages: [{ text: content, sender: "system" }],
    };
    setChats([...chats, newChat]);
    navigation.navigate("Chat", { chat: newChat });
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-lg font-bold mb-4">Explore</Text>
      <FlatList
        horizontal
        data={[{ name: "AI Assistant" }, { name: "English Teacher" }]}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              createChat("AI Assistant", `Hello from ${item.name}`)
            }
          >
            <View className="bg-blue-200 p-4 m-2 rounded">
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        placeholder="Enter new chat..."
        className="border p-2 rounded"
        onSubmitEditing={(e) => createChat("Custom", e.nativeEvent.text)}
      />
    </View>
  );
};

export default ExploreScreen;
