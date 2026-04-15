import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactCompiler: true,
  output: "export",
  distDir: "docs",
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  webpack: (config) => {
    return config;
  },
  swcMinify: false,
};

export default nextConfig;