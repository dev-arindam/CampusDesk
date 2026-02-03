import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const departments = ["BCA", "BSc IT", "BTech CSE", "MCA"];
const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4"];
const subjects = {
  BCA: ["C Programming", "Data Structures", "DBMS"],
  "BSc IT": ["Python", "Computer Networks"],
  "BTech CSE": ["OS", "AI", "Software Engg"],
  MCA: ["Cloud Computing", "ML"],
};

export default function StudyMaterials({ onBack }) {
  const [department, setDepartment] = useState("BCA");
  const [semester, setSemester] = useState("Semester 1");
  const [subject, setSubject] = useState("C Programming");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [materialType, setMaterialType] = useState("Notes");
  const [materials, setMaterials] = useState([]);

  const handleUpload = () => {
    if (!title) return Alert.alert("Enter material title");

    const newMaterial = {
      id: Date.now().toString(),
      title,
      description,
      department,
      semester,
      subject,
      materialType,
    };

    setMaterials([newMaterial, ...materials]);
    setTitle("");
    setDescription("");
  };

  const deleteMaterial = (id) => {
    setMaterials(materials.filter(m => m.id !== id));
  };

  const editMaterial = (item) => {
    setTitle(item.title);
    setDescription(item.description);
    setDepartment(item.department);
    setSemester(item.semester);
    setSubject(item.subject);
    setMaterialType(item.materialType);
    deleteMaterial(item.id);
  };

  return (
    <View style={styles.container}>

      {/* 🔒 FIXED NAVBAR */}
      {/* 🌟 MODERN NAVBAR */}
<LinearGradient
  colors={["#4F46E5", "#7C3AED"]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.header}
>
  <TouchableOpacity style={styles.navIcon} onPress={onBack}>
    <Ionicons name="arrow-back" size={22} color="#fff" />
  </TouchableOpacity>

  <View style={{ alignItems: "center" }}>
    <Text style={styles.headerTitle}>Study Materials</Text>
    <Text style={styles.headerSubtitle}>Teacher Resource Panel</Text>
  </View>

  <TouchableOpacity style={styles.navIcon}>
    <Ionicons name="ellipsis-vertical" size={20} color="#fff" />
  </TouchableOpacity>
</LinearGradient>


      {/* 📜 SCROLLABLE CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text style={styles.sectionTitle}>Uploaded Materials</Text>

        {materials.length === 0 && (
          <Text style={styles.emptyText}>No materials uploaded yet</Text>
        )}

        {materials.map((item) => (
          <View key={item.id} style={styles.materialCard}>
            <MaterialIcons name="picture-as-pdf" size={42} color="#E53935" />

            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.materialTitle}>{item.title}</Text>
              <Text style={styles.materialMeta}>{item.subject} • {item.semester}</Text>
              <Text style={styles.materialDesc}>{item.description}</Text>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity onPress={() => editMaterial(item)}>
                <Ionicons name="create-outline" size={22} color="#4A90E2" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteMaterial(item.id)}>
                <Ionicons name="trash-outline" size={22} color="#E53935" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* FORM */}
        <View style={styles.formCard}>
          <Text style={styles.label}>Department</Text>
          <SelectRow data={departments} selected={department} onSelect={setDepartment} />

          <Text style={styles.label}>Semester</Text>
          <SelectRow data={semesters} selected={semester} onSelect={setSemester} />

          <Text style={styles.label}>Subject</Text>
          <SelectRow data={subjects[department]} selected={subject} onSelect={setSubject} />

          <Text style={styles.label}>Material Title</Text>
          <TextInput style={styles.input} value={title} onChangeText={setTitle} />

          <Text style={styles.label}>Description</Text>
          <TextInput style={[styles.input, { height: 80 }]} multiline value={description} onChangeText={setDescription} />

          <Text style={styles.label}>Material Type</Text>
          <View style={styles.typeRow}>
            {["Notes", "Assignment", "Lab", "Video Link"].map((t) => (
              <TouchableOpacity key={t} style={[styles.typeBtn, materialType === t && styles.activeType]} onPress={() => setMaterialType(t)}>
                <Text style={[styles.typeText, materialType === t && { color: "#fff" }]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.uploadBox}>
            <Ionicons name="cloud-upload-outline" size={28} color="#6366f1" />
            <Text style={styles.uploadText}>Choose File (PDF)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitBtn} onPress={handleUpload}>
            <Text style={styles.submitText}>Upload Material</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const SelectRow = ({ data, selected, onSelect }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
    {data.map((item) => (
      <TouchableOpacity key={item} style={[styles.optionBtn, selected === item && styles.activeOption]} onPress={() => onSelect(item)}>
        <Text style={[styles.optionText, selected === item && { color: "#fff" }]}>{item}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({

  /* 🌈 MAIN BACKGROUND */
  container: {
    flex: 1,
    backgroundColor: "#F5F3FF",
  },

  /* 🔝 PREMIUM NAVBAR */
  header: {
    paddingTop: 65,
    paddingBottom: 25,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    elevation: 18,
    shadowColor: "#4C1D95",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },

  headerTitle: {
    color: "#ffffff",
    fontSize: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },

  headerSubtitle: {
    color: "#E0E7FF",
    fontSize: 12,
    marginTop: 2,
  },

  navIcon: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 10,
    borderRadius: 16,
  },

  /* 🏷 SECTION TITLE */
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
    marginTop: 18,
    color: "#4C1D95",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 10,
    color: "#9CA3AF",
  },

  /* 📂 UPLOADED MATERIAL CARD */
  materialCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: 14,
    padding: 16,
    borderRadius: 18,

    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },

  materialTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1E1B4B",
  },

  materialMeta: {
    fontSize: 12,
    color: "#7C3AED",
    fontWeight: "600",
  },

  materialDesc: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },

  actionRow: {
    justifyContent: "space-between",
    height: 50,
  },

  /* 📝 FORM CARD */
  formCard: {
    backgroundColor: "#FFFFFF",
    margin: 16,
    padding: 20,
    borderRadius: 22,

    shadowColor: "#5B21B6",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },

  /* LABELS */
  label: {
    fontWeight: "bold",
    marginTop: 14,
    marginBottom: 6,
    color: "#4C1D95",
  },

  /* INPUT FIELDS */
  input: {
    borderWidth: 1,
    borderColor: "#DDD6FE",
    padding: 12,
    borderRadius: 14,
    backgroundColor: "#F9FAFB",
  },

  /* DEPARTMENT / SEMESTER / SUBJECT SELECT */
  optionBtn: {
    backgroundColor: "#EDE9FE",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    marginRight: 8,
  },

  activeOption: {
    backgroundColor: "#7C3AED",
  },

  optionText: {
    fontWeight: "600",
    color: "#5B21B6",
  },

  /* MATERIAL TYPE BUTTONS */
  typeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },

  typeBtn: {
    backgroundColor: "#F3E8FF",
    padding: 10,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 10,
  },

  activeType: {
    backgroundColor: "#5B21B6",
  },

  typeText: {
    color: "#6D28D9",
    fontWeight: "600",
  },

  /* ☁️ FILE UPLOAD BOX */
  uploadBox: {
    borderWidth: 2,
    borderColor: "#A78BFA",
    borderStyle: "dashed",
    padding: 22,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 18,
    backgroundColor: "#F5F3FF",
  },

  uploadText: {
    marginTop: 8,
    color: "#6D28D9",
    fontWeight: "600",
  },

  /* 🚀 UPLOAD BUTTON */
  submitBtn: {
    backgroundColor: "#5B21B6",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 22,

    shadowColor: "#5B21B6",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },

  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

});
