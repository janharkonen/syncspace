import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picapi.janharkonen.fi",
      },
    ],
  },
};

export default nextConfig;
