import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Feather";

import CartScreen from "../screens/CartScreen";
import PaymentScreen from "../screens/PaymentScreen";
import PaymentSuccessScreen from "../screens/PaymentSuccessScreen";

const Stack = createNativeStackNavigator();

const CartStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
       

        headerLeft: () =>
          navigation.canGoBack() ? (
            <Icon
              name="chevron-left"
              size={26}
              color="#111010"
              style={{ marginLeft: 10,marginRight: 10, }}
              onPress={() => navigation.goBack()}
            />
          ) : null,
      })}
    >
      <Stack.Screen
        name="CartHome"
        component={CartScreen}
        options={{ title: "My Cart" }}
      />

      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ title: "Payment" }}
      />

      <Stack.Screen
        name="PaymentSuccess"
        component={PaymentSuccessScreen}
        options={{ title: "Order Confirmed" }}
      />
    </Stack.Navigator>
  );
};

export default CartStack;