import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { CartContext } from '../context/CartContext';

const OrdersScreen = () => {
  const { orders } = useContext(CartContext);

  return (
    <View style={styles.container}>
     

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            You have no orders yet 📦
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.row}>
              <Text style={styles.orderId}>
                Order #{item.id}
              </Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>
                  {item.status || "Confirmed"}
                </Text>
              </View>
            </View>

            <Text style={styles.date}>
              {item.date}
            </Text>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>
                ₹ {item.total}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    paddingHorizontal: 15,
    marginTop:12
  },
  emptyText: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 16,
    color: "#777",
  },

  orderCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderId: {
    fontSize: 16,
    fontWeight: "600",
  },

  date: {
    marginTop: 6,
    color: "#666",
    fontSize: 13,
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },

  totalLabel: {
    fontSize: 15,
    color: "#555",
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },

  statusBadge: {
    backgroundColor: "#e6f7ed",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 12,
    color: "#28a745",
    fontWeight: "600",
  },
});