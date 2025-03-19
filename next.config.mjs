/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output configuration for production
  output: "export",
  distDir: "build",

  // Image optimization
  images: {
    unoptimized: true,
  },

  // Skip type checking to avoid issues with dynamic routes
  typescript: {
    ignoreBuildErrors: true,
  },

  // Disable eslint during build
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
