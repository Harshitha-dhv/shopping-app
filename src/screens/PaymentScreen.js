import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CartContext } from '../context/CartContext';

 const PaymentScreen = ({ navigation }) => {
  const { cart, getTotalAmount, placeOrder } = useContext(CartContext);
  const [selectedMethod, setSelectedMethod] = useState(null);

  const subtotal = getTotalAmount();  // ✅ FIXED
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const tax = subtotal * 0.05;
  const grandTotal = subtotal + deliveryFee + tax;

  const handlePayment = () => {
    if (cart.length === 0) {
      Alert.alert('Cart is empty');
      return;
    }

    if (!selectedMethod) {
      Alert.alert('Please select a payment method');
      return;
    }

    placeOrder(selectedMethod);
    navigation.navigate('PaymentSuccess');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Details</Text>

      {/* ================= PAYMENT METHODS ================= */}
      <Text style={styles.sectionTitle}>Select Payment Method</Text>

      {['UPI', 'Card', 'Cash on Delivery'].map(method => (
        <TouchableOpacity
          key={method}
          style={[
            styles.methodCard,
            selectedMethod === method && styles.selectedCard,
          ]}
          onPress={() => setSelectedMethod(method)}
        >
          <Text style={styles.methodText}>{method}</Text>
        </TouchableOpacity>
      ))}

      {/* ================= ORDER SUMMARY ================= */}
      <View style={styles.summaryBox}>
        <Text style={styles.sectionTitle}>Order Summary</Text>

        <View style={styles.row}>
          <Text>Subtotal</Text>
          <Text>₹ {subtotal.toFixed(2)}</Text>
        </View>

        <View style={styles.row}>
          <Text>Delivery</Text>
          <Text>
            {deliveryFee === 0 ? 'Free' : `₹ ${deliveryFee.toFixed(2)}`}
          </Text>
        </View>

        <View style={styles.row}>
          <Text>Tax (5%)</Text>
          <Text>₹ {tax.toFixed(2)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalAmount}>₹ {grandTotal.toFixed(2)}</Text>
        </View>
      </View>

      {/* ================= PAY BUTTON ================= */}
      <TouchableOpacity
        style={[
          styles.payButton,
          (!selectedMethod || cart.length === 0) && {
            backgroundColor: '#ccc',
          },
        ]}
        disabled={!selectedMethod || cart.length === 0}
        onPress={handlePayment}
      >
        <Text style={styles.payButtonText}>Pay ₹ {grandTotal.toFixed(2)}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  methodCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 12,
  },
  selectedCard: {
    borderColor: '#a1d3f5',
    backgroundColor: '#e8f4fc',
  },
  methodText: {
    fontSize: 16,
  },
  summaryBox: {
    marginTop: 25,
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#f7f7f7',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  payButton: {
    marginTop: 30,
    backgroundColor: '#a1d3f5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
