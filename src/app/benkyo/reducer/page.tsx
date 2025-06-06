"use client";
import { useReducer } from "react";

/**
 * 【useReducerとは？】
 * - 状態（state）と更新処理（ロジック）を1つの関数（reducer）にまとめて管理できる機能。
 * - 管理する状態が増えてきたり、複雑になってきたときに、reducerの中で状態をまとめて管理できる。
 */

// 状態の初期値（stateの形は自由！オブジェクトでもOK）
const initialState = { count: 0 };

// reducer関数：今のstateとactionを受け取って、新しいstateを返す
function reducer(state: typeof initialState, action: { type: string }) {
  if (action.type === "increment") {
    return { count: state.count + 1 };
  } else if (action.type === "decrement") {
    return { count: state.count - 1 };
  } else if (action.type === "reset") {
    return { count: 0 };
  } else {
    return state; // 不明なactionの場合は元のstateをそのまま返す
  }
}

export default function MyReducerExample() {
  // useReducerは [state, dispatch] を返す！
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>useReducer のカウント例</h1>
      <p>カウント: {state.count}</p>

      {/* dispatchでreducerに「何をしたいか」を伝える */}
      <button onClick={() => dispatch({ type: "increment" })}>+1</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
      <button onClick={() => dispatch({ type: "reset" })}>リセット</button>

      {/*
        これによりロジックを1か所にまとめられる
      */}
    </div>
  );
}
