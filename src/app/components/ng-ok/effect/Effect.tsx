"use client";
import { useState, useEffect } from "react";

export default function FilteredList() {
  const [query, setQuery] = useState("");

  /*  items をコンポーネント内部で直接定義しているため、
   *  このコンポーネントが再レンダリングされるたびに items 配列も毎回新しく作成される。
   *
   *  JavaScript では、配列やオブジェクトは「参照型」なので、たとえ同じ要素を持つ配列でも
   *  毎回新しく作成されると「異なる配列」とみなされる。
   *
   *  そのため、useEffect の依存配列に items を含めると、React は
   *  「items の参照が変わった → 依存配列の値が変更された → useEffect を再実行すべき」
   *  と判断し、毎回 useEffect が実行されることになる。
   *
   *  これにより、本来は不要なはずの処理がレンダリングのたびに発生する。
   * items を外部から渡す場合（例えば、親コンポーネントからpropsで受け取るなど）は、
   *  useEffect に依存配列として items を追加しても問題ない。
   *  Effext2.tsxで、親コンポーネントからpropsで受け取る場合のコードを確認可能。
   */
  const items = ["Apple", "Banana", "Cherry", "Date", "Grape"];

  const [filteredItems, setFilteredItems] = useState(items);

  /* 無限ループの原因
   *  1. `items` をコンポーネント内部で定義しているため、再レンダリングのたびに「新しい配列」として作成される。
   *     → `items` の参照が毎回変わる（配列の内容が同じでも、異なるオブジェクトとみなされる）。
   *
   *  2. `useEffect` の依存配列に `items` を含めているため、
   *     → React は「`items` が毎回変わった」と認識し、「useEffect を毎回実行」する。
   *
   *  3. `useEffect` 内で `setFilteredItems` を実行しているため、 `filteredItems` の状態が更新される。
   *     → `setFilteredItems` が実行されると「コンポーネントが再レンダリング」される。
   *
   *  4. 再レンダリングにより、再び `items` が新しい配列として作成される。
   *     → その結果、`useEffect` が再び実行される（無限ループ発生）。
   */
  useEffect(() => {
    console.log("query", query); // 無駄に実行されていることを確認するために console.log にクエリを表示
    setFilteredItems(items.filter((item) => item.toLowerCase().includes(query.toLowerCase())));
  }, [query, items]); // items が新しい配列として評価されるたびに useEffect が再実行される

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
