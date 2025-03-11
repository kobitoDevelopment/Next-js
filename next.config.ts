import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // useEffectやuseMemoが2回実行される問題を解消するためにfalseに設定
};

export default nextConfig;
