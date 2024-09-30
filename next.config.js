/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.tenor.com",
        port: "", // Optional, but can be left empty if none
        pathname: "/**", // Allows loading any images from the domain
      },
    ],
  },
  reactStrictMode: true,
};

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
});

module.exports = withPWA(nextConfig);
