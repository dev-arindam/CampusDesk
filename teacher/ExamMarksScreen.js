import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function ExamMarksScreen({ onBack }) {
  return (
    <View style={styles.container}>
      {/* ===== Header ===== */}
      <LinearGradient colors={["#6366f1", "#4f46e5"]} style={styles.header}>
  <TouchableOpacity onPress={onBack}>
    <Ionicons name="arrow-back" size={24} color="#fff" />
  </TouchableOpacity>

  <Text style={styles.headerTitle}>Exam & Marks</Text>

  <View style={{ width: 24 }} />
</LinearGradient>


      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ===== Summary Cards ===== */}
        <View style={styles.summaryRow}>
          <SummaryCard title="Total Exams" value="24" icon="file-alt" />
          <SummaryCard title="Evaluated" value="18" icon="check-circle" />
          <SummaryCard title="Pending" value="6" icon="clock" />
        </View>

        {/* ===== Actions ===== */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <ActionCard
          icon="plus-circle"
          title="Create New Exam"
          desc="Schedule & manage exams"
        />

        <ActionCard
          icon="clipboard-list"
          title="Enter Marks"
          desc="Upload student marks"
        />

        <ActionCard
          icon="chart-line"
          title="Performance Analytics"
          desc="Subject & class-wise analysis"
        />

        <ActionCard
          icon="file-export"
          title="Export Results"
          desc="Download reports (PDF/Excel)"
        />

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

/* ===== Components ===== */

const SummaryCard = ({ title, value, icon }) => (
  <View style={styles.summaryCard}>
    <FontAwesome5 name={icon} size={22} color="#6366f1" />
    <Text style={styles.summaryValue}>{value}</Text>
    <Text style={styles.summaryTitle}>{title}</Text>
  </View>
);

const ActionCard = ({ icon, title, desc }) => (
  <TouchableOpacity activeOpacity={0.85} style={styles.actionCard}>
    <View style={styles.actionIcon}>
      <FontAwesome5 name={icon} size={18} color="#6366f1" />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.actionTitle}>{title}</Text>
      <Text style={styles.actionDesc}>{desc}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
  </TouchableOpacity>
);

/* ===== Styles ===== */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6ff" },

  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginTop: -20,
  },

  summaryCard: {
    backgroundColor: "#fff",
    width: "30%",
    borderRadius: 18,
    alignItems: "center",
    paddingVertical: 16,
    elevation: 4,
  },

  summaryValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    marginTop: 6,
  },

  summaryTitle: {
    fontSize: 11,
    color: "#6b7280",
    marginTop: 2,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
    color: "#0f172a",
  },

  actionCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },

  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#eef2ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  actionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0f172a",
  },

  actionDesc: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
});
