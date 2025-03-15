/*
 * 親コンポーネントで宣言したリアクティブ変数を子コンポーネント側で変更し、親コンポーネントに変更を検知させる
 */

"use client";

import { useState } from "react";
import Ko from "@/app/components/rendou/kokaraoya/Ko";

export default function Oya() {
  const [count, setCount] = useState(1);

  return (
    <div>
      <p>カウント: {count}</p>
      <Ko count={count} setCount={setCount} />
    </div>
  );
}
