import { type Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PrivyAuthProvider } from "@/components/providers/privy-provider";
import MiniKitProvider from "@/components/providers/minikit-provider";
import { ErudaWrapper } from "@/components/providers/eruda-wrapper";
import { cn } from "@/lib/utils";
import toast, { Toaster } from 'react-hot-toast';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Black Box Team",
  description:
    "Instant access to specialized professional teams for your startup.",
  keywords: [
    "startup teams",
    "professional services",
    "HR solutions",
    "marketing experts",
    "legal teams",
    "team building",
    "startup resources",
    "business solutions",
    "professional network",
    "expert teams",
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased")}>
        <PrivyAuthProvider>
          <ErudaWrapper>
            <MiniKitProvider>
            <Toaster/>
              {children}
            </MiniKitProvider>
          </ErudaWrapper>
        </PrivyAuthProvider>
      </body>
    </html>
  );
}
