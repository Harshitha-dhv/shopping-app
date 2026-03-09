import React, { useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { products } from "../data/products";
import { categories } from "../data/categories";
import { banners } from "../data/banners";
import { WishlistContext } from "../context/WishlistContext";

import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import Banner from "../components/Banner";

const HomeScreen = ({ navigation }) => {
  const { wishlist } = useContext(WishlistContext);

  // ✅ Add Wishlist Icon in Header (Only for Home)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Home",
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Wishlist")}
          style={{ marginRight: 15 }}
        >
          <View>
            <Text style={{ fontSize: 22 }}>❤️</Text>

            {wishlist.length > 0 && (
              <View
                style={{
                  position: "absolute",
                  right: -6,
                  top: -4,
                  backgroundColor: "red",
                  borderRadius: 10,
                  paddingHorizontal: 5,
                  minWidth: 18,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 12 }}>
                  {wishlist.length}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation, wishlist]);

  const renderHeader = () => (
    <View>
      {/* BANNERS */}
      <FlatList
        data={banners}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Banner item={item} navigation={navigation} />
        )}
      />

      {/* CATEGORIES */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CategoryCard item={item} navigation={navigation} />
        )}
      />

      {/* PRODUCTS TITLE */}
      <Text style={styles.sectionTitle}>Featured Products</Text>
    </View>
  );

  return (
    <View style={styles.products}>
      <FlatList
        data={products.slice(0, 6)}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard item={item} />}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
  },
  products: {
    backgroundColor: "#fff",
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 15,
  },
});