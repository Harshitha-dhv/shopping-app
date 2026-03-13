import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { Image } from 'react-native';

const CartScreen = ({ navigation }) => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getTotalAmount,
  } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const subtotal = getTotalAmount();
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const moveToWishlist = item => {
    console.log('Moving to wishlist:', item);

    addToWishlist(item);
    removeFromCart(item.id);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* Product Info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.price}>₹ {item.price}</Text>
        <Text style={styles.rating}>⭐ {item.rating}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => decreaseQuantity(item.id)}
          >
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => increaseQuantity(item.id)}
          >
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Move to Wishlist */}
        <TouchableOpacity
          style={styles.moveBtn}
          onPress={() => moveToWishlist(item)}
          activeOpacity={0.7}
        >
          <Text style={styles.moveText}>Move to Wishlist</Text>
        </TouchableOpacity>
      </View>

      {/* Right Side Actions */}
      <View style={styles.rightActions}>
        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
          <Icon name="trash-2" size={22} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Order Summary</Text>

            <View style={styles.summaryRow}>
              <Text>Subtotal</Text>
              <Text>₹ {subtotal}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text>Delivery</Text>
              <Text>Free</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text>Tax (5%)</Text>
              <Text>₹ {tax.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.total}>Total</Text>
              <Text style={styles.total}>₹ {total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => navigation.navigate('Payment')}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 25,
    marginTop: 5,
    marginBottom: 15,
    marginHorizontal: 8,
    elevation: 2,
    alignItems: 'center',
  },
  actions: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 5,
  },

  image: {
    width: 80,
    height: 90,
    marginBottom:25,
    borderRadius: 8,
  },

  info: {
    flex: 1,
    marginLeft: 10,
  },

  name: {
    fontSize: 15,
    fontWeight: '600',
  },

  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },

  rating: {
    fontSize: 13,
    color: 'gray',
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  qtyBtn: {
    backgroundColor: '#000',
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },

  qtyText: {
    color: '#fff',
    fontSize: 16,
  },

  quantity: {
    marginHorizontal: 10,
    fontSize: 14,
  },

  moveBtn: {
    marginTop: 20,
    paddingVertical: 6,
  },

  moveText: {
    color: '#ff6600',
    fontSize: 12,
    fontWeight: '600',
  },
  cartItem: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },

  productName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop:15,
    elevation: 3,
  },

  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },

  total: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  checkoutBtn: {
    backgroundColor: 'black',
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  checkoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rightActions: {
  justifyContent: 'space-between',
  height: 70,
  alignItems: 'flex-end',
},
});
