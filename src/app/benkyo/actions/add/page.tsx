"use client";

import { useActionState } from "react";
import { addData } from "./actions";
import type { DataItem } from "@/app/types/actions/data";

type AddState = {
  ok: boolean;
  message: string;
  data?: DataItem[];
};

const initialState: AddState = {
  ok: false,
  message: "",
  data: undefined,
};

export default function AddPage() {
  const [state, formAction] = useActionState<AddState, FormData>(addData, initialState);

  return (
    <main>
      <h1>データ追加デモ</h1>
      <form action={formAction}>
        <input name="item" placeholder="追加するアイテム" />
        <button type="submit">追加</button>
      </form>
      {state?.message && <div>{state.message}</div>}
      {Array.isArray(state?.data) && <pre>{JSON.stringify(state.data, null, 2)}</pre>}
    </main>
  );
}
