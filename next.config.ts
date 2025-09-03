import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ewfnwciqfecktpqxxwci.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/gallery/**',
      },
    ],
  },
};

export default nextConfig;
