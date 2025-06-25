// このファイルはNext.jsの「サーバーアクション」として扱うことを示すディレクティブ
"use server";

// Node.jsのfs/promisesモジュールからreadFileとwriteFile関数をimport
// - readFile: ファイルの内容を非同期で読み込む
// - writeFile: ファイルの内容を書き換える
import { readFile, writeFile } from "fs/promises";

// Node.jsのpathモジュールをimport（パスの組み立てや操作に使用）
import path from "path";

// DataItem型（データの構造）をimport（型安全のため）
import { DataItem } from "@/app/types/actions/data";

// データファイル（JSON）の絶対パスを生成
// process.cwd()でプロジェクトルートを取得し、"src/app/benkyo/actions/data.json"を結合
const DATA_PATH = path.join(process.cwd(), "src", "app", "benkyo", "actions", "data.json");

// データを追加するための非同期関数を定義
// - prevState: 前回の状態（useActionState用）
// - formData: フォーム送信内容（新規追加データ）
// 戻り値は {ok: boolean, message: string, data?: DataItem[]} 型のPromise
export async function addData(prevState: { ok?: boolean; message?: string; data?: DataItem[] }, formData: FormData): Promise<{ ok: boolean; message: string; data?: DataItem[] }> {
  // フォームからitem(name)を取得
  const name = formData.get("item") as string;
  // nameが空ならエラーメッセージを返す
  if (!name) return { ok: false, message: "itemが空です" };

  // 現在のデータを格納する配列を用意
  let data: DataItem[] = [];
  try {
    // 既存のJSONファイルを読み込む
    const json = await readFile(DATA_PATH, "utf-8");
    // JSON文字列をDataItem[]型にパース
    data = JSON.parse(json) as DataItem[];
  } catch {
    // ファイルが無い/読み込み失敗の場合は空配列から始める
    data = [];
  }
  // 新しいデータを作成（idは現在時刻のミリ秒、nameはフォーム値）
  const newItem: DataItem = { id: Date.now(), name };
  // データ配列に新しい要素を追加
  data.push(newItem);
  // 追記後の配列をJSON形式でファイルに書き込み（整形して保存）
  await writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
  // 成功メッセージと更新済みデータを返す
  return { ok: true, message: "追加しました", data };
}
