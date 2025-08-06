/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    useLightningcss: false,
  },
};

module.exports = nextConfig;
