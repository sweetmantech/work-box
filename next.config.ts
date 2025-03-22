import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    allowedDevOrigins: [".ngrok-free.app"],
  },
};

export default nextConfig;
