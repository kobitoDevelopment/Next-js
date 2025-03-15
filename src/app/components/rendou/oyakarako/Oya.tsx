/*
 * 親コンポーネントで宣言したリアクティブを子コンポーネントに渡し、変更を検知させる
 */

"use client";

import { useState } from "react";
import Ko from "@/app/components/rendou/oyakarako/Ko";

export default function Oya() {
  const [count, setCount] = useState(1);

  return (
    <div>
      <button type="button" onClick={() => setCount(count + 1)}>
        カウントアップ
      </button>
      <Ko count={count} />
    </div>
  );
}
