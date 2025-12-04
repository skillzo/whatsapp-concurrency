import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

export interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  time?: string;
  unread: boolean;
  read?: boolean;
  voiceMessage?: boolean;
  voiceDuration?: string;
  photo?: boolean;
  unreadCount?: number;
  pinned?: boolean;
  isGroup?: boolean;
  lastMessageSender?: string;
  loading?: boolean;
}

interface ChatListItemProps {
  conversation: Conversation;
  isSwiped: boolean;
  onSwipe: () => void;
  onSwipeClose: () => void;
  onClick: () => void;
}

export default function ChatListItem({
  conversation,
  onClick,
}: ChatListItemProps) {
  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string): string => {
    const colors = [
      "#8b5cf6", // purple
      "#3b82f6", // blue
      "#ec4899", // pink
      "#f59e0b", // orange
      "#6366f1", // indigo
      "#14b8a6", // teal
      "#06b6d4", // cyan
      "#f43f5e", // rose
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index] ?? colors[0] ?? "#8b5cf6";
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onClick}
      activeOpacity={0.7}
    >
      {/* Avatar */}
      <View
        style={[
          styles.avatar,
          { backgroundColor: getAvatarColor(conversation.name) },
        ]}
      >
        <Text style={styles.avatarText}>{getInitials(conversation.name)}</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {conversation.name}
            </Text>
            {conversation.pinned && (
              <Ionicons name="pin" size={14} color="#667781" style={styles.pinIcon} />
            )}
          </View>
          <View style={styles.timeRow}>
            {conversation.time && (
              <Text style={styles.time}>{conversation.time}</Text>
            )}
            {conversation.loading && (
              <View style={styles.loadingSpinner} />
            )}
          </View>
        </View>
        <View style={styles.messageRow}>
          {conversation.read && !conversation.isGroup && (
            <MaterialIcons name="done-all" size={16} color="#53bdeb" />
          )}
          {conversation.voiceMessage && (
            <View style={styles.iconRow}>
              <Ionicons name="mic" size={14} color="#667781" />
              <Text style={styles.messageText}>
                {conversation.voiceDuration}
              </Text>
            </View>
          )}
          {conversation.photo && (
            <View style={styles.iconRow}>
              <Ionicons name="camera" size={14} color="#667781" />
              <Text style={styles.messageText}>Photo</Text>
            </View>
          )}
          {!conversation.voiceMessage && !conversation.photo && (
            <Text style={styles.messageText} numberOfLines={1}>
              {conversation.lastMessage}
            </Text>
          )}
        </View>
      </View>

      {/* Unread Count or Chevron */}
      {conversation.unread && conversation.unreadCount ? (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>
            {conversation.unreadCount > 999 ? "999+" : conversation.unreadCount}
          </Text>
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#667781" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111b21",
    flex: 1,
  },
  pinIcon: {
    marginLeft: 4,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginLeft: 8,
  },
  time: {
    fontSize: 12,
    color: "#667781",
  },
  loadingSpinner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#25d366",
    borderTopColor: "transparent",
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  messageText: {
    fontSize: 14,
    color: "#667781",
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: "#25d366",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  unreadText: {
    fontSize: 12,
    fontWeight: "500",
    color: "white",
  },
});

