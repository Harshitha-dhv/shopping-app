import React, { useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { products } from "../data/products";
import { categories } from "../data/categories";
import { banners } from "../data/banners";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import Banner from "../components/Banner";

const HomeScreen = ({ navigation }) => {
  const { wishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

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
            <Text style={{ fontSize: 26 }}>❤️</Text>

            {wishlist.length > 0 && (
              <View style={styles.wishlistBadge}>
                <Text style={styles.wishlistBadgeText}>
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
        contentContainerStyle={styles.bannerContainer}
        renderItem={({ item }) => (
          <Banner item={item} navigation={navigation} />
        )}
      />

      {/* SEARCH */}
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => navigation.navigate("Search", { products })}
      >
        <Icon name="search" size={20} color="#777" />
        <Text style={styles.searchText}>Search for products</Text>
      </TouchableOpacity>

      {/* CATEGORIES */}
      <Text style={styles.sectionTitle}>Categories</Text>

      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.categoryContainer}
        renderItem={({ item }) => (
          <CategoryCard item={item} navigation={navigation} />
        )}
      />

      {/* PRODUCTS TITLE */}
      <Text style={styles.sectionTitle}>Featured Products</Text>
    </View>
  );

  return (
    <FlatList
      data={products.slice(0, 6)}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ProductCard item={item} addToCart={addToCart} />
      )}
      ListHeaderComponent={renderHeader}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.productRow}
      contentContainerStyle={styles.mainContainer}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    paddingBottom: 20,
    backgroundColor: "#fff",
  },

  bannerContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    marginHorizontal: 15,
    marginTop: 15,
    paddingHorizontal: 12,
    height: 45,
    borderRadius: 10,
  },

  searchText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#777",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 15,
  },

  categoryContainer: {
    paddingHorizontal: 10,
  },

  productRow: {
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },

  wishlistBadge: {
    position: "absolute",
    right: -4,
    top: -4,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  wishlistBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});