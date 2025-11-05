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
  // Optimize for production
  reactStrictMode: true,
  poweredByHeader: false,
  // Ensure ES modules work correctly
  experimental: {
    esmExternals: true
  },
  // Disable type checking during build (we'll rely on tsc for this)
  typescript: {
    ignoreBuildErrors: false
  }
}

module.exports = nextConfig