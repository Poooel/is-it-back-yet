/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/check',
        destination: '/api/test-check'
      }
    ]
  }
}

module.exports = nextConfig
