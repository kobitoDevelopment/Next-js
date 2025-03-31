/*
 * 子コンポーネントの関数を親コンポーネントで実行する
 * React19以降は、forwardRefを使わなくてもrefを子コンポーネントに渡すことができる
 */

"use client";
import { useImperativeHandle } from "react";

export default function Ko({ ref }: { ref: React.Ref<{ customFunction: () => void }> }) {
  useImperativeHandle(ref, () => ({
    customFunction() {
      console.log("子コンポーネントの関数");
    },
  }));

  return (
    <div>
      <p>子コンポーネント(実行結果はconsoleに表示)</p>
    </div>
  );
}
