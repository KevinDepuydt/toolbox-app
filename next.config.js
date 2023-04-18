/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    reactRemoveProperties: { properties: ['^data-cy$'] },
  },
}

module.exports = nextConfig
