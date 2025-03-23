/*
☑️ Todoデータを保持する連想配列をリアクティブに作成
☑️ Todoデータを追加する関数を作成
☑️ Todoデータを削除する関数を作成
☑️ Todoデータの完了状態を切り替える関数を作成
☑️ 登録済みのTodoを一覧表示するUIを作成
☑️ 登録済みのTodoが1件もない場合はメッセージを表示
☑️ 新しいTODOを追加するUIを作成
*/

"use client";
import { useState } from "react";

// ToDoリストのスキーマを定義
type ToDoList = {
  id: number;
  action: string;
  limit: Date;
  completed: boolean;
};

export default function TodoPage() {
  const [todos, setTodos] = useState<ToDoList[]>([]);
  // Todoを新しく追加する関数
  const addTodo = (event: any) => {
    event.preventDefault();
    // if(!(event.target instanceof HTMLFormElement)){
    //   return
    // }
    const submitedData = new FormData(event.target);
    const submitedAction = submitedData.get("action");
    const submitedLimit = submitedData.get("limit");

    // 受け取ったactionとlimitが文字列でなければ処理を中断
    if (typeof submitedAction !== "string" || typeof submitedLimit !== "string") {
      return;
    }
    // 受け取ったactionとlimitが空である場合は処理を中断
    if (submitedAction.length === 0 || submitedLimit.length === 0) {
      return;
    }
    // 新しく追加するTodoを作成
    const newTodo: ToDoList = {
      id: Date.now(),
      action: submitedAction,
      limit: new Date(submitedLimit),
      completed: false,
    };
    /* 新しく追加するTodoを既存のTodoリストに追加( todos.push(newTodo)のように、todosに直接追加すると
     *  Reactが変更を検知できず、コンポーネントが正しく再レンダリングされないため、定数を宣言してそこに
     *  既存のtodosと新しいTodoを結合した配列を代入し、setTodosで更新する
     *  const hoge = [...todos];の形でコピーを作ってもOK
     */
    const newTodos = todos.concat(newTodo);
    setTodos(newTodos);
    event.target.reset();
  };
  // Todoを削除する関数
  const deleteTodo = (id: number) => {
    setTodos(
      todos.filter((item) => {
        if (item.id === id) {
          return false;
        } else {
          return true;
        }
      })
    );
  };
  // Todoの完了状態を切り替える関数
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
      {todos.length === 0 && <p>登録されたToDoはありません</p>}
      {todos.length > 1 && (
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
                <button
                  type="button"
                  onClick={() => {
                    deleteTodo(item.id);
                  }}
                >
                  削除する
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <form onSubmit={addTodo}>
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
              <label htmlFor="limit">期限</label>
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
