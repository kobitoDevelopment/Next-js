// このファイルはサーバーサイド専用のファイルとして扱うことをNext.jsに伝えるディレクティブ
"use server";

// Node.jsのfs/promisesモジュールからreadFile関数をimport（Promiseベースでファイルを読み込むために使用）
import { readFile } from "fs/promises";

// Node.jsのpathモジュールをimport（ファイルパスの組み立てやパス操作のために利用）
import path from "path";

// データの型定義（DataItem型）をimport（型安全なデータ操作のために使用）
import { DataItem } from "@/app/types/actions/data";

// JSONデータファイルへの絶対パスを生成
// process.cwd()は実行中のプロセスのカレントディレクトリ（プロジェクトルート）を取得
// path.joinで "src/app/benkyo/actions/data.json" というパスを作成
const DATA_PATH = path.join(process.cwd(), "src", "app", "benkyo", "actions", "data.json");

// データを取得する非同期関数を定義
// 戻り値はDataItem型の配列（Promise<DataItem[]>）
export async function getData(): Promise<DataItem[]> {
  try {
    // 指定したパスのJSONファイルをUTF-8エンコーディングで非同期に読み込む
    const json = await readFile(DATA_PATH, "utf-8");
    // 読み込んだ文字列をJSONパースし、DataItem[]型として返す
    return JSON.parse(json) as DataItem[];
  } catch (err) {
    // ファイルが存在しない、またはパース失敗時にエラーをコンソールに出力
    console.error("データの読み込みに失敗しました:", err);
    // エラー時は空配列を返す（アプリがクラッシュしないようにするため）
    return [];
  }
}
