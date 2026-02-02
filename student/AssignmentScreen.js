import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AssignmentScreen({ onBack }) {
  const assignments = [
    {
      title: "DSA – Linked List Implementation",
      subject: "Data Structures",
      deadline: "25 Feb 2026",
      status: "Pending",
      color: "#6366f1",
    },
    {
      title: "React CRUD App",
      subject: "Web Development",
      deadline: "20 Feb 2026",
      status: "Submitted",
      color: "#22c55e",
    },
    {
      title: "Normalization Case Study",
      subject: "DBMS",
      deadline: "28 Feb 2026",
      status: "Pending",
      color: "#f59e0b",
    },
    {
      title: "Process Scheduling Report",
      subject: "Operating System",
      deadline: "18 Feb 2026",
      status: "Late",
      color: "#ef4444",
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Assignments</Text>
        <Text style={styles.headerSub}>Track & submit your work</Text>
      </View>

      {/* ===== CONTENT ===== */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {assignments.map((item, index) => (
          <View key={index} style={styles.assignmentCard}>
            <View
              style={[styles.leftBar, { backgroundColor: item.color }]}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.assignmentTitle}>{item.title}</Text>
              <Text style={styles.subject}>{item.subject}</Text>

              <View style={styles.metaRow}>
                <Ionicons name="calendar-outline" size={14} color="#6b7280" />
                <Text style={styles.deadline}>Due: {item.deadline}</Text>
              </View>
            </View>

            <View style={styles.statusWrap}>
              <Text
                style={[
                  styles.status,
                  {
                    backgroundColor:
                      item.status === "Submitted"
                        ? "#dcfce7"
                        : item.status === "Late"
                        ? "#fee2e2"
                        : "#fff7ed",
                    color:
                      item.status === "Submitted"
                        ? "#16a34a"
                        : item.status === "Late"
                        ? "#dc2626"
                        : "#ea580c",
                  },
                ]}
              >
                {item.status}
              </Text>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#9ca3af"
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fb",
  },

  /* HEADER */
  header: {
    backgroundColor: "#0b3d91",
    paddingTop: 52,
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    elevation: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
    marginTop: 10,
  },
  headerSub: {
    fontSize: 13,
    color: "#dbeafe",
    marginTop: 4,
  },

  /* CARD */
  assignmentCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 18,
    marginTop: 18,
    borderRadius: 20,
    padding: 16,
    elevation: 6,
  },
  leftBar: {
    width: 5,
    borderRadius: 6,
    marginRight: 14,
  },
  assignmentTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  subject: {
    fontSize: 12,
    color: "#6b7280",
    marginVertical: 4,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  deadline: {
    fontSize: 12,
    color: "#374151",
  },

  statusWrap: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  status: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 8,
  },
});
