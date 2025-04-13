"use client";

import { useEffect, useState } from "react";

export default function MyProfiler() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function simulateDelay() {
      await new Promise(function (resolve) {
        setTimeout(resolve, 2000);
      });
      setReady(true);
    }

    simulateDelay();
  }, []);

  if (!ready) {
    return <div>読み込み中…</div>;
  }

  return <div>子コンポーネントの描画完了！</div>;
}
