import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DetailScreen({ route }) {
  const { note } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.date}>{new Date(note.date).toLocaleString()}</Text>
      <Text style={styles.desc}>{note.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  date: { color: "gray", marginBottom: 20 },
  desc: { fontSize: 16 },
});
