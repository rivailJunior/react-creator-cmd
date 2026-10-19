import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    WELCOME_MESSAGE: process.env.WELCOME_MESSAGE,
  },
};

export default nextConfig;
