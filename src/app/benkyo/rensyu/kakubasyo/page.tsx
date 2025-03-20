/*
・id/name/adminのkey-valueなオブジェクトを持つ配列をループ表示
・adminであれば文字色を赤に
・カウントアップとダウンを用意し、オブジェクトのカウント番目を表示する
*/

"use client";
import { useState } from "react";

type DataType = {
  id: number;
  name: string;
  role: "admin" | "general";
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

export default function Kakubasyo() {
  const [count, setCount] = useState(0);
  const countUp = () => {
    setCount(count + 1);
  };
  const countDown = () => {
    setCount(count - 1);
  };
  return (
    <div>
      <ul>
        {data.map((item) => {
          return (
            item.id === count && (
              <li key={item.id} style={{ color: item.role === "admin" ? "red" : "black" }}>
                {item.name}
              </li>
            )
          );
        })}
      </ul>
      <p>現在のカウント{count}</p>
      <button type="button" onClick={countUp}>
        カウントアップ
      </button>
      <button type="button" onClick={countDown}>
        カウントダウン
      </button>
    </div>
  );
}
