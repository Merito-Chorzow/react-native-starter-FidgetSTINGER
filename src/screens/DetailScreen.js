import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import { deleteNote } from "../services/ApiService";

export default function DetailScreen({ route, navigation }) {
  const { note } = route.params;
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    Alert.alert("Usuń notatkę", "Czy na pewno chcesz usunąć tę notatkę?", [
      { text: "Anuluj", style: "cancel" },
      {
        text: "Usuń",
        style: "destructive",
        onPress: async () => {
          setLoading(true);
          await deleteNote(note.id);
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{note.title}</Text>
        </View>
        <Text style={styles.date}>
          Utworzono: {new Date(note.date).toLocaleString()}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.sectionHeader}>Treść notatki:</Text>
        <Text style={styles.desc}>{note.description}</Text>

        {note.location && (
          <View style={styles.locContainer}>
            <Text style={styles.locLabel}>📍 Lokalizacja GPS:</Text>
            <Text style={styles.locText}>
              Szerokość: {note.location.latitude}
            </Text>
            <Text style={styles.locText}>
              Długość: {note.location.longitude}
            </Text>
          </View>
        )}

        <View style={styles.actions}>
          <Button
            title={loading ? "Usuwanie..." : "Usuń notatkę"}
            color="#ff4444"
            onPress={handleDelete}
            disabled={loading}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerRow: {
    marginBottom: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    color: "#888",
    marginBottom: 15,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 15,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
  },
  desc: {
    fontSize: 18,
    lineHeight: 26,
    color: "#444",
    marginBottom: 20,
  },
  locContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#f0f8ff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d0e8ff",
  },
  locLabel: {
    fontWeight: "bold",
    color: "#0066cc",
    marginBottom: 5,
    fontSize: 16,
  },
  locText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 20,
  },
  actions: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 20,
  },
});
