/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Commented out for admin panel support (dynamic routes + API)
  images: {
    unoptimized: true,
  },
  // basePath and assetPrefix removed for local dev - uncomment when deploying to subdirectory
  // basePath: '/trottinettes-maroc',
  // assetPrefix: '/trottinettes-maroc/',
}

module.exports = nextConfig
