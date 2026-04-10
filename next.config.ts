import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/anantadata",
  images: { unoptimized: true },
};

export default nextConfig;
