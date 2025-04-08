import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // useEffectやuseMemoが2回実行されるときはstrictModeが起因しているが、flaseにすると警告や勧告が表示されなくなるためtrue
};

export default nextConfig;
