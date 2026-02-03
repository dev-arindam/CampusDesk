import React, { useMemo } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";

// Sample attendance data
const attendanceData = {
  "2026-01-27": "present",
  "2026-01-28": "absent",
  "2026-01-29": "holiday",
  "2026-01-30": "present",
  "2026-01-31": "late",
  "2026-02-01": "holiday",
  "2026-02-02": "late",
  "2026-02-03": "present",
};

// Monthly attendance data
const monthlyAttendance = {
  January: { present: 15, total: 20 },
  February: { present: 18, total: 20 },
  March: { present: 16, total: 20 },
  April: { present: 20, total: 20 },
  May: { present: 19, total: 20 },
  June: { present: 17, total: 20 },
};

// Dashboard colors
const COLORS = {
  primary: "#8b5cf6",
  secondary: "#22d3ee",
  background: "#020617",
  card: "#1e293b",
  cardLight: "#2c2f45",
  textLight: "#fff",
  textMedium: "#c7d2fe",
  present: "#4CAF50",
  absent: "#F44336",
  late: "#da952f",
  holiday: "#9E9E9E",
  bottomActive: "#8b5cf6",
  bottomInactive: "#94a3b8",
};

const screenWidth = Dimensions.get("window").width;

export default function StudentAttendanceScreen({ onBack }) {
  // Calendar marked dates
  const markedDates = useMemo(() => {
    const marked = {};
    Object.keys(attendanceData).forEach((date) => {
      let color = COLORS.holiday;
      if (attendanceData[date] === "present") color = COLORS.present;
      if (attendanceData[date] === "absent") color = COLORS.absent;
      if (attendanceData[date] === "late") color = COLORS.late;

      marked[date] = {
        customStyles: {
          container: { backgroundColor: color, borderRadius: 10 },
          text: { color: COLORS.textLight, fontWeight: "bold" },
        },
      };
    });
    return marked;
  }, []);

  // Attendance percentage
  const percentage = useMemo(() => {
    const total = Object.keys(attendanceData).length;
    const present = Object.values(attendanceData).filter((v) => v === "present").length;
    return total ? Math.round((present / total) * 100) : 0;
  }, []);

  // Monthly attendance percentages
  const months = Object.keys(monthlyAttendance);
  const monthlyPercentages = Object.values(monthlyAttendance).map(
    (item) => Math.round((item.present / item.total) * 100)
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]} // simple 2-color gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={onBack} style={styles.iconLeft}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textLight} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Student Attendance</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* CALENDAR */}
        <View style={[styles.card, { backgroundColor: COLORS.cardLight }]}>
          <Calendar
            markingType="custom"
            markedDates={markedDates}
            theme={{
              calendarBackground: COLORS.cardLight,
              todayTextColor: COLORS.primary,
              arrowColor: COLORS.primary,
              monthTextColor: COLORS.textLight,
              textDayFontWeight: "500",
              textMonthFontWeight: "700",
              textDayHeaderFontWeight: "600",
            }}
          />
        </View>

        {/* ATTENDANCE SUMMARY */}
        <View style={[styles.summaryCard, { backgroundColor: COLORS.cardLight }]}>
          <Text style={[styles.percentText, { color: COLORS.primary }]}>{percentage}%</Text>
          <Text style={[styles.subtitle, { color: COLORS.textMedium }]}>Attendance</Text>
          <View style={styles.legend}>
            <Legend color={COLORS.present} label="Present" />
            <Legend color={COLORS.late} label="Late" />
            <Legend color={COLORS.absent} label="Absent" />
            <Legend color={COLORS.holiday} label="Holiday" />
          </View>
        </View>

        {/* MONTHLY ATTENDANCE GRAPH */}
        <Text style={{ color: COLORS.textLight, fontWeight: "bold", fontSize: 18, marginHorizontal: 20, marginTop: 10 }}>
          Monthly Attendance %
        </Text>

        <LineChart
          data={{
            labels: months,
            datasets: [
              {
                data: monthlyPercentages,
                color: (opacity = 1) => `rgba(139,92,246, ${opacity})`,
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          yAxisSuffix="%"
          yAxisInterval={10}
          chartConfig={{
            backgroundGradientFrom: COLORS.background,
            backgroundGradientTo: COLORS.cardLight,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(139,92,246, ${opacity})`,
            labelColor: () => COLORS.textMedium,
            style: { borderRadius: 16 },
            propsForDots: { r: "6", strokeWidth: "2", stroke: COLORS.secondary },
          }}
          style={{ marginHorizontal: 20, marginVertical: 20, borderRadius: 16 }}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

// Legend component
const Legend = ({ color, label }) => (
  <View style={styles.legendItem}>
    <View style={[styles.dot, { backgroundColor: color }]} />
    <Text style={styles.legendText}>{label}</Text>
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    paddingTop: 55,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { color: COLORS.textLight, fontSize: 20, fontWeight: "bold" },
  iconLeft: { position: "absolute", left: 20, top: 55 },

  card: { borderRadius: 16, padding: 12, marginTop: 20, marginHorizontal: 20, elevation: 5 },
  summaryCard: { marginTop: 20, borderRadius: 16, padding: 20, alignItems: "center", elevation: 5, marginHorizontal: 20 },
  percentText: { fontSize: 42, fontWeight: "800" },
  subtitle: { fontSize: 16, marginBottom: 16 },
  legend: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  legendItem: { flexDirection: "row", alignItems: "center" },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: 6 },
  legendText: { fontSize: 14, color: COLORS.textLight },
});