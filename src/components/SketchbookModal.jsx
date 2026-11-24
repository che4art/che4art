
import { useEffect } from "react";
import Sketchbook from "./sketchbook";

export default function SketchbookModal({ onClose }) {

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.88)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999999,
        animation: "fadeIn .2s",
      }}
    >

      {/* Janela */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "95vw",
          height: "95vh",
          maxWidth: "1600px",
          maxHeight: "900px",
          background: "#050505",
          border: "2px solid white",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
        }}
      >

        {/* Barra superior */}
        <div
          style={{
            height: "45px",
            flexShrink: 0,
            background:
              "linear-gradient(180deg, #4bb9ae, #6baada, #6b8eda, #5c51de)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "white",
            fontFamily: '"Pixelify Sans", sans-serif',
          }}
        >
          <span style={{ padding: "0 15px" }}>
            my sketchbook
          </span>

          <button
            onClick={onClose}
            style={{
              width: "45px",
              height: "45px",
              border: "1px solid white",
              color: "white",
              background: "linear-gradient(180deg, #ff1919, #a030bc)",
              cursor: 'url("/cursor/pointing.png"), pointer'
            }}
          >
            ✕
          </button>
        </div>

        {/* Conteúdo */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "auto",
            background: "#111",
          }}
        >
          <Sketchbook />
        </div>

      </div>
    </div>
  );
}
