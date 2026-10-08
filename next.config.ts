import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.GITHUB_ACTIONS ? "/recettes" : "",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
