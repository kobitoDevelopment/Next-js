/*
 * 子コンポーネントで宣言した関数を親コンポーネントで実行する
 */

"use client";

import { useState } from "react";
import Ko from "@/app/components/kansu/konokansu/Ko";

export default function Oya() {
  const [incrementFn, setIncrementFn] = useState<(() => void) | null>(null);

  return (
    <div>
      <button type="button" onClick={() => incrementFn && incrementFn()}>
        子をカウントアップ
      </button>
      <Ko setIncrementFn={setIncrementFn} />
    </div>
  );
}
