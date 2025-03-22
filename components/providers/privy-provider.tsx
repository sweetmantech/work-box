"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { type ReactNode } from "react";

export function PrivyAuthProvider({ children }: { children: ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#31a8a0",
          showWalletLoginFirst: false,
        },
        loginMethods: ["email"],
        defaultChain: undefined,
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
