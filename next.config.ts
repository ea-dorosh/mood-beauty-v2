import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pass API URL to client-side code
  env: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  },

  // Enable strict mode for better development experience
  reactStrictMode: true,

  // Image optimization settings
  images: {
    remotePatterns: [
      new URL(`http://localhost:3500/**`),
      new URL(`https://moodbeauty.de/**`),
      new URL(`http://192.168.93.195/**`),
    ],
    formats: [`image/avif`, `image/webp`],
    qualities: [75, 80, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Security & performance
  poweredByHeader: false,
  compress: true,

  compiler: {
    // Temporarily disable to debug server logs in production
    removeConsole: false,
  },
};

export default nextConfig;
