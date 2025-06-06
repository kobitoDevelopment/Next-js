"use client";
import { useLoading } from "@/app/context/LoadingContext";

export default function MyLoading() {
  const { isLoading, startLoading, stopLoading } = useLoading();
  return (
    <div>
      <p>{isLoading ? "ローディング中..." : "完了！"}</p>
      <button onClick={startLoading}>開始</button>
      <button onClick={stopLoading}>停止</button>
    </div>
  );
}
