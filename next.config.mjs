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

  // Linting is intentionally NOT skipped during builds: `npm run build` is a
  // gate (see README/CONTRIBUTING), so lint errors must fail the build. Never
  // set `ignoreDuringBuilds` back to `true` to make a build pass.
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
