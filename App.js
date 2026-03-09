import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { WishlistProvider } from "./src/context/WishlistContext";

export default function App() {
  return (
    <WishlistProvider>
      <AppNavigator />
    </WishlistProvider>
  );
}