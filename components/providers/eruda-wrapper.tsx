"use client";

import dynamic from "next/dynamic";
import { type ReactNode } from "react";

const ErudaProvider = dynamic(
  () => import("../Eruda").then((c) => c.ErudaProvider),
  {
    ssr: false,
  }
);

export function ErudaWrapper({ children }: { children: ReactNode }) {
  return <ErudaProvider>{children}</ErudaProvider>;
}
