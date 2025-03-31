/*
 * 親コンポーネントで宣言したリアクティブ変数を子コンポーネント側で変更し、親コンポーネントに変更を検知させる
 */

"use client";
type KoProps = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

export default function Ko({ count, setCount }: KoProps) {
  return (
    <div>
      <button type="button" onClick={() => setCount(count + 1)}>
        カウントアップ
      </button>
    </div>
  );
}
