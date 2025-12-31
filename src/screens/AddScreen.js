import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { saveNote } from "../services/ApiService";

export default function AddScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const getLocation = async () => {
    setLocationLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Brak uprawnień", "Nie można pobrać lokalizacji");
        setLocationLoading(false);
        return;
      }

      // FUNKCJA NATYWNA - DEMONSTRACJA
      // Na prawdziwym urządzeniu pobiera rzeczywistą lokalizację z GPS
      // Na emulatorze używamy mock danych (GPS nie działa na emulatorach)

      // 1. Spróbuj pobrać ostatnią znaną lokalizację
      let loc = await Location.getLastKnownPositionAsync({});

      // 2. Jeśli brak, spróbuj pobrać aktualną
      if (!loc) {
        try {
          loc = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Lowest,
            timeout: 3000,
          });
        } catch (e) {
          console.log("GPS niedostępny na emulatorze, używam mock location");
          // Na emulatorze GPS często nie działa - używamy mock danych
          // To demonstracja - na prawdziwym telefonie zadziała GPS
          loc = {
            coords: {
              latitude: 52.2297,
              longitude: 21.0122,
              altitude: null,
              accuracy: 10,
              altitudeAccuracy: null,
              heading: null,
              speed: null,
            },
          };
          Alert.alert(
            "Lokalizacja (demo)",
            "Użyto przykładowych współrzędnych (Warszawa).\n\nNa prawdziwym urządzeniu funkcja GPS zadziała automatycznie.",
            [{ text: "OK" }]
          );
        }
      }

      if (loc && loc.coords) {
        setLocation(loc.coords);
      } else {
        Alert.alert("Błąd", "Nie udało się pobrać lokalizacji.");
      }
    } catch (error) {
      console.error("Location error:", error);

      // Sprawdź czy Location Services są wyłączone (błąd 20)
      if (
        error.code === "E_LOCATION_SERVICES_DISABLED" ||
        error.message.includes("rejected: 20")
      ) {
        Alert.alert(
          "Location Services wyłączone",
          "Włącz Location Services w ustawieniach emulatora:\nSettings → Location → Use location: ON\n\nLub kliknij OK aby użyć przykładowej lokalizacji (Warszawa).",
          [
            { text: "Anuluj", style: "cancel" },
            {
              text: "OK, użyj przykładowej",
              onPress: () => {
                // Fallback: przykładowa lokalizacja (demonstracja działania funkcji)
                setLocation({ latitude: 52.2297, longitude: 21.0122 });
              },
            },
          ]
        );
      } else {
        Alert.alert("Błąd", "Nie udało się pobrać lokalizacji. Sprawdź GPS.");
      }
    } finally {
      setLocationLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title) {
      Alert.alert("Błąd", "Podaj tytuł");
      return;
    }
    setLoading(true);
    await saveNote({
      title,
      description,
      location,
      date: new Date().toISOString(),
    });
    setLoading(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tytuł</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Opis</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Button
        title="Pobierz lokalizację (GPS)"
        onPress={getLocation}
        disabled={locationLoading}
      />
      {locationLoading && <ActivityIndicator size="small" color="#0000ff" />}
      {location && (
        <Text style={styles.locText}>
          Lokalizacja: {location.latitude.toFixed(4)},{" "}
          {location.longitude.toFixed(4)}
        </Text>
      )}

      <View style={{ marginTop: 20 }}>
        <Button
          title={loading ? "Zapisywanie..." : "Zapisz"}
          onPress={handleSave}
          disabled={loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  locText: { marginVertical: 10, color: "green" },
});
