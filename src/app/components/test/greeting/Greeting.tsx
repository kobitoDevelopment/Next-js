/* appRouterではデフォルトでサーバーコンポーネントとして扱われるため、useStateやonClickなどは動作しない。
 *   それを回避するために、"use client"を記述することでクライアントコンポーネントとして扱うことができる。
 */
"use client";

import { useState } from "react";
import styles from "./Greeting.module.css";

// propsの型を定義
type GreetingProps = {
  message: string;
  initialCount: number;
};

export default function Greeting({ message, initialCount }: GreetingProps) {
  /* const [現在の状態の値, 状態を変更するための関数] = useState(初期値); */
  const [count, setCount] = useState(initialCount);
  // 偶数なら "even"、奇数なら "odd" をクラスとして追加する場合のアプローチ例
  const countClass = count % 2 === 0 ? styles["-even"] : styles["-odd"];

  return (
    <div>
      {/* classはclassNameで記述し、同階層に配置したGreeting.module.cssを、import名.class名で付与する */}
      <p className={styles.message}>{message}</p>
      <p className={`${styles.count} ${countClass}`}>{count}</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        countを増やす
      </button>
      <button type="button" onClick={() => setCount(count - 1)}>
        countを減らす
      </button>
      {count % 2 === 0 ? <p>偶数です</p> : <p>奇数です</p>}
    </div>
  );
}
