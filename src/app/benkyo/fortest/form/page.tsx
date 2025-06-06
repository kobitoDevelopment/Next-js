"use client";

import { useState } from "react";

export default function Form() {
  const [name, setName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]); // 複数エラー用に配列に変更！

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = [];

    if (name.trim() === "") {
      newErrors.push("名前を入力してください");
    }

    if (!agreed) {
      newErrors.push("利用規約に同意してください");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors([]);
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">名前</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <label>
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          利用規約に同意する
        </label>
      </div>

      <button type="submit">送信</button>

      {/* 複数エラーを表示 */}
      {errors.length > 0 && (
        <ul role="alert">
          {errors.map((err, idx) => (
            <li key={idx} style={{ color: "red" }}>
              {err}
            </li>
          ))}
        </ul>
      )}

      {submitted && <p>こんにちは、{name}さん！</p>}
    </form>
  );
}
