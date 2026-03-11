/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Commented out for Vercel (supports SSR + API)
  images: {
    unoptimized: true,
  },
  // basePath and assetPrefix removed for local dev - uncomment when deploying to subdirectory
  // basePath: '/tropandaa',
  // assetPrefix: '/tropandaa/',
}

module.exports = nextConfig
