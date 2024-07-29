/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: 'incremental',
  },
  images: {
    domains: ["files.edgestore.dev"]
  }
};

export default nextConfig;
