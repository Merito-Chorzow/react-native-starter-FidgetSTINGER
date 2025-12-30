import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function ListScreen({ navigation }) {
  // Dane "na sztywno" dla pierwszego etapu
  const [notes, setNotes] = useState([
    {
      id: "1",
      title: "Przykładowa notatka",
      date: new Date().toISOString(),
      description: "To jest opis notatki.",
    },
    {
      id: "2",
      title: "Druga notatka",
      date: new Date().toISOString(),
      description: "Kolejny opis.",
    },
  ]);

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Detail", { note: item })}
          >
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>
                {new Date(item.date).toLocaleDateString()}
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
  container: { flex: 1, backgroundColor: "#fff" },
  item: { padding: 20, borderBottomWidth: 1, borderBottomColor: "#eee" },
  title: { fontSize: 18 },
  date: { fontSize: 12, color: "#888" },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "blue",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  fabText: { color: "white", fontSize: 24 },
});
