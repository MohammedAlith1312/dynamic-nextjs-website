import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";


// Point to your routing file
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig:NextConfig = {
  // output: 'export', // 👈 enables static export
  // images: {
  //   unoptimized: true, // Azure doesn’t support the default Image Optimization
  // },
  // trailingSlash: true, // optional but helpful for static routing,
  // assetPrefix: '/Site/', // For Site IIS Application
  // basePath: '/Site',// For Site IIS Application
  // // Normal assetPrefix: '', basePath not required
  // env: {
  //   NEXT_PUBLIC_BASE_PATH: "/Site",
  // },
  reactStrictMode:true,
  output:"standalone",

};


export default withNextIntl(nextConfig);
