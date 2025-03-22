"use client";

import { usePrivy } from "@privy-io/react-auth";

export function ConnectButton() {
  const { login, logout, ready, authenticated } = usePrivy();

  if (!ready) {
    return (
      <button
        disabled
        className="rounded-full border border-solid border-transparent bg-gray-200 text-gray-400 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      >
        Loading...
      </button>
    );
  }

  if (authenticated) {
    return (
      <button
        onClick={logout}
        className="rounded-full border border-solid border-transparent transition-colors bg-green-500 hover:bg-green-600 text-white font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      >
        Connected
      </button>
    );
  }

  return (
    <button
      onClick={login}
      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
    >
      Connect
    </button>
  );
}
