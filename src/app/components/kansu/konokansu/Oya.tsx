/*
 * 親コンポーネントで宣言したリアクティブ変数を子コンポーネント側で変更し、親コンポーネントに変更を検知させる
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
