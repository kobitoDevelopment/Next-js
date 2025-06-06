/*
stateで値を管理せず、defaultValueやdefaultCheckedを使って初期値を設定する場合
*/

"use client";
export default function TestPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("フォームが送信されました");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      {/* テキスト入力（非コントロール） */}
      <label className="block">
        名前
        <input
          type="text"
          defaultValue="山田太郎" // 初期値を設定
          className="border p-1 block w-full"
        />
      </label>

      {/* チェックボックス（非コントロール） */}
      <label className="block">
        <input
          type="checkbox"
          defaultChecked={true} // 初期チェック状態を設定
        />
        同意する
      </label>

      {/* セレクトボックス（非コントロール） */}
      <label className="block">
        フルーツを選んでください
        <select defaultValue="banana" className="border p-1 block w-full">
          <option value="apple">りんご</option>
          <option value="banana">バナナ</option>
          <option value="orange">オレンジ</option>
        </select>
      </label>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        送信
      </button>
    </form>
  );
}
