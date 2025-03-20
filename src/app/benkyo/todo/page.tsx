/*
 * ToDoリスト設計
 * 1. useStateを使用するため、"use client"の記述とuseStateのインポートを行う
 * 2. ToDoリストのスキーマを定義(型付け)する
 * 3. ToDoリストの状態を格納・更新するstateを定義する
 * 4. ページを表示する関数を定義する(exports default function Todo())
 * 5. ToDoリストを追加する関数を定義する(addTodo)
 * 6. ToDoリストを完了にする関数を定義する(toggleComplete)
 * 7. ページを表示する関数内でフォームを表示し、ToDoリストを追加するUIを作成する
 * 8. ページを表示する関数内でリストを表示し、ToDoリストを完了にするUIを作成する
 * 9.上記リストの各項目の中に、ToDoを完了にするボタンを設置する
 */

"use client";
import { useState } from "react";

type Todo = {
  id: number;
  action: string;
  limit: Date;
  complete: boolean;
};

export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const actionValue = formData.get("action");
    const limitValue = formData.get("limit");

    // 型チェック
    if (typeof actionValue !== "string" || typeof limitValue !== "string") {
      return;
    }
    // 空白チェック
    if (actionValue.trim().length === 0) {
      return;
    }
    if (limitValue.trim().length === 0) {
      return;
    }

    // Dateを日付形式にフォーマット
    const limitDate = new Date(limitValue);

    const newTodo: Todo = {
      id: todos.length + 1,
      action: actionValue,
      limit: limitDate,
      complete: false,
    };

    setTodos([...todos, newTodo]);
    event.currentTarget.reset();
  };

  const toggleComplete = (id: number) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, complete: !todo.complete } : todo)));
  };

  return (
    <div>
      <h1>TODOリスト</h1>
      <form onSubmit={addTodo}>
        <input type="text" name="action" placeholder="TODOを入力" required />
        <input type="date" name="limit" required />
        <button type="submit">追加</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.complete ? "line-through" : "none" }}>
              {todo.action} - {todo.limit.toLocaleDateString()}
            </span>
            <button onClick={() => toggleComplete(todo.id)}>{todo.complete ? "未完了にする" : "完了にする"}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
