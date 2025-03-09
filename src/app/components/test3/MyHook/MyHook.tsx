"use client";
import { useState } from "react";
import { useSetBackgroundColor } from "@/app/hook/useSetBackgroundColor";

export default function MyImage() {
  const [isBlue, setBackground] = useState(false);
  const toggleBackgroundColor = () => {
    setBackground(!isBlue);
  };
  useSetBackgroundColor(isBlue);
  return (
    <div>
      <button type="button" onClick={toggleBackgroundColor}>
        背景色を切り替える
      </button>
    </div>
  );
}
