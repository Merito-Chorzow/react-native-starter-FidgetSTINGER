import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Field Notes</Text>
      <Text style={styles.version}>Wersja 1.0.0</Text>
      <Text style={styles.desc}>
        Aplikacja do zbierania notatek terenowych.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  version: { fontSize: 16, color: "gray", marginBottom: 20 },
  desc: { textAlign: "center", fontSize: 16 },
});
