import React, { createContext, useContext, useState } from 'react';

interface CheckoutContextType {
  isOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  toggleCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openCheckout = () => setIsOpen(true);
  const closeCheckout = () => setIsOpen(false);
  const toggleCheckout = () => setIsOpen(prev => !prev);

  return (
    <CheckoutContext.Provider value={{ isOpen, openCheckout, closeCheckout, toggleCheckout }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error('useCheckout must be used within CheckoutProvider');
  return context;
}
