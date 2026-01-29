import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert
} from "react-native";

export default function Teacheasignsubject() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Teacher-Subject Assignments
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api-admin-panel.sreya.online/admin-panel/dist/api/subject-teacher/insert-api.php"
      );

      const json = await response.json();
      console.log("API Response:", json);

      // Handle array OR nested response
      const finalData = Array.isArray(json) ? json : json.data || [];

      setData(finalData);
    } catch (error) {
      console.error("Fetch Error:", error);
      Alert.alert("Error", "Failed to fetch data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>

      {/* TOP BAR */}
      <View style={styles.topBar}>
        <Text style={styles.pageTitle}>Teacher Assign Subject</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => Alert.alert("Add New", "Open Add Form")}
        >
          <Text style={styles.addButtonText}>+ Add New</Text>
        </TouchableOpacity>
      </View>

      {/* LOADING */}
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : data.length === 0 ? (
        <Text style={styles.emptyText}>No records found</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.label}>
                Teacher:{" "}
                <Text style={styles.value}>
                  {item.teacher_name || item.teacher || "N/A"}
                </Text>
              </Text>

              <Text style={styles.label}>
                Subject:{" "}
                <Text style={styles.value}>
                  {item.subject_name || item.subject || "N/A"}
                </Text>
              </Text>
            </View>
          )}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16
  },

  pageTitle: {
    fontSize: 18,
    fontWeight: "bold"
  },

  addButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "bold"
  },

  list: {
    paddingBottom: 20
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2
  },

  label: {
    fontWeight: "bold",
    marginBottom: 6
  },

  value: {
    fontWeight: "normal",
    color: "#444"
  },

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    color: "#777"
  }
});