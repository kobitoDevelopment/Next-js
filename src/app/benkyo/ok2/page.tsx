"use client";
import { useState } from "react";
import LayoutTest2 from "@/app/components/layouts/LayoutTest2";
import Effect2 from "@/app/components/ng-ok/effect2/Effect2"; // 子コンポーネントのインポート

export default function TestPage() {
  const [query, setQuery] = useState<string>("");

  // items 配列を定義（親コンポーネント内で）
  const items: string[] = ["Apple", "Banana", "Cherry", "Date", "Grape"];

  return (
    <LayoutTest2>
      <div>
        <input type="text" placeholder="検索" value={query} onChange={(e) => setQuery(e.target.value)} />
        {/* 子コンポーネントに props として items と query を渡す */}
        <Effect2 items={items} query={query} />
      </div>
    </LayoutTest2>
  );
}
