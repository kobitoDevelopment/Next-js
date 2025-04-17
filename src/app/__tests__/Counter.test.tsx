/* 必要なライブラリをインポート
  @testing-library/reactからrender, screen, fireEventをインポート
  render ... コンポーネントを実際にレンダリングするための関数
  screen ... テスト中にDOMから要素を取得するためのユーティリティ
  fireEventは ... Iイベント（クリック、入力など）をシミュレートするために使用
*/
import { render, screen, fireEvent } from "@testing-library/react";

// テスト対象のコンポーネントをインポート
import Counter from "../benkyo/fortest/count/page";

// describe ... テストケースをグループ化するための関数
// "Counter component"とテストスイートに名前をつけ、Counterコンポーネントに関するテストをまとめる
describe("Counter component", () => {
  // it ... 個々のテストケースを定義するための関数
  // "initially displays 0"という名前のテストケースを定義
  // Counterコンポーネントが初期状態で0を表示することを確認する
  it("initially displays 0", () => {
    // render関数でCounterコンポーネントを描画
    render(<Counter />);

    // screen.getByTestId("count")で"count"というテストIDを持つ要素を取得
    // .toHaveTextContent("Count: 0")で、その要素が「Count: 0」を表示しているか確認
    expect(screen.getByTestId("count")).toHaveTextContent("Count: 0");
  });

  // インクリメントボタンがクリックされた時に、カウントが増えるかをテストするケース
  it("increments count when Increment button is clicked", () => {
    // render関数でCounterコンポーネントを描画
    render(<Counter />);

    // fireEvent.clickで、「Increment」というテキストを持つボタンをクリックするイベントを発火
    fireEvent.click(screen.getByText("Increment"));

    // カウントが増えたことを確認するため、再度"count"のテストIDを持つ要素を取得
    // .toHaveTextContent("Count: 1")で、その要素が「Count: 1」を表示しているか確認
    expect(screen.getByTestId("count")).toHaveTextContent("Count: 1");
  });

  // デクリメントボタンがクリックされた時に、カウントが減るかをテストするケース
  it("decrements count when Decrement button is clicked", () => {
    // render関数でCounterコンポーネントを描画
    render(<Counter />);

    // fireEvent.clickで、「Decrement」というテキストを持つボタンをクリックするイベントを発火
    fireEvent.click(screen.getByText("Decrement"));

    // カウントが減ったことを確認するため、再度"count"のテストIDを持つ要素を取得
    // .toHaveTextContent("Count: -1")で、その要素が「Count: -1」を表示しているか確認
    expect(screen.getByTestId("count")).toHaveTextContent("Count: -1");
  });
});
