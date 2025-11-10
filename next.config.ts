import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";


// Point to your routing file
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig:NextConfig = {
 
  reactStrictMode:true,
  output:"standalone",//stand
 

};


export default withNextIntl(nextConfig);
