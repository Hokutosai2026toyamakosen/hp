import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactCompiler: true,
  output: "export",
  distDir: "docs",
  basePath: process.env.GITHUB_ACTIONS ? "/hp" : "",
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