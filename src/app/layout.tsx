"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { LoadingProvider } from "@/app/context/LoadingContext";
import "./globals.css";

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
    <html lang="ja">
      <body>
        <LoadingProvider>{children}</LoadingProvider>
      </body>
    </html>
  );
}
