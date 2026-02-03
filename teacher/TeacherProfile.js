import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function TeacherProfile() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={["#4facfe", "#00f2fe"]}
        style={styles.header}
      >
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/men/45.jpg",
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Mr. David Johnson</Text>
        <Text style={styles.subject}>Mathematics Teacher</Text>

        <View style={styles.rating}>
          <Ionicons name="star" size={18} color="#FFD700" />
          <Text style={styles.ratingText}>4.8 (320 reviews)</Text>
        </View>
      </LinearGradient>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.bio}>
          Passionate mathematics teacher with 10+ years of experience helping
          students master algebra, calculus, and problem-solving skills.
        </Text>
      </View>

      {/* Info Cards */}
      <View style={styles.infoRow}>
        <View style={styles.infoCard}>
          <MaterialIcons name="work" size={26} color="#4facfe" />
          <Text style={styles.infoValue}>10+</Text>
          <Text style={styles.infoLabel}>Years Exp</Text>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="people" size={26} color="#4facfe" />
          <Text style={styles.infoValue}>500+</Text>
          <Text style={styles.infoLabel}>Students</Text>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="school" size={26} color="#4facfe" />
          <Text style={styles.infoValue}>PhD</Text>
          <Text style={styles.infoLabel}>Qualification</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Book Class</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Message</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    alignItems: "center",
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  subject: {
    fontSize: 15,
    color: "#EAF6FF",
    marginTop: 4,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 14,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#333",
  },
  bio: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  infoCard: {
    backgroundColor: "#fff",
    width: 100,
    height: 100,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 6,
  },
  infoLabel: {
    fontSize: 12,
    color: "#888",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 30,
  },
  primaryButton: {
    backgroundColor: "#4facfe",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: "#4facfe",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  secondaryButtonText: {
    color: "#4facfe",
    fontWeight: "bold",
    fontSize: 16,
  },
});
