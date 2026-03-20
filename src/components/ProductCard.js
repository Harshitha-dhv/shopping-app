import React, { useContext, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

const { width } = Dimensions.get('window');

const ProductCard = ({ item }) => {
  const navigation = useNavigation();

  const {
    cart,
    addToCart,
    increaseQuantity,
  } = useContext(CartContext);

  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  // Get quantity from cart
  const quantity = useMemo(() => {
    const cartItem = cart.find(i => i.id === item.id);
    return cartItem ? cartItem.quantity : 0;
  }, [cart, item.id]);

  // Wishlist check
  const isInWishlist = useMemo(
    () => wishlist.some(i => i.id === item.id),
    [wishlist],
  );

  const handleWishlist = () => {
    if (isInWishlist) removeFromWishlist(item.id);
    else addToWishlist(item);
  };

  const handleAdd = () => {
    if (quantity === 0) addToCart(item);
    else increaseQuantity(item.id);
  };

  const goToDetails = () => {
    navigation.navigate('ProductDetails', { product: item });
  };

  return (
    <View style={styles.card}>
      {/* Wishlist Button */}
      <TouchableOpacity style={styles.heartIcon} onPress={handleWishlist}>
        <Text style={{ fontSize: 20 }}>{isInWishlist ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>

      {/* Product Click Area */}
      <TouchableOpacity activeOpacity={0.9} onPress={goToDetails}>
        <Image source={{ uri: item.image }} style={styles.image} />

        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>

          <Text style={styles.price}>₹ {item.price}</Text>

          <Text style={styles.rating}>⭐ {item.rating.toFixed(1)}</Text>
        </View>
      </TouchableOpacity>

      {/* Cart Section */}
      <View style={{ padding: 10 }}>
        {quantity === 0 ? (
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={handleAdd}
          >
            <Text style={styles.addButton}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.viewCartButton}
            onPress={() =>  navigation.navigate('MainTabs', {
            screen: 'Cart',
          })}
          >
            <Text style={styles.viewCartText}>View Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: width * 0.42,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  heartIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    padding: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  rating: {
    fontSize: 13,
    color: 'gray',
  },
  addButtonContainer: {
    marginTop: 8,
    backgroundColor: '#000',
    borderRadius: 6,
    alignItems: 'center',
    paddingVertical: 8,
  },
  addButton: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
 viewCartButton: {
  marginTop: 8,
  backgroundColor: "#FB641B",
  borderRadius: 6,
  alignItems: "center",
  paddingVertical: 8,
},

viewCartText: {
  color: "#fff",
  fontSize: 13,
  fontWeight: "bold",
},
});
