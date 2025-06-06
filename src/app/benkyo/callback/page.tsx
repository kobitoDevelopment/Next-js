"use client";
import { useState, useCallback } from "react";

// 子コンポーネント
const Child = ({ onClick }: { onClick: () => void }) => {
  console.log("Child component rendered"); // 再レンダリング確認用
  return <button onClick={onClick}>子コンポーネントで+1</button>;
};

export default function MyCallBack() {
  const [count, setCount] = useState(0);

  /**
   * 【useCallbackを使う理由】
   *
   * Reactのコンポーネントは、何かが変わると自動的に再レンダリング（再描画）される。
   * 再レンダリングが起きるたびに、関数（たとえば increment）は毎回「新しく作り直される」。
   *
   * その関数をpropsとして子コンポーネント（<Child />）に渡していると、
   * 親コンポーネントが更新されるたびに「関数が新しくなった」とReactが判断して、
   * 子コンポーネントも毎回再レンダリングされてしまう。
   *
   * これが不要な再レンダリングの原因になる。たとえば、表示内容が変わらないのに再描画されたり、
   * 処理が重い子コンポーネントが毎回無駄に動いてアプリが重くなる。
   *
   * useCallback を使うと、「この関数は前と同じ内容なら再利用する」とReactに伝えることができる。
   * 結果、関数の"見た目上の変化"がなくなるので、子コンポーネントも再レンダリングされず、無駄な処理を減らすことができる。
   *
   * ---------------------------------------------
   * ▼ 使わない場合（useCallbackなし）
   *
   * const increment = () => {
   *   setCount(count + 1);
   * };
   *
   * → 毎回新しいincrement関数が生成される
   * → 子コンポーネントは「違う関数が渡された！」と感じて再レンダリングされる
   *
   * ▼ 使った場合（useCallbackあり）
   *
   * const increment = useCallback(() => {
   *   setCount((prev) => prev + 1);
   * }, []);
   *
   * → 初回に作られたincrement関数がずっと使われる（同じ関数だと認識される）
   * → 子コンポーネントの再レンダリングが発生しない（パフォーマンス向上）
   *
   * ---------------------------------------------
   * ※ 注意点：
   *   - 常に使う必要はない。軽いコンポーネントではむしろ使わなくてOK。
   *   - 主に「子コンポーネントが重い」 or 「再レンダリングを最小限にしたい」時に使う。
   */
  const increment = useCallback(() => {
    setCount((prevCount) => prevCount + 1); //常に最新の値を使用するために、prevCountを使う
  }, []); // 依存を空配列にすることで、初回のレンダリング時に生成された関数を使い回す。依存に count を入れると、count が変わるたびに新しい関数が生成される

  return (
    <div>
      <h1>カウント: {count}</h1>
      <button onClick={() => setCount(count + 1)}>親コンポーネントで+1</button>

      {/* 子にコールバック関数を渡す */}
      <Child onClick={increment} />

      {/*
        useCallbackを使わずにそのまま渡した場合：
        <Child onClick={() => setCount((prevCount) => prevCount + 1} />
        
        このようにすると、毎回新しい関数が渡されるため、
        子コンポーネントが毎回再レンダリングされてしまう。
      */}
    </div>
  );
}
