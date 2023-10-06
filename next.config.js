/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // eslint-disable-next-line no-undef
    NEW_API: process.env.NEW_API,
  },
};

module.exports = nextConfig;
