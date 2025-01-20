import type { NextConfig } from "next";
import withPWA from 'next-pwa';

const config: NextConfig = {
  // 开启构建时的静态页面优化
  output: 'standalone',
  
  // 开启图片优化
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // 优化构建输出
  compress: true,

  // 允许局域网访问
  async rewrites() {
    return [];
  },
};

// 配置 PWA
const nextConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
})(config);

export default nextConfig;
