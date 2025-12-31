import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { getNotes } from "../services/ApiService";

export default function ListScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotes = async () => {
    setLoading(true);
    const data = await getNotes();
    setNotes(data);
    setLoading(false);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("About")}
          style={{ marginRight: 15 }}
        >
          <Text style={{ color: "blue", fontSize: 16 }}>About</Text>
        </TouchableOpacity>
      ),
    });
    const unsubscribe = navigation.addListener("focus", () => {
      loadNotes();
    });
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Detail", { note: item })}
            activeOpacity={0.7}
          >
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.row}>
                <Text style={styles.date}>
                  {new Date(item.date).toLocaleDateString()}
                </Text>
                {item.location && <Text style={styles.locIcon}>📍</Text>}
              </View>
              <Text numberOfLines={2} style={styles.preview}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("Add")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  locIcon: {
    fontSize: 12,
  },
  preview: {
    fontSize: 14,
    color: "#666",
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#007AFF",
    borderRadius: 28,
    elevation: 8,
  },
  fabText: {
    fontSize: 24,
    color: "white",
  },
});
