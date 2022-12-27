/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
}
if (process.env.NODE_ENV !== 'production') {
  nextConfig.rewrites = async function() {
    return [
      {
        source: '/company-search',
        destination: 'http://localhost:8080/company-search'
      },
      {
        source: '/hash',
        destination: 'http://localhost:8080/hash'
      },
      {
        source: '/browser/:path*',
        destination: 'http://localhost:8080/browser/:path*'
      }
    ]
  }
}

module.exports = nextConfig
