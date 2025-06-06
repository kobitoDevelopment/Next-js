// Next.js の App Router で API を定義する方法として、"Route Handler" を使用できる。
// このファイルは /api/sample というエンドポイントを作成するためのもの。
/*
" user server"との違い
Route Handler
└ APIエンドポイントを用意してfetchなどを用いて呼び出す
└ APIを外部にも提供したい場合に使用
└ 例: フロントエンドからAPIを呼び出してデータを取得する

" user server"
└ サーバー側でデータを取得して、Reactコンポーネントに渡す
└ APIエンドポイントを用意せず、内部で完結する場合に使用
└ 例: データベースからデータを取得して、ページコンポーネントに渡す
*/

import { NextResponse } from "next/server";

// Route Handler は HTTP メソッド（GET, POST など）ごとに関数をエクスポートして処理を定義する。
// ここでは GET メソッドのハンドラーを定義。
export async function GET() {
  // フロントエンドから取得して表示したいデータ（今回はサンプルの配列）を定義
  const data = [
    { id: 1, name: "りんご" },
    { id: 2, name: "バナナ" },
    { id: 3, name: "ぶどう" },
  ];

  // JSON 形式でレスポンスを返すために NextResponse.json() を使用してデータを返す。
  return NextResponse.json(data);
}

/*
 * 注意点：
 * このファイルは app ディレクトリ配下（例: app/api/sample/route.ts）に配置する
 * エクスポートされる関数名は HTTP メソッド（GET, POST など）と一致させる必要がある
 * API エンドポイントは、ファイルのパスに基づいて自動的に設定される
 * 例: app/api/sample/route.ts → /api/sample
 * 通常の React コンポーネントと違い、サーバー側で実行される
 */
