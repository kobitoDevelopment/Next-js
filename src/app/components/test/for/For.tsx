import React from "react";

// アイテムの型を定義
type Item = {
  id: number;
  name: string;
};

export default function For() {
  // オブジェクトの配列を作成(items 配列に型を適用)
  const items: Item[] = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ];

  return (
    <div>
      {/* items 配列を map() を使って表示 */}
      <ul>
        {items.map((item) => (
          // key は React が要素に差分があるか判定するために必要
          <li key={item.id}>
            {item.id}: {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
