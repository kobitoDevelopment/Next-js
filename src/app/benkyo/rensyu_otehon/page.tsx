/*
・id/name/adminのkey-valueなオブジェクトを持つ配列をループ表示
・adminであれば文字色を赤に
・カウントアップとダウンを用意し、オブジェクトのカウント番目を表示する
*/
"use client";
import { useState } from "react";

/* データを準備 */
type DataType = {
  id: number;
  name: string;
  role: string;
};
const data: DataType[] = [
  {
    id: 1,
    name: "name1",
    role: "admin",
  },
  {
    id: 2,
    name: "name2",
    role: "general",
  },
];

export default function Rensyu() {
  /* リアクティブを準備 */
  const [count, setCount] = useState(0);
  const countUp = () => {
    return setCount(count + 1);
  };
  const countDown = () => {
    return setCount(count - 1);
  };

  return (
    <div>
      {/* 条件付きループ表示 */}
      <ul>
        {data.map(
          (item) =>
            count === item.id && (
              <li key={item.id} style={{ color: item.role === "admin" ? "red" : "black" }}>
                {item.name}
              </li>
            )
        )}
      </ul>
      {/* カウントアップ */}
      <p>{count}</p>
      <button type="button" onClick={countUp}>
        カウントアップ
      </button>
      <button type="button" onClick={countDown}>
        カウントダウン
      </button>
    </div>
  );
}
