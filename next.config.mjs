/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output configuration for production
  output: "export",
  distDir: "build",

  // Image optimization
  images: {
    unoptimized: true,
  },

  // Disable eslint during build
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
