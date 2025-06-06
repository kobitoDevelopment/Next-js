"use client";
import { useState } from "react";

export default function TestPage() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(function (prev) {
      return prev + 1;
    });
    setCount(function (prev) {
      return prev + 1;
    });
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
