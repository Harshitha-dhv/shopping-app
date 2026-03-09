import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { CartContext } from '../context/CartContext';

const CartScreen = ({ navigation }) => {
 const { cart, removeFromCart, getTotalAmount } = useContext(CartContext);

const totalAmount = getTotalAmount();

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your cart is empty 🛒</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.quantity}>Qty: {item.quantity}</Text>
              <Text style={styles.price}>
                ₹ {item.price * item.quantity}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromCart(item.id)}
            >
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>₹ {totalAmount}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.checkoutButton,
            cart.length === 0 && { backgroundColor: '#ccc' },
          ]}
          disabled={cart.length === 0}
          onPress={() => {
            navigation.navigate('Payment', {
              total: totalAmount,
            });
          }}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    padding: 15,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#777',
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },

  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },

  quantity: {
    fontSize: 14,
    color: '#555',
  },

  price: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
  },

  removeButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },

  removeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    fontSize: 14,
    color: '#777',
  },

  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  checkoutButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },

  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});