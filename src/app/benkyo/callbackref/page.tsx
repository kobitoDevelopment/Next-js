"use client";
import { useState, useCallback } from "react";

export default function CallbackRefExample() {
  const [width, setWidth] = useState(0);

  /**
   * 【コールバックrefとは】
   *
   * 通常、useRef() を使って DOM 要素への参照（ref）を作るが、
   * 「要素がマウントされたタイミングで何かしたい」場合には
   * コールバック関数形式の ref を使うこともできる。
   *
   * <div ref={関数}> のように書き、
   * 要素がDOMに追加されたとき（マウント時）に関数が実行され、引数にそのDOM要素が渡ってくる。
   *
   * この例では、divの幅を取得して、画面に表示する。
   */
  const measureRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      // DOM要素がマウントされたら、幅を取得
      const rect = node.getBoundingClientRect();
      setWidth(rect.width);
    }
  }, []);

  return (
    <div>
      <h1>コールバック ref の例</h1>

      {/* ここでコールバックrefを使ってdiv要素を参照 */}
      <div
        ref={measureRef}
        style={{
          backgroundColor: "#e0f7fa",
          padding: "1rem",
          width: "80%",
          margin: "1rem auto",
        }}
      >
        この要素の幅を測定します
      </div>

      <p>この要素の現在の幅: {width}px</p>
    </div>
  );
}
