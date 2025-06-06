/*
 * 親コンポーネントで宣言したリアクティブを子コンポーネントに渡し、変更を検知させる
 */

"use client";

type KoProps = {
  count: number;
};

export default function Ko({ count }: KoProps) {
  return (
    <ul>
      {[...Array(count)].map((_, index) => (
        <li key={index}>Item {index + 1}</li>
      ))}
    </ul>
  );
}
