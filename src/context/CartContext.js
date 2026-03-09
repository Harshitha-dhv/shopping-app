import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // =========================
  // INCREASE QUANTITY
  // =========================
  const increaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // =========================
  // DECREASE QUANTITY
  // =========================
  const decreaseQuantity = (productId) => {
    setCart(
      cart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // =========================
  // REMOVE ITEM
  // =========================
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // =========================
  // CLEAR CART
  // =========================
  const clearCart = () => {
    setCart([]);
  };

  // =========================
  // GET TOTAL AMOUNT
  // =========================
  const getTotalAmount = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // =========================
  // PLACE ORDER
  // =========================
  const placeOrder = (paymentMethod) => {
    if (cart.length === 0) return;

    const newOrder = {
      id: Date.now(),
      items: cart,
      total: getTotalAmount(),
      paymentMethod: paymentMethod,
      status: "Confirmed",
      date: new Date().toLocaleString(),
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        placeOrder,
        getTotalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};