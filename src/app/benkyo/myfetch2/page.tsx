/*
  ユーザーの操作を起点にfetchしたい場合はuseEffectを使う
*/

"use client";
import { useState } from "react";
import { DataType } from "@/app/types/data";

export default function MyFetch2() {
  const [data, setData] = useState<DataType[] | null>(null);

  // クライアント(ブラウザ)がfetchを行うため、CORSの制約を受ける
  const fetchData = async () => {
    try {
      const response = await fetch("https://kobito.zombie.jp/api/get_data.json", { cache: "no-store" });
      const jsonData = await response.json();
      setData(jsonData.data); // APIの戻り値のdata配列をセット
    } catch (error) {
      console.error("データ取得エラー:", error);
    }
  };

  return (
    <div>
      <button type="button" onClick={fetchData}>
        データを取得
      </button>
      <ul>{data ? data.map((item) => <li key={item.id}>{item.name}</li>) : <p>データなし</p>}</ul>
    </div>
  );
}
