import React, { createContext, useContext, useState, useEffect } from 'react';

const PrivyContext = createContext(null);

export function PrivyProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(() => {
    return localStorage.getItem('proxr_wallet_connected') === 'true';
  });
  
  const [user, setUser] = useState(() => {
    const connected = localStorage.getItem('proxr_wallet_connected') === 'true';
    if (connected) {
      return {
        wallet: {
          address: '0x7f3k9x2mq8y73bd8e92c4f82637b7d1234567890'
        },
        wallets: [
          {
            address: '0x7f3k9x2mq8y73bd8e92c4f82637b7d1234567890',
            chainType: 'solana'
          }
        ]
      };
    }
    return null;
  });

  const login = () => {
    localStorage.setItem('proxr_wallet_connected', 'true');
    setAuthenticated(true);
    setUser({
      wallet: {
        address: '0x7f3k9x2mq8y73bd8e92c4f82637b7d1234567890'
      },
      wallets: [
        {
          address: '0x7f3k9x2mq8y73bd8e92c4f82637b7d1234567890',
          chainType: 'solana'
        }
      ]
    });
  };

  const logout = () => {
    localStorage.removeItem('proxr_wallet_connected');
    setAuthenticated(false);
    setUser(null);
  };

  return (
    <PrivyContext.Provider value={{ ready: true, authenticated, user, login, logout }}>
      {children}
    </PrivyContext.Provider>
  );
}

export function usePrivy() {
  const context = useContext(PrivyContext);
  if (!context) {
    throw new Error('usePrivy must be used within a PrivyProvider');
  }
  return context;
}
