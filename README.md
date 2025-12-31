# Field Notes (React Native)

## Opis

Aplikacja mobilna do zarządzania notatkami terenowymi stworzona w technologii React Native.
Aplikacja umożliwia przeglądanie listy notatek, wyświetlanie ich szczegółów oraz dodawanie nowych wpisów.
Dane są obecnie przechowywane w pamięci podręcznej aplikacji (mock API) i symulują komunikację z serwerem.

## Funkcjonalności

W ramach realizacji projektu zaimplementowano następujące funkcjonalności:

### 1. Zarządzanie notatkami

Aplikacja umożliwia pełny przegląd oraz dodawanie nowych notatek terenowych.

- **Ekran listy (ListScreen):** Stanowi główny widok aplikacji. Dane są pobierane asynchronicznie z serwisu `ApiService`. Zastosowano wskaźnik ładowania (`ActivityIndicator`) informujący użytkownika o trwającym procesie pobierania danych. Lista obsługuje odświeżanie widoku po powrocie z ekranu dodawania.
- **Ekran szczegółów (DetailScreen):** Pozwala na zapoznanie się z pełną treścią notatki, w tym datą jej utworzenia sformatowaną do czytelnej postaci.
- **Ekran dodawania (AddScreen):** Zawiera formularz z walidacją danych wejściowych (wymagany tytuł). Proces zapisu jest symulowany jako operacja asynchroniczna, co pozwala na przetestowanie zachowania interfejsu przy opóźnieniach sieciowych.

### 2. Nawigacja i struktura

Zastosowano bibliotekę React Navigation (Stack Navigator) do zarządzania przepływem użytkownika między ekranami.

- Zaimplementowano intuicyjną nawigację pomiędzy listą, szczegółami a formularzem dodawania.
- Dodano przycisk "About" w nagłówku (header), prowadzący do ekranu informacyjnego.

### 3. Warstwa danych (Mock API)

Stworzono serwis `ApiService` symulujący komunikację z zewnętrznym serwerem.

- Wykorzystano mechanizm `Promise` oraz `setTimeout` do emulacji opóźnień sieciowych.
- Dane przechowywane są w pamięci operacyjnej (zmienna `mockNotes`), co pozwala na testowanie operacji CRUD (Create, Read) w trakcie sesji aplikacji.

## Uruchomienie

1. Zainstaluj zależności:

   ```bash
   npm install
   ```

2. Uruchom serwer deweloperski:

   ```bash
   npx expo start
   ```

3. Wybierz platformę (Android/iOS) lub użyj aplikacji Expo Go na urządzeniu fizycznym.

## Uwagi

- W obecnej wersji funkcje natywne (Lokalizacja/Kamera) nie są jeszcze zaimplementowane.
- Dane nie są trwale zapisywane w pamięci urządzenia (znikną po restarcie aplikacji).
