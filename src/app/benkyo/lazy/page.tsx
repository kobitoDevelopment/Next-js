/*
Lazyを使用することでコンポーネントの読み込みタイミングを遅延させることができるが、
Lazyを使用する場合は必ずSuspenseでラップする必要がある。
*/

import { Suspense, lazy } from "react";

const MyLazy = lazy(function () {
  return import("@/app/components/lazy/MyLazy");
});

export default function MyLazyPage() {
  return (
    <div>
      <Suspense fallback={<p>Loading lazy component...</p>}>
        <MyLazy />
      </Suspense>
    </div>
  );
}
