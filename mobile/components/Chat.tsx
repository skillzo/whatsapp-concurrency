import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Message from "./Message";
import "../global.css";

interface MessageData {
  id: number;
  text?: string;
  type?: "file" | "text";
  filename?: string;
  size?: string;
  format?: string;
  sender: "me" | "them";
  time: string;
  read?: boolean;
  date?: string;
}

interface ChatProps {
  onBack: () => void;
}

const messages: MessageData[] = [
  {
    id: 1,
    text: "Good bye!",
    sender: "me",
    time: "17:47",
    read: true,
    date: "Fri, Jul 26",
  },
  {
    id: 2,
    text: "Good morning!",
    sender: "them",
    time: "10:10",
    read: true,
  },
  {
    id: 3,
    text: "Japan looks amazing!",
    sender: "them",
    time: "10:10",
    read: true,
  },
  {
    id: 4,
    type: "file",
    filename: "IMG_0475",
    size: "2.4 MB",
    format: "png",
    sender: "them",
    time: "10:15",
    read: true,
  },
  {
    id: 5,
    type: "file",
    filename: "IMG_0481",
    size: "2.8 MB",
    format: "png",
    sender: "them",
    time: "10:15",
    read: true,
  },
  {
    id: 6,
    text: "Do you know what time is it?",
    sender: "me",
    time: "11:40",
  },
  {
    id: 7,
    text: "It's morning in Tokyo 😎",
    sender: "them",
    time: "11:43",
    read: true,
  },
  {
    id: 8,
    text: "What is the most popular meal in Japan?",
    sender: "me",
    time: "11:45",
  },
  { id: 9, text: "Do you like it?", sender: "me", time: "11:45" },
  {
    id: 10,
    text: "I think top two are:",
    sender: "them",
    time: "11:50",
    read: true,
  },
  {
    id: 11,
    type: "file",
    filename: "IMG_0483",
    size: "2.8 MB",
    format: "png",
    sender: "them",
    time: "11:51",
    read: true,
  },
  {
    id: 12,
    type: "file",
    filename: "IMG_0484",
    size: "2.6 MB",
    format: "png",
    sender: "them",
    time: "11:51",
    read: true,
  },
];

export default function Chat({ onBack }: ChatProps) {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <View className="flex-1 bg-[#e5ddd5]">
      {/* WhatsApp background */}
      <ImageBackground
        source={require("../assets/images/whatsappbg.webp")}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.4 }}
        resizeMode="cover"
      />

      <SafeAreaView className="flex-1" edges={["top"]}>
        <View className="flex-1" style={{ zIndex: 10 }}>
          {/* Header */}
          <View className="bg-[#075e54] px-4 py-3 flex-row items-center shadow-md" style={styles.header}>
            <TouchableOpacity onPress={onBack}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>

            <View className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden" style={styles.avatarContainer}>
              <View style={styles.avatarGradient}>
                <Text className="text-white text-xs font-semibold">MC</Text>
              </View>
            </View>

            <View className="flex-1" style={styles.headerTextContainer}>
              <Text className="font-semibold text-base text-white">
                Martha Craig
              </Text>
              <Text className="text-xs" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                tap here for contact info
              </Text>
            </View>

            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="videocam" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="call" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Messages */}
          <ScrollView
            className="flex-1 px-4 py-2"
            contentContainerStyle={{ paddingBottom: 8 }}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((msg, index) => {
              const prevMsg = index > 0 ? messages[index - 1] : null;
              const showDate =
                msg.date && (!prevMsg || prevMsg.date !== msg.date);
              return (
                <View key={msg.id}>
                  {showDate && (
                    <View className="items-center my-4">
                      <Text className="text-xs text-gray-600">{msg.date}</Text>
                    </View>
                  )}
                  <Message
                    text={msg.text}
                    type={msg.type}
                    filename={msg.filename}
                    size={msg.size}
                    format={msg.format}
                    sender={msg.sender}
                    time={msg.time}
                    read={msg.read}
                  />
                </View>
              );
            })}
          </ScrollView>

          {/* Input Bar */}
          <View className="bg-white px-2 py-2 flex-row items-center border-t border-gray-200" style={styles.inputBar}>
            <TouchableOpacity style={styles.inputIcon}>
              <Ionicons name="add" size={24} color="#54656f" />
            </TouchableOpacity>

            <TextInput
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="Type a message"
              placeholderTextColor="#667781"
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm"
              style={styles.textInput}
            />

            <TouchableOpacity style={styles.inputIcon}>
              <Ionicons name="happy-outline" size={24} color="#54656f" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.inputIcon}>
              <Ionicons name="camera-outline" size={24} color="#54656f" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.inputIcon}>
              <Ionicons name="mic-outline" size={24} color="#54656f" />
            </TouchableOpacity>
          </View>

          {/* iPhone Home Indicator */}
          <View className="h-1 bg-black/20 mx-auto w-32 rounded-full mb-1" />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  header: {
    gap: 16,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#d1d5db",
  },
  avatarGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8b5cf6", // Purple color as gradient alternative
  },
  headerTextContainer: {
    minWidth: 0,
    marginLeft: 8,
  },
  iconButton: {
    padding: 8,
  },
  inputBar: {
    gap: 8,
  },
  inputIcon: {
    padding: 8,
  },
  textInput: {
    fontSize: 14,
  },
});

