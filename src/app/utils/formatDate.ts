/*
 * Reactのライフサイクルや状態管理に関する機能はhookで管理し、
 * それらに関与しない、単純な機能を使いまわしたい場合はutilsディレクトリに関数を定義する
 */
export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("ja-JP", options);
};
