/** @type {import('next').NextConfig} */
const nextConfig = {
  // you add domain for nextjs accept to use an external image
  images: {
    domains: ['avatars.githubusercontent.com', '192.168.1.7'],
  },
}

module.exports = nextConfig
