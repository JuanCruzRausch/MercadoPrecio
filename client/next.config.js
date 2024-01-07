/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['http2.mlstatic.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
