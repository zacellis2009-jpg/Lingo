import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The old AI chat page now lives under Practice.
  async redirects() {
    return [{ source: "/chat", destination: "/practice", permanent: false }];
  },
};

export default nextConfig;
