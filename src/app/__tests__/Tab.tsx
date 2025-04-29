// Tab.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Tab from "../benkyo/fortest/tab/page";

describe("タブ切り替えコンポーネント", () => {
  it("初期表示は1番目のタブ（概要）になっている", () => {
    render(<Tab />);

    // 初期表示のタブパネルに概要の内容が表示されていることを確認
    expect(screen.getByRole("tabpanel")).toHaveTextContent("これは概要タブの内容です。");
  });

  it("詳細タブをクリックすると詳細の内容が表示される", () => {
    render(<Tab />);

    // 「詳細」タブをクリック
    fireEvent.click(screen.getByRole("tab", { name: "詳細" }));

    // タブパネルが詳細の内容に切り替わっていることを確認
    expect(screen.getByRole("tabpanel")).toHaveTextContent("これは詳細タブの内容です。");
  });

  it("レビュータブをクリックするとレビューの内容が表示される", () => {
    render(<Tab />);

    // 「レビュー」タブをクリック
    fireEvent.click(screen.getByRole("tab", { name: "レビュー" }));

    // タブパネルがレビューの内容に切り替わっていることを確認
    expect(screen.getByRole("tabpanel")).toHaveTextContent("これはレビュータブの内容です。");
  });
});
