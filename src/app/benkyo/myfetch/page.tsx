/*
  ユーザーの操作を起点にfetchしたい場合ではないため、useEffectを使わない。
  AppRouterの場合は以下箇所でfetchし、PageRouterの場合はgetServerSidePropsを使う。
*/

import { DataType } from "@/app/types/data";
export default async function MyFetch() {
  // サーバーコンポーネントでAPIをfetchするとき、CORSの制約を受けない
  const response = await fetch("https://kobito.zombie.jp/api/get_data.json", { cache: "no-store" });
  const dummyData = await response.json();
  /*
  APIの戻り値
  {
    "data": [
      {
        "id": 1,
        "name": "ningen"
      },
      {
        "id": 2,
        "name": "inu"
      },
      {
        "id": 3,
        "name": "neko"
      }
    ]
  }
  */
  return (
    <ul>
      {dummyData.data.map((item: DataType) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
