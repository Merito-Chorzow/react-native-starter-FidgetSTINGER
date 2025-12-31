import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ListScreen from "./src/screens/ListScreen";
import DetailScreen from "./src/screens/DetailScreen";
import AddScreen from "./src/screens/AddScreen";
import AboutScreen from "./src/screens/AboutScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{ title: "Moje Notatki" }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: "Szczegóły" }}
        />
        <Stack.Screen
          name="Add"
          component={AddScreen}
          options={{ title: "Dodaj notatkę" }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ title: "O aplikacji" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
