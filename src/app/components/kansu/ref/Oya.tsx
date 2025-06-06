/*
 * 子コンポーネントの関数を親コンポーネントから実行する
 * forwardRefはReact18.0.0以降で非推奨となるため、過去バージョンの作法として知見を残す
 */

"use client";

import { useRef, useEffect } from "react";
import Ko from "@/app/components/kansu/ref/Ko";

export default function Oya() {
  const KoRef = useRef<{ customFunction: () => void }>(null);

  const handleClick = () => {
    // 子コンポーネントの関数を呼び出す
    KoRef.current?.customFunction();
  };

  useEffect(() => {
    // 初回レンダリング時に子コンポーネントの関数を呼び出してみる場合
    if (KoRef.current) {
      KoRef.current.customFunction();
    }
  }, []);

  return (
    <div>
      <button type="button" onClick={handleClick}>
        子コンポーネントの関数を実行する(ここは親コンポーネント)
      </button>
      <Ko ref={KoRef} />
    </div>
  );
}
