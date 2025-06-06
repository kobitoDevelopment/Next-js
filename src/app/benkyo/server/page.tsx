// "use client"を書いていないため、このファイルはデフォルトでサーバーコンポーネントとして動作する
// サーバーで getFruits() を直接呼び出して、HTML を事前にレンダリングする

import { getFruits } from "@/app/lib/sample";

export default async function Home() {
  // サーバー側で直接データを取得（fetch 不要）
  const items = await getFruits();

  return (
    <div>
      <h1>フルーツ一覧（Server Component）</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

/*
 * fetch 不要で即座にデータを取得でき、パフォーマンスが良くなるケースが多い。
 * クライアントでは動的な再取得が必要な場合（例: ボタンクリックで再読み込み）は不向き。
 * 状態（useState）や副作用（useEffect）などの React Hooks は使えない。
 * これらを使いたい場合は「クライアントコンポーネント」に切り分ける必要あり。
 */
