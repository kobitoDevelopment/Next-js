/*
Suspenseは、Reactのコンポーネントが非同期にデータを取得する際に、ローディング状態を管理するための仕組み。
Suspenseを使用することで、非同期データの取得中にローディングインジケーターを表示したり、
データが取得されるまでコンポーネントのレンダリングを遅延させたりすることができる。
*/

import { Suspense } from "react";
import MySuspense from "@/app/components/suspense/MySuspense";

export default function MySuspensePage() {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <MySuspense />
      </Suspense>
    </div>
  );
}
