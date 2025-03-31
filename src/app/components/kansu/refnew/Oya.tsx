/*
 * 子コンポーネントの関数を親コンポーネントで実行する
 * React19以降は、forwardRefを使わなくてもrefを子コンポーネントに渡すことができる
 */

"use client";

import { useRef, useEffect } from "react";
import Ko from "@/app/components/kansu/ref/Ko";

export default function Oya() {
  const KoRef = useRef<{ customFunction: () => void }>(null);

  const handleClick = () => {
    KoRef.current?.customFunction();
  };

  useEffect(() => {
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
