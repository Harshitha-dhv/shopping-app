import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CommonActions } from "@react-navigation/native";

const PaymentSuccessScreen = ({ navigation }) => {
  const handleViewOrders = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "MyOrders" }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>✓</Text>
        </View>

        <Text style={styles.title}>Order placed Successfully!</Text>

        <Text style={styles.message}>
          Thank you for your purchase. Your Payment was successfull.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleViewOrders}>
          <Text style={styles.buttonText}>View My Orders</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    elevation: 5,
  },

  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#e6f7ed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  icon: {
    fontSize: 50,
    color: "#28a745",
    fontWeight: "bold",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  message: {
    textAlign: "center",
    fontSize: 15,
    color: "#666",
    marginBottom: 30,
    lineHeight: 22,
  },

  button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});