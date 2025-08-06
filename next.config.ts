import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    useLightningcss: false,
  },
};

export default nextConfig;
