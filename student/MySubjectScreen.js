import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

export default function MySubjectScreen({ onBack }) {
  const subjects = [
    {
      name: "Data Structures & Algorithms",
      icon: "project-diagram",
      color: "#6366f1",
      progress: 75,
      labs: 12,
      projects: 3,
    },
    {
      name: "Web Development (MERN)",
      icon: "code",
      color: "#22c55e",
      progress: 60,
      labs: 10,
      projects: 4,
    },
    {
      name: "Database Management System",
      icon: "database",
      color: "#f59e0b",
      progress: 80,
      labs: 8,
      projects: 2,
    },
    {
      name: "Operating Systems",
      icon: "microchip",
      color: "#ef4444",
      progress: 55,
      labs: 6,
      projects: 1,
    },
    {
      name: "Computer Networks",
      icon: "network-wired",
      color: "#0b3d91",
      progress: 70,
      labs: 7,
      projects: 2,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle}>My Technical Subjects</Text>
          <View style={styles.headerDivider} />
          <Text style={styles.headerSub}>
            Semester 5 • Computer Science Engineering
          </Text>
        </View>
      </View>

      {/* ===== SUBJECT LIST ===== */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {subjects.map((item, index) => (
          <TouchableOpacity key={index} style={styles.subjectCard}>
            {/* ICON */}
            <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
              <FontAwesome5 name={item.icon} size={20} color="#fff" />
            </View>

            {/* INFO */}
            <View style={{ flex: 1 }}>
              <Text style={styles.subjectName}>{item.name}</Text>

              <View style={styles.metaRow}>
                <Text style={styles.metaText}>🧪 Labs {item.labs}</Text>
                <Text style={styles.metaText}>💻 Projects {item.projects}</Text>
              </View>

              <View style={styles.progressWrap}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${item.progress}%`,
                        backgroundColor: item.color,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>{item.progress}%</Text>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
              color="#9ca3af"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

/* ======================== STYLES ======================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fb",
  },

  /* ===== HEADER ===== */
  header: {
    backgroundColor: "#0b3d91",
    paddingTop: 52,
    paddingBottom: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    elevation: 12,
  },
  backBtn: {
    marginBottom: 14,
  },
  headerTextWrap: {
    gap: 6,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 0.4,
  },
  headerDivider: {
    width: 52,
    height: 3,
    backgroundColor: "#93c5fd",
    borderRadius: 3,
    marginVertical: 6,
  },
  headerSub: {
    color: "#dbeafe",
    fontSize: 13,
    letterSpacing: 0.3,
  },

  /* ===== SUBJECT CARD ===== */
  subjectCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 18,
    marginTop: 18,
    padding: 18,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    elevation: 6,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  metaRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 4,
  },
  metaText: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },

  /* ===== PROGRESS ===== */
  progressWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  progressBar: {
    flex: 1,
    height: 7,
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 10,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#374151",
  },
});
