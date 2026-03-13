import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />

      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: "Search Products" }}
      />

    </Stack.Navigator>
  );
};

export default HomeStack;