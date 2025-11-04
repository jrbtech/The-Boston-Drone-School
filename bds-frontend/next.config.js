/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img1.wsimg.com',
      },
      {
        protocol: 'https',
        hostname: 'thebostondroneschool.org',
      },
    ],
  },
  env: {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || '',
  },
  // Optimize for production
  reactStrictMode: true,
  poweredByHeader: false,
}

module.exports = nextConfig