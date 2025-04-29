"use client";

import { useRef, useState, useEffect } from "react";

export default function Modal() {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div style={{ padding: "16px" }}>
      <button
        onClick={openModal}
        style={{
          backgroundColor: "#3b82f6",
          color: "#fff",
          padding: "8px 16px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
        }}
      >
        モーダルを開く
      </button>

      {isOpen && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "24px",
              borderRadius: "12px",
              maxWidth: "400px",
              width: "100%",
              position: "relative",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              モーダルのタイトル
            </h2>
            <p style={{ marginBottom: "16px" }}>モーダルの中身</p>
            <button
              onClick={closeModal}
              style={{
                backgroundColor: "#d1d5db",
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
