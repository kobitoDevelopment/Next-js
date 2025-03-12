"use client";
import { useState, useMemo } from "react";

export default function Memo() {
  const [query, setQuery] = useState("");

  /* `items` を useMemo を使って定義することで、
   *  コンポーネントが再レンダリングされても `items` の参照が変わらないようにする。
   *  これにより、React は `items` が変化していないと判断し、
   *  不要な再計算や再レンダリングを防ぐことができる。
   */
  const items = useMemo(() => ["Apple", "Banana", "Cherry", "Date", "Grape"], []);
  /*
   * useEffectを使うと、コンポーネントのレンダリングが完了した後にステートを更新するため、
   * レンダリングのたびに一度ステートが変更され、その結果として再レンダリングが発生する。
   *
   * useMemoはレンダリング中に即座に計算を行い、その結果をメモ化（キャッシュ）する。
   * これにより、依存する値（この場合は `query` や `items`）が変わらない限り再計算を防ぐことができ、不要な再計算や再レンダリングを抑制できる。
   *
   * つまり、useMemoは「レンダリング時にその場で計算して結果を返す」ため、毎回再レンダリングが発生しても
   * 同じ計算結果が使われることになる。これにより、無駄なステート更新や副作用が避けられる。
   */
  const filteredItems = useMemo(() => {
    console.log("query", query); // useEffectと違い、無駄に実行されていないことを確認するために console.log にクエリを表示
    return items.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  }, [query, items]);

  return (
    <div>
      <input type="text" placeholder="検索" value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
