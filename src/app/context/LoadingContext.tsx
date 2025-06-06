"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// 型定義
type LoadingContextType = {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
};

/* Context を作成
 *  Context とは...
 *  アプリ内で、あるデータをどこでも参照できるようにする仕組み
 *  createContext() で Context を作成する(事前に用意した型を指定)
 */
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

/* Providerを作成
 * Provider とは ...
 * Context を使うためには、「どの範囲でこのデータを使うか」を定義する必要がある
 * Providerは「このコンポーネント以下では Context のデータが使える」という範囲を決める
 * この Provider で囲んだコンポーネント以下で Context の値を使える
 */
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  // useState を使ってローディング状態を管理
  const [isLoading, setIsLoading] = useState(true);

  // ローディング開始関数（isLoading を true にする）
  const startLoading = () => setIsLoading(true);
  // ローディング終了関数（isLoading を false にする）
  const stopLoading = () => setIsLoading(false);

  return (
    // ContextProvider を定義し、valueにisLoadingと操作関数を渡す
    // React19以前では、    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>のように.Providerを書く必要があった
    <LoadingContext value={{ isLoading, startLoading, stopLoading }}>
      {/*
       *<LoadingContext.Provider>をJSX(TSX)内で使うことで、LoadingContextの値を提供するProvider を作成し、
       *この Provider で囲んだコンポーネント（children）に isLoading, startLoading, stopLoading の値を渡せるようにする
       * 例(以下のような状況)
       * <LoadingProvider>
       *   <MyComponent1 />
       *   <MyComponent2 />
       *    ...
       * </LoadingProvider>
       */}
      {children}
      {/* // React19以前では、</LoadingContext.Provider>のように.Providerを書く必要があった */}
    </LoadingContext>
  );
};

// カスタムフックを作成（useContext を使って Context の値を取得）
export const useLoading = () => {
  // Context の値を取得
  const context = useContext(LoadingContext);
  /* Provider の外で useLoading() を使った場合にエラーを出す
   * Provider の外とは？
   * LoadingProviderで囲まれていない場所
   * useContext(LoadingContext) を使うとLoadingContext.Providerのvalueを取得するが、
   * LoadingProviderで囲んでいないとvalueが存在せずundefinedになる
   * undefinedのまま進むとエラーの原因になるため、ここでthrow new Error()を出す
   */
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  // useLoading() を使ったコンポーネントで isLoading, startLoading, stopLoading を利用可能
  return context;
};
