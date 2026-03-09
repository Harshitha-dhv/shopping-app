import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const CategoryProductsScreen = ({ route }) => {
  const { categoryKey } = route.params;

  const filteredProducts = products.filter(
    (item) => item.category === categoryKey
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard item={item} />}
      />
    </View>
  );
};

export default CategoryProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});