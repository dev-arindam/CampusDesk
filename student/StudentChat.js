import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function ChatScreen({ onBack }) {
  const [messages, setMessages] = useState([
    { id: "1", sender: "teacher", text: "Hello! How can I help you?", time: "09:00 AM" },
    { id: "2", sender: "student", text: "I have a doubt in my assignment.", time: "09:01 AM" },
    { id: "3", sender: "teacher", text: "Sure, tell me.", time: "09:02 AM" },
  ]);

  const [inputText, setInputText] = useState("");
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (inputText.trim() === "") return;

    if (editingMessageId) {
      // Edit message
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === editingMessageId ? { ...msg, text: inputText, edited: true } : msg
        )
      );
      setEditingMessageId(null);
    } else {
      // New message
      const newMessage = {
        id: Date.now().toString(),
        sender: "student",
        text: inputText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, newMessage]);
    }

    setInputText("");
    setTimeout(() => flatListRef.current.scrollToEnd({ animated: true }), 100);
  };

  const handleLongPress = (item) => {
    setSelectedMessage(item);
    setModalVisible(true);
  };

  const handleDeleteForMe = () => {
    setMessages((prev) => prev.filter((msg) => msg.id !== selectedMessage.id));
    setModalVisible(false);
  };

  const handleDeleteForEveryone = () => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === selectedMessage.id
          ? { ...msg, text: "This message was deleted", deleted: true }
          : msg
      )
    );
    setModalVisible(false);
  };

  const handleEdit = () => {
    setInputText(selectedMessage.text);
    setEditingMessageId(selectedMessage.id);
    setModalVisible(false);
  };

  const renderMessage = ({ item }) => {
    const isStudent = item.sender === "student";
    const isDeleted = item.deleted;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onLongPress={() => handleLongPress(item)}
      >
        <View style={[styles.messageRow, isStudent ? styles.studentRow : styles.teacherRow]}>
          {!isStudent && (
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=3" }}
              style={styles.messageAvatar}
            />
          )}
          <View
            style={[
              styles.messageBubble,
              isStudent ? styles.studentBubble : styles.teacherBubble,
              isDeleted && { backgroundColor: "#ddd" },
            ]}
          >
            <Text
              style={[
                styles.messageText,
                isStudent && !isDeleted
                  ? { color: "#fff" }
                  : { color: "#555", fontStyle: isDeleted ? "italic" : "normal" },
              ]}
            >
              {item.text} {item.edited && !isDeleted ? "(Edited)" : ""}
            </Text>
            {!isDeleted && <Text style={styles.messageTime}>{item.time}</Text>}
          </View>
          {isStudent && (
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=5" }}
              style={styles.messageAvatar}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=3" }}
            style={styles.headerAvatar}
          />
          <View>
            <Text style={styles.headerTitle}>Mr. John Doe</Text>
            <Text style={styles.headerStatus}>Online</Text>
          </View>
        </View>

        <View style={{ width: 24 }} />
      </View>

      {/* MESSAGES */}
     

      {/* INPUT BOX */}
      <KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  keyboardVerticalOffset={7} // adjust based on header
>
  <View style={{ flex: 1 }}>
    {/* MESSAGES */}
    <FlatList
      ref={flatListRef}
      data={messages}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 10, paddingBottom: 10 }}
      renderItem={renderMessage}
      keyboardShouldPersistTaps="handled"
    />

    {/* INPUT BOX */}
    <View style={styles.inputWrapper}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={sendMessage}>
          <LinearGradient
            colors={["#0b3d91", "#4b7bec"]}
            style={styles.sendBtn}
            start={[0, 0]}
            end={[1, 1]}
          >
            <Ionicons name="send" size={22} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</KeyboardAvoidingView>


      {/* CUSTOM MODAL */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleDeleteForMe}
              >
                <Text style={styles.modalButtonText}>Delete for me</Text>
              </TouchableOpacity>

              {selectedMessage?.sender === "student" && !selectedMessage?.deleted && (
                <>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleEdit}
                  >
                    <Text style={styles.modalButtonText}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleDeleteForEveryone}
                  >
                    <Text style={[styles.modalButtonText, { color: "red" }]}>
                      Delete for everyone
                    </Text>
                  </TouchableOpacity>
                </>
              )}

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, { color: "gray" }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eef2f7" },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0b3d91",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 30,
  },
  headerCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  headerStatus: {
    color: "#dbe6ff",
    fontSize: 12,
  },

  /* MESSAGES */
  messageRow: {
    flexDirection: "row",
    marginVertical: 6,
    alignItems: "flex-end",
  },
  studentRow: { justifyContent: "flex-end" },
  teacherRow: { justifyContent: "flex-start" },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  messageBubble: {
    maxWidth: "70%",
    padding: 12,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  studentBubble: {
    backgroundColor: "#0b3d91",
    borderTopRightRadius: 0,
  },
  teacherBubble: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 0,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  messageText: { fontSize: 14 },
  messageTime: { fontSize: 10, color: "#777", marginTop: 3, textAlign: "right" },

  /* INPUT */
  inputWrapper: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    backgroundColor: "transparent",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: 250,
  },
  modalButton: {
    paddingVertical: 12,
  },
  modalButtonText: {
    fontSize: 16,
    textAlign: "center",
  },
});
