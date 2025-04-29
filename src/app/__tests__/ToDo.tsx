import { render, screen, fireEvent } from "@testing-library/react";
import ToDoPage from "../benkyo/todo/page";
import "@testing-library/jest-dom";

describe("ToDoPage 初期表示", () => {
  test("初期状態ではToDoは何も表示されていない", () => {
    render(<ToDoPage />);
    expect(screen.getByText("登録されたToDoはありません")).toBeInTheDocument();
  });
});

describe("ToDoPage ToDo追加機能", () => {
  test("ToDoリストを追加できる（正常系）", () => {
    render(<ToDoPage />);

    const actionInput = screen.getByLabelText("内容");
    const limitInput = screen.getByLabelText("期限");
    const submitButton = screen.getByText("追加する");

    fireEvent.change(actionInput, { target: { value: "牛乳を買う" } });
    fireEvent.change(limitInput, { target: { value: "2025-12-31" } });

    fireEvent.click(submitButton);

    expect(screen.getByText("牛乳を買う")).toBeInTheDocument();
    expect(screen.getByText("2025/12/31まで")).toBeInTheDocument();
  });

  test("ToDoリストを追加できない（異常系）- 内容が空", () => {
    render(<ToDoPage />);

    const actionInput = screen.getByLabelText("内容");
    const limitInput = screen.getByLabelText("期限");
    const submitButton = screen.getByText("追加する");

    fireEvent.change(actionInput, { target: { value: "" } });
    fireEvent.change(limitInput, { target: { value: "2025-12-31" } });

    fireEvent.click(submitButton);

    expect(screen.getByText("登録されたToDoはありません")).toBeInTheDocument();
  });

  test("ToDoリストを追加できない（異常系）- 期限が空", () => {
    render(<ToDoPage />);

    const actionInput = screen.getByLabelText("内容");
    const limitInput = screen.getByLabelText("期限");
    const submitButton = screen.getByText("追加する");

    fireEvent.change(actionInput, { target: { value: "卵を買う" } });
    fireEvent.change(limitInput, { target: { value: "" } });

    fireEvent.click(submitButton);

    expect(screen.getByText("登録されたToDoはありません")).toBeInTheDocument();
  });
});

describe("ToDoPage ToDo完了状態変更機能", () => {
  test("ToDoの完了状態を変更できる（完了にする）", () => {
    render(<ToDoPage />);

    const actionInput = screen.getByLabelText("内容");
    const limitInput = screen.getByLabelText("期限");
    const submitButton = screen.getByText("追加する");

    fireEvent.change(actionInput, { target: { value: "掃除をする" } });
    fireEvent.change(limitInput, { target: { value: "2025-12-31" } });

    fireEvent.click(submitButton);

    const completeButton = screen.getByText("完了にする");
    fireEvent.click(completeButton);

    expect(screen.getByText("未完了にする")).toBeInTheDocument();
  });

  test("ToDoの完了状態を変更できる（未完了にする）", () => {
    render(<ToDoPage />);

    const actionInput = screen.getByLabelText("内容");
    const limitInput = screen.getByLabelText("期限");
    const submitButton = screen.getByText("追加する");

    fireEvent.change(actionInput, { target: { value: "掃除をする" } });
    fireEvent.change(limitInput, { target: { value: "2025-12-31" } });

    fireEvent.click(submitButton);

    const completeButton = screen.getByText("完了にする");
    fireEvent.click(completeButton);

    fireEvent.click(screen.getByText("未完了にする"));

    expect(screen.getByText("完了にする")).toBeInTheDocument();
  });
});

describe("ToDoPage 検索機能", () => {
  test("検索で特定のToDoのみが表示される", () => {
    render(<ToDoPage />);

    const actionInput = screen.getByLabelText("内容");
    const limitInput = screen.getByLabelText("期限");
    const submitButton = screen.getByText("追加する");

    // 2件のToDoを登録
    fireEvent.change(actionInput, { target: { value: "牛乳を買う" } });
    fireEvent.change(limitInput, { target: { value: "2025-12-31" } });
    fireEvent.click(submitButton);

    fireEvent.change(actionInput, { target: { value: "レポートを提出する" } });
    fireEvent.change(limitInput, { target: { value: "2025-12-30" } });
    fireEvent.click(submitButton);

    // 検索フォームに"牛乳"を入力して検索
    const searchInput = screen.getByLabelText("検索");
    const searchButton = screen.getByText("検索する");

    fireEvent.change(searchInput, { target: { value: "牛乳" } });
    fireEvent.click(searchButton);

    // 検索結果が正しく表示されることを確認
    expect(screen.getByText("牛乳を買う")).toBeInTheDocument();
    expect(screen.queryByText("レポートを提出する")).not.toBeInTheDocument();
  });

  test("検索をリセットすると元のToDoリストが復元される", () => {
    render(<ToDoPage />);

    const actionInput = screen.getByLabelText("内容");
    const limitInput = screen.getByLabelText("期限");
    const submitButton = screen.getByText("追加する");

    fireEvent.change(actionInput, { target: { value: "牛乳を買う" } });
    fireEvent.change(limitInput, { target: { value: "2025-12-31" } });
    fireEvent.click(submitButton);

    fireEvent.change(actionInput, { target: { value: "レポートを提出する" } });
    fireEvent.change(limitInput, { target: { value: "2025-12-30" } });
    fireEvent.click(submitButton);

    const searchInput = screen.getByLabelText("検索");
    fireEvent.change(searchInput, { target: { value: "牛乳" } });
    fireEvent.click(screen.getByText("検索する"));

    // 検索結果が反映されているか
    expect(screen.getByText("牛乳を買う")).toBeInTheDocument();
    expect(screen.queryByText("レポートを提出する")).not.toBeInTheDocument();

    // リセットボタンを押す
    fireEvent.click(screen.getByText("検索をリセットする"));

    // 元のToDoリストが復元されていることを確認
    expect(screen.getByText("牛乳を買う")).toBeInTheDocument();
    expect(screen.getByText("レポートを提出する")).toBeInTheDocument();
  });
});

describe("ToDoPage ToDo編集機能", () => {
  test("既存のToDoを編集できる", () => {
    render(<ToDoPage />);

    // まずToDoを追加
    const actionInput = screen.getByLabelText("内容");
    const limitInput = screen.getByLabelText("期限");
    const addButton = screen.getByText("追加する");

    fireEvent.change(actionInput, { target: { value: "牛乳を買う" } });
    fireEvent.change(limitInput, { target: { value: "2025-12-31" } });
    fireEvent.click(addButton);

    // ToDoが追加されたことを確認
    expect(screen.getByText("牛乳を買う")).toBeInTheDocument();
    expect(screen.getByText("2025/12/31まで")).toBeInTheDocument();

    // 編集フォームを開く
    const editSummary = screen.getByText("編集する");
    fireEvent.click(editSummary); // <summary> をクリックして <details> を開く

    // 編集フォームに値を入力して送信
    const editActionInput = screen.getByLabelText("内容を編集");
    const editLimitInput = screen.getByLabelText("期限を編集");
    const editButton = screen.getAllByText("編集を保存する")[0];

    fireEvent.change(editActionInput, { target: { value: "パンを買う" } });
    fireEvent.change(editLimitInput, { target: { value: "2026-01-01" } });
    fireEvent.click(editButton);

    // 編集されたToDoが表示されているか確認
    expect(screen.getByText("パンを買う")).toBeInTheDocument();
    expect(screen.getByText("2026/1/1まで")).toBeInTheDocument();

    // 古いToDoが消えていることを確認
    expect(screen.queryByText("牛乳を買う")).not.toBeInTheDocument();
    expect(screen.queryByText("2025/12/31まで")).not.toBeInTheDocument();
  });
});
