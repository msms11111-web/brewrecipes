import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Admin image uploads go through Server Actions; the default 1 MB cap is
      // too small. Media uploads are validated to 8 MB in lib/media-actions.
      bodySizeLimit: "12mb",
    },
  },
};

export default nextConfig;
