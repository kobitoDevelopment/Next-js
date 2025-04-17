"use client";

import React, { useState, useTransition } from "react";

const heavyFilter = (items: string[], keyword: string) => {
  // 疑似的に処理が重いことを表現（実際には軽い）
  return items.filter((item) => item.toLowerCase().includes(keyword.toLowerCase()));
};

const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

export default function SearchComponent() {
  const [inputValue, setInputValue] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  // useTransitionを使って「処理が重い更新」を低優先度で行うためのセットアップ
  // isPendingは「トランジション中かどうか（true/false）」を示すフラグ
  // startTransitionは「低優先度で更新する処理」を囲むために使う関数
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value); // ユーザー入力には即反応（高優先度）

    // startTransitionを使って「検索結果のフィルタリング」は低優先度で処理する
    // これにより、ユーザー入力がスムーズに反映されやすくなる
    startTransition(() => {
      const results = heavyFilter(items, value);
      setFilteredItems(results);
    });
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} placeholder="検索" className="border p-2 mb-4" />

      {/* トランジション処理中はisPendingがtrueになるので、ローディング表示が可能 */}
      {isPending && <p className="text-gray-500">検索中...</p>}

      <ul className="max-h-96 overflow-y-auto">
        {filteredItems.map((item, index) => (
          <li key={index} className="border-b py-1">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
