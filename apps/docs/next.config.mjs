import { withContentlayer } from 'next-contentlayer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default withContentlayer(nextConfig);
