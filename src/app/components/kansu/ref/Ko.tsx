/*
 * 親コンポーネントで宣言したリアクティブ変数を子コンポーネント側で変更し、親コンポーネントに変更を検知させる
 */

"use client";
import { useImperativeHandle, forwardRef } from "react";

/* forwardRefを使用する場合、関数コンポーネントはpropsとrefの両方を引数として受け取るように定義されているため
 * propsを使わない場合でも引数として受け取る必要がある。そのため、propsを受け取る引数を定義しているが、
 * _propsとして定義し、使用しないことを明示している。
 */
function Ko(_props: object, ref: React.Ref<{ customFunction: () => void }>) {
  // useImperativeHandleを使って親コンポーネントに公開する関数を定義
  useImperativeHandle(ref, () => ({
    customFunction() {
      console.log("子コンポーネントの関数");
    },
  }));

  return (
    <div>
      <p>子コンポーネント(実行結果はconsoleに表示)</p>
    </div>
  );
}

export default forwardRef(Ko);
