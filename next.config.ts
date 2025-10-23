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
    minimumCacheTTL: 2678400, // 31 days
  },
};

export default nextConfig;
