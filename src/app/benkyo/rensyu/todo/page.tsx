/*
☑️ ToDoリストを保持するリアクティブな連想配列を定義
☑️ ToDoリストを一覧表示するUIを作成
☑️ ToDoを追加するUIを作成
☑️ ToDoを追加する関数を作成
☑️ ToDoを編集するUIを作成
☑️ ToDoを編集する関数を作成
☑️ ToDoを削除するUIを作成
☑️ ToDoを削除する関数を作成
☑️ ToDoの完了状態を切り替えるUIを作成
☑️ ToDoの完了状態を切り返える関数を作成
・ToDoを検索するUIを作成
・ToDoを検索する関数を作成
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
  const [todos, setTodos] = useState<ToDoList[]>([]);

  // ToDoを追加する関数
  /* TODO: eventの型を適切なものに修正する */
  const addTodo = (event: any) => {
    // デフォルトのイベントを中断
    event.preventDefault();

    // 送信されたデータを定義
    const submitedData = new FormData(event.target);
    const submitedAction = submitedData.get("action");
    const submitedLimit = submitedData.get("limit");

    // 送信された値が文字列かどうか検証
    if (typeof submitedAction !== "string" || typeof submitedLimit !== "string") {
      return;
    }

    // 送信された値が空白の場合は処理を中断
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

    // 現在のToDoリストに新しいToDoを追加
    const newToDoList = todos.concat(newTodo);
    setTodos(newToDoList);

    // フォーム送信後は入力された値をリセット
    event.target.reset();
  };

  // ToDoを編集する関数
  /* TODO: eventの型を適切なものに修正する */
  const editTodo = (event: any, id: number) => {
    // デフォルトのイベントを中断
    event.preventDefault();

    // 送信されたデータを定義
    const submitedData = new FormData(event.target);
    const submitedAction = submitedData.get("edit-action");
    const submitedLimit = submitedData.get("edit-limit");

    // 送信された値が文字列かどうか検証
    if (typeof submitedAction !== "string" || typeof submitedLimit !== "string") {
      return;
    }

    // 送信された値が空白の場合は処理を中断
    if (submitedAction.length === 0 || submitedLimit.length === 0) {
      return;
    }

    // 編集対象として渡ってきたidでカラムを特定し上書き
    setTodos(
      todos.map((item) => {
        if (id === item.id) {
          item.action = submitedAction;
          item.limit = new Date(submitedLimit);
          return item;
        } else {
          return item;
        }
      })
    );

    // フォーム送信後は入力された値をリセット
    event.target.reset();
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

  // ToDoの完了状態を切り替える関数
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

  // 検索前のToDoを保持する連想配列を定義
  const [originalTodos, setOriginalTodos] = useState<ToDoList[]>([]);

  // ToDoを検索する関数
  /* TODO: eventの型を適切なものに修正する */
  const searchTodo = (event: any) => {
    // デフォルトのイベントを中断
    event.preventDefault();

    // 送信されたデータを定義
    const submitedData = new FormData(event.target);
    const submitedSearchWord = submitedData.get("search");

    // 送信された値が文字列かどうか検証
    if (typeof submitedSearchWord !== "string") {
      return;
    }

    // 送信された値が空白の場合は処理を中断
    if (submitedSearchWord.length === 0) {
      return;
    }

    // 検索前のToDoリストを保持
    // 検索ボタンを連打しても、最初の1回目でしかtodosの保持は実行されないようにする
    if (originalTodos.length > 0) {
      return;
    }
    setOriginalTodos(todos);

    // todosのデータをitemのactionに検索ワードを含むカラムのみにする
    setTodos(
      todos.filter((item) => {
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
    if (originalTodos.length === 0) {
      return;
    }
    setTodos(originalTodos);

    // originalTodosを空にする
    setOriginalTodos([]);
  };

  return (
    <div>
      <search>
        <form onSubmit={searchTodo}>
          <dt>
            <input type="text" name="search" />
          </dt>
          <dd>
            <button type="submit">検索する</button>
            <button type="button" onClick={resetSearch}>
              検索結果をリセットする
            </button>
          </dd>
        </form>
      </search>
      {todos.length === 0 && <p>登録されたToDoはありません。</p>}
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
                          <label htmlFor="edit-action">内容を編集する</label>
                        </dt>
                        <dd>
                          <input type="text" name="edit-action" id="edit-action" />
                        </dd>
                      </div>
                      <div>
                        <dt>
                          <label htmlFor="edit-limit">期限を編集する</label>
                        </dt>
                        <dd>
                          <input type="date" name="edit-limit" id="edit-limit" />
                        </dd>
                      </div>
                    </dl>
                    <button type="submit">編集する</button>
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
