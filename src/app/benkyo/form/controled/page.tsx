"use client";
import { useState } from "react";

export default function TestPage() {
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectValue, setSelectValue] = useState("apple");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`入力値: ${text}, チェック: ${checked}, 選択: ${selectValue}`);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      {/* テキスト入力（コントロールされている） */}
      <label className="block">
        名前
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="border p-1 block w-full" />
      </label>

      {/* チェックボックス（コントロールされている） */}
      <label className="block">
        <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        同意する
      </label>

      {/* セレクトボックス */}
      <label className="block">
        フルーツを選んでください
        <select value={selectValue} onChange={(e) => setSelectValue(e.target.value)} className="border p-1 block w-full">
          <option value="apple">りんご</option>
          <option value="banana">バナナ</option>
          <option value="orange">オレンジ</option>
        </select>
      </label>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        送信
      </button>
    </form>
  );
}
