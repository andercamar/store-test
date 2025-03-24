import React, { createContext, useState, useContext } from "react";

export const CartContext = createContext();
export const useCart = () => {
  return useContext(CartContext);
};
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    
  setCart((prevCart) => {
    const existingProductIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
    
    if (existingProductIndex >= 0) {
      const updatedCart = [...prevCart];
      const existingProduct = updatedCart[existingProductIndex];
      if (existingProduct.quantity < item.stock) {
        updatedCart[existingProductIndex].quantity += 1;
      } else {
        alert("Quantidade máxima em estoque atingida!");
      }
      return updatedCart;
    } else {
      return [...prevCart, { ...item, quantity: 1 }];
    }
  });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return; 
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
    
  };
  const clearCart = () => {
    setCart([]);
  };
  const calculateItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart,calculateTotal,calculateItems }}>
      {children}
    </CartContext.Provider>
  );
};
