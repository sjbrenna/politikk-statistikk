import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "data.stortinget.no",
        pathname: "/eksport/**",
      },
    ],
  },
};

export default nextConfig;
