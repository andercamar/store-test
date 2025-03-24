import React, { createContext, useState, useContext } from "react";

const CheckoutContext = createContext();

export const useCheckout = () => useContext(CheckoutContext);

const initialCheckoutState = {
    user_name: '',
    user_email: '',
    address: '',
    city: '',
    state: '',
    postal_code: '',
    payment_method: '',
    products: [],
  };

export const CheckoutProvider = ({ children }) => {
  const [checkoutData, setCheckoutData] = useState(initialCheckoutState);

  const updateCheckoutData = (key, value) => {
    setCheckoutData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearCheckoutData = () => {
    setCheckoutData(initialCheckoutState);
  };

  return (
    <CheckoutContext.Provider 
    value={{ 
        checkoutData,
        updateCheckoutData,
        clearCheckoutData,
        }}>
      {children}
    </CheckoutContext.Provider>
  );
};

