/*
 * refの使用例その2
 * 状態を介さずに値を保持する（再レンダリングを引き起こさないデータ保存）
 */

"use client";

import { useRef, useState } from "react";

export default function Sample2() {
  const countRef = useRef(0); // 状態を介さないカウンター
  const [renderCount, setRenderCount] = useState(0); // 状態を介するカウンター

  const handleClick = () => {
    countRef.current += 1; // refの値を更新
    console.log(`現在のrefの値は${countRef.current}`);
  };

  return (
    <div>
      <p>レンダリング回数: {renderCount}</p>
      <p>refの値: {countRef.current}</p>
      <button type="button" onClick={handleClick}>
        状態を介さずにカウントアップ(refを更新してもレンダリングが発生しない)
      </button>
      <button type="button" onClick={() => setRenderCount((prev) => prev + 1)}>
        状態を介してカウントアップ(stateを更新しているのでレンダリングが発生する)
      </button>
    </div>
  );
}
