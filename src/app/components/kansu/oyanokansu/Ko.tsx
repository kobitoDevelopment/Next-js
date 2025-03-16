/*
 * 親コンポーネントで宣言したリアクティブを子コンポーネントに渡し、変更を検知させる
 */

"use client";

type KoProps = {
  increment: () => void;
};

export default function Ko({ increment }: KoProps) {
  return (
    <div>
      <button onClick={increment}>カウントアップ</button>
    </div>
  );
}
