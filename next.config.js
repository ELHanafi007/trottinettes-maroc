/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/trottinettes-maroc',
  assetPrefix: '/trottinettes-maroc/',
}

module.exports = nextConfig
