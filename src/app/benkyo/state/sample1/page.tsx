/*
Reactの状態更新（setState や setCount）は即時に値を更新するのではなく、
非同期にスケジューリングされ、複数の更新が自動的に「バッチ処理」される。
そのため、関数内で「同じ値を使って」状態を2回以上更新しても、実際には1回分しか反映されない。

例:
  setCount(count + 1);
  setCount(count + 1);

この場合、両方の setCount に渡される count は「まだ更新されていない古い値」なので、
最終的な count は 1しか増えない。

これを避けたい場合は、以下のように「前の状態を元にした関数」を使うことで、
意図通りに複数回の更新が反映される:

  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  ↑など
*/
"use client";
import { useState } from "react";

// 1回の更新で2回実行されるため、countは1増加する
export default function TestPage() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
  };
  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={handleClick}>
        カウントアップ
      </button>
    </div>
  );
}
