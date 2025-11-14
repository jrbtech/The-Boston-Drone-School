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
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Optimize for production
  reactStrictMode: true,
  poweredByHeader: false,
  // Ensure ES modules work correctly
  experimental: {
    esmExternals: true,
  },
  // Disable type checking during build (we'll rely on tsc for this)
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
