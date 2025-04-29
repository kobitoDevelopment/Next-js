/*
☑️ ToDoリストの型定義
☑️ ToDoリストをリアクティブな連想配列として定義
☑️ ToDoを一覧表示するUIを作成
☑️ 新しいToDoを追加するUIを作成
☑️ 新しいToDoを追加する関数を作成
☑️ ToDoの完了状態を変更するUIを作成
☑️ ToDoの完了状態を変更する関数を作成
☑️ ToDoを削除するUIを作成
☑️ ToDoを削除する関数を作成
☑️ ToDoを編集するUIを作成
☑️ ToDoを編集する関数を作成
☑️ ToDoを検索するUIを作成
☑️ ToDoを検索する関数を作成
*/

"use client";
import { useState } from "react";

// ToDoリストの型定義
type ToDoList = {
  id: number;
  action: string;
  limit: Date;
  completed: boolean;
};

export default function ToDoPage() {
  // ToDoリストを保持するリアクティブな連想配列を定義
  const [todos, setTodos] = useState<ToDoList[]>([]);

  // 新しいToDoを追加する関数
  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    // デフォルトのイベントを中断
    event.preventDefault();

    // 送信されたデータを定義
    const submitedData = new FormData(event.currentTarget);
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

    // 新しく追加するToDoを定義
    const newTodo: ToDoList = {
      id: Date.now(),
      action: submitedAction,
      limit: new Date(submitedLimit),
      completed: false,
    };

    // 現在のToDoListに新しく追加するToDoを連結
    const newTodos = todos.concat(newTodo);
    setTodos(newTodos);

    // 送信後は入力された値をリセット
    event.currentTarget.reset();
  };

  // ToDoの完了状態を変更する関数
  const toggleCompleted = (id: number) => {
    setTodos(
      todos.map((item) => {
        if (id === item.id) {
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
        if (id === item.id) {
          return false;
        } else {
          return true;
        }
      })
    );
  };

  // ToDoを編集する関数
  const editTodo = (event: React.FormEvent<HTMLFormElement>, id: number) => {
    // デフォルトのイベントを中断
    event.preventDefault();

    // 送信されたデータを定義
    const submitedData = new FormData(event.currentTarget);
    const submitedAction = submitedData.get("edit-action");
    const submitedLimit = submitedData.get("edit-limit");

    // 送信されたデータが文字列かどうか検証
    if (typeof submitedAction !== "string" || typeof submitedLimit !== "string") {
      return;
    }

    // 送信されたデータが空でないか検証
    if (submitedAction.length === 0 || submitedLimit.length === 0) {
      return;
    }

    // 編集したデータをToDoListに反映
    setTodos(
      todos.map((item) => {
        if (item.id === id) {
          item.action = submitedAction;
          item.limit = new Date(submitedLimit);
          return item;
        } else {
          return item;
        }
      })
    );

    // 送信後は入力された値をリセット
    event.currentTarget.reset();
  };

  // 検索前のToDoListを保持する
  const [originalTodos, setOriginalTodos] = useState<ToDoList[]>([]);
  // ToDoを検索する関数
  const searchTodo = (event: React.FormEvent<HTMLFormElement>) => {
    // デフォルトのイベントを中断
    event.preventDefault();

    // 送信されたデータを定義
    const submitedData = new FormData(event.currentTarget);
    const submitedSearchWord = submitedData.get("search");

    // 送信されたデータが文字列かどうか検証
    if (typeof submitedSearchWord !== "string") {
      return;
    }

    // 送信されたデータが空でないか検証
    if (submitedSearchWord.length === 0) {
      return;
    }

    // 検索ボタンを連打しても重複して登録されないよう、oroginalTodosに値があるか検証
    if (originalTodos.length === 0) {
      // 検索前のToDoListをoriginalTodosに保存
      setOriginalTodos(todos);
    }

    // 検索元データ（originalTodosがあればそちら、なければtodos）
    const source = originalTodos.length > 0 ? originalTodos : todos;

    // ToDoListを検索結果で上書き
    setTodos(
      source.filter((item) => {
        if (item.action.includes(submitedSearchWord)) {
          return true;
        } else {
          return false;
        }
      })
    );
  };

  // ToDoの検索結果をリセットする関数
  const resetSearch = () => {
    // 検索前にリセットボタンを押していないか検証
    if (originalTodos.length > 0) {
      // 検索前のTodoをToDoListに還元する
      setTodos(originalTodos);

      // 検索実行時にoriginalTodosが0であることを判定するために空に戻す
      setOriginalTodos([]);
      return;
    }
  };

  return (
    <div>
      <form onSubmit={searchTodo}>
        <label htmlFor="search">検索</label>
        <input type="text" name="search" id="search" />
        <button type="submit">検索する</button>
        <button type="button" onClick={resetSearch}>
          検索をリセットする
        </button>
      </form>
      {todos.length === 0 && <p>登録されたToDoはありません</p>}
      {todos.length > 0 && (
        <ul>
          {todos.map((item) => {
            return (
              <li key={item.id}>
                <span style={{ textDecoration: item.completed ? "line-through" : "none" }}>
                  <span>{item.action}</span>
                  <span>{item.limit.toLocaleDateString()}まで</span>
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
                <details>
                  <summary>編集する</summary>
                  <form
                    onSubmit={(event) => {
                      editTodo(event, item.id);
                    }}
                  >
                    <dl>
                      <div>
                        <dt>
                          <label htmlFor="edit-action">内容を編集</label>
                        </dt>
                        <dd>
                          <input type="text" name="edit-action" id="edit-action" />
                        </dd>
                      </div>
                      <div>
                        <dt>
                          <label htmlFor="edit-limit">期限を編集</label>
                        </dt>
                        <dd>
                          <input type="date" name="edit-limit" id="edit-limit" />
                        </dd>
                      </div>
                    </dl>
                    <button type="submit">編集を保存する</button>
                  </form>
                </details>
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
