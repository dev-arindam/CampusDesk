import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

export default function UsersContentScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {/* 🔹 Top Button */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Leaderboard</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={22} color="#fff" />
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 Example Leaderboard Item */}
      <LeaderboardItem
  rank={1}
  name="Hannah Gilroy"
  score="4.8"
  points="12,735"
  avatar="https://randomuser.me/api/portraits/women/44.jpg"
/>

<LeaderboardItem
  rank={2}
  name="Romano Clemente"
  score="4.6"
  points="11,843"
  avatar="https://randomuser.me/api/portraits/men/32.jpg"
/>

<LeaderboardItem
  rank={3}
  name="Nadia Yamin"
  score="4.2"
  points="10,403"
  avatar="https://randomuser.me/api/portraits/women/68.jpg"
/>

      {/* 🔹 Modal Form */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add User</Text>

          {renderInput("Image URL")}
          {renderInput("First Name")}
          {renderInput("Last Name")}
          {renderInput("Designation")}
          {renderInput("Role")}
          {renderInput("Status")}
          {renderInput("Join Date")}
          {renderInput("Email")}
          {renderInput("Password", true)}
          {renderInput("Phone")}
          {renderInput("Address")}
          {renderInput("Parent Name")}

          <TouchableOpacity style={styles.submitBtn}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
}

/* 🔹 Input Helper */
const renderInput = (placeholder, secure = false) => (
  <TextInput
    placeholder={placeholder}
    secureTextEntry={secure}
    style={styles.input}
  />
);

/* 🔹 Leaderboard Item */
function LeaderboardItem({ rank, name, score, points, avatar }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rank}>{rank}</Text>
      <Image source={{ uri: avatar }} style={styles.avatar} />

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.score}>{score}</Text>
      </View>

      <View style={styles.pointsBox}>
        <FontAwesome5 name="coins" size={14} color="#f4c430" />
        <Text style={styles.points}>{points}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  addBtn: {
    flexDirection: "row",
    backgroundColor: "#0b3d91",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  addText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    margin: 12,
    elevation: 2,
  },

  rank: { width: 30, fontWeight: "bold" },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },

  info: { flex: 1 },

  name: { fontWeight: "bold" },

  score: { color: "#888", fontSize: 12 },

  pointsBox: { flexDirection: "row", alignItems: "center" },

  points: { marginLeft: 6, fontWeight: "bold", color: "#f4c430" },

  modalContainer: {
    padding: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#f1f3f6",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },

  submitBtn: {
    backgroundColor: "#0b3d91",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },

  submitText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  closeBtn: {
    marginTop: 12,
    padding: 14,
  },

  closeText: {
    textAlign: "center",
    color: "#0b3d91",
    fontWeight: "bold",
  },
});
