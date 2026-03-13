import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const SearchProductCard = ({ item }) => {
  return (
    <View style={styles.card}>
      
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
      </View>

    </View>
  );
};

export default SearchProductCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },

  info: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "500",
  },

  price: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
  },
});