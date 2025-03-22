"use client";

import { PrivyProvider as Privy } from "@privy-io/react-auth";
import { PropsWithChildren } from "react";

export function PrivyProvider({ children }: PropsWithChildren) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  if (!appId) {
    throw new Error(
      "NEXT_PUBLIC_PRIVY_APP_ID is not set in environment variables"
    );
  }

  return (
    <Privy
      appId={appId}
      config={{
        loginMethods: ["email"],
        appearance: {
          theme: "light",
          accentColor: "#000000",
          showWalletLoginFirst: false,
        },
      }}
    >
      {children}
    </Privy>
  );
}
