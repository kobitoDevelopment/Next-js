// 必要な関数やオブジェクトを @testing-library/react からインポート
import { render, screen, fireEvent } from "@testing-library/react";
// テスト対象のコンポーネントをインポート
import Form from "../benkyo/fortest/form/page";

// "フォームのテスト"とテストスイートに名前をつけ、Formコンポーネントに関するテストをまとめる
describe("フォームのテスト", () => {
  // 【異常系】名前もチェックも空欄で送信すると、両方のエラーが出る
  it("名前もチェックも空欄で送信すると、両方のエラーが出る", () => {
    render(<Form />); // フォームコンポーネントを仮想DOMに描画（マウント）

    // 送信ボタンを取得してクリック
    // getByRole は「指定した役割を持つ要素（button）」を1つ取得
    fireEvent.click(screen.getByRole("button"));

    // role="alert" を持つ要素（バリデーションエラー表示用）をすべて取得
    const errors = screen.getAllByRole("alert");

    // エラー要素が1つであることを確認（例: <ul role="alert"><li>〜</li></ul> など）
    expect(errors.length).toBe(1);

    // エラー要素の中身に、2つのエラーメッセージが含まれているか確認
    expect(errors[0]).toHaveTextContent("名前を入力してください");
    expect(errors[0]).toHaveTextContent("利用規約に同意してください");
  });

  // 【異常系】名前が空欄で送信すると、名前に対するエラーが出る
  it("名前が空欄で送信するとエラーが出る", () => {
    render(<Form />); // フォームを描画

    // 「利用規約に同意する」チェックボックスを取得してクリック（チェックを入れる）
    fireEvent.click(screen.getByLabelText(/利用規約に同意する/));

    // 送信ボタンをクリック（名前は空欄のまま）
    fireEvent.click(screen.getByRole("button"));

    // エラー表示を取得
    const errors = screen.getAllByRole("alert");

    // 「名前を入力してください」というエラーメッセージが表示されているか確認
    expect(errors[0]).toHaveTextContent("名前を入力してください");

    // 「利用規約に同意してください」というメッセージは含まれていないことを確認
    expect(errors[0]).not.toHaveTextContent("利用規約に同意してください");
  });

  // 【異常系】チェックが未入力で送信すると、チェックに対するエラーが出る
  it("同意がない状態で送信するとエラーが出る", () => {
    render(<Form />); // フォームを描画

    // 名前入力欄に「花子」と入力
    fireEvent.change(screen.getByLabelText("名前"), {
      target: { value: "花子" },
    });

    // 送信ボタンをクリック（チェックはしていない）
    fireEvent.click(screen.getByRole("button"));

    // エラー表示を取得
    const errors = screen.getAllByRole("alert");

    // 「利用規約に同意してください」のエラーメッセージがあるか
    expect(errors[0]).toHaveTextContent("利用規約に同意してください");

    // 「名前を入力してください」は出ていないことを確認（名前は入力済みなので）
    expect(errors[0]).not.toHaveTextContent("名前を入力してください");
  });

  // 【正常系】名前と同意が揃えば送信後に挨拶が表示される
  it("名前と同意が揃えば送信後に挨拶が表示される", () => {
    render(<Form />); // フォームを描画

    // 名前欄に「次郎」と入力
    fireEvent.change(screen.getByLabelText("名前"), {
      target: { value: "次郎" },
    });

    // チェックボックスにチェックを入れる
    fireEvent.click(screen.getByLabelText(/利用規約に同意する/));

    // 送信ボタンをクリック
    fireEvent.click(screen.getByRole("button"));

    // 挨拶メッセージが画面に表示されているか確認
    expect(screen.getByText("こんにちは、次郎さん！")).toBeInTheDocument();
  });
});
