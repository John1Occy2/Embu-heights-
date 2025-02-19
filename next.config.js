/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  // Enable serverless deployment
  target: 'serverless',
  // Optimize build output
  compress: true,
  // Configure powered by header
  poweredByHeader: false,
}

module.exports = nextConfig