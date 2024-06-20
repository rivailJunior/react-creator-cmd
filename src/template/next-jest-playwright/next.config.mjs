/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    WELCOME_MESSAGE: process.env.WELCOME_MESSAGE,
  },
};

export default nextConfig;
