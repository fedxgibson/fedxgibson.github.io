import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true
  }
};

export default nextConfig;
