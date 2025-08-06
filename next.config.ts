import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
   domains: [
      'i.imgur.com',
      'placehold.co',
      'source.boomplaymusic.com',
      'deadline.com',
      'encrypted-tbn0.gstatic.com',
      't3.ftcdn.net',
      'api.escuelajs.co'
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;