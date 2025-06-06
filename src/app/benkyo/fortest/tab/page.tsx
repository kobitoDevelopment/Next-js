"use client";
import { useState } from "react";

const tabs = [
  { label: "概要", content: "これは概要タブの内容です。" },
  { label: "詳細", content: "これは詳細タブの内容です。" },
  { label: "レビュー", content: "これはレビュータブの内容です。" },
];

export default function Tab() {
  // 現在選択されているタブのインデックス（0: 概要, 1: 詳細, 2: レビュー）
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      {/* タブのボタン表示 */}
      <div role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab" // アクセシビリティ向けの属性
            aria-selected={activeIndex === index} // 選択中かどうか
            onClick={() => setActiveIndex(index)} // タブをクリックすると状態更新
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 選択されたタブの内容 */}
      <div role="tabpanel">
        <p>{tabs[activeIndex].content}</p>
      </div>
    </div>
  );
}
