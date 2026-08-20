import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Rewrites barrel imports (`import { X } from 'lucide-react'`) into direct
    // module imports so unused icons/components are tree-shaken out.
    optimizePackageImports: ['lucide-react', 'recharts', 'framer-motion'],
  },
  compiler: {
    // Strip console.* from production builds, keeping error/warn. Several
    // modules log on import (app/lib/api_v2.ts) or per-row in render paths.
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },
};

export default nextConfig;
