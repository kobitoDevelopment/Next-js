"use client";

import { useState, useMemo } from "react";

export default function Memo() {
  const [count, setCount] = useState(0);
  // `useMemo` を使って、count の値が変わったときだけ再計算し、そのタイミングでDOM更新を行う
  const double = useMemo(() => count * 2, [count]);

  const incrementForComputed = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>現在のカウント: {count}</p>
      <button type="button" onClick={incrementForComputed}>
        カウントアップ
      </button>
      <p>カウントの2倍: {double}</p>
    </div>
  );
}
