import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SearchProductCard = ({ item }) => {
  const navigation = useNavigation();

  const goToDetails = () => {
    navigation.navigate("ProductDetails", { product: item });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={goToDetails}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>

        <View style={styles.ratingRow}>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>

        <Text style={styles.price}>₹{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchProductCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },

  image: {
    width: 85,
    height: 85,
    borderRadius: 8,
    resizeMode: "cover",
  },

  info: {
    marginLeft: 12,
    justifyContent: "center",
    flex: 1,
  },

  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111",
  },

  ratingRow: {
    marginTop: 4,
  },

  rating: {
    alignSelf: "flex-start",
    color: "gray",
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  price: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});