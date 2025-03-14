"use client";
import { useEffect, useRef, useState } from "react";

export default function ExampleComponent() {
  const hogeRef = useRef<HTMLDivElement | null>(null);
  const [fugaText, setFugaText] = useState("初期テキスト");

  // useEffect ... DOMがレンダリングされた後に実行される
  useEffect(() => {
    const handleScroll = () => {
      if (hogeRef.current) {
        console.log("hogeRef:", hogeRef); // useRefの中に格納されている値を確認
        console.log("hogeRef.current:", hogeRef.current); // .currentで、refに代入されているHTML要素を確認
      }
    };
    window.addEventListener("scroll", handleScroll);

    // useEffectのreturnの中に、コンポーネントがDOMから削除される時の処理を記述する
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // useEffectの第二引数に空の配列を渡すと、このコンポーネントが最初にレンダリングされた時のみ実行される

  // `hogeRef.current` が変更されたときに実行する `useEffect`
  useEffect(() => {
    if (fugaText) {
      const fuga = document.querySelector(".fuga");
      console.log("🔄 fugaTextが更新されました！");
      console.log(`reactの中でquerySelectorによる用を取得を実施する: ${fuga}`);
    }
  }, [fugaText]);

  return (
    // コンポーネントに記述するHTMLは、同じ階層に複数の要素を記述することができないため、そのようにしたい場合は、<></>で囲む
    <>
      <div ref={hogeRef}>refで取得</div>
      {/* ref の値を更新するボタン */}
      <button type="button" onClick={() => setFugaText("更新されました！")}>
        更新
      </button>
      <div className="fuga">{fugaText}</div>
    </>
  );
}
