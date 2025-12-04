import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ChatListItem, { Conversation } from "./ChatListItem";
import ArchiveIcon from "./ArchiveIcon";
import { useRouter } from "expo-router";

const conversations: Conversation[] = [
  {
    id: 1,
    name: "Skillzo fabrics",
    lastMessage: "✓ You: 📷 Photo",
    time: "Yesterday",
    unread: false,
    read: true,
    pinned: true,
  },
  {
    id: 2,
    name: "Big 4 Practice Group",
    lastMessage: "~ ifeoluwaoladapo: Yes",
    time: "1:42 AM",
    unread: true,
    unreadCount: 299,
    isGroup: true,
    lastMessageSender: "ifeoluwaoladapo",
  },
  {
    id: 3,
    name: "AWS DevOps Study Group (Hand-On)",
    lastMessage:
      "~ Amb_Sam ✨: But that day I gave AWS support respect. Those guys have access to all our server...",
    time: "12:33 AM",
    unread: true,
    unreadCount: 106,
    isGroup: true,
    lastMessageSender: "Amb_Sam ✨",
  },
  {
    id: 4,
    name: "React Native Lagos Community",
    lastMessage:
      "React Native Lagos ▶ That moment when you need to sleep to code better... but you need to code to sleep bet...",
    unread: true,
    unreadCount: 60,
    isGroup: true,
  },
  {
    id: 5,
    name: "React.js",
    lastMessage:
      "~ Error: That moment when you need to sleep to code better... but you need to code to sleep bet...",
    time: "12:16 AM",
    unread: true,
    unreadCount: 999,
    isGroup: true,
    lastMessageSender: "Error",
  },
  {
    id: 6,
    name: "1000 OSOGBO CONTACTS GAIN GR...",
    lastMessage: "You joined using a group link.",
    time: "Yesterday",
    unread: false,
    isGroup: true,
  },
  {
    id: 7,
    name: "Daniel Dona 2",
    lastMessage:
      "✓✓ How much do you buy crepe in aba and how much do you sell now.",
    time: "Yesterday",
    unread: false,
    read: true,
  },
  {
    id: 8,
    name: "GiDi 001",
    lastMessage: "Night deals can come",
    time: "Yesterday",
    unread: false,
    loading: true,
  },
];

export default function ConversationsList() {
  const router = useRouter();
  const [swipedId, setSwipedId] = useState<number | null>(null);

  const handleSelectChat = (conversation: Conversation) => {
    // Navigate to chat screen - you'll need to create a chat route
    // For now, we'll just log it
    console.log("Selected chat:", conversation.name);
    // router.push(`/chat/${conversation.id}`);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="menu" size={24} color="#111b21" />
          </TouchableOpacity>
          <Text style={styles.title}>Chats</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="camera-outline" size={24} color="#111b21" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.plusButton}>
              <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color="#667781" />
            <TextInput
              placeholder="Ask Meta AI or Search"
              placeholderTextColor="#667781"
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Archived Section */}
        <View style={styles.archivedSection}>
          <View style={styles.archivedLeft}>
            <View style={styles.archivedAvatar}>
              <ArchiveIcon size={24} color="#9ca3af" />
            </View>
            <Ionicons
              name="chevron-down"
              size={14}
              color="#667781"
              style={styles.archivedChevron}
            />
            <Text style={styles.archivedText}>Archived</Text>
          </View>
          <Text style={styles.archivedCount}>61</Text>
        </View>

        {/* Chat List */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {conversations.map((conversation) => (
            <ChatListItem
              key={conversation.id}
              conversation={conversation}
              isSwiped={swipedId === conversation.id}
              onSwipe={() => setSwipedId(conversation.id)}
              onSwipeClose={() => setSwipedId(null)}
              onClick={() => handleSelectChat(conversation)}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerButton: {
    padding: 8,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  plusButton: {
    backgroundColor: "#25d366",
    borderRadius: 20,
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111b21",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111b21",
  },
  archivedSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  archivedLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  archivedAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  archivedChevron: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "white",
    borderRadius: 10,
  },
  archivedText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111b21",
  },
  archivedCount: {
    fontSize: 14,
    color: "#667781",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 8,
  },
});
