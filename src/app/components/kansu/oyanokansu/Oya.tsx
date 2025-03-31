/*
 * 親コンポーネントで宣言した関数を子コンポーネントで実行する
 */

"use client";

import { useState } from "react";
import Ko from "@/app/components/kansu/oyanokansu/Ko";

export default function Oya() {
  const [count, setCount] = useState(1);

  // カウントを増やす関数（親で定義）
  const increment = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <p>カウント: {count}</p>
      <Ko increment={increment} />
    </div>
  );
}
