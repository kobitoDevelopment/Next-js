import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../benkyo/fortest/modal/page";

describe("Modal", () => {
  it("モーダルが表示されるか確認", () => {
    render(<Modal />);

    // モーダルを開くボタンが表示されていることを確認
    const openButton = screen.getByText("モーダルを開く");
    expect(openButton).toBeInTheDocument();

    // ボタンをクリックしてモーダルが表示されるか確認
    fireEvent.click(openButton);

    // モーダル内の要素が表示されることを確認
    const modalContent = screen.getByText("モーダルのタイトル");
    expect(modalContent).toBeInTheDocument();
  });

  it("モーダルが閉じるボタンで閉じられるか確認", () => {
    render(<Modal />);

    const openButton = screen.getByText("モーダルを開く");
    fireEvent.click(openButton);

    // モーダルが表示されたことを確認
    const modalContent = screen.getByText("モーダルのタイトル");
    expect(modalContent).toBeInTheDocument();

    // 閉じるボタンをクリックしてモーダルを閉じる
    const closeButton = screen.getByText("閉じる");
    fireEvent.click(closeButton);

    // モーダルが閉じられたことを確認
    expect(modalContent).not.toBeInTheDocument();
  });

  it("Escキーでモーダルが閉じるか確認", () => {
    render(<Modal />);

    const openButton = screen.getByText("モーダルを開く");
    fireEvent.click(openButton);

    // モーダルが表示されたことを確認
    const modalContent = screen.getByText("モーダルのタイトル");
    expect(modalContent).toBeInTheDocument();

    // Escキーを押してモーダルを閉じる
    fireEvent.keyDown(document, { key: "Escape" });

    // モーダルが閉じられたことを確認
    expect(modalContent).not.toBeInTheDocument();
  });
});
