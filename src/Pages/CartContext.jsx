// src/context/CartContext.jsx
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [quantities, setQuantities] = useState({});

  return (
    <CartContext.Provider value={{ quantities, setQuantities }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
