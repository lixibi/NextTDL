import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 开启构建时的静态页面优化
  output: 'standalone',
  
  // 开启图片优化
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // 优化构建输出
  compress: true,
  
  // 实验性功能
  experimental: {
    // 优化资源加载
    optimizeCss: true,
    // 优化字节大小
    optimizePackageImports: ['@heroicons/react', 'framer-motion'],
  },
};

export default nextConfig;
