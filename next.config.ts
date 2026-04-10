import type { NextConfig } from "next";
import { buildRewrites } from "./lib/routes";

const nextConfig: NextConfig = {
  async rewrites() {
    return buildRewrites();
  },
};

export default nextConfig;
