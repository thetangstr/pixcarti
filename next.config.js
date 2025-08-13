/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed static export to support API routes and authentication
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Firebase hosting configuration
  trailingSlash: true,
}

module.exports = nextConfig