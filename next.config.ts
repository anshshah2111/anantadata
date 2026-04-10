import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/anantadata",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
