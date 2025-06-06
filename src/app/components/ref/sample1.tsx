/*
 * refの使用例その1
 * HTML要素に対して何かしらの処理を行いたい場合
 */

"use client";

import { useRef } from "react";

export default function Sample1() {
  const elementRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (elementRef.current) {
      console.log(elementRef);
      console.log(elementRef.current);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        refが持っているデータを見てみるボタン
      </button>
      <div ref={elementRef}>ターゲットはこの要素</div>
    </div>
  );
}
