"use client";
import { useEffect, useState } from "react";

// API から取得するデータの型を定義
type Item = {
  id: number;
  name: string;
};

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null); // エラーメッセージ用の state
  const [loading, setLoading] = useState<boolean>(true); // ローディング状態の管理

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API に GET リクエストを送信
        const res = await fetch("/api/sample");

        // レスポンスのステータスコードが 200 番台以外ならエラーとして処理
        if (!res.ok) {
          throw new Error(`APIエラー: ${res.status} ${res.statusText}`);
        }

        // レスポンスを JSON として読み取る
        const data: Item[] = await res.json();

        // データをステートにセット
        setItems(data);
        setError(null); // エラーがあればクリア
      } catch (err) {
        // ネットワークエラーや予期しないエラーが発生した場合
        console.error("データ取得中にエラーが発生しました:", err);
        setError("データの取得に失敗しました。時間をおいて再試行してください。");
      } finally {
        // 通信が完了したらローディングを終了
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>フルーツ一覧</h1>

      {/* ローディング中の表示 */}
      {loading && <p>読み込み中...</p>}

      {/* エラー時の表示 */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* データの表示 */}
      {!loading && !error && (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
