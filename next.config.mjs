/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output configuration for production
  output: "export",
  distDir: "build",

  // Served from a project subpath on GitHub Pages. Set ONLY by the release
  // workflow's Pages build (e.g. NEXT_PUBLIC_BASE_PATH=/BankDesign); empty
  // (root path) for all normal builds and the Netlify deployment.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",

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
