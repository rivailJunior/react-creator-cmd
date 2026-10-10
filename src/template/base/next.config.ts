import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    WELCOME_MESSAGE: process.env.WELCOME_MESSAGE,
  },
};

export default nextConfig;
