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

export default function StudentProfileScreen({ user, onBack }) {
    return (
        <View style={styles.container}>

            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.bottomItem}>
                    <Ionicons name="home" size={24} color="#6366f1" />
                    <Text style={styles.bottomActive}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomItem}>
                    <Ionicons name="people-outline" size={24} color="#94a3b8" />
                    <Text style={styles.bottomLabel}>Students</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add" size={30} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomItem}>
                    <Ionicons name="calendar-outline" size={24} color="#94a3b8" />
                    <Text style={styles.bottomLabel}>Events</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomItem}>
                    <Ionicons name="person-outline" size={24} color="#94a3b8" />
                    <Text style={styles.bottomLabel}>Profile</Text>
                </TouchableOpacity>
            </View>

            {/* HEADER */}
            <LinearGradient colors={["#2f49b6", "#6a11cb"]} style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.iconLeft}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Student Profile</Text>
                <TouchableOpacity style={styles.iconRight}>
                    <Ionicons name="settings-outline" size={22} color="#fff" />
                </TouchableOpacity>
            </LinearGradient>

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* AVATAR */}
                <View style={styles.avatarContainer}>
                    <Image
                        source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
                        style={styles.avatar}
                    />
                    <Text style={styles.name}>{user?.fname || "Puja"} {user?.lname || "Sen"}</Text>
                    <Text style={styles.grade}>MCA</Text>
                </View>

                {/* INFO CARD */}
                <GlassCard>
                    <InfoRow icon="badge" label="Enrollment No" value={`ENR-${user?.id || 2025}`} />
                    <InfoRow icon="email" label="College Email" value="student@university.edu" />
                    <InfoRow icon="phone" label="Phone" value="+91 98765 43210" />
                    <InfoRow icon="school" label="University" value="National Institute of Technology" />
                    <InfoRow icon="menu-book" label="Department" value="Computer Science & Engineering" />
                    <InfoRow icon="date-range" label="Year" value="3rd Year" />
                </GlassCard>

                {/* SUBJECTS */}
                <Text style={styles.sectionTitle}>Current Subjects</Text>
                <GlassCard>
                    <InfoRow icon="menu-book" label="Data Structures" value="A Grade" />
                    <InfoRow icon="menu-book" label="Operating Systems" value="B+" />
                    <InfoRow icon="menu-book" label="Database Systems" value="A" />
                    <InfoRow icon="menu-book" label="Computer Networks" value="A-" />
                </GlassCard>

                {/* QUIZ PERFORMANCE */}
                <Text style={styles.sectionTitle}>Quiz Performance</Text>
                <View style={styles.statsRow}>
                    <StatBox label="Quizzes" value="12" colors={["#ff9966", "#ff5e62"]} />
                    <StatBox label="Average" value="82%" colors={["#36d1dc", "#5b86e5"]} />
                    <StatBox label="Rank" value="#5" colors={["#f7971e", "#ffd200"]} />
                </View>

                {/* ACADEMIC */}
                <Text style={styles.sectionTitle}>Academic Overview</Text>
                <View style={styles.statsRow}>
                    <StatBox label="CGPA" value="8.2" colors={["#56ab2f", "#a8e063"]} />
                    <StatBox label="Credits" value="86" colors={["#2193b0", "#6dd5ed"]} />
                    <StatBox label="Semester" value="6th" colors={["#cc2b5e", "#753a88"]} />
                </View>

                {/* ATTENDANCE */}
                <Text style={styles.sectionTitle}>Attendance</Text>
                <View style={styles.statsRow}>
                    <StatBox label="Overall" value="91%" colors={["#834d9b", "#d04ed6"]} />
                    <StatBox label="This Month" value="88%" colors={["#1e3c72", "#2a5298"]} />
                    <StatBox label="Leaves" value="3" colors={["#ff416c", "#ff4b2b"]} />
                </View>

                {/* ACHIEVEMENTS */}
                <Text style={styles.sectionTitle}>Achievements</Text>
                <GlassCard>
                    <InfoRow icon="emoji-events" label="Hackathon Winner" value="2025" />
                    <InfoRow icon="star" label="Merit Scholarship" value="2 Years" />
                </GlassCard>

                {/* FEES */}
                <Text style={styles.sectionTitle}>Fee Status</Text>
                <GlassCard>
                    <InfoRow icon="payments" label="Tuition Fee" value="Paid" />
                    <InfoRow icon="account-balance-wallet" label="Scholarship" value="₹ 25,000" />
                    <InfoRow icon="event" label="Next Due Date" value="15 March 2026" />
                </GlassCard>

                {/* QUICK ACTIONS */}
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.actionsRow}>
                    <ActionBtn icon="edit" label="Edit Profile" colors={["#36D1DC", "#5B86E5"]} />
                    <ActionBtn icon="lock" label="Password" colors={["#ff9966", "#ff5e62"]} />
                    <ActionBtn icon="logout" label="Logout" colors={["#cc2b5e", "#753a88"]} />
                </View>

                <View style={{ height: 60 }} />
            </ScrollView>
        </View>
    );
}

/* GLASS CARD */
const GlassCard = ({ children }) => (
    <LinearGradient colors={["#ffffffcc", "#ffffff99"]} style={styles.card}>
        {children}
    </LinearGradient>
);

const InfoRow = ({ icon, label, value }) => (
    <View style={styles.infoRow}>
        <MaterialIcons name={icon} size={20} color="#2f49b6" />
        <View style={{ marginLeft: 12 }}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    </View>
);

const StatBox = ({ label, value, colors }) => (
    <LinearGradient colors={colors} style={styles.statBox}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </LinearGradient>
);

const ActionBtn = ({ icon, label, colors }) => (
    <LinearGradient colors={colors} style={styles.actionBtn}>
        <MaterialIcons name={icon} size={22} color="#fff" />
        <Text style={styles.actionText}>{label}</Text>
    </LinearGradient>
);

/* STYLES */
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f4f6fb" },

    header: {
        paddingTop: 55,
        paddingBottom: 25,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        alignItems: "center"
    },
    headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
    iconLeft: { position: "absolute", left: 20, top: 55 },
    iconRight: { position: "absolute", right: 20, top: 55 },

    avatarContainer: { alignItems: "center", marginTop: 25 },
    avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: "#fff" },
    name: { fontSize: 20, fontWeight: "bold", marginTop: 10 },
    grade: { color: "#555", marginTop: 3 },

    sectionTitle: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 18,
        color: "#2f49b6"
    },

    card: {
        marginHorizontal: 18,
        marginTop: 12,
        borderRadius: 20,
        padding: 18,
        elevation: 8
    },
    infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
    infoLabel: { color: "#666", fontSize: 12 },
    infoValue: { fontSize: 15, fontWeight: "bold" },

    statsRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 14
    },
    statBox: {
        width: 100,
        paddingVertical: 20,
        borderRadius: 20,
        alignItems: "center"
    },
    statValue: { color: "#fff", fontSize: 18, fontWeight: "bold" },
    statLabel: { color: "#fff", fontSize: 12, marginTop: 4 },

    actionsRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 18
    },
    actionBtn: {
        width: 100,
        paddingVertical: 16,
        borderRadius: 20,
        alignItems: "center"
    },
    actionText: { color: "#fff", fontSize: 12, marginTop: 6 },
    bottomBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        elevation: 15,
    },

    bottomItem: { alignItems: "center" },
    bottomLabel: { fontSize: 11, color: "#94a3b8" },
    bottomActive: { fontSize: 11, color: "#6366f1", fontWeight: "600" },

    addButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#6366f1",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 28,
        elevation: 10,
    }
});