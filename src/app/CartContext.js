'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [deliveryMode, setDeliveryMode] = useState('Delivery');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('ph_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    
    const savedMode = localStorage.getItem('ph_mode');
    if (savedMode) setDeliveryMode(savedMode);
    
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('ph_cart', JSON.stringify(cart));
      localStorage.setItem('ph_mode', deliveryMode);
    }
  }, [cart, deliveryMode, isLoaded]);

  const addToCart = (item) => {
    setCart(prev => [...prev, item]);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, deliveryMode, setDeliveryMode, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
