/*
☑️ Todoリストをリアクティブな連想配列として作成
☑️ Todoを追加するUIを作成
☑️ Todoを追加する関数を作成
☑️ Todoリストを一覧表示するUIを作成
☑️ Todoの完了状態を変更するUIを作成
☑️ Todoの完了状態を変更する関数を作成
☑️ Todoを削除するUIを作成
☑️ Todoを削除する関数を作成
☑️ Todoリストを検索するUIを作成
☑️ Todoリストを検索する関数を作成
☑️ Todoリストを検索前に戻すUIを作成
☑️ Todoリストを検索前に戻す関数を作成
*/

"use client";
import { useState } from "react";

type ToDoList = {
  id: number;
  action: string;
  limit: Date;
  completed: boolean;
};

export default function ToDoPage() {
  // Todoリストをリアクティブな連想配列として保持する
  const [todos, setTodos] = useState<ToDoList[]>([]);

  // ToDoを追加する関数
  // TODO: eventの引数anyに適切な型付けを実施する
  const addTodo = (event: any) => {
    // デフォルトのイベントを中断
    event.preventDefault();

    // フォームから送信されたデータを定義
    const submitedData = new FormData(event.target);
    const submitedAction = submitedData.get("action");
    const submitedLimit = submitedData.get("limit");

    // 送信されたデータが文字列かどうか検証
    if (typeof submitedAction !== "string" || typeof submitedLimit !== "string") {
      return;
    }

    // 送信されたデータが空でないか検証
    if (submitedAction.length === 0 || submitedLimit.length === 0) {
      return;
    }

    // 新しく追加するTodoを定義
    const newTodo: ToDoList = {
      id: Date.now(),
      action: submitedAction,
      limit: new Date(submitedLimit),
      completed: false,
    };

    // 新しく作成したTodoをToDoリストに追加
    const newTodos = todos.concat(newTodo);
    setTodos(newTodos);

    // フォーム送信後は入力された値をリセット
    event.target.reset();
  };

  // ToDoの完了状態を変更する関数
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

  // ToDoを削除する関数
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

  // ToDoリストから検索する関数
  // 検索前のデータを保持するための変数を定義
  const [originalTodos, setOriginalTodos] = useState<ToDoList[]>([]);
  const searchTodos = (event: any) => {
    // デフォルトのイベントを中断
    event.preventDefault();

    // 検索ワードの取得
    const submitedData = new FormData(event.currentTarget);
    const searchWord = submitedData.get("search");

    // 検索ワードが文字列かどうか検証
    if (typeof searchWord !== "string" || searchWord.length === 0) {
      return;
    }

    // 検索結果をリアクティブな連想配列に代入する前に、検索前のデータを保持
    if (originalTodos.length === 0) {
      setOriginalTodos(todos);
    }

    // 検索結果をリアクティブな連想配列に代入
    setTodos(
      todos.filter((item) => {
        if (item.action.includes(searchWord)) {
          return true;
        } else {
          return false;
        }
      })
    );
  };

  const resetSearch = () => {
    // 検索を実行する前に検索のリセットを押しても処理を実行しないための分岐
    if (originalTodos.length > 0) {
      // 検索前のデータをリアクティブな連想配列に代入
      setTodos(originalTodos);

      // 検索前のデータをリセットして、検索処理の中でlength===0として判定できるようにする
      setOriginalTodos([]);
    }
  };

  return (
    <div>
      <form onSubmit={searchTodos}>
        <search>
          <label htmlFor="search">検索</label>
          <input type="text" id="search" name="search"></input>
        </search>
        <button type="submit">検索する</button>
        <button type="button" onClick={resetSearch}>
          検索をリセット
        </button>
      </form>
      {todos.length === 0 && <p>登録されたTodoはありません。</p>}
      {todos.length > 0 && (
        <ul>
          {todos.map((item) => {
            return (
              <li key={item.id}>
                <span style={{ textDecoration: item.completed ? "line-through" : "none" }}>
                  <span>{item.action}</span>
                  <span>
                    <time>{item.limit.toLocaleDateString()}</time>まで
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
              <label htmlFor="limit">期日</label>
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
