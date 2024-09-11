/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blue-official-newt-770.mypinata.cloud',
        port: '',
        pathname: '**',
      },
    ],
  },
  output: 'export', // This enables static export
};

module.exports = nextConfig;
