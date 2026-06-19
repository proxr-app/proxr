import React from 'react';
import { usePrivy as useRealPrivy, PrivyProvider as RealPrivyProvider } from '@privy-io/react-auth';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
import { usePrivy as useMockPrivy, PrivyProvider as MockPrivyProvider } from './privyMock';

// Toggle this to switch between real Privy and mock Privy authentication
export const USE_MOCK = false;

export function PrivyProvider({ children }) {
  if (USE_MOCK) {
    return <MockPrivyProvider>{children}</MockPrivyProvider>;
  }

  const appId = import.meta.env.VITE_PRIVY_APP_ID || "cmqjcs2ib00eh0cjy8zhwqqu7";

  return (
    <RealPrivyProvider
      appId={appId}
      config={{
        appearance: { 
          theme: 'dark', 
          accentColor: '#FFFFFF',
          walletChainType: 'solana-only',
          walletList: ['phantom', 'detected_solana_wallets']
        },
        loginMethods: ['wallet', 'email'],
        externalWallets: {
          solana: {
            connectors: toSolanaWalletConnectors()
          }
        }
      }}
    >
      {children}
    </RealPrivyProvider>
  );
}

export function usePrivy() {
  if (USE_MOCK) {
    return useMockPrivy();
  }
  return useRealPrivy();
}
