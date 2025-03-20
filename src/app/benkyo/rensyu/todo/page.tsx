/*
・リアクティブなTodoリストを定義
・Todoリストは一覧形式で表示するulを作成
・Todoリストに項目を追加するformを作成
・Todoリストに項目を追加する関数を作成
・Todoリストの完了状態をtoggleする関数を作成
*/

"use client";
import { useState } from "react";

type TodoList = {
  id: number;
  action: string;
  limit: Date;
  completed: boolean;
};

export default function TodoPage() {
  const [todos, setTodos] = useState<TodoList[]>([]);
  // TODO: eventの型はReactでは何が適切なのか明らかにして書き換える
  const addTodos = (event: any) => {
    event.preventDefault();
    const submitedData = new FormData(event.target);
    const submitedAction = submitedData.get("action");
    const submitedLimit = submitedData.get("limit");
    if (typeof submitedAction !== "string" || typeof submitedLimit !== "string") {
      return;
    }
    if (submitedAction.length === 0 || submitedLimit.length === 0) {
      return;
    }
    const newTodo: TodoList = {
      id: todos.length + 1,
      action: submitedAction,
      limit: new Date(submitedLimit),
      completed: false,
    };
    const currentTodos = [...todos];
    const newTodos = currentTodos.concat(newTodo);
    setTodos(newTodos);

    event.target.reset();
  };
  const toggleCompleted = (id: number) => {
    setTodos(
      todos.map((item) => {
        if (item.id === id) {
          item.completed = !item.completed;
          return item;
        } else {
          return item;
        }
      })
    );
  };
  return (
    <div>
      <ul>
        {todos.map((item) => {
          return (
            <li key={item.id}>
              <span style={{ textDecoration: item.completed ? "line-through" : "none" }}>
                <span>{item.action}</span>
                <span>
                  <time>{item.limit.toLocaleDateString()}</time>
                  まで
                </span>
              </span>
              <button
                type="button"
                onClick={() => {
                  toggleCompleted(item.id);
                }}
              >
                {item.completed ? "未完了にする" : "完了にする"}
              </button>
            </li>
          );
        })}
      </ul>
      <form onSubmit={addTodos}>
        <dl>
          <div>
            <dt>
              <label htmlFor="action">内容</label>
            </dt>
            <dd>
              <input type="text" name="action" id="action" />
            </dd>
          </div>
          <div>
            <dt>
              <label htmlFor="action">期限</label>
            </dt>
            <dd>
              <input type="date" name="limit" id="limit" />
            </dd>
          </div>
        </dl>
        <button type="submit">追加する</button>
      </form>
    </div>
  );
}
