import { getData } from "./actions";

export default async function GetPage() {
  const data = await getData();

  return (
    <main>
      <h1>データ取得デモ</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
