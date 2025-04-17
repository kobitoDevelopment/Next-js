import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../benkyo/fortest/form/page";

describe("フォームのテスト", () => {
  // 【異常系】名前もチェックも空欄で送信すると、両方のエラーが出る
  it("名前もチェックも空欄で送信すると、両方のエラーが出る", () => {
    render(<Form />);
    fireEvent.click(screen.getByRole("button"));

    const errors = screen.getAllByRole("alert");
    expect(errors.length).toBe(1);
    expect(errors[0]).toHaveTextContent("名前を入力してください");
    expect(errors[0]).toHaveTextContent("利用規約に同意してください");
  });

  // 【異常系】名前が空欄で送信すると、名前に対するエラーが出る
  it("名前が空欄で送信するとエラーが出る", () => {
    render(<Form />);
    fireEvent.click(screen.getByLabelText(/利用規約に同意する/)); // チェックだけ入れる
    fireEvent.click(screen.getByRole("button")); // 名前は空欄のまま送信

    const errors = screen.getAllByRole("alert");
    expect(errors[0]).toHaveTextContent("名前を入力してください");
    expect(errors[0]).not.toHaveTextContent("利用規約に同意してください");
  });

  // 【異常系】チェックが未入力で送信すると、チェックに対するエラーが出る
  it("同意がない状態で送信するとエラーが出る", () => {
    render(<Form />);
    fireEvent.change(screen.getByLabelText("名前"), {
      target: { value: "花子" },
    }); // 名前だけ入力
    fireEvent.click(screen.getByRole("button")); // チェックは入れてない

    const errors = screen.getAllByRole("alert");
    expect(errors[0]).toHaveTextContent("利用規約に同意してください");
    expect(errors[0]).not.toHaveTextContent("名前を入力してください");
  });

  // 【正常系】名前と同意が揃えば送信後に挨拶が表示される
  it("名前と同意が揃えば送信後に挨拶が表示される", () => {
    render(<Form />);
    fireEvent.change(screen.getByLabelText("名前"), {
      target: { value: "次郎" },
    });
    fireEvent.click(screen.getByLabelText(/利用規約に同意する/));
    fireEvent.click(screen.getByRole("button")); // 両方OKの状態で送信

    // 正常に挨拶メッセージが表示されているか確認
    expect(screen.getByText("こんにちは、次郎さん！")).toBeInTheDocument();
  });
});
