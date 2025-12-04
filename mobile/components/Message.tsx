import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface MessageProps {
  text?: string;
  type?: "file" | "text";
  filename?: string;
  size?: string;
  format?: string;
  sender: "me" | "them";
  time: string;
  read?: boolean;
}

export default function Message({
  text,
  type,
  filename,
  size,
  format,
  sender,
  time,
  read,
}: MessageProps) {
  const isMe = sender === "me";

  return (
    <View style={[styles.container, isMe ? styles.containerMe : styles.containerThem]}>
      <View
        style={[
          styles.bubble,
          isMe ? styles.bubbleMe : styles.bubbleThem,
        ]}
      >
        {type === "file" ? (
          <View style={styles.fileContainer}>
            <Text style={styles.fileIcon}>≡</Text>
            <View style={styles.fileInfo}>
              <Text style={styles.filename} numberOfLines={1}>
                {filename}
              </Text>
              <Text style={styles.fileDetails}>
                {size} • {format}
              </Text>
            </View>
          </View>
        ) : (
          <Text style={styles.messageText}>
            {text}
          </Text>
        )}

        <View
          style={[
            styles.timeContainer,
            isMe ? styles.timeContainerMe : styles.timeContainerThem,
          ]}
        >
          <Text style={styles.timeText}>{time}</Text>
          {isMe && read && (
            <MaterialIcons name="done-all" size={16} color="#53bdeb" />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 4,
  },
  containerMe: {
    justifyContent: "flex-end",
  },
  containerThem: {
    justifyContent: "flex-start",
  },
  bubble: {
    maxWidth: "75%",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bubbleMe: {
    backgroundColor: "#dcf8c6",
    borderTopRightRadius: 0,
  },
  bubbleThem: {
    backgroundColor: "white",
    borderTopLeftRadius: 0,
  },
  fileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  fileIcon: {
    fontSize: 24,
    color: "#54656f",
    marginRight: 12,
  },
  fileInfo: {
    flex: 1,
    minWidth: 0,
  },
  filename: {
    fontWeight: "500",
    fontSize: 14,
    color: "#111b21",
  },
  fileDetails: {
    fontSize: 12,
    color: "#667781",
    marginTop: 2,
  },
  messageText: {
    fontSize: 14,
    color: "#111b21",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  timeContainerMe: {
    justifyContent: "flex-end",
  },
  timeContainerThem: {
    justifyContent: "flex-start",
  },
  timeText: {
    fontSize: 11,
    color: "#667781",
    marginRight: 4,
  },
});

