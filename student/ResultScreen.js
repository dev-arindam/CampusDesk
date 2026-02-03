import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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

export default function ResultScreen({ score, category, onHome }) {

  const TOTAL_QUESTIONS = 30;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I scored ${score}/${TOTAL_QUESTIONS} in ${category} Quiz! 🎉`
      });
    } catch (error) {
      console.log(error);
    }
  };

  const percent = Math.round((score / TOTAL_QUESTIONS) * 100);

  return (
    <View style={styles.container}>

      {/* HEADER STRIP */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerBar}
      />

      {/* SCORE CARD */}
      <View style={styles.card}>

        {/* SCORE CIRCLE */}
        <View style={styles.circleOuter}>
          <View style={styles.circleInner}>
            <Text style={styles.scoreTitle}>Your Score</Text>
            <Text style={styles.scoreValue}>
              {score}/{TOTAL_QUESTIONS}
            </Text>
            <Text style={styles.percent}>{percent}%</Text>
          </View>
        </View>

        <Text style={styles.congrats}>Great Job 🎉</Text>
        <Text style={styles.subText}>
          You completed the {category} quiz successfully
        </Text>

      </View>

      {/* BUTTONS */}
      <TouchableOpacity style={styles.primaryBtn} onPress={handleShare}>
        <Text style={styles.primaryText}>Share Result</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.outlineBtn} onPress={onHome}>
        <Text style={styles.outlineText}>Back to Home</Text>
      </TouchableOpacity>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <Ionicons name="home" size={22} color={COLORS.primary} />
        <Ionicons name="grid" size={22} color="#475569" />
        <Ionicons name="heart" size={22} color="#475569" />
        <Ionicons name="person" size={22} color="#475569" />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    paddingTop: 90,
  },

  headerBar: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 140,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  card: {
    width: "88%",
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 24,
    alignItems: "center",
    elevation: 8,
  },

  circleOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 2,
    borderColor: COLORS.primary
  },

  circleInner: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center"
  },

  scoreTitle: {
    color: "#e0e7ff",
    fontSize: 13
  },

  scoreValue: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold"
  },

  percent: {
    color: COLORS.secondary,
    fontSize: 14,
    marginTop: 4,
    fontWeight: "600"
  },

  congrats: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: 10
  },

  subText: {
    fontSize: 13,
    color: COLORS.textSoft,
    marginTop: 6,
    textAlign: "center"
  },

  primaryBtn: {
    width: "88%",
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 14,
    marginTop: 28
  },

  primaryText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  },

  outlineBtn: {
    width: "88%",
    borderWidth: 2,
    borderColor: COLORS.secondary,
    padding: 16,
    borderRadius: 14,
    marginTop: 14
  },

  outlineText: {
    color: COLORS.secondary,
    textAlign: "center",
    fontWeight: "bold"
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    backgroundColor: "#020617",
    borderTopWidth: 1,
    borderColor: "#1e293b"
  }

});