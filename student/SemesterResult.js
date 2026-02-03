import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function SemesterResult({ onBack }) {
  const student = {
    name: "Rumi Aktar",
    enrollment: "ENR202501",
    semester: "5th Semester",
  };

  const subjects = [
    { name: "Data Structures & Algorithms", marks: 85, grade: "A", credits: 4 },
    { name: "Web Development", marks: 78, grade: "B+", credits: 3 },
    { name: "Database Management", marks: 92, grade: "A+", credits: 4 },
    { name: "Operating Systems", marks: 74, grade: "B", credits: 3 },
    { name: "Computer Networks", marks: 81, grade: "A-", credits: 3 },
  ];

  const totalMarks = subjects.reduce((sum, s) => sum + s.marks, 0);
  const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
  const cgpa = (totalMarks / (subjects.length * 100) * 10).toFixed(2);
  const resultStatus = cgpa >= 5.0 ? "Passed" : "Failed";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Semester Result</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* ===== STUDENT INFO CARD ===== */}
        <View style={styles.infoCard}>
          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.studentSub}>Enrollment: {student.enrollment}</Text>
          <Text style={styles.studentSub}>Semester: {student.semester}</Text>
        </View>

        {/* ===== SUBJECTS TABLE ===== */}
        <View style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableText, { flex: 2 }]}>Subject</Text>
            <Text style={styles.tableText}>Marks</Text>
            <Text style={styles.tableText}>Grade</Text>
            <Text style={styles.tableText}>Credits</Text>
          </View>
          {subjects.map((sub, index) => (
            <View
              key={index}
              style={[
                styles.tableRow,
                { backgroundColor: index % 2 === 0 ? "#f4f6fb" : "#ffffff" },
              ]}
            >
              <Text style={[styles.tableText, { flex: 2 }]}>{sub.name}</Text>
              <Text style={styles.tableText}>{sub.marks}</Text>
              <Text style={styles.tableText}>{sub.grade}</Text>
              <Text style={styles.tableText}>{sub.credits}</Text>
            </View>
          ))}
        </View>

        {/* ===== SUMMARY CARD ===== */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Marks:</Text>
            <Text style={styles.summaryValue}>{totalMarks}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Credits:</Text>
            <Text style={styles.summaryValue}>{totalCredits}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>CGPA:</Text>
            <Text style={styles.summaryValue}>{cgpa}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Result Status:</Text>
            <Text
              style={[
                styles.summaryValue,
                { color: resultStatus === "Passed" ? "#22c55e" : "#ef4444" },
              ]}
            >
              {resultStatus}
            </Text>
          </View>

          <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.8}>
            <MaterialIcons name="file-download" size={20} color="#fff" />
            <Text style={styles.downloadText}>Download PDF</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

/* ======================== STYLES ======================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2ff",
  },

  /* HEADER */
  header: {
    backgroundColor: "#0b3d91",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 52,
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    elevation: 12,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  /* STUDENT INFO */
  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
    elevation: 6,
  },
  studentName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0b3d91",
  },
  studentSub: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },

  /* TABLE */
  tableCard: {
    marginTop: 16,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 6,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#6366f1",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  tableText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },

  /* SUMMARY */
  summaryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
    elevation: 6,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "600",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0b3d91",
  },

  downloadBtn: {
    flexDirection: "row",
    backgroundColor: "#0b3d91",
    paddingVertical: 10,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    gap: 8,
  },
  downloadText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});