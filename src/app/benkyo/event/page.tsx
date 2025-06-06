"use client";
import { useRef } from "react";

export default function TestPage() {
  const inputRef = useRef<HTMLInputElement>(null);

  // イベントを受け取って中身を表示する関数
  const handleEvent = (e: React.SyntheticEvent) => {
    console.log("React SyntheticEvent オブジェクト:", e);
    console.log("ネイティブのブラウザイベント:", e.nativeEvent);
    console.log("タイプ:", e.type);
    console.log("ターゲット(イベントが実際に発生した要素):", e.target);
    console.log("currentTarget(イベントリスナーが紐づいてる要素（onClick={...} を書いた場所）):", e.currentTarget);
    console.log("-----------------------------");
  };

  return (
    <div
      style={{
        height: "10vh",
        padding: "20px",
        border: "1px solid #ccc",
        overflowY: "scroll" /* divにscrollイベントを付与するとき、div自体がスクロールする(overflow-y)状況でないと、windowをスクロールしているだけになる */,
      }}
      onScroll={handleEvent}
    >
      <h1>イベント確認デモ</h1>

      <button type="button" onClick={handleEvent}>
        クリックイベント
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault(); // 実際に送信しないようにする
          handleEvent(e);
        }}
      >
        <label>
          テキスト入力:
          <input ref={inputRef} type="text" onChange={handleEvent} onFocus={handleEvent} onBlur={handleEvent} style={{ marginLeft: "10px" }} />
        </label>
        <button type="submit" style={{ marginLeft: "10px" }}>
          送信
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <label>
          チェックボックス:
          <input type="checkbox" onChange={handleEvent} />
        </label>
      </div>

      <div style={{ marginTop: "20px" }}>
        <label>
          セレクト:
          <select onChange={handleEvent}>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
          </select>
        </label>
      </div>
    </div>
  );
}
