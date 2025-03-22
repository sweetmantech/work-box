"use client";

import Link from "next/link";
import { Sparkles, X } from "lucide-react";
import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { signInWithWallet } from "@/components/ConnectWorldButton";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { login, ready, authenticated } = usePrivy();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    if (ready && !authenticated) {
   

      signInWithWallet();
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#212121]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles
              className="h-10 w-10"
              fill="#31a8a0"
              stroke="black"
              strokeWidth={1.4}
            />
            <span className="text-2xl md:text-3xl font-bold text-white tracking-wider hover:text-[#31a8a0] transition-colors duration-200">
              OBT
            </span>
          </Link>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#pricing"
            className="text-base text-white/90 transition hover:text-white"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="text-base text-white/90 transition hover:text-white"
          >
            FAQ
          </Link>
          <Link
            href="/agenthub"
            className="text-base text-white/90 transition hover:text-white"
          >
            Agent Hub
          </Link>
       {/*    <Link
            href="/agents"
            className="text-base text-white/90 transition hover:text-white"
          >
            Agents
          </Link> */}
          <Link
            href="/agenthub"
            className="text-base text-white/90 transition hover:text-white"
          >
            Agents
          </Link>
          <Link
            href="#wall-of-love"
            className="text-base text-white/90 transition hover:text-white"
          >
            Wall of love
          </Link>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={handleLogin}
            className="flex items-center gap-2 rounded-md bg-[#2C2C2C] px-4 py-2 text-sm text-white/90 transition hover:bg-[#31a8a0]"
          >
            {authenticated ? "Dashboard" : "Login"}
          </button>
        </div>

        <div className="flex md:hidden">
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center justify-center rounded-md p-2 text-white/90 hover:text-white"
          >
            <span className="sr-only">Toggle menu</span>
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="#pricing"
              className="block rounded-md px-3 py-2 text-base font-medium text-white/90 hover:bg-[#3C3C3C] hover:text-white"
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="block rounded-md px-3 py-2 text-base font-medium text-white/90 hover:bg-[#3C3C3C] hover:text-white"
              onClick={toggleMenu}
            >
              FAQ
            </Link>
            <Link
              href="#wall-of-love"
              className="block rounded-md px-3 py-2 text-base font-medium text-white/90 hover:bg-[#3C3C3C] hover:text-white"
              onClick={toggleMenu}
            >
              Wall of love
            </Link>

            <Link
            href="/agenthub"
            className="block rounded-md px-3 py-2 text-base font-medium text-white/90 hover:bg-[#3C3C3C] hover:text-white"
            onClick={toggleMenu}
          >
            Agent Hub
          </Link>
            <button
              onClick={() => {
                signInWithWallet();
                /* toggleMenu(); */
              }}
              className="w-full text-left block rounded-md px-3 py-2 text-base font-medium text-white/90 hover:bg-[#3C3C3C] hover:text-white"
            >
              {authenticated ? "Dashboard" : "Login"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
