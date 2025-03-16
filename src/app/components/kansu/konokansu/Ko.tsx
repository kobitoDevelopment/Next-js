/*
 * 親コンポーネントで宣言したリアクティブ変数を子コンポーネント側で変更し、親コンポーネントに変更を検知させる
 */

"use client";
import { useState, useEffect } from "react";
type KoProps = {
  setIncrementFn: (fn: () => void) => void;
};

export default function Ko({ setIncrementFn }: KoProps) {
  const [count, setCount] = useState(0);

  // カウントアップ関数
  const increment = () => {
    setCount((prev) => prev + 1);
  };

  /* 親に increment関数を渡す
   * useEffectは初回レンダリング時と依存配列の変化時に実行されるため、increment関数をそのまま渡すことは問題ないが、
   * 依存配列(useEffectの第2引数に渡される配列のこと。この配列に含まれる変数が変更された場合にuseEffectが再実行される)に
   * setIncrementFnを含めることで、increment関数が変更された場合にも再実行されるようにする。
   *  setIncrementFnを依存配列に含めることにより、親コンポーネントがsetIncrementFnを更新する場合に
   * このuseEffectが再実行されるようにする。
   *
   *  NGな例(カウントアップしない)
   *  useEffect(() => {
   *   setIncrementFn(increment);
   *  }, [setIncrementFn]);
   *  ↑この場合、useEffectは初回レンダリング時に一度だけ実行されるため、setIncrementFnは
   *  increment関数を直接受け取るが、increment関数が変更されるたびにuseEffectが再実行される訳ではないため、
   * カウントアップは実行されない。
   *
   * OKな例(カウントアップする)
   * useEffect(() => {
   *  setIncrementFn(() => increment);
   * }, [setIncrementFn]);
   * ↑この場合、setIncrementFnにはincrement関数を返す新しい関数が渡される。この関数は、increment関数自体が
   * 変更されるたびに再生成されるため、useEffectは依存配列に含まれるsetIncrementFnの変化を検知して再実行され、
   * カウントアップが実行される。
   */
  useEffect(() => {
    setIncrementFn(() => increment);
  }, [setIncrementFn]);

  return (
    <div>
      <p>子のカウント: {count}</p>
    </div>
  );
}
