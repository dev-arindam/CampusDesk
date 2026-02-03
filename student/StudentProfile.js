import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

/* ===== DASHBOARD COLORS ===== */
const COLORS = {
  primary: "#8b5cf6",
  secondary: "#22d3ee",
  background: "#020617",
  card: "#1e293b",
  text: "#ffffff",
  textSoft: "#c7d2fe"
};

export default function StudentProfileScreen({ user, onBack,onLogout }) {
  return (
    <View style={styles.container}>

{/* HEADER */}
<LinearGradient
  colors={["#0f172a", "#1e293b", "#312e81"]}
  style={styles.header}
>
  <TouchableOpacity onPress={onBack} style={styles.iconLeft}>
    <Ionicons name="arrow-back" size={24} color="#fff" />
  </TouchableOpacity>

  <TouchableOpacity style={styles.iconRight}>
    <Ionicons name="settings-outline" size={22} color="#fff" />
  </TouchableOpacity>

  {/* HERO PROFILE */}
  <View style={styles.heroProfile}>
    <Image
      source={{ uri: "https://s1.dmcdn.net/u/B0lsg1dzxtqSvSrIj/240x240" }}
      style={styles.heroAvatar}
    />

    <Text style={styles.heroName}>
      {user?.fname || "Puja"} {user?.lname || "Sen"}
    </Text>

    <Text style={styles.heroGrade}>MCA • 2nd Year</Text>
  </View>
</LinearGradient>


      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>


        {/* INFO CARD */}
        <SectionTitle title="Information" />
        <GlassCard>
          <InfoRow icon="badge" label="Enrollment No" value={`ENR-${user?.id || 2025}`} />
          <InfoRow icon="email" label="College Email" value="student@university.edu" />
          <InfoRow icon="phone" label="Phone" value="+91 98765 43210" />
          <InfoRow icon="school" label="University" value="NIT" />
          <InfoRow icon="menu-book" label="Department" value="CSE" />
          <InfoRow icon="date-range" label="Year" value="2nd Year" />
        </GlassCard>

        {/* SUBJECTS */}
        <SectionTitle title="Current Subjects" />
        <GlassCard>
          <InfoRow icon="menu-book" label="Data Structures" value="A Grade" />
          <InfoRow icon="menu-book" label="Operating Systems" value="B+" />
          <InfoRow icon="menu-book" label="Database Systems" value="A" />
          <InfoRow icon="menu-book" label="Computer Networks" value="A-" />
        </GlassCard>

        {/* STATS */}
        <SectionTitle title="Quiz Performance" />
        <StatRow>
          <StatBox label="Quizzes" value="12" />
          <StatBox label="Average" value="82%" />
          <StatBox label="Rank" value="#5" />
        </StatRow>

        <SectionTitle title="Academic Overview" />
        <StatRow>
          <StatBox label="CGPA" value="8.2" />
          <StatBox label="Credits" value="86" />
          <StatBox label="Semester" value="3th" />
        </StatRow>

        <SectionTitle title="Attendance" />
        <StatRow>
          <StatBox label="Overall" value="91%" />
          <StatBox label="Month" value="88%" />
          <StatBox label="Leaves" value="3" />
        </StatRow>

        {/* ACTIONS */}
        <SectionTitle title="Quick Actions" />
        <View style={styles.actionsRow}>
          <ActionBtn icon="edit" label="Edit" />
          <ActionBtn icon="lock" label="Password" />
          <ActionBtn icon="logout" label="Logout" onPress={onLogout}/>
        </View>

      </ScrollView>
    </View>
  );
}

/* COMPONENTS */

const GlassCard = ({ children }) => (
  <View style={styles.card}>{children}</View>
);

const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <MaterialIcons name={icon} size={20} color={COLORS.secondary} />
    <View style={{ marginLeft: 12 }}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const StatRow = ({ children }) => (
  <View style={styles.statsRow}>{children}</View>
);

const StatBox = ({ label, value }) => (
  <LinearGradient
    colors={[COLORS.primary, COLORS.secondary]}
    style={styles.statBox}
  >
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </LinearGradient>
);

const ActionBtn = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
    <MaterialIcons name={icon} size={22} color="#fff" />
    <Text style={styles.actionText}>{label}</Text>
  </TouchableOpacity>
);


const SectionTitle = ({ title }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

/* STYLES */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
header: {
  paddingTop: 60,
  paddingBottom: 40,
  borderBottomLeftRadius: 40,
  borderBottomRightRadius: 40,
  alignItems: "center",
  justifyContent: "center",
},

heroProfile: {
  alignItems: "center",
  marginTop: 10,
},

heroAvatar: {
  width: 110,
  height: 110,
  borderRadius: 55,
  borderWidth: 4,
  borderColor: "#fff",
  marginBottom: 10,
},

heroName: {
  color: "#fff",
  fontSize: 20,
  fontWeight: "bold",
},

heroGrade: {
  color: "rgba(255,255,255,0.85)",
  fontSize: 13,
  marginTop: 4,
},

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  },

  heroLogo: {
  backgroundColor: "rgba(255,255,255,0.18)",
  width: 64,
  height: 64,
  borderRadius: 32,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 8
},

  iconLeft: { position: "absolute", left: 20, top: 60 },
  iconRight: { position: "absolute", right: 20, top: 60 },

  avatarWrapper: { alignItems: "center", marginTop: -60 },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: COLORS.primary,
    backgroundColor: "#111"
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: COLORS.text
  },

  grade: {
    color: COLORS.textSoft,
    marginTop: 4
  },

  sectionTitle: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 22,
    color: COLORS.secondary
  },

  card: {
    backgroundColor: COLORS.card,
    marginHorizontal: 18,
    marginTop: 12,
    borderRadius: 20,
    padding: 18,
    elevation: 6
  },

  infoRow: {
    flexDirection: "row",
    marginBottom: 14
  },

  infoLabel: {
    color: COLORS.textSoft,
    fontSize: 12
  },

  infoValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.text
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 14
  },

  statBox: {
    width: 100,
    paddingVertical: 20,
    borderRadius: 18,
    alignItems: "center"
  },

  statValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },

  statLabel: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20
  },

  actionBtn: {
    backgroundColor: COLORS.primary,
    width: 100,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    elevation: 5
  },

  actionText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 6
  }

});