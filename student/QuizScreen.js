import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { htmlQuestions } from "../data/htmlQuestions";
import { jsQuestions } from "../data/jsQuestions";
import { reactQuestions } from "../data/reactQuestions";
import { cppQuestions } from "../data/cppQuestions";
import { pythonQuestions } from "../data/pythonQuestions";

/* ===== DASHBOARD COLORS ===== */
const COLORS = {
  primary: "#8b5cf6",
  secondary: "#22d3ee",
  background: "#020617",
  card: "#1e293b",
  cardLight: "#0f172a",
  text: "#ffffff",
  textSoft: "#c7d2fe",
  danger: "#ef4444",
};

export default function QuizScreen({ onFinish, onQuit, category }) {
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);

  const questions = (() => {
    switch (category) {
      case "HTML": return htmlQuestions;
      case "JAVASCRIPT": return jsQuestions;
      case "REACT": return reactQuestions;
      case "C++": return cppQuestions;
      case "PYTHON": return pythonQuestions;
      default: return [];
    }
  })();

  if (!questions || questions.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: COLORS.text }}>No questions for {category}</Text>
        <TouchableOpacity onPress={onQuit} style={{ marginTop: 20 }}>
          <Text style={{ color: COLORS.primary }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    if (selected === null) return;

    if (currentIndex + 1 < questions.length) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelected(answers[nextIndex] ?? null);
    } else {
      let finalScore = 0;
      questions.forEach((q, i) => {
        if (answers[i] === q.correctAnswer) finalScore++;
      });
      onFinish(finalScore);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setSelected(answers[prevIndex] ?? null);
    }
  };

  return (
    <View style={styles.container}>

      {/* ===== HEADER ===== */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Ionicons name="arrow-back" size={22} color="#fff" onPress={onQuit} />

        <View>
          <Text style={styles.headerTitle}>{category}</Text>
          <Text style={styles.headerSub}>{questions.length} Questions</Text>
        </View>

        <View style={{ width: 22 }} />
      </LinearGradient>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* ===== QUESTION CARD ===== */}
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Text style={styles.progress}>
              Question {currentIndex + 1}/{questions.length}
            </Text>
            <Text style={styles.quit} onPress={onQuit}>Quit</Text>
          </View>

          <Text style={styles.question}>
            {currentQuestion.question}
          </Text>

          {currentQuestion.options.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selected === index && styles.optionActive
              ]}
              onPress={() => {
                setSelected(index);
                setAnswers(prev => ({
                  ...prev,
                  [currentIndex]: index
                }));
              }}
            >
              <Text style={[
                styles.optionText,
                selected === index && styles.optionTextActive
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ===== NAV BUTTONS ===== */}
        <View style={styles.navBtns}>
          <TouchableOpacity
            style={styles.navBtn}
            onPress={handlePrevious}
            disabled={currentIndex === 0}
          >
            <Text style={styles.navText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navBtn, styles.nextBtn]}
            onPress={handleNext}
          >
            <Text style={styles.nextText}>
              {currentIndex + 1 === questions.length ? "Finish" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 18,
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  headerTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  },

  headerSub: {
    fontSize: 11,
    color: "#e0e7ff",
    textAlign: "center"
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    elevation: 6,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },

  progress: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: "600"
  },

  quit: {
    fontSize: 12,
    color: COLORS.danger,
    fontWeight: "600"
  },

  question: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 12,
    color: COLORS.text
  },

  option: {
    backgroundColor: COLORS.cardLight,
    padding: 14,
    borderRadius: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#1f2937"
  },

  optionActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary
  },

  optionText: {
    fontSize: 14,
    color: COLORS.textSoft
  },

  optionTextActive: {
    color: "#fff",
    fontWeight: "600"
  },

  navBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24
  },

  navBtn: {
    backgroundColor: COLORS.card,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary
  },

  nextBtn: {
    backgroundColor: COLORS.primary,
  },

  navText: {
    color: COLORS.primary,
    fontWeight: "bold"
  },

  nextText: {
    color: "#fff",
    fontWeight: "bold"
  },
});