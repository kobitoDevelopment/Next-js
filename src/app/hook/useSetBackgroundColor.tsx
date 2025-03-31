/*
 * hooks ... 機能だけを分離・再利用するための仕組み
 * hook/に作成するファイルはuseから始まる名前にする
 */

"use client";
import { useEffect } from "react";

export const useSetBackgroundColor = (trigger: boolean) => {
  useEffect(() => {
    if (trigger) {
      // 引数にtrueが渡されたら背景色を青にする
      document.body.style.backgroundColor = "blue";
    } else {
      // 引数にfalseが渡されたら背景色を元に戻す
      document.body.style.backgroundColor = "";
    }
    // クリーンアップ処理：アンマウント時に背景色を元に戻す
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [trigger]); // trigger が変更されるたびに実行
};
