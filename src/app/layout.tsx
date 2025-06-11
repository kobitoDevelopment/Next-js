"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { LoadingProvider } from "@/app/context/LoadingContext";
import "./globals.css";
import { DotGothic16 } from "next/font/google"; // GoogleFontsを使用する場合のimport例

// Google FontsのDotGothic16フォントを読み込む
// ここでは、フォントのweightやsubsetsを指定して、カスタマイズ可能
// 変数名を指定することで、CSSでフォントを簡単に使用できるようにする
// 例: font-family: var(--font-dotgothic);
const dotGothic = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dotgothic", // フォント変数名を定義
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // ページ遷移を検知

  useEffect(() => {
    // ページ遷移時に何かしたい場合
    console.log(pathname);
  }, [pathname]); // ページ遷移時に発火
  return (
    <html lang="ja" className={dotGothic.variable}>
      <body>
        <LoadingProvider>{children}</LoadingProvider>
      </body>
    </html>
  );
}
