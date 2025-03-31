/*
Nuxtでいうところの双方向バインディングっぽいことをuseStateで実現するサンプル
*/

"use client";
import { useState } from "react";

export default function TwoWayBinding() {
  // 各フォームの状態を管理
  const [text, setText] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [selectedRadio, setSelectedRadio] = useState("");

  // チェックボックスの変更処理
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCheckedItems((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  return (
    <div>
      {/* テキスト入力 */}
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="文字を入力" />
      <p>入力された値: {text}</p>

      {/* セレクトボックス */}
      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        <option value="">選択してください</option>
        <option value="option1">オプション1</option>
        <option value="option2">オプション2</option>
      </select>
      <p>選択された select の値: {selectedOption}</p>

      {/* チェックボックス */}
      <div>
        <label>
          <input type="checkbox" value="apple" checked={checkedItems.includes("apple")} onChange={handleCheckboxChange} />
          りんご
        </label>
        <label>
          <input type="checkbox" value="banana" checked={checkedItems.includes("banana")} onChange={handleCheckboxChange} />
          バナナ
        </label>
      </div>
      <p>選択されたチェックボックスの値: {checkedItems.join(", ")}</p>

      {/* ラジオボタン */}
      <div>
        <label>
          <input type="radio" value="morning" checked={selectedRadio === "morning"} onChange={(e) => setSelectedRadio(e.target.value)} />朝
        </label>
        <label>
          <input type="radio" value="night" checked={selectedRadio === "night"} onChange={(e) => setSelectedRadio(e.target.value)} />夜
        </label>
      </div>
      <p>選択されたラジオの値: {selectedRadio}</p>
    </div>
  );
}
