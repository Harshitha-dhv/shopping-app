import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const ProductCard = ({ item }) => {
  const navigation = useNavigation();

  const { addToCart, removeFromCart, cartItems } =
    useContext(CartContext);

  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const [quantity, setQuantity] = useState(0);

  // Check if item already in cart
  useEffect(() => {
    const cartItem = cartItems?.find((i) => i.id === item.id);
    if (cartItem) setQuantity(cartItem.quantity);
    else setQuantity(0);
  }, [cartItems]);

  // Check if item is in wishlist
  const isInWishlist = wishlist?.some((i) => i.id === item.id);

  const handleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
      navigation.navigate("Wishlist"); // navigate after adding
    }
  };

  const handleAdd = () => {
    setQuantity(quantity + 1);
    addToCart(item);
  };

  const handleRemove = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      removeFromCart(item);
    } else {
      setQuantity(0);
      removeFromCart(item);
    }
  };

  return (
    <View style={styles.card}>
      {/* ❤️ Wishlist Heart */}
      <TouchableOpacity
        style={styles.heartIcon}
        onPress={handleWishlist}
      >
        <Text style={{ fontSize: 20 }}>
          {isInWishlist ? "❤️" : "🤍"}
        </Text>
      </TouchableOpacity>

      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>

        <Text style={styles.price}>₹ {item.price}</Text>

        <Text style={styles.rating}>⭐ {item.rating}</Text>

        {quantity === 0 ? (
          <View style={styles.addButtonContainer}>
            <Text style={styles.addButton} onPress={handleAdd}>
              Add to Cart
            </Text>
          </View>
        ) : (
          <View style={styles.quantityContainer}>
            <Text style={styles.qtyButton} onPress={handleRemove}>
              -
            </Text>
            <Text style={styles.quantity}>{quantity}</Text>
            <Text style={styles.qtyButton} onPress={handleAdd}>
              +
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: 170,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    elevation: 3,
    position: "relative",
  },
  heartIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    padding: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  rating: {
    fontSize: 13,
    color: "gray",
  },
  addButtonContainer: {
    marginTop: 8,
    backgroundColor: "#000",
    borderRadius: 6,
    alignItems: "center",
    paddingVertical: 8,
  },
  addButton: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginTop: 8,
  },
  qtyButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
  },
});