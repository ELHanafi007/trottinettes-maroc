/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Commented out for admin panel support (dynamic routes + API)
  images: {
    unoptimized: true,
  },
  // basePath and assetPrefix removed for local dev - uncomment when deploying to subdirectory
  // basePath: '/jouet-maroc',
  // assetPrefix: '/jouet-maroc/',
}

module.exports = nextConfig
