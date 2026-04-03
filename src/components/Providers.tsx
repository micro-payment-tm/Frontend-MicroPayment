"use client";

import React, { useState } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const mainnet = {
  id: 1,
  name: "Ethereum",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://eth-mainnet.g.alchemy.com/v2/demo"] },
  },
  blockExplorers: {
    default: { name: "Etherscan", url: "https://etherscan.io" },
  },
} as const;

//tes deploy
const mezoMainnet = {
  ...mainnet,
  id: 420420421,
  name: "Mezo Mainnet",
  nativeCurrency: { name: "Bitcoin", symbol: "BTC", decimals: 8 },
  rpcUrls: {
    default: { http: ["https://rpc.mezo.org"] },
  },
} as const;

const mezoTestnet = {
  ...mainnet,
  id: 31611,
  name: "Mezo Testnet",
  nativeCurrency: { name: "Bitcoin", symbol: "BTC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.test.mezo.org"] },
  },
} as const;

const config = getDefaultConfig({
  appName: "Mezo Passport App",
  projectId: "YOUR_WALLETCONNECT_PROJECT_ID",
  chains: [mezoTestnet],
  transports: {
    [mezoTestnet.id]: http(),
  },
});

//tes deplo

export function Providers({ children }: { children: React.ReactNode }) {
  const [isReady] = useState(true);

  if (!isReady) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          initialChain={mezoTestnet}
          theme={darkTheme({
            accentColor: "#F7931A",
            accentColorForeground: "white",
            borderRadius: "medium",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
