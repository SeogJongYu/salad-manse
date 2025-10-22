import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typedRoutes: true,
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xpctnjdfnedyvgmzuznb.supabase.co',
      },
    ],
  },
};

export default nextConfig;
